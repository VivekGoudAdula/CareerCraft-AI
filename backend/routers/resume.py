from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
import models, schemas, database
from services import ai_service, ats_service, pdf_service
import json
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post("/generate-resume")
def generate_resume(req: schemas.ResumeGenerateRequest, db: Session = Depends(database.get_db)):
    user_id = req.user_id
    # Try to find user by ID or email
    try:
        uid = int(user_id)
        user = db.query(models.User).filter(models.User.id == uid).first()
    except ValueError:
        user = db.query(models.User).filter(models.User.email == user_id).first()
        
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please create a profile first.")
    
    # Parse and format education for the AI: btech -> intermediate -> school order
    edu_text_parts = []
    try:
        edu_parsed = json.loads(profile.education) if profile.education else {}
        if isinstance(edu_parsed, dict):
            btech = edu_parsed.get('btech')
            intermediate = edu_parsed.get('intermediate')
            school = edu_parsed.get('school')
            if btech and isinstance(btech, dict):
                edu_text_parts.append(f"B.Tech/Graduation: {btech.get('name','')} | {btech.get('branch','')} | {btech.get('year','')}")
            if intermediate and isinstance(intermediate, dict):
                edu_text_parts.append(f"Intermediate/12th: {intermediate.get('name','')} | {intermediate.get('board','')} | {intermediate.get('year','')}")
            if school and isinstance(school, dict):
                edu_text_parts.append(f"High School: {school.get('name','')} | {school.get('board','')} | {school.get('year','')}")
        elif isinstance(edu_parsed, list):
            edu_text_parts = [str(e) for e in edu_parsed]
    except Exception:
        edu_text_parts = [str(profile.education)]

    formatted_education = " | ".join(edu_text_parts) if edu_text_parts else ""

    profile_data = {
        "skills": profile.skills,
        "experience": profile.experience,
        "projects": profile.projects,
        "target_role": profile.target_role,
        "education": formatted_education,
        "achievements": profile.achievements,
        "hobbies": profile.hobbies
    }
    
    # Generate content using AI
    try:
        resume_json_str = ai_service.generate_resume_content(profile_data)
        
        # Try to parse JSON from AI response
        try:
            clean_json = resume_json_str
            if "```json" in resume_json_str:
                clean_json = resume_json_str.split("```json")[1].split("```")[0].strip()
            elif "```" in resume_json_str:
                clean_json = resume_json_str.split("```")[1].split("```")[0].strip()
            
            if not clean_json.strip().startswith("{"):
                start_idx = clean_json.find("{")
                end_idx = clean_json.rfind("}")
                if start_idx != -1 and end_idx != -1:
                    clean_json = clean_json[start_idx:end_idx+1]
            
            resume_data = json.loads(clean_json)
        except Exception:
            # Fallback if AI doesn't return perfect JSON
            resume_data = {
                "summary": resume_json_str[:500],
                "skills": profile.skills.split(",") if profile.skills else [],
                "experience": [{"role": "Experience", "company": "Various", "duration": "", "points": [profile.experience[:200]]}],
                "projects": [{"name": "Projects", "description": profile.projects[:200], "tech": ""}],
                "education": [{"college": "University", "degree": "Degree", "year": ""}]
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Service Error: {str(e)}")
    
    # Calculate ATS score
    score, suggestions = ats_service.calculate_ats_score(resume_json_str, profile.target_role)
    
    # ALWAYS rebuild education from profile data directly.
    # The AI frequently returns garbage like "Not Applicable" / "null" for education
    # because it can't reliably parse the nested {btech, intermediate, school} structure.
    # We use the profile as the ground truth here.
    _JUNK = {"not applicable", "n/a", "null", "none", "na", "", "university", "degree"}

    def _is_junk(val):
        return not val or str(val).strip().lower() in _JUNK

    ai_education = resume_data.get("education", [])
    all_junk = (
        not ai_education
        or not isinstance(ai_education, list)
        or all(_is_junk(e.get('college')) and _is_junk(e.get('degree')) for e in ai_education)
    )

    if all_junk:
        # Rebuild education list from profile in btech -> intermediate -> school order
        built_edu = []
        try:
            edu_parsed = json.loads(profile.education) if profile.education else {}
            if isinstance(edu_parsed, dict):
                btech = edu_parsed.get('btech')
                intermediate = edu_parsed.get('intermediate')
                school = edu_parsed.get('school')
                if btech and isinstance(btech, dict):
                    built_edu.append({"degree": f"B.Tech - {btech.get('branch','')}", "college": btech.get('name',''), "year": btech.get('year','')})
                if intermediate and isinstance(intermediate, dict):
                    built_edu.append({"degree": f"Intermediate ({intermediate.get('board','')})", "college": intermediate.get('name',''), "year": intermediate.get('year','')})
                if school and isinstance(school, dict):
                    built_edu.append({"degree": f"High School ({school.get('board','')})", "college": school.get('name',''), "year": school.get('year','')})
        except Exception:
            pass
        if built_edu:
            ai_education = built_edu
            resume_data["education"] = ai_education

    # Save to database
    db_resume = models.Resume(
        user_id=user.id,
        summary=resume_data.get("summary", ""),
        skills=json.dumps(resume_data.get("skills", [])),
        experience=json.dumps(resume_data.get("experience", [])),
        projects=json.dumps(resume_data.get("projects", [])),
        education=json.dumps(ai_education),
        ats_score=score
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    
    return {
        "resume": resume_data,
        "ats_score": score,
        "suggestions": suggestions
    }

@router.get("/resume/{user_id}")
def get_resume(user_id: int, db: Session = Depends(database.get_db)):
    resume = db.query(models.Resume).filter(models.Resume.user_id == user_id).order_by(models.Resume.created_at.desc()).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {
        "summary": resume.summary,
        "skills": json.loads(resume.skills),
        "experience": json.loads(resume.experience),
        "projects": json.loads(resume.projects),
        "education": json.loads(resume.education),
        "ats_score": resume.ats_score
    }

@router.get("/ats-score/{user_id}")
def get_ats_score(user_id: int, db: Session = Depends(database.get_db)):
    resume = db.query(models.Resume).filter(models.Resume.user_id == user_id).order_by(models.Resume.created_at.desc()).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # We should ideally re-calculate or just return the saved one
    # For simplicity, returning a fixed response based on the saved score
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    target_role = profile.target_role if profile else "General"
    
    # Re-calculate suggestions since we don't store them in DB currently
    # reconstruct a text blob for the scoring engine
    text_blob = f"{resume.summary} {' '.join(json.loads(resume.skills))} {resume.experience} {resume.projects}"
    score, suggestions = ats_service.calculate_ats_score(text_blob, target_role)
    
    return {
        "score": resume.ats_score,
        "suggestions": suggestions
    }

@router.get("/export-resume/{user_id}")
def export_resume(user_id: int, db: Session = Depends(database.get_db)):
    resume = db.query(models.Resume).filter(models.Resume.user_id == user_id).order_by(models.Resume.created_at.desc()).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    
    # Reconstruct data dictionary for pdf_service
    resume_data = {
        "summary": resume.summary,
        "skills": json.loads(resume.skills),
        "experience": json.loads(resume.experience),
        "projects": json.loads(resume.projects),
        "education": json.loads(resume.education),
        "linkedin": profile.linkedin if profile else "",
        "github": profile.github if profile else ""
    }
    
    buffer = pdf_service.generate_pdf(resume_data, user)
    
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=resume_{user_id}.pdf"}
    )

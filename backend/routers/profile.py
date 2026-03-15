from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/profile")
def create_profile(data: dict, db: Session = Depends(database.get_db)):
    # Extract profile data whether it's nested or flat
    p_data = data.get("profile_data", data)
    
    email = p_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        user = models.User(name=p_data.get("name", ""), email=email)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Map frontend fields to backend Profile model
    # Convert lists/objects to strings for storage
    import json
    
    profile_fields = {
        "user_id": user.id,
        "education": json.dumps({
            "school": p_data.get("education_school"),
            "intermediate": p_data.get("education_intermediate"),
            "btech": p_data.get("education_btech")
        }),
        "skills": ", ".join(p_data.get("skills", [])) if isinstance(p_data.get("skills"), list) else str(p_data.get("skills", "")),
        "experience": json.dumps(p_data.get("experience", [])), 
        "projects": json.dumps(p_data.get("projects", [])),
        "target_role": p_data.get("target_role") or p_data.get("targetRole") or "",
        "linkedin": p_data.get("linkedin"),
        "github": p_data.get("github"),
        "achievements": json.dumps(p_data.get("achievements", [])),
        "hobbies": ", ".join(p_data.get("hobbies", [])) if isinstance(p_data.get("hobbies"), list) else str(p_data.get("hobbies", ""))
    }
    
    profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()
    
    if profile:
        # Update existing profile
        for key, value in profile_fields.items():
            setattr(profile, key, value)
    else:
        # Create new profile
        profile = models.Profile(**profile_fields)
        db.add(profile)
    
    db.commit()
    db.refresh(profile)
    return {"status": "success", "user_id": user.id}

@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(database.get_db)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    import json
    return {
        "email": user.email if user else "",
        "mobile": user.mobile if user else "",
        "education": json.loads(profile.education) if profile.education.startswith("{") else profile.education,
        "skills": profile.skills,
        "experience": json.loads(profile.experience) if profile.experience.startswith("[") else profile.experience,
        "projects": json.loads(profile.projects) if profile.projects.startswith("[") else profile.projects,
        "target_role": profile.target_role,
        "linkedin": profile.linkedin,
        "github": profile.github,
        "achievements": json.loads(profile.achievements) if profile.achievements and profile.achievements.startswith("[") else profile.achievements,
        "hobbies": profile.hobbies
    }



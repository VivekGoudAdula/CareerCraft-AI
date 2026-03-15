from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, database, json

router = APIRouter(tags=["portfolio"])

@router.get("/portfolio/{user_id}")
def get_portfolio_data(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile data not found for this user")

    # Increment portfolio views counter
    try:
        profile.portfolio_views = (profile.portfolio_views or 0) + 1
        db.commit()
    except Exception:
        db.rollback()

    # Helper function to safe load JSON strings
    def safe_json_load(data, default):
        if not data:
            return default
        try:
            return json.loads(data)
        except json.JSONDecodeError:
            return default

    # Parse profile data
    skills = [s.strip() for s in profile.skills.split(",")] if profile.skills else []
    projects = safe_json_load(profile.projects, [])
    experience = safe_json_load(profile.experience, [])
    education = safe_json_load(profile.education, {})
    achievements = safe_json_load(profile.achievements, [])
    hobbies = [h.strip() for h in profile.hobbies.split(",")] if profile.hobbies else []

    # Use the latest resume's summary as "about" if available
    resume = db.query(models.Resume).filter(models.Resume.user_id == user.id).order_by(models.Resume.created_at.desc()).first()
    about = resume.summary if resume else f"Passionate {profile.target_role} with expertise in {', '.join(skills[:3])}."

    return {
        "user_id": user.id,
        "name": user.name,
        "role": profile.target_role or "Software Developer",
        "about": about,
        "skills": skills,
        "projects": projects,
        "experience": experience,
        "education": education,
        "achievements": achievements,
        "hobbies": hobbies,
        "contact": {
            "email": user.email,
            "mobile": user.mobile,
            "linkedin": profile.linkedin,
            "github": profile.github
        }
    }


@router.get("/stats/{user_id}")
def get_user_stats(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()

    # Count real resumes generated
    resume_count = db.query(models.Resume).filter(models.Resume.user_id == user_id).count()

    # Real portfolio views
    portfolio_views = (profile.portfolio_views or 0) if profile else 0

    # Calculate profile strength based on filled fields
    strength = 0
    if profile:
        checks = [
            profile.target_role,
            profile.skills,
            profile.experience,
            profile.projects,
            profile.education,
            profile.linkedin,
            profile.github,
            profile.achievements,
            profile.hobbies,
        ]
        filled = sum(1 for c in checks if c and str(c).strip() not in ["", "null", "[]", "{}"])
        strength = round((filled / len(checks)) * 100)

    return {
        "resumes_generated": resume_count,
        "portfolio_views": portfolio_views,
        "profile_strength": strength,
    }

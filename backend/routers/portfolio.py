from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, database, json

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.get("/{user_id}")
def get_portfolio_data(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile data not found for this user")

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

    # Use the first resume's summary as "about" if available, else derive from profile
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

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/profile")
def create_profile(data: dict, db: Session = Depends(database.get_db)):
    import json

    # Extract profile data whether it's nested or flat
    p_data = data.get("profile_data", data)

    # --- Resolve which User this profile belongs to ---
    # Priority 1: use user_id from the top-level payload (the logged-in user's DB id)
    user_id_raw = data.get("user_id") or p_data.get("user_id")
    user = None

    if user_id_raw:
        try:
            user = db.query(models.User).filter(models.User.id == int(user_id_raw)).first()
        except (ValueError, TypeError):
            pass

    # Priority 2: fall back to email lookup
    if not user:
        email = p_data.get("email")
        if not email:
            raise HTTPException(status_code=400, detail="Email or user_id is required")
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            user = models.User(name=p_data.get("name", ""), email=email)
            db.add(user)
            db.commit()
            db.refresh(user)

    # Update user's name/mobile if provided
    if p_data.get("name"):
        user.name = p_data.get("name")
    if p_data.get("mobile"):
        user.mobile = p_data.get("mobile")
    db.commit()

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
        for key, value in profile_fields.items():
            setattr(profile, key, value)
    else:
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
    try:
        education_data = json.loads(profile.education) if profile.education and profile.education.startswith("{") else {}
    except Exception:
        education_data = {}

    return {
        "email": user.email if user else "",
        "mobile": user.mobile if user else "",
        "education": education_data,
        "skills": profile.skills,
        "experience": json.loads(profile.experience) if profile.experience and (profile.experience.startswith("[") or profile.experience.startswith("{")) else profile.experience,
        "projects": json.loads(profile.projects) if profile.projects and (profile.projects.startswith("[") or profile.projects.startswith("{")) else profile.projects,
        "target_role": profile.target_role,
        "linkedin": profile.linkedin,
        "github": profile.github,
        "achievements": json.loads(profile.achievements) if profile.achievements and (profile.achievements.startswith("[") or profile.achievements.startswith("{")) else profile.achievements,
        "hobbies": profile.hobbies
    }



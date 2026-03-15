from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProfileBase(BaseModel):
    education: str
    skills: str
    experience: str
    projects: str
    target_role: str
    linkedin: Optional[str] = None
    github: Optional[str] = None
    achievements: Optional[str] = None
    hobbies: Optional[str] = None

class ProfileCreate(ProfileBase):
    user_id: int

class Profile(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    mobile: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ResumeBase(BaseModel):
    summary: str
    skills: List[str]
    experience: List[dict]
    projects: List[dict]
    education: List[dict]
    ats_score: int

class Resume(ResumeBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ATSResponse(BaseModel):
    ats_score: int
    suggestions: List[str]

class PortfolioResponse(BaseModel):
    about: str
    skills: List[str]
    projects: List[str]

class ResumeGenerateRequest(BaseModel):
    user_id: str

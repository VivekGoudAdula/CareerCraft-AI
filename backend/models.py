from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, nullable=True)
    password = Column(String) # In production, this should be hashed
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False)
    resumes = relationship("Resume", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    education = Column(Text)
    skills = Column(Text)
    experience = Column(Text)
    projects = Column(Text)
    target_role = Column(String)
    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)
    achievements = Column(Text, nullable=True)
    hobbies = Column(Text, nullable=True)
    portfolio_views = Column(Integer, default=0, nullable=False, server_default="0")

    user = relationship("User", back_populates="profile")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    summary = Column(Text)
    skills = Column(Text)
    experience = Column(Text)
    projects = Column(Text)
    education = Column(Text)
    ats_score = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="resumes")


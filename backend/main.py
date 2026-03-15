from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, database, schemas
from routers import profile, resume, portfolio

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="CareerCraft AI API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(profile.router)
app.include_router(resume.router)
app.include_router(portfolio.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CareerCraft AI Backend"}

@app.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    db_user = models.User(
        name=user.name, 
        email=user.email,
        mobile=user.mobile,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Mock token for demo
    has_profile = db_user.profile is not None
    return {
        "token": f"mock_token_for_{db_user.id}", 
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "has_profile": has_profile
        }
    }

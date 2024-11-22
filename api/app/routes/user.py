from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, models, auth
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Hache le mot de passe de l'utilisateur
    hashed_password = auth.hash_password(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Vérifie si l'utilisateur existe
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    # Crée un token contenant l'ID utilisateur
    token = auth.create_access_token(data={"user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

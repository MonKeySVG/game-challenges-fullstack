from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Challenge
from app.schemas import ChallengeCreate, ChallengeOut

router = APIRouter()

# Récupérer les défis pour un jeu spécifique
@router.get("/games/{game_id}/challenges", response_model=list[ChallengeOut])
def get_challenges(game_id: int, db: Session = Depends(get_db)):
    return db.query(Challenge).filter(Challenge.game_id == game_id).all()

# Ajouter un défi pour un jeu spécifique
@router.post("/games/{game_id}/challenges", response_model=ChallengeOut)
def create_challenge(game_id: int, challenge: ChallengeCreate, db: Session = Depends(get_db)):
    new_challenge = Challenge(title=challenge.title, description=challenge.description, game_id=game_id)
    db.add(new_challenge)
    db.commit()
    db.refresh(new_challenge)
    return new_challenge

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Game
from app.schemas import GameCreate, GameOut

router = APIRouter()

# Route pour récupérer la liste des jeux
@router.get("/games", response_model=list[GameOut])
def get_games(db: Session = Depends(get_db)):
    return db.query(Game).all()


# Route pour récupérer les détails d'un jeu spécifique
@router.get("/games/{game_id}", response_model=GameOut)
def get_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game

# Route pour ajouter un nouveau jeu
@router.post("/games", response_model=GameOut)
def add_game(game: GameCreate, db: Session = Depends(get_db)):
    print(f"Received game data: {game}")
    existing_game = db.query(Game).filter(Game.title == game.title).first()
    if existing_game:
        raise HTTPException(status_code=400, detail="Game already exists in the database")

    new_game = Game(title=game.title, description=game.description, background_image=game.background_image)
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Submission, Challenge, User
from app.schemas import SubmissionCreate, SubmissionOut
from app.auth import get_current_user  # Fonction pour récupérer l'utilisateur connecté
from sqlalchemy.orm import joinedload

router = APIRouter()

@router.get("/games/{game_id}/challenges/{challenge_id}/submissions", response_model=list[SubmissionOut])
def get_submissions(
    game_id: int,
    challenge_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Récupère les soumissions avec les utilisateurs associés
    submissions = (
        db.query(Submission)
        .options(joinedload(Submission.user))  # Charge les relations User
        .filter(Submission.challenge_id == challenge_id)
        .all()
    )

    # Construit la liste des réponses avec le champ username
    submissions_out = [
        SubmissionOut(
            id=submission.id,
            title=submission.title,
            description=submission.description,
            video_link=submission.video_link,
            submitted_at=submission.submitted_at,
            user_id=submission.user_id,
            challenge_id=submission.challenge_id,
            username=submission.user.username,  # Ajout du nom d'utilisateur
        )
        for submission in submissions
    ]

    return submissions_out


@router.post("/games/{game_id}/challenges/{challenge_id}/submissions", response_model=SubmissionOut)
def create_submission(
    game_id: int,
    challenge_id: int,
    submission: SubmissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Vérifie si le challenge existe
    if not db.query(Challenge).filter(Challenge.id == challenge_id, Challenge.game_id == game_id).first():
        raise HTTPException(status_code=404, detail="Challenge not found")

    # Crée une nouvelle soumission
    new_submission = Submission(
        title=submission.title,
        description=submission.description,
        video_link=submission.video_link,
        challenge_id=challenge_id,
        user_id=current_user.id,  # Associe l'utilisateur connecté
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)

    # Retourne la soumission avec le champ username
    return SubmissionOut(
        id=new_submission.id,
        title=new_submission.title,
        description=new_submission.description,
        video_link=new_submission.video_link,
        submitted_at=new_submission.submitted_at,
        user_id=new_submission.user_id,
        challenge_id=new_submission.challenge_id,
        username=current_user.username  # Ajout du nom d'utilisateur
    )
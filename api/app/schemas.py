from pydantic import BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True




class GameBase(BaseModel):
    title: str
    description: str
    background_image: str

class GameCreate(GameBase):
    pass

class GameOut(GameBase):
    id: int

    class Config:
        orm_mode = True


class ChallengeBase(BaseModel):
    title: str
    description: str | None = None

class ChallengeCreate(ChallengeBase):
    pass

class ChallengeOut(ChallengeBase):
    id: int
    created_at: datetime  # Utiliser datetime pour permettre la conversion automatique

    class Config:
        orm_mode = True
        json_encoders = {
            datetime: lambda v: v.isoformat()  # Convertir automatiquement datetime en ISO8601
        }


class SubmissionBase(BaseModel):
    title: str
    description: str | None
    video_link: str

class SubmissionCreate(SubmissionBase):
    pass


class SubmissionOut(BaseModel):
    id: int
    title: str
    description: str | None
    video_link: str
    submitted_at: datetime
    user_id: int
    challenge_id: int
    username: str

    class Config:
        from_attributes = True
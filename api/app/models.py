from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)

    submissions: Mapped[list["Submission"]] = relationship("Submission", back_populates="user")


class Game(Base):
    __tablename__ = "games"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    background_image = Column(String, nullable=False)

    challenges: Mapped[list["Challenge"]] = relationship("Challenge", back_populates="game")


class Challenge(Base):
    __tablename__ = "challenges"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    game_id: Mapped[int] = mapped_column(ForeignKey("games.id"), nullable=False)

    game: Mapped["Game"] = relationship("Game", back_populates="challenges")
    submissions: Mapped[list["Submission"]] = relationship("Submission", back_populates="challenge")


class Submission(Base):
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(String)
    video_link: Mapped[str] = mapped_column(String, nullable=False)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    challenge_id: Mapped[int] = mapped_column(ForeignKey("challenges.id"))

    user: Mapped["User"] = relationship("User", back_populates="submissions")
    challenge: Mapped["Challenge"] = relationship("Challenge", back_populates="submissions")

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import traceback
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import user, game, challenge, submissions

# Init App
app = FastAPI()

# Configurez les origines autorisées
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    traceback.print_exc()  # Affiche les logs dans la console
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"}
    )

# Init Database
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(user.router)
app.include_router(game.router)
app.include_router(challenge.router)
app.include_router(submissions.router)

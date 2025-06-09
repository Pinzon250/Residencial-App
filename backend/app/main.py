from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import Base, engine
from app.routes.auth import users, auth
from app.routes.admin import residentes
from dotenv import load_dotenv
import os

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL")


# Funcion para crear las tablas desde los modelos
def create_tables():
    Base.metadata.create_all(bind=engine)
create_tables()

# Se inicializa FastAPI
app = FastAPI()

# Comunicacion entre el backend y frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", (BACKEND_URL)],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(residentes.router)
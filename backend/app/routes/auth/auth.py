from fastapi import APIRouter, Depends, HTTPException
from passlib.context import CryptContext
from jose import jwt 
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Interaccion con la base de datos
from app.database.db import get_db
from sqlalchemy.orm import Session

# Modelos y schemas para cambiar la contraseña
from app.models.users import Usuario
from app.schemas.users import CambioContraseña

import os

# Cargar variables de entorno
load_dotenv()

router = APIRouter(prefix="/auth", tags=["Autenticacion"] )

# Encriptacion de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuracion
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 10


def verificar_contraseña(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_contraseña(password: str) -> str:
    return pwd_context.hash(password)

def crear_token_acceso(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/change_password")
def change_password(payload: CambioContraseña, db: Session = Depends(get_db)):
    
    # Filtros para identificar el usuario
    usuario = db.query(Usuario).filter(Usuario.id == payload.id).first()

    # Excepciones
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if not verificar_contraseña(payload.current_password, usuario.password_hash):
        raise HTTPException(status_code=401, detail="Contreña actual incorrecta")
    
    usuario.password_hash = hash_contraseña(payload.new_password)
    usuario.must_change_password  = False
    db.commit()

    return {"msg": "Contraseña cambiada correctamente"}
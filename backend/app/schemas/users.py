from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

#Esquema del usuario
class UserCreate(BaseModel):
    usuario: str
    nombres: str
    apellidos: str
    correo: EmailStr
    documento: str
    telefono: str
    torre: str
    apartamento: str
    cargo: str  # "Residente" , "Administrador"
    password: str
    creado_por: Optional[str]


# Esquema para retornar informacion del usuario
class UserOut(BaseModel):
    id: int
    usuario: str
    nombres: str
    apellidos: str
    correo: EmailStr
    documento: str
    telefono: Optional[str]
    torre: str
    apartamento: str
    cargo: str
    estado: bool
    fecha_creacion: datetime = datetime.now()

    model_config = {
        "from_attributes" : True
    }   

# Esquema para inicio de sesion
class UserLogin(BaseModel):
    usuario: str
    password: str

#Esquema para cambio de contraseña
class CambioContraseña(BaseModel):
    id: int
    current_password: str
    new_password: str

# Esquema para actualizar datos de los "Residentes"
class ActualizarUsuario(BaseModel):
    nombres: Optional[str]
    apellidos: Optional[str]
    correo: Optional[EmailStr]
    telefono: Optional[str]
    torre: Optional[str]
    apartamento: Optional[str]
    cargo: Optional[str]
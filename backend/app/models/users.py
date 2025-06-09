from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from app.database.db import Base

class Usuario(Base):
    __tablename__ = "Usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, index=True, unique=True)

    # Datos personales
    nombres = Column(String, nullable=False)
    apellidos = Column(String, nullable=False)
    correo = Column(String, unique=True, nullable=False)
    telefono = Column(String, unique=True, nullable=False)
    documento = Column(String, unique=True, nullable=False)

    # Informacion de residencia
    torre = Column(String, unique=True, nullable=False)
    apartamento = Column(String, unique=True, nullable=False)

    # Tipo de usuario (Administrador o residente)
    cargo = Column(String, default="residente")

    # Contraseña inicial dada por el administrador y el cambio de contraseña por el usuario
    password_hash = Column(String, nullable=False)
    must_change_password = Column(Boolean, default=True)

    # Estado del usuario (Conectado o desconectado)
    estado = Column(Boolean, nullable=False, default=True)

    # Autenticacion
    intentos_fallidos = Column(Integer, default=0)
    ultimo_login = Column(DateTime)
    
    # Informacion de creacion de usuario
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    creado_por = Column(String)
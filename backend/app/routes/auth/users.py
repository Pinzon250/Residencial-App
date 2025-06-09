
# Dependencias
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime

# Importacion de schemas y modelos 
from app.schemas.users import UserLogin, UserCreate, UserOut
from app.models.users import Usuario
from app.database.db import get_db
from app.routes.auth.auth import verificar_contraseña, crear_token_acceso, hash_contraseña

# Inicializacion de FastAPI
router = APIRouter( prefix="/user", tags=["Usuarios"])

MAX_INTENTOS= 5

@router.post("/login")
def login(datos: UserLogin, db: Session = Depends(get_db)):
    # Entrar por usuario
    usuario = db.query(Usuario).filter(Usuario.usuario == datos.usuario).first()

    # Excepciones
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    if not usuario.estado:
        raise HTTPException(status_code=403, detail="Cuenta suspendida")
    
    if usuario.intentos_fallidos >= MAX_INTENTOS:
        raise HTTPException(status_code=403, detail="Cuenta bloqueada por intentos fallidos")
    
    if not verificar_contraseña(datos.password, usuario.password_hash):
        usuario.intentos_fallidos += 1
        db.commit()
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    
    # Reestablecer intentos y actualizar el login cuando logre iniciar sesion
    usuario.intentos_fallidos = 0
    usuario.ultimo_login = datetime.utcnow()
    db.commit

    # Generar token de acceso
    token = crear_token_acceso({"sub": usuario.nombres})

    return {
        "access_token": token,
        "id": usuario.id,
        "token_type": "bearer",
        "must_change_password": usuario.must_change_password,
        "cargo": usuario.cargo
    }


@router.post("/register", response_model= UserOut)
def crear_usuario(usuario: UserCreate, db: Session = Depends(get_db)):

    # Filtro para no repetir 
    existente = db.query(Usuario).filter(Usuario.usuario == usuario.usuario).first()
    
    # Verificar si ya existe el usuario
    if existente:
        raise HTTPException(status_code=400, detail="Usuario ya existente")
    
    # Datos para registrarse
    nuevo_usuario = Usuario(
        usuario = usuario.usuario,
        nombres = usuario.nombres,
        apellidos = usuario.apellidos,
        correo = usuario.correo,
        telefono = usuario.telefono,
        documento = usuario.documento,
        torre = usuario.torre,
        apartamento = usuario.apartamento,
        cargo = usuario.cargo,
        password_hash= hash_contraseña(usuario.password),
        must_change_password=True,
        creado_por = usuario.creado_por,
        estado=True,
        fecha_creacion = datetime.utcnow()
    )
    
    # Añadir usuarios a la base de datos
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario




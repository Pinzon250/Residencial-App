# FastAPI
from fastapi import APIRouter, HTTPException, Depends

# Interaccion bases de datos, modelos y schemas
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.users import Usuario
from app.schemas.users import UserOut, ActualizarUsuario
from typing import List

# Autenticacion
from app.routes.auth.auth import hash_contraseña

# -------------------------- importaciones -------------------------

# Inicializacion de FastAPI
router = APIRouter(prefix="/admin", tags=["Residentes"])


# -------------------------- Endpoints -----------------------------

# Endpoint para devolver todos los residentes
@router.get("/all", response_model=List[UserOut])
def obtener_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return usuarios


# Endpoint para devolver un usuario
@router.get("/{id}", response_model=UserOut)
def obtener_usuario(id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    # Excepciones por si no encuentra al usuario
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return usuario


# Endpoint para actualizar datos del usuario
@router.put("/{id}")
def actualizar_usuario(id: int, datos: ActualizarUsuario, db: Session = Depends(get_db)):
    # Buscar usuario por id
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    # Excepciones si no se encuentra el usuario
    if not usuario:
        raise HTTPException(status_code=404, detail="No se encontro el usuario")

    for campo, valor in datos.dict(exclude_unset=True).items():
        setattr(usuario, campo, valor)

    # Actualizar base de datos 
    db.commit()
    db.refresh(usuario)
    
    # Mostrar mensaje si se actualizo correctamente
    return {"msg": "Usuario actualizado con exito"}


# Endpoint para Activar/Desactivar usuario 
@router.post("/{id}/toggle_state")
def cambiar_estado_usuario(id: int, db: Session = Depends(get_db)):
    # Filtrar por id
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    # Excepciones si no se encuentra
    if not usuario:
        raise HTTPException(status_code=404, detail="No se encontro el usuario")
    
    # Cambiar estado de usuario
    usuario.estado = not usuario.estado

    # Actualizar en la base de datos
    db.commit()
    
    # Mostrar mensaje de estado del usuario
    return{"msg": f"Estado cambiado a {'Activo' if usuario.estado else 'Inactivo'}"}


# Endpoint para eliminar el usuario
@router.delete("/{id}")
def eliminar_usuario(id: int, db: Session = Depends(get_db)):
    # Filtrar por usuario
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    # Excepciones si no se encuentra
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Eliminar el usuario y actualizar en la base de datos
    db.delete(usuario)
    db.commit()

    # Mostrar mensaje de eliminado 
    return {"msg": "Usuario eliminado correctamente"}


# Endpoint para restablecer contraseñas
@router.post("/{id}/reset_password")
def resetear_contraseña(id: int, db: Session = Depends(get_db)):
    # Filtrar por id
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    
    # Excepcion si no lo encuentra
    if not usuario:
        raise HTTPException(status_code=404, detail="No se encontro el usuario")
    
    # Asignar contraseña temporal
    nueva_temporal = "Residencial123"
    
    # Encriptar contraseña y que el usuario tenga que cambiarla
    usuario.password_hash = hash_contraseña(nueva_temporal)
    usuario.must_change_password = True

    # Actualizar base de datos
    db.commit()

    # Mensaje de reestablecimiento exitoso
    return {"msg": "Contraseña reseteada correctamente", "contraseña_temporal": nueva_temporal}
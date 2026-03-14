from sqlalchemy.orm import Session
from app.models.equipo_db import EquipoDB
from app.models.equipo import Equipo

def procesar_registro(db: Session, equipo_data: Equipo):
    nuevo_equipo = EquipoDB(
        nombre_equipo=equipo_data.nombre_equipo, 
        correo=equipo_data.correo,
        especialidad=equipo_data.especialidad
    )
    db.add(nuevo_equipo)
    db.commit()
    db.refresh(nuevo_equipo)
    return {"message": "Registro exitoso", "id": nuevo_equipo.id}
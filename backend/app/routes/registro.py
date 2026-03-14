from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db_config import get_db
from app.controllers.registro_controller import procesar_registro
from app.models.equipo import Equipo       
from app.models.equipo_db import EquipoDB  

router = APIRouter()
@router.post("/registrar")
async def registrar(equipo: Equipo, db: Session = Depends(get_db)):
    try:
        return procesar_registro(db, equipo)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/lista")
def obtener_equipos(db: Session = Depends(get_db)):
    try:
        equipos = db.query(EquipoDB).all()
        return equipos
    except Exception as e:
        print(f"Error al obtener lista: {e}")
    raise HTTPException(status_code=500, detail="Error interno al consultar la base de datos")
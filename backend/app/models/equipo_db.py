from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.db_config import Base

class EquipoDB(Base):
    __tablename__ = "equipos"

    id = Column(Integer, primary_key=True, index=True)
    nombre_equipo = Column(String(100), nullable=False)
    correo = Column(String(100), nullable=False)
    especialidad = Column(String(50), nullable=False)
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())
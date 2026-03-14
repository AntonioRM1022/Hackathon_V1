from pydantic import BaseModel, EmailStr
class Equipo(BaseModel):
    nombre_equipo: str
    correo: EmailStr
    especialidad: str

    class Config:
        from_attributes = True
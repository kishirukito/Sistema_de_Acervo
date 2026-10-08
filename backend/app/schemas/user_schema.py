from pydantic import BaseModel, EmailStr
from typing import Optional, Literal
from uuid import UUID
from datetime import datetime

UserRole = Literal["admin", "personal", "alumno"]
UserStatus = Literal["activo", "suspendido", "inactivo"]

class UserBase(BaseModel):
    email: EmailStr
    nombre_completo: str
    matricula_o_nomina: str
    rol: UserRole = "alumno"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    nombre_completo: Optional[str] = None
    email: Optional[EmailStr] = None
    rol: Optional[UserRole] = None
    estado: Optional[UserStatus] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: UUID
    estado: UserStatus
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

from pydantic import BaseModel
from typing import Optional, Literal
from uuid import UUID
from datetime import datetime

LoanStatus = Literal["activo", "devuelto", "vencido", "renovado"]

class LoanCreate(BaseModel):
    usuario_id: UUID
    ejemplar_id: UUID
    dias_prestamo: int = 7
    notas: Optional[str] = None

class LoanReturn(BaseModel):
    notas: Optional[str] = None

class LoanResponse(BaseModel):
    id: UUID
    usuario_id: UUID
    ejemplar_id: UUID
    fecha_prestamo: datetime
    fecha_limite_devolucion: datetime
    fecha_devolucion_real: Optional[datetime] = None
    estado: LoanStatus
    notas: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

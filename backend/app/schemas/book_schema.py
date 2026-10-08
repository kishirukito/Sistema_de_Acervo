from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from uuid import UUID
from datetime import datetime

EjemplarStatus = Literal["disponible", "prestado", "mantenimiento", "extraviado"]

class EjemplarBase(BaseModel):
    codigo_inventario: str
    ubicacion_estante: str
    estado: EjemplarStatus = "disponible"
    observaciones: Optional[str] = None

class EjemplarCreate(EjemplarBase):
    pass

class EjemplarResponse(EjemplarBase):
    id: UUID
    libro_id: UUID
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class BookBase(BaseModel):
    isbn: str = Field(..., max_length=20)
    titulo: str = Field(..., max_length=255)
    autor: str = Field(..., max_length=200)
    editorial: Optional[str] = None
    anio_publicacion: Optional[int] = None
    edicion: Optional[str] = None
    portada_url: Optional[str] = None

class BookCreate(BookBase):
    tema_ids: Optional[List[int]] = []

class BookUpdate(BaseModel):
    isbn: Optional[str] = None
    titulo: Optional[str] = None
    autor: Optional[str] = None
    editorial: Optional[str] = None
    anio_publicacion: Optional[int] = None
    edicion: Optional[str] = None
    portada_url: Optional[str] = None

class BookResponse(BookBase):
    id: UUID
    created_at: Optional[datetime] = None
    ejemplares: Optional[List[EjemplarResponse]] = []

    class Config:
        from_attributes = True

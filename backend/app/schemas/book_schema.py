from pydantic import BaseModel, Field, model_validator
from typing import Optional, Any, Dict

class BookCreateSchema(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=255, description="Título del libro (máx 255 caracteres)")
    autor: str = Field(..., min_length=1, max_length=150, description="Autor del libro (máx 150 caracteres)")
    isbn: str = Field(..., min_length=1, max_length=20, description="Código ISBN único (máx 20 caracteres)")
    editorial: Optional[str] = Field(default=None, max_length=150, description="Editorial")
    anio_publicacion: Optional[int] = Field(default=2026, ge=1000, le=2100, description="Año de publicación")
    edicion: Optional[str] = Field(default="1ra Edición", max_length=50)
    categoria: Optional[str] = Field(default="000", max_length=50)
    ejemplares_iniciales: Optional[int] = Field(default=1, ge=1, le=50)
    total_copias: Optional[int] = Field(default=None, ge=1, le=50)
    ubicacion_estante: Optional[str] = Field(default=None, max_length=100)
    ubicacion: Optional[str] = Field(default=None, max_length=100)
    portada_url: Optional[str] = Field(default=None, max_length=1000)
    descripcion: Optional[str] = Field(default="", max_length=2000)

    @model_validator(mode="before")
    @classmethod
    def normalize_aliases(cls, data: Any) -> Any:
        if not isinstance(data, dict):
            return data
        normalized = dict(data)
        if "title" in normalized and "titulo" not in normalized:
            normalized["titulo"] = normalized["title"]
        if "author" in normalized and "autor" not in normalized:
            normalized["autor"] = normalized["author"]
        if "publisher" in normalized and "editorial" not in normalized:
            normalized["editorial"] = normalized["publisher"]
        if "publishYear" in normalized and "anio_publicacion" not in normalized:
            normalized["anio_publicacion"] = normalized["publishYear"]
        if "publicationYear" in normalized and "anio_publicacion" not in normalized:
            normalized["anio_publicacion"] = normalized["publicationYear"]
        if "totalCopies" in normalized and "total_copias" not in normalized:
            normalized["total_copias"] = normalized["totalCopies"]
        if "location" in normalized:
            if "ubicacion_estante" not in normalized:
                normalized["ubicacion_estante"] = normalized["location"]
            if "ubicacion" not in normalized:
                normalized["ubicacion"] = normalized["location"]
        if "coverUrl" in normalized and "portada_url" not in normalized:
            normalized["portada_url"] = normalized["coverUrl"]
        if "description" in normalized and "descripcion" not in normalized:
            normalized["descripcion"] = normalized["description"]
        if "category" in normalized and "categoria" not in normalized:
            normalized["categoria"] = normalized["category"]
        return normalized

class BookUpdateSchema(BaseModel):
    titulo: Optional[str] = Field(default=None, min_length=1, max_length=255)
    autor: Optional[str] = Field(default=None, min_length=1, max_length=150)
    isbn: Optional[str] = Field(default=None, min_length=1, max_length=20)
    editorial: Optional[str] = Field(default=None, max_length=150)
    anio_publicacion: Optional[int] = Field(default=None, ge=1000, le=2100)
    edicion: Optional[str] = Field(default=None, max_length=50)
    categoria: Optional[str] = Field(default=None, max_length=50)
    total_copias: Optional[int] = Field(default=None, ge=0, le=50)
    cantidad_ejemplares: Optional[int] = Field(default=None, ge=0, le=50)
    ubicacion_estante: Optional[str] = Field(default=None, max_length=100)
    ubicacion: Optional[str] = Field(default=None, max_length=100)
    portada_url: Optional[str] = Field(default=None, max_length=1000)
    descripcion: Optional[str] = Field(default=None, max_length=2000)

    @model_validator(mode="before")
    @classmethod
    def normalize_aliases(cls, data: Any) -> Any:
        if not isinstance(data, dict):
            return data
        normalized = dict(data)
        if "title" in normalized and "titulo" not in normalized:
            normalized["titulo"] = normalized["title"]
        if "author" in normalized and "autor" not in normalized:
            normalized["autor"] = normalized["author"]
        if "publisher" in normalized and "editorial" not in normalized:
            normalized["editorial"] = normalized["publisher"]
        if "publishYear" in normalized and "anio_publicacion" not in normalized:
            normalized["anio_publicacion"] = normalized["publishYear"]
        if "publicationYear" in normalized and "anio_publicacion" not in normalized:
            normalized["anio_publicacion"] = normalized["publicationYear"]
        if "totalCopies" in normalized:
            normalized["total_copias"] = normalized["totalCopies"]
            normalized["cantidad_ejemplares"] = normalized["totalCopies"]
        if "ejemplares" in normalized:
            normalized["total_copias"] = normalized["ejemplares"]
            normalized["cantidad_ejemplares"] = normalized["ejemplares"]
        if "coverUrl" in normalized and "portada_url" not in normalized:
            normalized["portada_url"] = normalized["coverUrl"]
        if "description" in normalized and "descripcion" not in normalized:
            normalized["descripcion"] = normalized["description"]
        if "category" in normalized and "categoria" not in normalized:
            normalized["categoria"] = normalized["category"]
        return normalized


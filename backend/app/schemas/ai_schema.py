from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class AISummaryRequest(BaseModel):
    titulo: str = Field(..., description="Título del libro a resumir")
    autor: str = Field(..., description="Autor del libro")
    sinopsis_o_tema: Optional[str] = Field(default="", description="Tema o sinopsis previa")

class AISummaryResponse(BaseModel):
    resumen: str
    palabras_clave: str
    modelo_usado: str
    status: str

class AISearchRequest(BaseModel):
    query: str = Field(..., description="Pregunta, tema o concepto a buscar")
    top_k: Optional[int] = Field(default=5, description="Número máximo de sugerencias")

class AISearchSuggestion(BaseModel):
    id: Optional[str] = None
    titulo: str
    autor: str
    justificacion: Optional[str] = None
    similitud: Optional[float] = None

class AISearchResponse(BaseModel):
    query: str
    sugerencias: List[Dict[str, Any]]
    total: int

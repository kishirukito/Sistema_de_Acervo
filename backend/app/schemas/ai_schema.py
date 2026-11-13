from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class AISummaryRequest(BaseModel):
    titulo: str = Field(..., description="Título del libro a resumir")
    autor: str = Field(..., description="Autor del libro")
    sinopsis_o_tema: Optional[str] = Field(default="", description="Tema o sinopsis previa")
    libro_id: Optional[str] = Field(default=None, description="UUID del libro en base de datos para guardar automáticamente")

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

class AIEmbeddingRequest(BaseModel):
    texto: str = Field(..., description="Texto para generar vector de embedding")

class AIEmbeddingResponse(BaseModel):
    texto: str
    embedding: List[float]
    dimension: int
    modelo: str

class SmartSearchRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Consulta en lenguaje natural del usuario")
    top_k: Optional[int] = Field(default=5, ge=1, le=10, description="Máximo de libros devueltos")

class SmartSearchResultItem(BaseModel):
    id: str
    titulo: str
    autores: List[str] = Field(default_factory=list)
    isbn: Optional[str] = None
    ubicacion: Optional[str] = None
    temas: List[str] = Field(default_factory=list)
    sinopsis: Optional[str] = None
    ejemplares_disponibles: int = 0
    total_ejemplares: int = 0
    porcentaje_coincidencia: float = 0.0
    match_level: str = "high"
    explicacion: str

class SmartSearchResponse(BaseModel):
    query: str
    total_encontrados: int
    mensaje: str
    resultados: List[SmartSearchResultItem]


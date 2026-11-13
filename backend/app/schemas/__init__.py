"""
Pydantic Schemas (DTOs)
"""
from app.schemas.book_schema import BookCreateSchema, BookUpdateSchema
from app.schemas.ai_schema import (
    AISummaryRequest,
    AISummaryResponse,
    AISearchRequest,
    AISearchResponse,
    AIEmbeddingRequest,
    AIEmbeddingResponse,
)

__all__ = [
    "BookCreateSchema",
    "BookUpdateSchema",
    "AISummaryRequest",
    "AISummaryResponse",
    "AISearchRequest",
    "AISearchResponse",
    "AIEmbeddingRequest",
    "AIEmbeddingResponse",
]

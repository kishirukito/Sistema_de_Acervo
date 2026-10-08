from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.ai_schema import AISummaryRequest, AISearchRequest
from app.services.ai_service import AIService
from app.core.deps import get_current_user
from typing import Dict, Any

router = APIRouter(prefix="/ai", tags=["Inteligencia Artificial"])

@router.post("/resumen")
async def generate_summary(
    payload: AISummaryRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Genera un resumen analítico y palabras clave de un libro mediante el modelo LLM.
    """
    try:
        result = await AIService.generate_book_summary(
            titulo=payload.titulo,
            autor=payload.autor,
            sinopsis_o_tema=payload.sinopsis_o_tema or ""
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar resumen con IA: {str(e)}"
        )

@router.post("/sugerencias")
async def search_suggestions(
    payload: AISearchRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Busca tópicos y recomendaciones temáticas de libros usando IA.
    """
    try:
        topicos = await AIService.suggest_topics(payload.query)
        return {
            "query": payload.query,
            "topicos_relacionados": topicos,
            "total": len(topicos)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error en búsqueda con IA: {str(e)}"
        )

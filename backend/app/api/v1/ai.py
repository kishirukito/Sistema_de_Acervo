from fastapi import APIRouter, HTTPException, status, Header
from app.schemas.ai_schema import (
    AISummaryRequest,
    AISearchRequest,
    AIEmbeddingRequest,
    AIEmbeddingResponse
)
from app.services.ai_service import AIService
from app.services.supabase_service import supabase_service
from app.core.config import settings
from typing import Optional

router = APIRouter(prefix="/ai", tags=["Microservicio de IA"])

async def verify_ai_access(x_ai_key: Optional[str] = Header(None)):
    """Verificación opcional de clave de servicio para llamadas seguras desde Next.js."""
    if settings.AI_API_KEY and x_ai_key:
        if x_ai_key != settings.AI_API_KEY:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Clave de servicio IA no válida")
    return True

@router.post("/resumen")
async def generate_summary(payload: AISummaryRequest):
    """
    Genera un resumen analítico y palabras clave de un libro mediante el modelo LLM local.
    Si se proporciona libro_id, lo guarda o actualiza directamente en la base de datos Supabase.
    """
    try:
        result = await AIService.generate_book_summary(
            titulo=payload.titulo,
            autor=payload.autor,
            sinopsis_o_tema=payload.sinopsis_o_tema or ""
        )

        if payload.libro_id:
            try:
                await supabase_service.save_summary(
                    libro_id=payload.libro_id,
                    resumen_texto=result["resumen"],
                    palabras_clave=result.get("palabras_clave", ""),
                    modelo_usado=result.get("modelo", "llama3.2:3b")
                )
                result["guardado_en_db"] = True
            except Exception as db_err:
                print(f"[AI RESUMEN DB ERROR] {db_err}")
                result["guardado_en_db"] = False

        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar resumen con IA: {str(e)}"
        )

@router.post("/sugerencias")
async def search_suggestions(payload: AISearchRequest):
    """
    Sugiere tópicos, conceptos y libros relacionados mediante IA.
    Consumido por el buscador temático de Next.js.
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

@router.post("/embeddings", response_model=AIEmbeddingResponse)
async def generate_embeddings(payload: AIEmbeddingRequest):
    """
    Genera el vector denso de embeddings de un texto (ej. nomic-embed-text)
    para búsqueda vectorial en PostgreSQL (pgvector) desde Next.js.
    """
    try:
        vector = await AIService.get_embeddings(payload.texto)
        return AIEmbeddingResponse(
            texto=payload.texto,
            embedding=vector,
            dimension=len(vector),
            modelo=settings.LOCAL_EMBEDDING_MODEL
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar embeddings: {str(e)}"
        )

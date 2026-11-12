from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.ai_schema import (
    AISummaryRequest,
    AISearchRequest,
    AIEmbeddingRequest,
    AIEmbeddingResponse
)
from app.services.ai_service import AIService
from app.services.supabase_service import supabase_service
from app.core.config import settings
from app.core.security import get_current_user, require_admin
from typing import Dict, Any

router = APIRouter(prefix="/ai", tags=["Microservicio de IA"])

@router.post("/resumen")
async def generate_summary(
    payload: AISummaryRequest,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Genera un resumen analítico y palabras clave de un libro mediante el modelo LLM local.
    Requiere rol de administrador o personal autorizado.
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
                result["guardado_en_db"] = False

        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al procesar el resumen con el modelo de IA."
        )

@router.post("/sugerencias")
async def search_suggestions(
    payload: AISearchRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Sugiere tópicos, conceptos y libros relacionados mediante IA.
    Requiere usuario autenticado (alumno o administrativo).
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
            detail="Error al generar sugerencias temáticas con IA."
        )

@router.post("/embeddings", response_model=AIEmbeddingResponse)
async def generate_embeddings(
    payload: AIEmbeddingRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Genera el vector denso de embeddings de un texto (ej. nomic-embed-text)
    para búsqueda vectorial en PostgreSQL. Requiere usuario autenticado.
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
            detail="Error al generar vectores de incrustación."
        )

@router.delete("/resumen/{libro_id}")
async def delete_summary(
    libro_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Elimina el resumen IA asociado a un libro.
    Requiere rol de administrador.
    """
    clean_id = str(libro_id).strip()
    if not clean_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identificador de libro inválido."
        )
    try:
        res = await supabase_service.delete_summary(clean_id)
        if res.get("status") == "not_found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No se encontró resumen IA para el libro {clean_id}."
            )
        return {"deleted": True, "libro_id": clean_id, "message": "Resumen IA eliminado con éxito."}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al eliminar el resumen IA."
        )

from fastapi import APIRouter, HTTPException, status, Depends, BackgroundTasks
from app.schemas.ai_schema import (
    AISummaryRequest,
    AISearchRequest,
    AIEmbeddingRequest,
    AIEmbeddingResponse,
    SmartSearchRequest,
    SmartSearchResponse
)
from app.services.ai_service import AIService
from app.services.vector_service import VectorService
from app.services.supabase_service import supabase_service
from app.core.config import settings
from app.core.security import get_current_user, require_admin
from typing import Dict, Any
import asyncio

router = APIRouter(prefix="/ai", tags=["Microservicio de IA"])

# ==============================================================================
# Background LLM task: se ejecuta después de responder con el heurístico.
# Persiste el resultado en Supabase para que el polling lo encuentre vía DB.
# ==============================================================================
async def _run_llm_in_background(titulo: str, autor: str, sinopsis: str, libro_id: str) -> None:
    """
    Genera el resumen con Ollama en background y lo persiste en Supabase.
    Si falla (timeout, error), no afecta la experiencia del usuario.
    """
    try:
        result = await AIService.generate_book_summary(
            titulo=titulo,
            autor=autor,
            sinopsis_o_tema=sinopsis
        )
        # Solo guarda si el resultado es del modelo real (no heurístico)
        if result.get("proveedor") != "local_fallback" and libro_id:
            await supabase_service.save_summary(
                libro_id=libro_id,
                resumen_texto=result["resumen"],
                palabras_clave=result.get("palabras_clave", ""),
                modelo_usado=result.get("modelo", settings.LOCAL_AI_MODEL)
            )
            print(f"[AI BG] Resumen IA guardado para libro {libro_id} con modelo {result.get('modelo')}")
        elif resultado := result.get("proveedor"):
            print(f"[AI BG] LLM devolvió proveedor='{resultado}' para libro {libro_id}, no se sobreescribe heurístico.")
    except asyncio.CancelledError:
        pass
    except Exception as e:
        print(f"[AI BG] Error en background LLM para libro {libro_id}: {e}")


@router.post("/resumen")
async def generate_summary(
    payload: AISummaryRequest,
    background_tasks: BackgroundTasks,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Genera un resumen bibliográfico de forma asíncrona en dos fases:

    **Fase 1 (inmediata, <1s):** Devuelve un resumen heurístico de alta calidad
    con `estado: "generando_ia"` y `job_id` = libro_id.

    **Fase 2 (background, ~1-2 min):** El modelo LLM local (Ollama) genera el
    resumen real. Cuando termina, lo persiste en Supabase automáticamente.

    El frontend puede hacer polling a `GET /ai/resumen/status/{libro_id}` cada
    5–10 segundos para saber si el resumen IA ya está disponible.
    """
    # Fase 1: Generar heurístico inmediatamente (siempre funciona, <1s)
    heuristic = AIService.generate_heuristic_summary(
        titulo=payload.titulo,
        autor=payload.autor,
        sinopsis_o_tema=payload.sinopsis_o_tema or ""
    )

    # Si ya existe resumen en DB, devolverlo directamente sin relanzar LLM
    if payload.libro_id:
        try:
            existing = await supabase_service.get_summary(payload.libro_id)
            if existing and existing.get("resumen_ia"):
                return {
                    "resumen": existing["resumen_ia"],
                    "palabras_clave": existing.get("palabras_clave_ia", ""),
                    "modelo": existing.get("modelo_ia", "llm-local"),
                    "proveedor": "local",
                    "guardado_en_db": True,
                    "estado": "completado",
                    "job_id": payload.libro_id,
                }
        except Exception:
            pass  # Si falla la consulta, continuar con heurístico + background

    # Guardar heurístico en DB como punto de partida
    if payload.libro_id:
        try:
            await supabase_service.save_summary(
                libro_id=payload.libro_id,
                resumen_texto=heuristic["resumen"],
                palabras_clave=heuristic.get("palabras_clave", ""),
                modelo_usado="heuristico-local"
            )
        except Exception:
            pass

    # Fase 2: Encolar tarea LLM en background (no bloquea la respuesta HTTP)
    if payload.libro_id:
        background_tasks.add_task(
            _run_llm_in_background,
            payload.titulo,
            payload.autor,
            payload.sinopsis_o_tema or "",
            payload.libro_id
        )

    return {
        **heuristic,
        "guardado_en_db": bool(payload.libro_id),
        "estado": "generando_ia",
        "job_id": payload.libro_id or None,
    }


@router.get("/resumen/status/{libro_id}")
async def get_resumen_status(
    libro_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Consulta el estado del resumen IA para un libro.
    Usado por el frontend para hacer polling tras llamar a POST /resumen.

    - `estado: "completado"` → el modelo LLM ya generó el resumen real.
    - `estado: "procesando"` → todavía en background (el heurístico sigue vigente).
    """
    clean_id = str(libro_id).strip()
    if not clean_id:
        raise HTTPException(status_code=400, detail="libro_id inválido.")
    try:
        row = await supabase_service.get_summary(clean_id)
        if not row:
            raise HTTPException(status_code=404, detail="No se encontró resumen para este libro.")

        modelo = row.get("modelo_ia", "")
        # Si el modelo guardado es el heurístico, aún está procesando
        if modelo in ("heuristico-local", "heuristico-local-fallback", ""):
            return {
                "estado": "procesando",
                "libro_id": clean_id,
                "resumen": row.get("resumen_ia", ""),
                "modelo": modelo,
            }

        return {
            "estado": "completado",
            "libro_id": clean_id,
            "resumen": row.get("resumen_ia", ""),
            "palabras_clave": row.get("palabras_clave_ia", ""),
            "modelo": modelo,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error consultando estado: {str(e)}")

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

@router.post("/indexar-acervo")
async def indexar_acervo(
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Indexa en lote todos los libros existentes en Supabase con nomic-embed-text
    y sincroniza el almacén vectorial persistente. Requiere rol de administrador.
    """
    try:
        resultado = await VectorService.index_all_books()
        return resultado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error durante la indexación del acervo: {str(e)}"
        )

@router.post("/busqueda-inteligente", response_model=SmartSearchResponse)
async def busqueda_inteligente(
    payload: SmartSearchRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Búsqueda Semántica Inteligente con estrategia dual:
    1. Intenta primero con pgvector en Supabase (índice HNSW, más rápido y escalable).
    2. Si pgvector falla o no está configurado, cae automáticamente a búsqueda
       híbrida en memoria (70% vectorial + 30% léxica con umbral dinámico).
    El frontend no necesita saber qué motor se usó — el fallback es transparente.
    """
    try:
        top_k = payload.top_k or 5

        # Estrategia 1: pgvector (primaria)
        try:
            res = await VectorService.smart_search_pgvector(query=payload.query, top_k=top_k)
            if res.get("total_encontrados", 0) > 0:
                return res
        except Exception as pgv_err:
            print(f"[AI Router] pgvector no disponible, usando búsqueda híbrida en memoria: {pgv_err}")

        # Estrategia 2: Búsqueda híbrida en memoria (fallback)
        res = await VectorService.smart_search(query=payload.query, top_k=top_k)
        return res
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar la búsqueda inteligente: {str(e)}"
        )


@router.post("/busqueda-pgvector", response_model=SmartSearchResponse)
async def busqueda_pgvector(
    payload: SmartSearchRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Búsqueda Semántica usando pgvector en Supabase con índice HNSW.
    Requiere haber ejecutado el SQL de CREATE EXTENSION vector y la función RPC.
    Si pgvector no está disponible, cae automáticamente al método en memoria.
    """
    try:
        top_k = payload.top_k or 5
        res = await VectorService.smart_search_pgvector(query=payload.query, top_k=top_k)
        return res
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar la búsqueda pgvector: {str(e)}"
        )


@router.post("/migrar-embeddings")
async def migrar_embeddings_pgvector(
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Migra los embeddings del archivo JSON local (acervo_embeddings.json) a la columna
    'embedding' de la tabla 'libros' en Supabase con pgvector.
    Prerequisito: haber ejecutado el SQL de CREATE EXTENSION vector y ALTER TABLE en Supabase.
    Requiere rol de administrador.
    """
    try:
        resultado = await VectorService.migrate_embeddings_to_pgvector()
        return resultado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error durante la migración de embeddings a pgvector: {str(e)}"
        )

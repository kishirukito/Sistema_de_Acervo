"""
Endpoints de gestión de categorías/temas del acervo bibliográfico.

Rutas bajo el prefijo /data (montado en api_router):
  GET    /api/v1/data/temas              — Listar temas (cualquier usuario autenticado)
  POST   /api/v1/data/temas              — Crear tema (solo admin)
  PATCH  /api/v1/data/temas/{tema_id}    — Editar tema (solo admin)
  PATCH  /api/v1/data/temas/{tema_id}/toggle — Activar/desactivar (solo admin)
  DELETE /api/v1/data/temas/{tema_id}    — Eliminar tema (solo admin)

Autenticación: se reutiliza get_current_user y require_admin de security.py.
"""

from fastapi import APIRouter, HTTPException, Depends, status
from typing import Dict, Any, List, Optional

from app.services.supabase_service import supabase_service
from app.core.security import get_current_user, require_admin

router = APIRouter(prefix="/data", tags=["Temas (Categorías)"])


# ---------------------------------------------------------------------------
# GET /data/temas
# ---------------------------------------------------------------------------
@router.get("/temas", response_model=List[Dict[str, Any]])
async def list_temas(
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Obtiene todos los temas del acervo con el conteo de libros asociados.
    Requiere usuario autenticado (admin, lector, alumno, etc.).
    Los campos `activa` y `codigo` se devuelven solo si ya existen en la BD
    (tras aplicar la migración pendiente).
    """
    try:
        return await supabase_service.get_temas()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al consultar el catálogo de temas: {str(e)}"
        )


# ---------------------------------------------------------------------------
# POST /data/temas
# ---------------------------------------------------------------------------
@router.post("/temas", status_code=status.HTTP_201_CREATED)
async def create_tema(
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Crea un nuevo tema.
    Requiere rol administrativo.
    Campos:
      - nombre   (str, requerido, máx. 100 chars, único)
      - descripcion (str, opcional)
      - codigo   (str, opcional, máx. 20 chars, único — disponible post-migración)
    """
    try:
        result = await supabase_service.create_tema(payload)
        return {"created": True, "data": result}
    except ValueError as ve:
        err = str(ve)
        # Distinguir duplicado (409) de validación de formato (400)
        if "ya existe" in err.lower() or "duplicado" in err.lower():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=err)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear el tema: {str(e)}"
        )


# ---------------------------------------------------------------------------
# PATCH /data/temas/{tema_id}
# ---------------------------------------------------------------------------
@router.patch("/temas/{tema_id}")
async def update_tema(
    tema_id: int,
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Actualiza nombre, descripcion y/o codigo de un tema.
    El ID permanece estable. Requiere rol administrativo.
    """
    if not isinstance(tema_id, int) or tema_id <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de tema inválido."
        )

    # Bloquear intentos de modificar el ID
    payload.pop("id", None)

    try:
        result = await supabase_service.update_tema(tema_id, payload)
    except ValueError as ve:
        err = str(ve)
        if "ya existe" in err.lower():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=err)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el tema: {str(e)}"
        )

    if result.get("status") == "not_found":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontró el tema con ID {tema_id}."
        )

    return {"updated": True, "id": tema_id, "data": result.get("data")}


# ---------------------------------------------------------------------------
# PATCH /data/temas/{tema_id}/toggle
# ---------------------------------------------------------------------------
@router.patch("/temas/{tema_id}/toggle")
async def toggle_tema(
    tema_id: int,
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Activa o desactiva un tema según el campo `activa` (bool) del payload.
    Requiere que la migración que añade la columna `activa` haya sido aplicada.
    Requiere rol administrativo.
    """
    if "activa" not in payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Se requiere el campo 'activa' (boolean) en el cuerpo de la solicitud."
        )

    activa = payload["activa"]
    if not isinstance(activa, bool):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El campo 'activa' debe ser un valor booleano (true/false)."
        )

    try:
        result = await supabase_service.toggle_tema(tema_id, activa)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el estado del tema: {str(e)}"
        )

    if result.get("status") == "not_found":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontró el tema con ID {tema_id}."
        )
    if result.get("status") == "error":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=result.get("detail", "No se pudo cambiar el estado del tema.")
        )

    return {
        "updated": True,
        "id": tema_id,
        "activa": activa,
        "data": result.get("data")
    }


# ---------------------------------------------------------------------------
# DELETE /data/temas/{tema_id}
# ---------------------------------------------------------------------------
@router.delete("/temas/{tema_id}")
async def delete_tema(
    tema_id: int,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Elimina un tema del catálogo.
    Requiere rol administrativo.
    - 404 si el tema no existe.
    - 409 si el tema tiene libros asociados en libro_temas.
    - 200 si se eliminó correctamente.
    """
    try:
        result = await supabase_service.delete_tema(tema_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno al eliminar el tema: {str(e)}"
        )

    if result.get("status") == "not_found":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontró el tema con ID {tema_id}."
        )
    if result.get("status") == "has_books":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=result.get("message", "El tema tiene libros asociados y no puede eliminarse.")
        )

    return {
        "deleted": True,
        "id": tema_id,
        "nombre": result.get("nombre"),
        "message": f"El tema '{result.get('nombre')}' fue eliminado correctamente del acervo."
    }

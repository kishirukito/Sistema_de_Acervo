from fastapi import APIRouter, HTTPException, Depends, status
from app.services.supabase_service import supabase_service
from app.core.security import get_current_user, require_admin
from typing import List, Dict, Any

router = APIRouter(prefix="/data", tags=["Datos Seguros de Supabase"])

@router.get("/usuarios", response_model=List[Dict[str, Any]])
async def get_all_usuarios(admin: Dict[str, Any] = Depends(require_admin)):
    """Obtiene todos los usuarios de Supabase. Requiere rol administrativo."""
    try:
        return await supabase_service.get_users()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el catálogo de usuarios."
        )

@router.get("/prestamos", response_model=List[Dict[str, Any]])
async def get_all_prestamos(admin: Dict[str, Any] = Depends(require_admin)):
    """Obtiene todos los préstamos institucionales de Supabase. Requiere rol administrativo."""
    try:
        return await supabase_service.get_loans()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el registro general de préstamos."
        )

@router.get("/prestamos/{loan_id}")
async def get_prestamo_by_id(
    loan_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """Obtiene un préstamo específico por su ID. Requiere rol administrativo."""
    clean_id = str(loan_id).strip()
    try:
        loan = await supabase_service.get_loan_by_id(clean_id)
        if not loan:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Préstamo no encontrado.")
        return loan
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el préstamo."
        )

@router.get("/mis-prestamos", response_model=List[Dict[str, Any]])
async def get_mis_prestamos(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    CORRECCIÓN 2: Consulta exclusivamente los préstamos del usuario autenticado.
    Extrae el usuario_id del token JWT validado y filtra únicamente sus registros.
    """
    user_id = current_user.get("id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identificador de usuario no válido en el token."
        )
    try:
        return await supabase_service.get_user_loans(user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar los préstamos personales."
        )

@router.get("/libros", response_model=List[Dict[str, Any]])
async def get_all_libros(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Obtiene el catálogo de libros con autores y ejemplares. Requiere usuario autenticado."""
    try:
        return await supabase_service.get_catalog()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el catálogo de libros."
        )

@router.post("/prestamos")
async def create_prestamo(
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """Registra un nuevo préstamo en mostrador. Requiere rol administrativo."""
    try:
        return await supabase_service.create_loan(payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al registrar el préstamo en el sistema."
        )

@router.post("/libros")
async def create_libro(
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """Registra un nuevo libro completo en Supabase. Requiere rol administrativo."""
    try:
        return await supabase_service.create_book(payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al registrar el título en el catálogo."
        )

@router.delete("/libros/{book_id}")
async def delete_libro(
    book_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Elimina un libro del catálogo en Supabase.
    Requiere rol administrativo (ADMINISTRATIVE / ADMIN / SUPERADMIN).
    Valida existencia (404) e integridad referencial contra préstamos activos (409).
    """
    clean_id = str(book_id).strip()
    if not clean_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identificador de libro inválido."
        )

    try:
        result = await supabase_service.delete_book(clean_id)
        if result.get("status") == "not_found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No se encontró el libro con ID {clean_id}."
            )
        if result.get("status") == "active_loans":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=result.get("message") or "No es posible eliminar el libro porque cuenta con ejemplares en préstamo activo."
            )
        return {
            "deleted": True,
            "id": clean_id,
            "message": f'El libro "{result.get("title")}" fue retirado exitosamente del acervo bibliotecario.'
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno al procesar la eliminación del libro."
        )

@router.delete("/usuarios/{user_id}")
async def delete_usuario(
    user_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Elimina un usuario de Supabase.
    Requiere rol administrativo.
    Valida existencia (404) y rechaza si tiene préstamos activos (409).
    """
    clean_id = str(user_id).strip()
    if not clean_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identificador de usuario inválido."
        )

    try:
        result = await supabase_service.delete_user(clean_id)
        if result.get("status") == "not_found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No se encontró el usuario con ID {clean_id}."
            )
        if result.get("status") == "active_loans":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=result.get("message") or "No es posible eliminar el usuario porque tiene préstamos activos."
            )
        return {
            "deleted": True,
            "id": clean_id,
            "message": f'Usuario "{result.get("name")}" eliminado correctamente.'
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno al procesar la eliminación del usuario."
        )

@router.delete("/prestamos/{loan_id}")
async def delete_prestamo(
    loan_id: str,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Elimina un préstamo en Supabase.
    Requiere rol administrativo. Restaura ejemplar a 'disponible' si estaba activo.
    """
    clean_id = str(loan_id).strip()
    if not clean_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identificador de préstamo inválido."
        )

    try:
        result = await supabase_service.delete_loan(clean_id)
        if result.get("status") == "not_found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No se encontró el préstamo con ID {clean_id}."
            )
        return {
            "deleted": True,
            "id": clean_id,
            "message": "Registro de préstamo eliminado correctamente."
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno al procesar la eliminación del préstamo."
        )

@router.patch("/libros/{book_id}")
async def patch_libro(
    book_id: str,
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Actualiza la información de un libro en Supabase.
    Requiere rol administrativo (ADMINISTRATIVE / ADMIN / SUPERADMIN).
    """
    clean_id = str(book_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de libro inválido.")
    try:
        result = await supabase_service.update_book(clean_id, payload)
        if result.get("status") == "not_found":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontró el libro con ID {clean_id}.")
        return {"updated": True, "id": clean_id, "data": result.get("data")}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al actualizar el libro.")

@router.patch("/usuarios/{user_id}")
async def patch_usuario(
    user_id: str,
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Actualiza la información o estado de un usuario en Supabase (ej. activar, desactivar).
    Requiere rol administrativo.
    """
    clean_id = str(user_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de usuario inválido.")
    try:
        result = await supabase_service.update_user(clean_id, payload)
        if result.get("status") == "not_found":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontró el usuario con ID {clean_id}.")
        return {"updated": True, "id": clean_id, "data": result.get("data")}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al actualizar el usuario.")

@router.patch("/prestamos/{loan_id}")
async def patch_prestamo(
    loan_id: str,
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Actualiza el estado de un préstamo en Supabase (ej. renovar, marcar devuelto).
    Requiere rol administrativo.
    """
    clean_id = str(loan_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de préstamo inválido.")
    try:
        result = await supabase_service.update_loan(clean_id, payload)
        if result.get("status") == "not_found":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontró el préstamo con ID {clean_id}.")
        return {"updated": True, "id": clean_id, "data": result.get("data")}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al actualizar el préstamo.")

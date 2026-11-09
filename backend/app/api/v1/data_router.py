from fastapi import APIRouter, HTTPException
from app.services.supabase_service import supabase_service
from typing import List, Dict, Any

router = APIRouter(prefix="/data", tags=["Datos Seguros de Supabase"])

@router.get("/usuarios", response_model=List[Dict[str, Any]])
async def get_all_usuarios():
    """Obtiene todos los usuarios de Supabase usando permisos de servicio administrativo."""
    try:
        return await supabase_service.get_users()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error consultando usuarios: {str(e)}")

@router.get("/prestamos", response_model=List[Dict[str, Any]])
async def get_all_prestamos():
    """Obtiene todos los préstamos de Supabase usando permisos de servicio administrativo."""
    try:
        return await supabase_service.get_loans()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error consultando préstamos: {str(e)}")

@router.get("/libros", response_model=List[Dict[str, Any]])
async def get_all_libros():
    """Obtiene el catálogo de libros con autores y ejemplares desde Supabase."""
    try:
        return await supabase_service.get_catalog()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error consultando libros: {str(e)}")

@router.post("/prestamos")
async def create_prestamo(payload: Dict[str, Any]):
    """Registra un nuevo préstamo en Supabase y actualiza el estado del ejemplar a 'prestado'."""
    try:
        return await supabase_service.create_loan(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creando préstamo: {str(e)}")

@router.post("/libros")
async def create_libro(payload: Dict[str, Any]):
    """Registra un nuevo libro completo en Supabase con editorial, autores, ejemplares y resumen IA, omitiendo RLS."""
    try:
        return await supabase_service.create_book(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error registrando libro en Supabase: {str(e)}")




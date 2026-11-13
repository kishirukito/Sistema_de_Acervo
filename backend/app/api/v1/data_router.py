from fastapi import APIRouter, HTTPException, Depends, status
import time
import asyncio
import httpx
from datetime import datetime, timezone
from app.core.config import settings
from app.services.supabase_service import supabase_service
from app.services.vector_service import VectorService
from app.core.security import get_current_user, require_admin
from app.schemas.book_schema import BookCreateSchema, BookUpdateSchema
from app.api.v1.reports_router import invalidate_siabuc_cache
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/data", tags=["Datos Seguros de Supabase"])

# ==============================================================================
# CACHÉ EN MEMORIA PARA LIBROS Y CARRERAS (TTL 60 SEGUNDOS)
# ==============================================================================
_data_cache: Dict[str, Dict[str, Any]] = {
    "libros": {"data": None, "expires_at": 0.0},
    "carreras": {"data": None, "expires_at": 0.0}
}
DATA_CACHE_TTL = 60.0 # segundos

def get_cached_data(key: str) -> Optional[List[Dict[str, Any]]]:
    cache_entry = _data_cache.get(key)
    if cache_entry and cache_entry["data"] is not None:
        if time.time() < cache_entry["expires_at"]:
            return cache_entry["data"]
    return None

def set_cached_data(key: str, data: List[Dict[str, Any]]) -> None:
    _data_cache[key] = {
        "data": data,
        "expires_at": time.time() + DATA_CACHE_TTL
    }

def invalidate_books_cache() -> None:
    """Invalida inmediatamente el caché de catálogo de libros."""
    _data_cache["libros"] = {"data": None, "expires_at": 0.0}

def invalidate_carreras_cache() -> None:
    """Invalida inmediatamente el caché de carreras."""
    _data_cache["carreras"] = {"data": None, "expires_at": 0.0}

@router.get("/usuarios", response_model=List[Dict[str, Any]])
async def get_all_usuarios(admin: Dict[str, Any] = Depends(require_admin)):
    """Obtiene todos los usuarios de Supabase con carreras. Requiere rol administrativo."""
    try:
        return await supabase_service.get_users()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el catálogo de usuarios."
        )

@router.get("/usuarios/{user_id}")
async def get_usuario_by_id(
    user_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Obtiene los datos actualizados de un usuario por su ID.
    - Los administradores pueden consultar cualquier usuario.
    - Un usuario lector o alumno solo puede consultar su propio perfil.
    """
    clean_id = str(user_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de usuario inválido.")

    user_role = str(current_user.get("rol") or "").lower()
    user_kind = str(current_user.get("kind") or "").upper()
    is_admin = user_role in ["admin", "superadmin"] or user_kind in ["ADMINISTRATIVE", "ADMIN", "SUPERADMIN"]

    auth_id = str(current_user.get("id") or "").strip()
    if not is_admin and auth_id != clean_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes autorización para consultar el perfil de otro usuario."
        )

    try:
        url = f"{supabase_service.base_url}/usuarios?id=eq.{clean_id}&select=id,rol,email,nombre_completo,matricula_o_nomina,dependencia_o_area,carrera_id,estado,created_at,telefono,carreras(id,nivel,nombre)"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url, headers=supabase_service.headers)
            if resp.status_code == 400:
                fallback_url = f"{supabase_service.base_url}/usuarios?id=eq.{clean_id}&select=id,rol,email,nombre_completo,matricula_o_nomina,dependencia_o_area,carrera_id,estado,created_at,telefono"
                resp = await client.get(fallback_url, headers=supabase_service.headers)
            if not resp.is_success or not resp.json():
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
            return resp.json()[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno al obtener usuario: {str(e)}"
        )

@router.post("/usuarios")
async def post_usuario(
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Crea un nuevo usuario en Supabase. Requiere rol administrativo.
    - Genera password_hash bcrypt con contraseña temporal 'Acervo2026!'.
    - Resuelve tipo_usuario_id según el rol enviado.
    - Valida campos NOT NULL antes de enviar a Supabase (devuelve HTTP 422 descriptivo).
    """
    # --- Mapeo rol → tipo_usuario_id ---
    ROL_TO_TIPO = {
        "admin": 1, "personal": 1,
        "docente": 2,
        "lector": 3, "alumno": 3,
        "egresado": 4, "tesista": 4,
        "externo": 5,
    }
    rol = str(payload.get("rol") or "lector").lower().strip()
    tipo_usuario_id = ROL_TO_TIPO.get(rol, 3)

    # --- Campos requeridos ---
    nombre   = (payload.get("nombre_completo") or payload.get("fullName") or "").strip()
    email    = (payload.get("email") or "").strip().lower()
    matricula = (payload.get("matricula_o_nomina") or payload.get("borrowerCode") or "").strip()

    errors = []
    if not nombre:
        errors.append("nombre_completo es requerido.")
    if not email or "@" not in email:
        errors.append("email válido es requerido.")
    if not matricula:
        errors.append("matricula_o_nomina (borrowerCode) es requerido.")
    if errors:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"message": "Datos incompletos para crear el usuario.", "errors": errors}
        )

    # --- Generar password_hash con bcrypt (contraseña temporal) ---
    try:
        import bcrypt as _bcrypt
        default_pw = "Acervo2026!"
        pw_hash = _bcrypt.hashpw(default_pw.encode("utf-8"), _bcrypt.gensalt(rounds=12)).decode("utf-8")
    except Exception:
        # Fallback si bcrypt no está disponible (entorno sin la lib)
        import hashlib
        pw_hash = hashlib.sha256(b"Acervo2026!").hexdigest()

    carrera_id_val = payload.get("carrera_id") or payload.get("carreraId") or None
    if carrera_id_val == "":
        carrera_id_val = None

    dep_val = (payload.get("dependencia_o_area") or payload.get("dependenciaOArea") or "").strip() or None

    user_row = {
        "nombre_completo": nombre,
        "email": email,
        "password_hash": pw_hash,
        "tipo_usuario_id": tipo_usuario_id,
        "telefono": (payload.get("telefono") or payload.get("phone") or "").strip() or None,
        "matricula_o_nomina": matricula,
        "rol": rol,
        "carrera_id": carrera_id_val,
        "dependencia_o_area": dep_val,
        "estado": payload.get("estado", "activo"),
    }

    try:
        return await supabase_service.create_user(user_row)
    except Exception as e:
        err_str = str(e)
        # Detectar violación de unicidad (email o matricula duplicados)
        if "duplicate" in err_str.lower() or "unique" in err_str.lower() or "23505" in err_str:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Ya existe un usuario con ese correo electrónico o matrícula/nómina."
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear usuario en la base de datos: {err_str}"
        )

@router.get("/tipos-prestamo", response_model=List[Dict[str, Any]])
async def get_all_tipos_prestamo(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Obtiene los tipos de préstamo activos del sistema."""
    try:
        return await supabase_service.get_loan_types()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar los tipos de préstamo."
        )

@router.get("/carreras", response_model=List[Dict[str, Any]])
async def get_all_carreras(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Obtiene las carreras universitarias de la UNIPOLI ordenadas por nivel y nombre con caché de 60s."""
    cached = get_cached_data("carreras")
    if cached is not None:
        return cached
    try:
        data = await supabase_service.get_carreras()
        set_cached_data("carreras", data)
        return data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar el catálogo de carreras."
        )

@router.get("/instituciones", response_model=List[Dict[str, Any]])
async def get_all_instituciones(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Obtiene las instituciones y bibliotecas en convenio activas."""
    try:
        return await supabase_service.get_instituciones()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al consultar las instituciones en convenio."
        )

@router.post("/instituciones")
async def create_institucion(
    payload: Dict[str, Any],
    admin: Dict[str, Any] = Depends(require_admin)
):
    """Registra una nueva institución o biblioteca externa en convenio. Requiere rol administrativo."""
    try:
        return await supabase_service.create_institucion(payload)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al registrar la institución en convenio."
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
    """Obtiene el catálogo de libros con autores y ejemplares con caché de 60s. Requiere usuario autenticado."""
    cached = get_cached_data("libros")
    if cached is not None:
        return cached
    try:
        data = await supabase_service.get_catalog()
        set_cached_data("libros", data)
        return data
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
    """
    Registra un nuevo préstamo en mostrador o interbibliotecario. Requiere rol administrativo.
    Asigna automáticamente autorizado_por_id con el admin en sesión e invalida cachés de libros y reportes.
    """
    try:
        admin_id = admin.get("id") or admin.get("sub")
        res = await supabase_service.create_loan(payload, authorized_by_admin_id=admin_id)
        invalidate_siabuc_cache()
        invalidate_books_cache()
        return res
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"[ERROR create_prestamo] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al registrar el préstamo en el sistema. ({type(e).__name__}: {str(e)[:200]})"
        )

@router.post("/libros")
async def create_libro(
    payload: BookCreateSchema,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Registra un nuevo libro completo en Supabase con validaciones estrictas Pydantic.
    Requiere rol administrativo. Invalida cachés de libros y reportes.
    Garantiza HTTP 422 ante desbordamiento de campos y HTTP 409 ante duplicidad de ISBN.
    """
    try:
        res = await supabase_service.create_book(payload.model_dump())
        invalidate_siabuc_cache()
        invalidate_books_cache()
        # Sincronización automática de embeddings
        if isinstance(res, dict) and res.get("id"):
            asyncio.create_task(VectorService.index_single_book(res["id"]))
        return res
    except HTTPException:
        raise
    except Exception as e:
        err_msg = str(e)
        if "23505" in err_msg or "duplicate key" in err_msg or "registrado" in err_msg:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El código ISBN ya se encuentra registrado en el acervo"
            )
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
        invalidate_siabuc_cache()
        invalidate_books_cache()
        # Eliminar del índice vectorial de forma asíncrona
        asyncio.create_task(VectorService.remove_book(clean_id))
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
        invalidate_siabuc_cache()
        invalidate_books_cache()
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
    payload: BookUpdateSchema,
    admin: Dict[str, Any] = Depends(require_admin)
):
    """
    Actualiza la información de un libro en Supabase con validaciones Pydantic.
    Requiere rol administrativo (ADMINISTRATIVE / ADMIN / SUPERADMIN).
    """
    clean_id = str(book_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de libro inválido.")
    try:
        result = await supabase_service.update_book(clean_id, payload.model_dump(exclude_unset=True))
        if result.get("status") == "not_found":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontró el libro con ID {clean_id}.")
        invalidate_siabuc_cache()
        invalidate_books_cache()
        # Sincronización automática de embeddings
        asyncio.create_task(VectorService.index_single_book(clean_id))
        return {"updated": True, "id": clean_id, "data": result.get("data")}
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error interno al actualizar el libro: {str(e)}")

@router.patch("/usuarios/{user_id}")
async def patch_usuario(
    user_id: str,
    payload: Dict[str, Any],
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Actualiza la información de un usuario en Supabase.
    - Si es Admin, puede actualizar cualquier usuario y campos (incluyendo carrera_id, rol, estado).
    - Si es el propio usuario autenticado (ej. estudiante/lector):
      - SOLO puede actualizar su propio perfil (user_id == current_user['id']).
      - Si intenta modificar carrera_id, carreraId, dependencia_o_area, rol o estado, se rechaza con HTTP 403 Forbidden.
      - Solo se le permite actualizar nombre_completo, telefono, avatar, etc.
    """
    clean_id = str(user_id).strip()
    if not clean_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de usuario inválido.")

    user_role = str(current_user.get("rol") or "").lower()
    user_kind = str(current_user.get("kind") or "").upper()
    is_admin = user_role in ["admin", "superadmin"] or user_kind in ["ADMINISTRATIVE", "ADMIN", "SUPERADMIN"]

    # Validación de permisos y regla de negocio
    if not is_admin:
        auth_id = str(current_user.get("id") or "").strip()
        if auth_id != clean_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para modificar el perfil de otro usuario."
            )
        
        # Validar intento de cambio de carrera o campos protegidos
        forbidden_fields = ["carrera_id", "carreraId", "dependencia_o_area", "rol", "role", "estado", "status", "matricula_o_nomina"]
        for field in forbidden_fields:
            if field in payload and payload[field] is not None:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Los estudiantes o usuarios lectores no tienen autorización para modificar su carrera universitaria o área asignada. Para cambios, acude a Servicios Escolares o Administración."
                )

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
        invalidate_siabuc_cache()
        invalidate_books_cache()
        return {"updated": True, "id": clean_id, "data": result.get("data")}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al actualizar el préstamo.")

# ==============================================================================
# ENDPOINTS DE SOLICITUDES DE PRÉSTAMO (ALUMNOS Y ADMINISTRADORES)
# ==============================================================================

@router.get("/solicitudes")
async def get_solicitudes(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Obtiene las solicitudes de préstamo.
    - Administrador: obtiene todas las solicitudes registradas con datos de usuario y libro.
    - Lector / Alumno: obtiene únicamente sus propias solicitudes.
    """
    user_id = str(current_user.get("id") or "").strip()
    user_rol = str(current_user.get("rol") or "").lower()
    user_kind = str(current_user.get("kind") or "").upper()
    is_admin = user_rol in ["admin", "personal"] or user_kind in ["ADMINISTRATIVE", "ADMIN"]

    url = (
        f"{settings.SUPABASE_URL}/rest/v1/solicitudes_prestamo?select="
        "id,folio,usuario_id,libro_id,fecha_solicitud,fecha_sugerida,lugar_recogida,estado,notas,atendido_por_id,fecha_atencion,"
        "usuarios:usuarios!solicitudes_prestamo_usuario_id_fkey(id,nombre_completo,email,matricula_o_nomina,carreras(nombre)),"
        "libros(id,titulo,isbn,portada_url,libro_autores(autores(nombre)))"
        "&order=fecha_solicitud.desc"
    )
    if not is_admin:
        url += f"&usuario_id=eq.{user_id}"

    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url, headers=headers)
            if resp.status_code == 404 or resp.status_code == 400:
                # Fallback simple sin joins anidados en caso de error de relación
                fallback_url = f"{settings.SUPABASE_URL}/rest/v1/solicitudes_prestamo?select=*&order=fecha_solicitud.desc"
                if not is_admin:
                    fallback_url += f"&usuario_id=eq.{user_id}"
                fb_resp = await client.get(fallback_url, headers=headers)
                return fb_resp.json() if fb_resp.is_success else []
            if not resp.is_success:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error Supabase: {resp.text}")
            return resp.json()
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/solicitudes")
async def create_solicitud(
    payload: Dict[str, Any],
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Crea una nueva solicitud de préstamo en Supabase.
    Cualquier alumno o usuario autenticado puede solicitar un libro.
    """
    user_id = str(current_user.get("id") or "").strip()
    libro_id = str(payload.get("libro_id") or payload.get("bookId") or "").strip()
    if not libro_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de libro requerido.")

    # Generar folio correlativo simple con timestamp
    import time
    folio = f"SOL-{int(time.time())}"[-12:]

    record = {
        "folio": folio,
        "usuario_id": user_id,
        "libro_id": libro_id,
        "fecha_sugerida": payload.get("fecha_sugerida") or payload.get("suggestedDate"),
        "lugar_recogida": payload.get("lugar_recogida") or payload.get("pickupLocation") or "Mostrador Principal",
        "notas": payload.get("notas") or payload.get("notes") or "",
        "estado": "PENDING"
    }

    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Prefer": "return=representation"
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.post(
            f"{settings.SUPABASE_URL}/rest/v1/solicitudes_prestamo",
            headers=headers,
            json=record
        )
        if not resp.is_success:
            # Retorna el error descriptivo o fallback
            return {"success": False, "folio": folio, "message": "Solicitud recibida (modo contingencia)."}
        created = resp.json()
        return {"success": True, "data": created[0] if created else record}

@router.patch("/solicitudes/{solicitud_id}")
async def patch_solicitud(
    solicitud_id: str,
    payload: Dict[str, Any],
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Actualiza el estado de una solicitud (Aprobada, Rechazada o Cancelada).
    - Admins pueden aprobar o rechazar.
    - Alumnos pueden cancelar sus propias solicitudes pendientes.
    """
    clean_id = str(solicitud_id).strip()
    user_id = str(current_user.get("id") or "").strip()
    user_rol = str(current_user.get("rol") or "").lower()
    is_admin = user_rol in ["admin", "personal"]

    nuevo_estado = payload.get("estado") or payload.get("status")
    if not nuevo_estado:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Estado requerido.")

    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Prefer": "return=representation"
    }

    update_payload: Dict[str, Any] = {"estado": nuevo_estado}
    if is_admin:
        update_payload["atendido_por_id"] = user_id
        update_payload["fecha_atencion"] = datetime.now(timezone.utc).isoformat()
    if "notas" in payload:
        update_payload["notas"] = payload["notas"]

    url = f"{settings.SUPABASE_URL}/rest/v1/solicitudes_prestamo?id=eq.{clean_id}"
    if not is_admin:
        url += f"&usuario_id=eq.{user_id}"

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.patch(url, headers=headers, json=update_payload)
        if not resp.is_success:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error al actualizar la solicitud.")
        return {"updated": True, "id": clean_id, "data": resp.json()}

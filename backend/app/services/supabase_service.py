import re
import time
from datetime import datetime, timezone
import httpx
from fastapi import HTTPException, status
from app.core.config import settings
from typing import List, Dict, Any, Optional

ISO_DATE_REGEX = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ISO_DATETIME_REGEX = re.compile(
    r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$"
)

def validate_and_normalize_timestamptz(val: Any, field_name: str = "fecha") -> Optional[str]:
    """
    Valida y normaliza valores para columnas de tipo timestamptz en PostgreSQL/Supabase.
    Acepta formato ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ).
    Rechaza cadenas localizadas (ej. '18 nov. 2026', '18/11/2026') con HTTP 400.
    Retorna un string ISO 8601 en UTC con formato 'YYYY-MM-DDTHH:MM:SSZ'.
    """
    if val is None:
        return None
    val_str = str(val).strip()
    if not val_str:
        return None

    if ISO_DATE_REGEX.match(val_str):
        try:
            dt = datetime.strptime(val_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
            return dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Formato de fecha inválido para '{field_name}'. Se espera formato ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ)"
            )

    if ISO_DATETIME_REGEX.match(val_str):
        try:
            clean_str = val_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_str)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            else:
                dt = dt.astimezone(timezone.utc)
            return dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Formato de fecha inválido para '{field_name}'. Se espera formato ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ)"
            )

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=f"Formato de fecha inválido para '{field_name}'. Se espera formato ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ)"
    )

def validate_and_normalize_date(val: Any, field_name: str = "fecha") -> Optional[str]:
    """
    Valida y normaliza valores para columnas de tipo date en PostgreSQL/Supabase.
    Acepta formato ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SSZ).
    Rechaza cadenas no ISO con HTTP 400.
    Retorna un string 'YYYY-MM-DD'.
    """
    if val is None:
        return None
    val_str = str(val).strip()
    if not val_str:
        return None

    if ISO_DATE_REGEX.match(val_str):
        try:
            dt = datetime.strptime(val_str, "%Y-%m-%d")
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            pass

    if ISO_DATETIME_REGEX.match(val_str):
        try:
            clean_str = val_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_str)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=f"Formato de fecha inválido para '{field_name}'. Se espera formato ISO 8601 (YYYY-MM-DD)"
    )

class SupabaseService:
    def __init__(self):
        self.base_url = f"{settings.SUPABASE_URL}/rest/v1"
        self.headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    async def get_users(self) -> List[Dict[str, Any]]:
        url = (
            f"{self.base_url}/usuarios?select="
            "id,rol,email,nombre_completo,matricula_o_nomina,dependencia_o_area,carrera_id,vigencia_hasta,estado,created_at,telefono,"
            "carreras(id,nivel,nombre),"
            "prestamos:prestamos!prestamos_usuario_id_fkey(id,estado)"
            "&order=nombre_completo.asc"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400:
                # Fallback if relationship or phone isn't available
                fallback_url = (
                    f"{self.base_url}/usuarios?select="
                    "id,rol,email,nombre_completo,matricula_o_nomina,dependencia_o_area,carrera_id,vigencia_hasta,estado,created_at,"
                    "carreras(id,nivel,nombre)"
                    "&order=nombre_completo.asc"
                )
                resp = await client.get(fallback_url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_loans(self) -> List[Dict[str, Any]]:
        url = (
            f"{self.base_url}/prestamos?select="
            "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
            "institucion_id,folio_oficio,responsable_externo_nombre,responsable_externo_cargo,responsable_externo_contacto,autorizado_por_id,"
            "tipos_prestamo(id,clave,nombre,dias_plazo_default,requiere_convenio),"
            "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,rol,dependencia_o_area,carrera_id,telefono,carreras(id,nivel,nombre)),"
            "instituciones_convenio(id,nombre,nombre_biblioteca,clave_convenio,responsable_titular,responsable_email,responsable_telefono),"
            "autorizado_por:usuarios!prestamos_autorizado_por_id_fkey(id,nombre_completo,email),"
            "ejemplares(id,codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,portada_url,libro_autores(autores(nombre))))"
            "&order=fecha_prestamo.desc"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400:
                fallback_url = (
                    f"{self.base_url}/prestamos?select="
                    "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
                    "institucion_id,folio_oficio,responsable_externo_nombre,responsable_externo_cargo,responsable_externo_contacto,autorizado_por_id,"
                    "tipos_prestamo(id,clave,nombre,dias_plazo_default,requiere_convenio),"
                    "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,rol,dependencia_o_area,carrera_id,carreras(id,nivel,nombre)),"
                    "instituciones_convenio(id,nombre,nombre_biblioteca),"
                    "ejemplares(id,codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,portada_url,libro_autores(autores(nombre))))"
                    "&order=fecha_prestamo.desc"
                )
                resp = await client.get(fallback_url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_loan_by_id(self, loan_id: str) -> Optional[Dict[str, Any]]:
        """Consulta un préstamo específico por su UUID o folio en Supabase."""
        clean_id = str(loan_id).strip()
        url = (
            f"{self.base_url}/prestamos?id=eq.{clean_id}&select="
            "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
            "institucion_id,folio_oficio,responsable_externo_nombre,responsable_externo_cargo,responsable_externo_contacto,autorizado_por_id,"
            "tipos_prestamo(id,clave,nombre,dias_plazo_default,requiere_convenio),"
            "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,rol,dependencia_o_area,carrera_id,telefono,carreras(id,nivel,nombre)),"
            "instituciones_convenio(id,nombre,nombre_biblioteca,clave_convenio,responsable_titular,responsable_email,responsable_telefono),"
            "autorizado_por:usuarios!prestamos_autorizado_por_id_fkey(id,nombre_completo,email),"
            "ejemplares(id,codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,portada_url,libro_autores(autores(nombre))))"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400:
                fallback_url = (
                    f"{self.base_url}/prestamos?id=eq.{clean_id}&select="
                    "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
                    "institucion_id,folio_oficio,responsable_externo_nombre,responsable_externo_cargo,responsable_externo_contacto,autorizado_por_id,"
                    "tipos_prestamo(id,clave,nombre,dias_plazo_default,requiere_convenio),"
                    "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,rol,dependencia_o_area,carrera_id,carreras(id,nivel,nombre)),"
                    "instituciones_convenio(id,nombre,nombre_biblioteca),"
                    "ejemplares(id,codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,portada_url,libro_autores(autores(nombre))))"
                )
                resp = await client.get(fallback_url, headers=self.headers, timeout=10.0)
            if resp.is_success:
                items = resp.json()
                if isinstance(items, list) and len(items) > 0:
                    return items[0]
        return None

    async def get_user_loans(self, user_id: str) -> List[Dict[str, Any]]:
        """Consulta exclusivamente los préstamos del usuario autenticado en Supabase."""
        clean_uid = str(user_id).strip()
        url = (
            f"{self.base_url}/prestamos?usuario_id=eq.{clean_uid}&select="
            "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
            "tipos_prestamo(id,clave,nombre,dias_plazo_default,requiere_convenio),"
            "ejemplares(codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,portada_url,libro_autores(orden,autores(nombre))))"
            "&order=fecha_prestamo.desc"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            rows = resp.json()

            formatted = []
            for r in rows:
                ejemplar = r.get("ejemplares") or {}
                libro = ejemplar.get("libros") or {}
                tipo_info = r.get("tipos_prestamo") or {}
                tipo_clave = tipo_info.get("clave") or "domicilio"
                tipo_nombre = tipo_info.get("nombre") or ("Préstamo a Domicilio" if tipo_clave == "domicilio" else "Préstamo en Sala")

                autores = []
                for la in (libro.get("libro_autores") or []):
                    if isinstance(la, dict) and la.get("autores") and la["autores"].get("nombre"):
                        autores.append(la["autores"]["nombre"])

                formatted.append({
                    "id": r["id"],
                    "loanId": r["id"],
                    "usuario_id": r["usuario_id"],
                    "ejemplar_id": r.get("ejemplar_id"),
                    "codigo_inventario": ejemplar.get("codigo_inventario") or "",
                    "ubicacion_estante": ejemplar.get("ubicacion_estante") or "",
                    "libro_id": libro.get("id"),
                    "titulo": libro.get("titulo") or "Sin título",
                    "autor": ", ".join(autores) or "Autor desconocido",
                    "isbn": libro.get("isbn") or "",
                    "portada_url": libro.get("portada_url"),
                    "tipo_prestamo_id": r.get("tipo_prestamo_id"),
                    "tipo_prestamo": tipo_clave,
                    "tipo_prestamo_nombre": tipo_nombre,
                    "tipos_prestamo": tipo_info,
                    "fecha_prestamo": r.get("fecha_prestamo"),
                    "fecha_limite_devolucion": r.get("fecha_limite_devolucion"),
                    "fecha_devolucion_real": r.get("fecha_devolucion_real"),
                    "estado": r.get("estado") or "activo",
                    "notas": r.get("notas") or "",
                    "renovaciones_count": r.get("renovaciones_count") or 0
                })
            return formatted

    async def get_catalog(self) -> List[Dict[str, Any]]:
        url = (
            f"{self.base_url}/libros?select="
            "id,isbn,titulo,anio_publicacion,edicion,portada_url,editorial_id,"
            "editoriales(nombre),"
            "libro_autores(orden,autores(nombre)),"
            "libro_temas(temas(nombre)),"
            "ejemplares(id,codigo_inventario,ubicacion_estante,estado),"
            "resumenes_ia(resumen_texto,palabras_clave)"
            "&order=titulo.asc"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_loan_types(self) -> List[Dict[str, Any]]:
        """Consulta los tipos de préstamo activos del sistema."""
        url = f"{self.base_url}/tipos_prestamo?activo=eq.true&select=id,clave,nombre,descripcion,dias_plazo_default,requiere_convenio,activo&order=dias_plazo_default.asc"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_carreras(self) -> List[Dict[str, Any]]:
        """Consulta las carreras activas de la UNIPOLI ordenadas por nivel y nombre."""
        url = f"{self.base_url}/carreras?activa=eq.true&select=id,nivel,nombre,activa&order=nivel.asc,nombre.asc"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_instituciones(self) -> List[Dict[str, Any]]:
        """Consulta las instituciones en convenio activas."""
        url = f"{self.base_url}/instituciones_convenio?activa=eq.true&select=id,nombre,nombre_biblioteca,clave_convenio,responsable_titular,responsable_email,responsable_telefono,direccion,activa,created_at&order=nombre.asc"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def create_institucion(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Registra una nueva institución / biblioteca en convenio."""
        url = f"{self.base_url}/instituciones_convenio"
        clean = {
            "nombre": str(payload.get("nombre", "")).strip(),
            "nombre_biblioteca": str(payload.get("nombre_biblioteca", "")).strip() or None,
            "clave_convenio": str(payload.get("clave_convenio", "")).strip() or None,
            "responsable_titular": str(payload.get("responsable_titular", "")).strip() or None,
            "responsable_email": str(payload.get("responsable_email", "")).strip() or None,
            "responsable_telefono": str(payload.get("responsable_telefono", "")).strip() or None,
            "direccion": str(payload.get("direccion", "")).strip() or None,
            "activa": payload.get("activa", True)
        }
        if not clean["nombre"]:
            raise ValueError("El nombre de la institución es obligatorio.")

        async with httpx.AsyncClient() as client:
            resp = await client.post(url, headers=self.headers, json=clean, timeout=10.0)
            resp.raise_for_status()
            res = resp.json()
            return res[0] if isinstance(res, list) and res else res

    async def create_loan(self, loan_data: Dict[str, Any], authorized_by_admin_id: Optional[str] = None) -> Dict[str, Any]:
        url = f"{self.base_url}/prestamos"
        clean_payload = dict(loan_data)
        
        # 1. Obtener o resolver tipo_prestamo_id
        tipo_prestamo_id = clean_payload.get("tipo_prestamo_id")
        tipo_clave = str(clean_payload.get("tipo_prestamo") or clean_payload.get("tipo") or "").lower().strip()
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            # Si no viene tipo_prestamo_id pero viene clave ("domicilio", "sala", "interbibliotecario"), resolver ID
            tipos_map = {}
            r_tipos = await client.get(f"{self.base_url}/tipos_prestamo?select=id,clave,requiere_convenio,dias_plazo_default", headers=self.headers)
            if r_tipos.is_success:
                for t in r_tipos.json():
                    tipos_map[t["id"]] = t
                    tipos_map[t["clave"].lower()] = t

            current_tipo = None
            if tipo_prestamo_id and tipo_prestamo_id in tipos_map:
                current_tipo = tipos_map[tipo_prestamo_id]
            elif tipo_clave and tipo_clave in tipos_map:
                current_tipo = tipos_map[tipo_clave]
                clean_payload["tipo_prestamo_id"] = current_tipo["id"]
            
            # Remover clave antigua si existe en el payload
            clean_payload.pop("tipo_prestamo", None)
            clean_payload.pop("tipo", None)

            if not clean_payload.get("tipo_prestamo_id"):
                # Default a tipo 'domicilio' si existe
                if "domicilio" in tipos_map:
                    clean_payload["tipo_prestamo_id"] = tipos_map["domicilio"]["id"]
                    current_tipo = tipos_map["domicilio"]
                else:
                    raise ValueError("tipo_prestamo_id no válido o no especificado.")

            clave_actual = (current_tipo.get("clave") if current_tipo else "").lower()
            requiere_convenio = current_tipo.get("requiere_convenio", False) if current_tipo else False

            # Validaciones según modalidad
            if clave_actual == "interbibliotecario" or requiere_convenio:
                # Exige institucion_id y responsable_externo_nombre
                if not clean_payload.get("institucion_id"):
                    raise ValueError("El préstamo interbibliotecario requiere seleccionar una institución en convenio ('institucion_id').")
                if not clean_payload.get("responsable_externo_nombre") or not str(clean_payload.get("responsable_externo_nombre")).strip():
                    raise ValueError("El préstamo interbibliotecario requiere registrar el nombre del responsable externo ('responsable_externo_nombre').")
                
                # Asignar automáticamente autorizado_por_id desde el token admin
                if authorized_by_admin_id:
                    clean_payload["autorizado_por_id"] = authorized_by_admin_id
                
                # usuario_id puede ser opcional o None en préstamos interbibliotecarios
                if not clean_payload.get("usuario_id"):
                    clean_payload["usuario_id"] = None
            else:
                # domicilio o sala
                if not clean_payload.get("usuario_id"):
                    raise ValueError("El préstamo requiere un usuario interno solicitante ('usuario_id').")
                # Limpiar campos de convenio
                clean_payload["institucion_id"] = None
                clean_payload["responsable_externo_nombre"] = None
                clean_payload["responsable_externo_cargo"] = None
                clean_payload["responsable_externo_contacto"] = None
                clean_payload["folio_oficio"] = None

            # Calcular fechas automáticamente si no vienen en el payload
            from datetime import datetime, timezone, timedelta
            now_utc = datetime.now(timezone.utc)

            if not clean_payload.get("fecha_prestamo"):
                clean_payload["fecha_prestamo"] = now_utc.isoformat()
            else:
                clean_payload["fecha_prestamo"] = validate_and_normalize_timestamptz(
                    clean_payload["fecha_prestamo"], "fecha_prestamo"
                )

            if not clean_payload.get("fecha_limite_devolucion"):
                dias = int(current_tipo.get("dias_plazo_default", 7)) if current_tipo else 7
                clean_payload["fecha_limite_devolucion"] = (now_utc + timedelta(days=dias)).isoformat()
            else:
                clean_payload["fecha_limite_devolucion"] = validate_and_normalize_timestamptz(
                    clean_payload["fecha_limite_devolucion"], "fecha_limite_devolucion"
                )

            if "fecha_devolucion_real" in clean_payload and clean_payload["fecha_devolucion_real"]:
                clean_payload["fecha_devolucion_real"] = validate_and_normalize_timestamptz(
                    clean_payload["fecha_devolucion_real"], "fecha_devolucion_real"
                )

            resp = await client.post(url, headers=self.headers, json=clean_payload, timeout=10.0)
            resp.raise_for_status()
            created = resp.json()
            if isinstance(created, list) and len(created) > 0:
                created = created[0]

            ejemplar_id = clean_payload.get("ejemplar_id")
            if ejemplar_id:
                ej_url = f"{self.base_url}/ejemplares?id=eq.{ejemplar_id}"
                await client.patch(ej_url, headers=self.headers, json={"estado": "prestado"}, timeout=10.0)

            return created

    async def create_book(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Crea un libro completo con todas sus relaciones en Supabase:
        - RPC PostgreSQL directo (registrar_libro_completo) para latencia ultra-baja.
        - Fallback consolidado en lote (Batch Inserts) si la función RPC no está presente.
        - Validación explícita de unicidad de ISBN con HTTP 409 Conflict.
        """
        import re
        import asyncio

        isbn = str(data.get("isbn") or "").strip()
        titulo = str(data.get("titulo") or data.get("title") or "").strip()
        autores_raw = str(data.get("autor") or data.get("author") or "Autor Desconocido").strip()
        editorial_nombre = str(data.get("editorial") or data.get("publisher") or "").strip()
        
        anio = data.get("anio_publicacion") or data.get("publishYear")
        if anio:
            try:
                anio = int(anio)
            except (ValueError, TypeError):
                anio = 2026
        else:
            anio = 2026

        edicion = str(data.get("edicion") or "1ra Edición").strip()
        portada_url = data.get("portada_url") or data.get("coverUrl") or "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
        categoria = str(data.get("categoria") or data.get("category") or "000").strip()
        
        total_copias = data.get("ejemplares_iniciales") or data.get("total_copias") or data.get("totalCopies") or 1
        try:
            total_copias = int(total_copias)
        except (ValueError, TypeError):
            total_copias = 1
        total_copias = max(1, min(total_copias, 50))

        ubicacion = str(data.get("ubicacion_estante") or data.get("ubicacion") or data.get("location") or "Estante General").strip()
        descripcion = str(data.get("descripcion") or data.get("description") or "").strip()

        async with httpx.AsyncClient(timeout=15.0) as client:
            # -------------------------------------------------------------
            # ESTRATEGIA 1: LLAMADA A FUNCIÓN RPC ATÓMICA EN POSTGRESQL
            # -------------------------------------------------------------
            rpc_url = f"{self.base_url}/rpc/registrar_libro_completo"
            rpc_payload = {
                "p_isbn": isbn,
                "p_titulo": titulo,
                "p_autor": autores_raw,
                "p_editorial": editorial_nombre or None,
                "p_anio_publicacion": anio,
                "p_edicion": edicion,
                "p_categoria": categoria,
                "p_total_copias": total_copias,
                "p_ubicacion_estante": ubicacion,
                "p_portada_url": portada_url,
                "p_descripcion": descripcion or None
            }
            try:
                rpc_resp = await client.post(rpc_url, headers=self.headers, json=rpc_payload)
                if rpc_resp.status_code in (200, 201):
                    return rpc_resp.json()
                
                resp_text = rpc_resp.text
                if rpc_resp.status_code in (400, 409) and ("23505" in resp_text or "duplicate key" in resp_text or "ya se encuentra registrado" in resp_text):
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="El código ISBN ya se encuentra registrado en el acervo"
                    )
            except HTTPException:
                raise
            except Exception:
                pass  # Fallback a operaciones consolidadas REST

            # -------------------------------------------------------------
            # ESTRATEGIA 2: FALLBACK CONSOLIDADO REST CON OPERACIONES EN LOTE
            # -------------------------------------------------------------
            # A. Verificación preventiva de duplicidad de ISBN
            chk_resp = await client.get(f"{self.base_url}/libros?isbn=eq.{isbn}&select=id", headers=self.headers)
            if chk_resp.is_success and len(chk_resp.json()) > 0:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="El código ISBN ya se encuentra registrado en el acervo"
                )

            # B. Resolver Editorial
            editorial_id = None
            if editorial_nombre:
                ed_resp = await client.get(
                    f"{self.base_url}/editoriales?nombre=ilike.{editorial_nombre}&select=id",
                    headers=self.headers
                )
                ed_list = ed_resp.json() if ed_resp.is_success else []
                if ed_list:
                    editorial_id = ed_list[0]["id"]
                else:
                    new_ed = await client.post(
                        f"{self.base_url}/editoriales",
                        headers={**self.headers, "Prefer": "return=representation"},
                        json={"nombre": editorial_nombre}
                    )
                    if new_ed.is_success and new_ed.json():
                        editorial_id = new_ed.json()[0]["id"]

            # C. Insertar Libro en tabla 'libros'
            libro_payload = {
                "isbn": isbn,
                "titulo": titulo,
                "anio_publicacion": anio,
                "edicion": edicion,
                "portada_url": portada_url,
                "editorial_id": editorial_id,
                "clasificacion_dewey": categoria[:10],
                "creado_por_id": "a0000000-0000-0000-0000-000000000001"
            }

            libro_resp = await client.post(
                f"{self.base_url}/libros",
                headers={**self.headers, "Prefer": "return=representation"},
                json=libro_payload
            )
            
            resp_txt = libro_resp.text
            if libro_resp.status_code == 409 or (libro_resp.status_code == 400 and ("23505" in resp_txt or "duplicate key" in resp_txt or "libros_isbn_key" in resp_txt)):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="El código ISBN ya se encuentra registrado en el acervo"
                )
            
            if libro_resp.status_code >= 400:
                raise HTTPException(
                    status_code=libro_resp.status_code,
                    detail=libro_resp.text or "Error al crear el registro del libro"
                )

            created_libro = libro_resp.json()[0]
            libro_id = created_libro["id"]

            # D. Tareas secundarias en paralelo: Autores, Tema y Resumen IA
            autores_list = [a.strip() for a in re.split(r'[,;]', autores_raw) if a.strip()]
            
            async def resolve_author(idx: int, a_nombre: str):
                autor_id = None
                a_resp = await client.get(f"{self.base_url}/autores?nombre=ilike.{a_nombre}&select=id", headers=self.headers)
                a_items = a_resp.json() if a_resp.is_success else []
                if a_items:
                    autor_id = a_items[0]["id"]
                else:
                    new_a = await client.post(
                        f"{self.base_url}/autores",
                        headers={**self.headers, "Prefer": "return=representation"},
                        json={"nombre": a_nombre}
                    )
                    if new_a.is_success and new_a.json():
                        autor_id = new_a.json()[0]["id"]
                if autor_id:
                    await client.post(
                        f"{self.base_url}/libro_autores",
                        headers=self.headers,
                        json={"libro_id": libro_id, "autor_id": autor_id, "orden": idx + 1}
                    )

            async def link_tema():
                tema_resp = await client.get(f"{self.base_url}/temas?nombre=ilike.*{categoria[:3]}*&select=id", headers=self.headers)
                tema_items = tema_resp.json() if tema_resp.is_success else []
                if tema_items:
                    await client.post(
                        f"{self.base_url}/libro_temas",
                        headers=self.headers,
                        json={"libro_id": libro_id, "tema_id": tema_items[0]["id"]}
                    )

            async def save_resumen():
                if descripcion:
                    await client.post(
                        f"{self.base_url}/resumenes_ia",
                        headers=self.headers,
                        json={
                            "libro_id": libro_id,
                            "resumen_texto": descripcion,
                            "palabras_clave": f"{titulo}, {autores_raw}, Acervo CIU",
                            "modelo_usado": "llama3.2:3b"
                        }
                    )

            # E. Inserción de ejemplares en un solo BATCH POST (operación en bloque)
            clean_isbn = re.sub(r'[^A-Za-z0-9]', '', isbn)
            sufijo_isbn = clean_isbn[-4:] if len(clean_isbn) >= 4 else "001"
            ejemplares_batch = []
            for i in range(total_copias):
                letra_copia = chr(65 + i) if i < 26 else str(i + 1)
                cod_inv = f"CIU-{sufijo_isbn}-{letra_copia}"
                ejemplares_batch.append({
                    "libro_id": libro_id,
                    "codigo_inventario": cod_inv,
                    "ubicacion_estante": ubicacion,
                    "estado": "disponible",
                    "observaciones": f"Ejemplar {letra_copia} ingresado al acervo"
                })

            async def insert_ejemplares():
                ej_resp = await client.post(
                    f"{self.base_url}/ejemplares",
                    headers={**self.headers, "Prefer": "return=representation"},
                    json=ejemplares_batch
                )
                return ej_resp.json() if ej_resp.is_success else []

            # Ejecutar ejemplares, autores, temas y resumen concurrentemente
            tasks = [insert_ejemplares(), link_tema(), save_resumen()]
            for idx, a_nombre in enumerate(autores_list):
                tasks.append(resolve_author(idx, a_nombre))

            results = await asyncio.gather(*tasks, return_exceptions=True)
            created_libro["ejemplares"] = results[0] if isinstance(results[0], list) else []

            return created_libro

    async def save_summary(self, libro_id: str, resumen_texto: str, palabras_clave: str, modelo_usado: str = "llama3.2:3b") -> Dict[str, Any]:
        """Inserta o actualiza el resumen con IA de un libro en Supabase."""
        check_url = f"{self.base_url}/resumenes_ia?libro_id=eq.{libro_id}"
        async with httpx.AsyncClient() as client:
            check_resp = await client.get(check_url, headers=self.headers, timeout=5.0)
            existing = check_resp.json() if check_resp.is_success else []
            if isinstance(existing, list) and len(existing) > 0:
                update_url = f"{self.base_url}/resumenes_ia?libro_id=eq.{libro_id}"
                resp = await client.patch(update_url, headers=self.headers, json={
                    "resumen_texto": resumen_texto,
                    "palabras_clave": palabras_clave,
                    "modelo_usado": modelo_usado
                }, timeout=5.0)
                resp.raise_for_status()
                return {"updated": True}
            else:
                insert_url = f"{self.base_url}/resumenes_ia"
                resp = await client.post(insert_url, headers=self.headers, json={
                    "libro_id": libro_id,
                    "resumen_texto": resumen_texto,
                    "palabras_clave": palabras_clave,
                    "modelo_usado": modelo_usado
                }, timeout=5.0)
                resp.raise_for_status()
                return {"inserted": True}

    async def delete_book(self, book_id: str) -> Dict[str, Any]:
        """
        Elimina un libro de Supabase validando existencia e integridad referencial:
        - Si no existe: retorna not_found=True.
        - Si tiene ejemplares con préstamos activos/vencidos: retorna active_loans=True.
        - Si no tiene préstamos activos: ejecuta DELETE en /libros?id=eq.{book_id}.
        """
        check_url = f"{self.base_url}/libros?id=eq.{book_id}&select=id,titulo,ejemplares(id,estado,codigo_inventario,prestamos(id,estado))"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(check_url, headers=self.headers)
            if not resp.is_success:
                raise Exception("Error al consultar el libro en Supabase.")
            items = resp.json()
            if not items or len(items) == 0:
                return {"status": "not_found"}

            book = items[0]
            # Verificar si algún ejemplar tiene préstamo activo o vencido
            active_count = 0
            for ej in (book.get("ejemplares") or []):
                for p in (ej.get("prestamos") or []):
                    if p.get("estado") in ["activo", "vencido"]:
                        active_count += 1

            if active_count > 0:
                return {
                    "status": "active_loans",
                    "active_count": active_count,
                    "message": f"No es posible eliminar el libro porque cuenta con {active_count} ejemplar(es) en préstamo activo."
                }

            # Si no hay préstamos activos, eliminar en cascada en Supabase
            del_url = f"{self.base_url}/libros?id=eq.{book_id}"
            del_resp = await client.delete(del_url, headers=self.headers)
            del_resp.raise_for_status()

            return {
                "status": "success",
                "id": book_id,
                "title": book.get("titulo") or "Libro"
            }

    async def delete_user(self, user_id: str) -> Dict[str, Any]:
        """
        Elimina un usuario de Supabase validando que no posea préstamos activos.
        """
        check_url = f"{self.base_url}/usuarios?id=eq.{user_id}&select=id,nombre_completo,prestamos(id,estado)"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(check_url, headers=self.headers)
            if not resp.is_success:
                raise Exception("Error al consultar el usuario en Supabase.")
            items = resp.json()
            if not items or len(items) == 0:
                return {"status": "not_found"}

            user = items[0]
            active_loans = 0
            for p in (user.get("prestamos") or []):
                if p.get("estado") in ["activo", "vencido"]:
                    active_loans += 1

            if active_loans > 0:
                return {
                    "status": "active_loans",
                    "active_loans": active_loans,
                    "message": f"No es posible eliminar el usuario porque tiene {active_loans} préstamo(s) activo(s)."
                }

            del_url = f"{self.base_url}/usuarios?id=eq.{user_id}"
            del_resp = await client.delete(del_url, headers=self.headers)
            del_resp.raise_for_status()

            return {
                "status": "success",
                "id": user_id,
                "name": user.get("nombre_completo") or "Usuario"
            }

    async def delete_loan(self, loan_id: str) -> Dict[str, Any]:
        """
        Elimina un registro de préstamo en Supabase. Si el préstamo estaba activo,
        restaura el estado del ejemplar a 'disponible'.
        """
        check_url = f"{self.base_url}/prestamos?id=eq.{loan_id}&select=id,ejemplar_id,estado"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(check_url, headers=self.headers)
            if not resp.is_success:
                raise Exception("Error al consultar el préstamo en Supabase.")
            items = resp.json()
            if not items or len(items) == 0:
                return {"status": "not_found"}

            loan = items[0]
            ejemplar_id = loan.get("ejemplar_id")
            if ejemplar_id and loan.get("estado") in ["activo", "vencido"]:
                patch_url = f"{self.base_url}/ejemplares?id=eq.{ejemplar_id}"
                await client.patch(patch_url, headers=self.headers, json={"estado": "disponible"})

            del_url = f"{self.base_url}/prestamos?id=eq.{loan_id}"
            del_resp = await client.delete(del_url, headers=self.headers)
            del_resp.raise_for_status()

            return {"status": "success", "id": loan_id}

    async def delete_summary(self, libro_id: str) -> Dict[str, Any]:
        """
        Elimina el resumen IA de un libro en Supabase.
        """
        check_url = f"{self.base_url}/resumenes_ia?libro_id=eq.{libro_id}&select=id"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(check_url, headers=self.headers)
            if not resp.is_success:
                raise Exception("Error al consultar el resumen en Supabase.")
            items = resp.json()
            if not items or len(items) == 0:
                return {"status": "not_found"}

            del_url = f"{self.base_url}/resumenes_ia?libro_id=eq.{libro_id}"
            del_resp = await client.delete(del_url, headers=self.headers)
            del_resp.raise_for_status()

            return {"status": "success", "libro_id": libro_id}

    async def update_book(self, book_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """
        Actualiza los datos de un libro en Supabase y ajusta dinámicamente la cantidad de ejemplares.
        Requiere rol administrativo.
        """
        check_url = f"{self.base_url}/libros?id=eq.{book_id}&select=id,titulo,isbn"
        async with httpx.AsyncClient(timeout=10.0) as client:
            check_resp = await client.get(check_url, headers=self.headers)
            if not check_resp.is_success or not check_resp.json():
                return {"status": "not_found"}

            book_info = check_resp.json()[0]
            isbn_clean = book_info.get("isbn") or "CIU"

            payload: Dict[str, Any] = {}
            if "titulo" in updates or "title" in updates:
                payload["titulo"] = str(updates.get("titulo") or updates.get("title")).strip()
            if "isbn" in updates:
                payload["isbn"] = str(updates["isbn"]).strip()
                isbn_clean = payload["isbn"]
            if "anio_publicacion" in updates or "publicationYear" in updates:
                try:
                    payload["anio_publicacion"] = int(updates.get("anio_publicacion") or updates.get("publicationYear"))
                except (ValueError, TypeError):
                    pass
            if "edicion" in updates:
                payload["edicion"] = str(updates["edicion"]).strip()
            if "portada_url" in updates or "coverUrl" in updates:
                payload["portada_url"] = updates.get("portada_url") or updates.get("coverUrl")
            if "categoria" in updates or "category" in updates:
                payload["clasificacion_dewey"] = str(updates.get("categoria") or updates.get("category"))[:10]

            # 1. Actualizar metadatos del libro si hay cambios
            updated_book_data = book_info
            if payload:
                patch_url = f"{self.base_url}/libros?id=eq.{book_id}"
                patch_resp = await client.patch(patch_url, headers=self.headers, json=payload)
                patch_resp.raise_for_status()
                updated_items = patch_resp.json()
                if updated_items:
                    updated_book_data = updated_items[0]

            # 2. Ajuste dinámico de la cantidad de ejemplares (public.ejemplares)
            new_copies = None
            for key_cand in ("cantidad_ejemplares", "total_copias", "totalCopies"):
                if key_cand in updates and updates[key_cand] is not None:
                    new_copies = updates[key_cand]
                    break

            if new_copies is not None:
                new_total = int(new_copies)
                
                # Consultar ejemplares existentes actuales
                ej_url = f"{self.base_url}/ejemplares?libro_id=eq.{book_id}&select=id,codigo_inventario,estado&order=created_at.asc"
                ej_resp = await client.get(ej_url, headers=self.headers)
                ej_resp.raise_for_status()
                current_ejemplares = ej_resp.json()
                current_count = len(current_ejemplares)
                
                prestados = [e for e in current_ejemplares if str(e.get("estado")).lower() in ["prestado", "en_prestamo"]]
                disponibles = [e for e in current_ejemplares if str(e.get("estado")).lower() in ["disponible", "en_sala"]]
                prestados_count = len(prestados)

                if new_total < prestados_count:
                    raise ValueError(
                        f"No es posible reducir los ejemplares a {new_total}. "
                        f"Actualmente hay {prestados_count} ejemplar(es) en préstamo activo."
                    )

                if new_total > current_count:
                    # Incrementar: Crear nuevos ejemplares en estado 'disponible'
                    diff_to_add = new_total - current_count
                    new_rows = []
                    ubicacion_default = updates.get("ubicacion_estante") or updates.get("location") or "Estante General"
                    
                    for i in range(diff_to_add):
                        idx = current_count + i + 1
                        suffix = chr(65 + ((idx - 1) % 26)) if idx <= 26 else str(idx)
                        codigo_inv = f"{isbn_clean[:12]}-{suffix}-{int(time.time()) % 10000}"
                        new_rows.append({
                            "libro_id": book_id,
                            "codigo_inventario": codigo_inv,
                            "ubicacion_estante": ubicacion_default,
                            "estado": "disponible",
                            "observaciones": "Ejemplar añadido en actualización de acervo"
                        })
                    
                    add_url = f"{self.base_url}/ejemplares"
                    add_resp = await client.post(add_url, headers=self.headers, json=new_rows)
                    add_resp.raise_for_status()

                elif new_total < current_count:
                    # Reducir: Eliminar únicamente ejemplares en estado 'disponible'
                    diff_to_remove = current_count - new_total
                    if diff_to_remove > len(disponibles):
                        raise ValueError(
                            f"Solo hay {len(disponibles)} ejemplar(es) disponibles para retirar. "
                            f"Los demás se encuentran en préstamo activo."
                        )
                    
                    # Tomar los últimos disponibles para eliminar
                    to_delete = disponibles[-diff_to_remove:]
                    for ej_del in to_delete:
                        del_id = ej_del["id"]
                        del_url = f"{self.base_url}/ejemplares?id=eq.{del_id}"
                        del_r = await client.delete(del_url, headers=self.headers)
                        del_r.raise_for_status()

            return {
                "status": "success",
                "id": book_id,
                "data": updated_book_data
            }

    async def create_user(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Crea un nuevo usuario en Supabase."""
        async with httpx.AsyncClient(timeout=10.0) as client:
            url = f"{self.base_url}/usuarios"
            resp = await client.post(url, headers={**self.headers, "Prefer": "return=representation"}, json=payload)
            resp.raise_for_status()
            items = resp.json()
            return items[0] if items else {}

    async def update_user(self, user_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """
        Actualiza el estado o información de un usuario en Supabase (ej. activo/inactivo/suspendido).
        """
        check_url = f"{self.base_url}/usuarios?id=eq.{user_id}&select=id,nombre_completo,estado"
        async with httpx.AsyncClient(timeout=10.0) as client:
            check_resp = await client.get(check_url, headers=self.headers)
            if not check_resp.is_success or not check_resp.json():
                return {"status": "not_found"}

            payload: Dict[str, Any] = {}
            if "estado" in updates or "status" in updates:
                st = str(updates.get("estado") or updates.get("status")).lower()
                if st in ["active", "activo"]:
                    payload["estado"] = "activo"
                elif st in ["inactive", "inactivo"]:
                    payload["estado"] = "inactivo"
                elif st in ["suspended", "suspendido"]:
                    payload["estado"] = "suspendido"

            if "nombre_completo" in updates or "fullName" in updates:
                payload["nombre_completo"] = str(updates.get("nombre_completo") or updates.get("fullName")).strip()
            if "email" in updates:
                payload["email"] = str(updates.get("email")).strip().lower()
            if "telefono" in updates or "phone" in updates:
                payload["telefono"] = updates.get("telefono") or updates.get("phone")
            if "avatar_url" in updates or "avatarUrl" in updates:
                payload["avatar_url"] = updates.get("avatar_url") or updates.get("avatarUrl")
            if "dependencia_o_area" in updates or "departmentOrCareer" in updates:
                payload["dependencia_o_area"] = updates.get("dependencia_o_area") or updates.get("departmentOrCareer")
            elif "carrera_o_dependencia" in updates:
                payload["dependencia_o_area"] = updates.get("carrera_o_dependencia")
            if "carrera_id" in updates or "carreraId" in updates:
                c_val = updates.get("carrera_id") if "carrera_id" in updates else updates.get("carreraId")
                payload["carrera_id"] = str(c_val).strip() if c_val else None
            if "vigencia_hasta" in updates or "expiresAt" in updates:
                raw_vig = updates.get("vigencia_hasta") or updates.get("expiresAt")
                if raw_vig:
                    payload["vigencia_hasta"] = validate_and_normalize_date(raw_vig, "vigencia_hasta")

            if not payload:
                return {"status": "no_changes", "id": user_id}

            patch_url = f"{self.base_url}/usuarios?id=eq.{user_id}"
            patch_resp = await client.patch(patch_url, headers=self.headers, json=payload)
            patch_resp.raise_for_status()
            updated_items = patch_resp.json()
            return {
                "status": "success",
                "id": user_id,
                "data": updated_items[0] if updated_items else payload
            }

    async def update_loan(self, loan_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """
        Actualiza el estado de un préstamo (renovar, devolver, extender fecha límite).
        Garantiza que todas las fechas se normalicen a ISO 8601 UTC timestamptz (YYYY-MM-DDTHH:MM:SSZ).
        """
        check_url = f"{self.base_url}/prestamos?id=eq.{loan_id}&select=id,ejemplar_id,estado"
        async with httpx.AsyncClient(timeout=10.0) as client:
            check_resp = await client.get(check_url, headers=self.headers)
            if not check_resp.is_success or not check_resp.json():
                return {"status": "not_found"}

            loan = check_resp.json()[0]
            payload: Dict[str, Any] = {}

            raw_due = updates.get("fecha_limite_devolucion") or updates.get("dueDate")
            if raw_due:
                payload["fecha_limite_devolucion"] = validate_and_normalize_timestamptz(
                    raw_due, "fecha_limite_devolucion"
                )

            raw_return = updates.get("fecha_devolucion_real") or updates.get("returnDate")
            if raw_return:
                payload["fecha_devolucion_real"] = validate_and_normalize_timestamptz(
                    raw_return, "fecha_devolucion_real"
                )

            if "estado" in updates or "status" in updates:
                st = str(updates.get("estado") or updates.get("status")).lower()
                if st in ["returned", "devuelto"]:
                    payload["estado"] = "devuelto"
                    # Si no se pasó fecha_devolucion_real, asignar timestamp actual en UTC
                    if "fecha_devolucion_real" not in payload:
                        payload["fecha_devolucion_real"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
                    # Liberar ejemplar
                    if loan.get("ejemplar_id"):
                        await client.patch(
                            f"{self.base_url}/ejemplares?id=eq.{loan['ejemplar_id']}",
                            headers=self.headers,
                            json={"estado": "disponible"}
                        )
                elif st in ["active", "activo", "renovado"]:
                    payload["estado"] = "activo"

            if "notas" in updates or "notes" in updates:
                payload["notas"] = updates.get("notas") or updates.get("notes")

            if not payload:
                return {"status": "no_changes", "id": loan_id}

            patch_url = f"{self.base_url}/prestamos?id=eq.{loan_id}"
            patch_resp = await client.patch(patch_url, headers=self.headers, json=payload)
            patch_resp.raise_for_status()
            updated_items = patch_resp.json()
            return {
                "status": "success",
                "id": loan_id,
                "data": updated_items[0] if updated_items else payload
            }

supabase_service = SupabaseService()

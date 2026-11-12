import re
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
        # Include telefono
        url = f"{self.base_url}/usuarios?select=id,rol,email,nombre_completo,matricula_o_nomina,carrera_o_dependencia,vigencia_hasta,estado,created_at,telefono,prestamos(id,estado)&order=nombre_completo.asc"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400: # in case telefono is not yet added in DB
                fallback_url = f"{self.base_url}/usuarios?select=id,rol,email,nombre_completo,matricula_o_nomina,carrera_o_dependencia,vigencia_hasta,estado,created_at,prestamos(id,estado)&order=nombre_completo.asc"
                resp = await client.get(fallback_url, headers=self.headers, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

    async def get_loans(self) -> List[Dict[str, Any]]:
        url = (
            f"{self.base_url}/prestamos?select="
            "id,usuario_id,ejemplar_id,tipo_prestamo,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,"
            "usuarios(nombre_completo,email,rol,carrera_o_dependencia,telefono),"
            "ejemplares(codigo_inventario,ubicacion_estante,libros(titulo,isbn,libro_autores(autores(nombre))))"
            "&order=fecha_prestamo.desc"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400:
                fallback_url = (
                    f"{self.base_url}/prestamos?select="
                    "id,usuario_id,ejemplar_id,tipo_prestamo,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,"
                    "usuarios(nombre_completo,email,rol,carrera_o_dependencia),"
                    "ejemplares(codigo_inventario,ubicacion_estante,libros(titulo,isbn,libro_autores(autores(nombre))))"
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
            "id,usuario_id,ejemplar_id,tipo_prestamo,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,"
            "usuarios(nombre_completo,email,rol,carrera_o_dependencia,telefono),"
            "ejemplares(codigo_inventario,ubicacion_estante,libros(titulo,isbn,libro_autores(autores(nombre))))"
        )
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=self.headers, timeout=10.0)
            if resp.status_code == 400:
                fallback_url = (
                    f"{self.base_url}/prestamos?id=eq.{clean_id}&select="
                    "id,usuario_id,ejemplar_id,tipo_prestamo,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,"
                    "usuarios(nombre_completo,email,rol,carrera_o_dependencia),"
                    "ejemplares(codigo_inventario,ubicacion_estante,libros(titulo,isbn,libro_autores(autores(nombre))))"
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
            "id,usuario_id,ejemplar_id,tipo_prestamo,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,"
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
                    "tipo_prestamo": r.get("tipo_prestamo") or "domicilio",
                    "fecha_prestamo": r.get("fecha_prestamo"),
                    "fecha_limite_devolucion": r.get("fecha_limite_devolucion"),
                    "fecha_devolucion_real": r.get("fecha_devolucion_real"),
                    "estado": r.get("estado") or "activo",
                    "notas": r.get("notas") or ""
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

    async def create_loan(self, loan_data: Dict[str, Any]) -> Dict[str, Any]:
        url = f"{self.base_url}/prestamos"
        clean_payload = dict(loan_data)
        
        # Validar y normalizar fechas al formato ISO 8601 UTC timestamptz
        if "fecha_prestamo" in clean_payload and clean_payload["fecha_prestamo"]:
            clean_payload["fecha_prestamo"] = validate_and_normalize_timestamptz(
                clean_payload["fecha_prestamo"], "fecha_prestamo"
            )
        if "fecha_limite_devolucion" in clean_payload and clean_payload["fecha_limite_devolucion"]:
            clean_payload["fecha_limite_devolucion"] = validate_and_normalize_timestamptz(
                clean_payload["fecha_limite_devolucion"], "fecha_limite_devolucion"
            )
        if "fecha_devolucion_real" in clean_payload and clean_payload["fecha_devolucion_real"]:
            clean_payload["fecha_devolucion_real"] = validate_and_normalize_timestamptz(
                clean_payload["fecha_devolucion_real"], "fecha_devolucion_real"
            )

        async with httpx.AsyncClient() as client:
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
        - Editorial (editoriales)
        - Autor(es) (autores y libro_autores)
        - Libro (libros)
        - Categoría temática (libro_temas)
        - Ejemplares físicos (ejemplares)
        - Resumen analítico IA (resumenes_ia)
        Utiliza permisos de servicio para omitir restricciones RLS.
        """
        import re
        async with httpx.AsyncClient(timeout=15.0) as client:
            # 1. Resolver o crear Editorial
            editorial_id = None
            editorial_nombre = (data.get("editorial") or data.get("publisher") or "").strip()
            if editorial_nombre:
                ed_resp = await client.get(
                    f"{self.base_url}/editoriales?nombre=ilike.{editorial_nombre}&select=id",
                    headers=self.headers
                )
                ed_list = ed_resp.json() if ed_resp.is_success else []
                if ed_list and len(ed_list) > 0:
                    editorial_id = ed_list[0]["id"]
                else:
                    new_ed = await client.post(
                        f"{self.base_url}/editoriales",
                        headers=self.headers,
                        json={"nombre": editorial_nombre}
                    )
                    if new_ed.is_success and new_ed.json():
                        editorial_id = new_ed.json()[0]["id"]

            # 2. Insertar Libro en tabla 'libros'
            isbn = str(data.get("isbn") or "").strip()
            titulo = str(data.get("titulo") or data.get("title") or "").strip()
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
                headers=self.headers,
                json=libro_payload
            )
            libro_resp.raise_for_status()
            created_libro = libro_resp.json()[0]
            libro_id = created_libro["id"]

            # 3. Resolver o crear Autores y asociar en libro_autores
            autores_raw = str(data.get("autor") or data.get("author") or "Autor Desconocido")
            autores_list = [a.strip() for a in re.split(r'[,;]', autores_raw) if a.strip()]
            for idx, a_nombre in enumerate(autores_list):
                autor_id = None
                a_resp = await client.get(
                    f"{self.base_url}/autores?nombre=ilike.{a_nombre}&select=id",
                    headers=self.headers
                )
                a_items = a_resp.json() if a_resp.is_success else []
                if a_items and len(a_items) > 0:
                    autor_id = a_items[0]["id"]
                else:
                    new_a = await client.post(
                        f"{self.base_url}/autores",
                        headers=self.headers,
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

            # 4. Asociar Categoría / Tema en libro_temas
            tema_resp = await client.get(
                f"{self.base_url}/temas?nombre=ilike.*{categoria[:3]}*&select=id",
                headers=self.headers
            )
            tema_items = tema_resp.json() if tema_resp.is_success else []
            if tema_items and len(tema_items) > 0:
                await client.post(
                    f"{self.base_url}/libro_temas",
                    headers=self.headers,
                    json={"libro_id": libro_id, "tema_id": tema_items[0]["id"]}
                )

            # 5. Generar Ejemplares Físicos
            total_copias = data.get("total_copias") or data.get("totalCopies") or 1
            try:
                total_copias = int(total_copias)
            except (ValueError, TypeError):
                total_copias = 1
            total_copias = max(1, min(total_copias, 20))

            ubicacion = str(data.get("ubicacion") or data.get("location") or "Estante A-1, Nivel 1").strip()
            clean_isbn = re.sub(r'[^A-Za-z0-9]', '', isbn)
            sufijo_isbn = clean_isbn[-4:] if len(clean_isbn) >= 4 else "001"

            ejemplares_creados = []
            for i in range(total_copias):
                letra_copia = chr(65 + i) if i < 26 else str(i + 1)
                cod_inv = f"CIU-{sufijo_isbn}-{letra_copia}"
                ej_resp = await client.post(
                    f"{self.base_url}/ejemplares",
                    headers=self.headers,
                    json={
                        "libro_id": libro_id,
                        "codigo_inventario": cod_inv,
                        "ubicacion_estante": ubicacion,
                        "estado": "disponible",
                        "observaciones": f"Ejemplar {letra_copia} ingresado al acervo"
                    }
                )
                if ej_resp.is_success and ej_resp.json():
                    ejemplares_creados.append(ej_resp.json()[0])

            # 6. Guardar Resumen IA si fue proporcionado
            descripcion = (data.get("descripcion") or data.get("description") or "").strip()
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

            created_libro["ejemplares"] = ejemplares_creados
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
        Actualiza los datos de un libro en Supabase.
        Requiere rol administrativo.
        """
        check_url = f"{self.base_url}/libros?id=eq.{book_id}&select=id,titulo,isbn"
        async with httpx.AsyncClient(timeout=10.0) as client:
            check_resp = await client.get(check_url, headers=self.headers)
            if not check_resp.is_success or not check_resp.json():
                return {"status": "not_found"}

            payload: Dict[str, Any] = {}
            if "titulo" in updates or "title" in updates:
                payload["titulo"] = str(updates.get("titulo") or updates.get("title")).strip()
            if "isbn" in updates:
                payload["isbn"] = str(updates["isbn"]).strip()
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

            if not payload:
                return {"status": "no_changes", "id": book_id}

            patch_url = f"{self.base_url}/libros?id=eq.{book_id}"
            patch_resp = await client.patch(patch_url, headers=self.headers, json=payload)
            patch_resp.raise_for_status()
            updated_items = patch_resp.json()
            return {
                "status": "success",
                "id": book_id,
                "data": updated_items[0] if updated_items else payload
            }

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
            if "telefono" in updates or "phone" in updates:
                payload["telefono"] = updates.get("telefono") or updates.get("phone")
            if "carrera_o_dependencia" in updates:
                payload["carrera_o_dependencia"] = updates.get("carrera_o_dependencia")
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

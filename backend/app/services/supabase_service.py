import httpx
from app.core.config import settings
from typing import List, Dict, Any, Optional

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
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, headers=self.headers, json=loan_data, timeout=10.0)
            resp.raise_for_status()
            created = resp.json()
            if isinstance(created, list) and len(created) > 0:
                created = created[0]

            ejemplar_id = loan_data.get("ejemplar_id")
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

supabase_service = SupabaseService()

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

supabase_service = SupabaseService()

"""
Tests de integración para los endpoints de temas (GET, POST, PATCH, DELETE).

Estrategia: TestClient de FastAPI + mocking de supabase_service para aislar
la lógica de routing y autenticación del acceso real a Supabase.

Cobertura:
  1. Alta válida de un tema nuevo
  2. Código duplicado (HTTP 409)
  3. Nombre duplicado (HTTP 409)
  4. Eliminación de tema sin relaciones (éxito)
  5. Bloqueo de eliminación si tiene libros asociados (HTTP 409)
  6. Acceso sin sesión a endpoints protegidos (HTTP 401)
  7. Acceso de lector/alumno a endpoints solo-admin (HTTP 403)
  8. Acceso de administrador — operaciones permitidas (HTTP 2xx)
"""

import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

# ---------------------------------------------------------------------------
# Tokens de prueba reutilizables
# ---------------------------------------------------------------------------
def admin_token() -> str:
    return create_access_token({
        "id": "admin-test-uuid-0001",
        "email": "admin@acervo.upd.edu.mx",
        "rol": "admin",
        "kind": "ADMINISTRATIVE"
    })

def reader_token() -> str:
    return create_access_token({
        "id": "reader-test-uuid-0002",
        "email": "lector@upd.edu.mx",
        "rol": "lector",
        "kind": "NORMAL"
    })

def admin_headers() -> dict:
    return {"Authorization": f"Bearer {admin_token()}"}

def reader_headers() -> dict:
    return {"Authorization": f"Bearer {reader_token()}"}


# ===========================================================================
# 1. ACCESO SIN SESIÓN (HTTP 401)
# ===========================================================================

class TestAccesoSinSesion:
    def test_get_temas_sin_token(self):
        """GET /temas sin Authorization → 401"""
        resp = client.get("/api/v1/data/temas")
        assert resp.status_code == 401

    def test_post_temas_sin_token(self):
        """POST /temas sin Authorization → 401"""
        resp = client.post("/api/v1/data/temas", json={"nombre": "Historia"})
        assert resp.status_code == 401

    def test_patch_temas_sin_token(self):
        """PATCH /temas/{id} sin Authorization → 401"""
        resp = client.patch("/api/v1/data/temas/1", json={"nombre": "Historia Moderna"})
        assert resp.status_code == 401

    def test_delete_temas_sin_token(self):
        """DELETE /temas/{id} sin Authorization → 401"""
        resp = client.delete("/api/v1/data/temas/1")
        assert resp.status_code == 401


# ===========================================================================
# 2. ACCESO DE LECTOR (HTTP 403 en mutaciones, HTTP 2xx en lectura)
# ===========================================================================

class TestAccesoLector:
    def test_get_temas_lector_ok(self):
        """GET /temas con token de lector → 200 (lectura pública autenticada)"""
        with patch(
            "app.services.supabase_service.supabase_service.get_temas",
            new_callable=AsyncMock,
            return_value=[{"id": 1, "nombre": "Ciencias", "descripcion": None, "libros_count": 3}]
        ):
            resp = client.get("/api/v1/data/temas", headers=reader_headers())
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert data[0]["nombre"] == "Ciencias"

    def test_post_temas_lector_forbid(self):
        """POST /temas con token de lector → 403"""
        resp = client.post("/api/v1/data/temas", json={"nombre": "Arte"}, headers=reader_headers())
        assert resp.status_code == 403

    def test_patch_temas_lector_forbid(self):
        """PATCH /temas/{id} con token de lector → 403"""
        resp = client.patch("/api/v1/data/temas/1", json={"nombre": "Arte Moderno"}, headers=reader_headers())
        assert resp.status_code == 403

    def test_delete_temas_lector_forbid(self):
        """DELETE /temas/{id} con token de lector → 403"""
        resp = client.delete("/api/v1/data/temas/1", headers=reader_headers())
        assert resp.status_code == 403


# ===========================================================================
# 3. ALTA VÁLIDA (admin, HTTP 201)
# ===========================================================================

class TestAltaValida:
    def test_crear_tema_ok(self):
        """POST /temas con datos válidos → 201 y datos del tema creado"""
        nuevo_tema = {
            "id": 42,
            "nombre": "Ingeniería de Software",
            "descripcion": "Área de desarrollo y diseño de sistemas.",
        }
        with patch(
            "app.services.supabase_service.supabase_service.create_tema",
            new_callable=AsyncMock,
            return_value=nuevo_tema
        ):
            resp = client.post(
                "/api/v1/data/temas",
                json={"nombre": "Ingeniería de Software", "descripcion": "Área de desarrollo y diseño de sistemas."},
                headers=admin_headers()
            )
        assert resp.status_code == 201
        body = resp.json()
        assert body["created"] is True
        assert body["data"]["nombre"] == "Ingeniería de Software"

    def test_crear_tema_con_codigo_ok(self):
        """POST /temas con nombre y codigo válidos → 201"""
        nuevo = {"id": 43, "nombre": "Matemáticas", "codigo": "MAT-001"}
        with patch(
            "app.services.supabase_service.supabase_service.create_tema",
            new_callable=AsyncMock,
            return_value=nuevo
        ):
            resp = client.post(
                "/api/v1/data/temas",
                json={"nombre": "Matemáticas", "codigo": "MAT-001"},
                headers=admin_headers()
            )
        assert resp.status_code == 201
        assert resp.json()["data"]["codigo"] == "MAT-001"


# ===========================================================================
# 4. NOMBRE DUPLICADO (HTTP 409)
# ===========================================================================

class TestNombreDuplicado:
    def test_crear_nombre_duplicado(self):
        """POST /temas con nombre ya registrado → 409 Conflict"""
        with patch(
            "app.services.supabase_service.supabase_service.create_tema",
            new_callable=AsyncMock,
            side_effect=ValueError("Ya existe un tema con el nombre 'Química'.")
        ):
            resp = client.post(
                "/api/v1/data/temas",
                json={"nombre": "Química"},
                headers=admin_headers()
            )
        assert resp.status_code == 409
        assert "ya existe" in resp.json()["detail"].lower()


# ===========================================================================
# 5. CÓDIGO DUPLICADO (HTTP 409)
# ===========================================================================

class TestCodigoDuplicado:
    def test_crear_codigo_duplicado(self):
        """POST /temas con código ya registrado → 409 Conflict"""
        with patch(
            "app.services.supabase_service.supabase_service.create_tema",
            new_callable=AsyncMock,
            side_effect=ValueError("Ya existe un tema con el código 'FIS-001'.")
        ):
            resp = client.post(
                "/api/v1/data/temas",
                json={"nombre": "Física Avanzada", "codigo": "FIS-001"},
                headers=admin_headers()
            )
        assert resp.status_code == 409
        assert "FIS-001" in resp.json()["detail"]

    def test_patch_codigo_duplicado(self):
        """PATCH /temas/{id} con código ya registrado en otro tema → 409"""
        with patch(
            "app.services.supabase_service.supabase_service.update_tema",
            new_callable=AsyncMock,
            side_effect=ValueError("Ya existe otro tema con el código 'QUI-001'.")
        ):
            resp = client.patch(
                "/api/v1/data/temas/5",
                json={"codigo": "QUI-001"},
                headers=admin_headers()
            )
        assert resp.status_code == 409


# ===========================================================================
# 6. ELIMINACIÓN SIN RELACIONES (HTTP 200)
# ===========================================================================

class TestEliminacionSinRelaciones:
    def test_delete_tema_sin_libros(self):
        """DELETE /temas/{id} sin libros asociados → 200 deleted=True"""
        with patch(
            "app.services.supabase_service.supabase_service.delete_tema",
            new_callable=AsyncMock,
            return_value={"status": "success", "id": 7, "nombre": "Tema Vacío"}
        ):
            resp = client.delete("/api/v1/data/temas/7", headers=admin_headers())
        assert resp.status_code == 200
        body = resp.json()
        assert body["deleted"] is True
        assert body["id"] == 7

    def test_delete_tema_no_encontrado(self):
        """DELETE /temas/{id} que no existe → 404"""
        with patch(
            "app.services.supabase_service.supabase_service.delete_tema",
            new_callable=AsyncMock,
            return_value={"status": "not_found"}
        ):
            resp = client.delete("/api/v1/data/temas/9999", headers=admin_headers())
        assert resp.status_code == 404


# ===========================================================================
# 7. BLOQUEO CON RELACIONES (HTTP 409)
# ===========================================================================

class TestBloqueoConRelaciones:
    def test_delete_tema_con_libros(self):
        """DELETE /temas/{id} con libros asociados → 409 Conflict"""
        with patch(
            "app.services.supabase_service.supabase_service.delete_tema",
            new_callable=AsyncMock,
            return_value={
                "status": "has_books",
                "libro_count": 5,
                "message": "No es posible eliminar el tema 'Ciencias' porque tiene 5 libro(s) asociado(s)."
            }
        ):
            resp = client.delete("/api/v1/data/temas/2", headers=admin_headers())
        assert resp.status_code == 409
        detail = resp.json()["detail"]
        assert "5 libro" in detail or "asociado" in detail


# ===========================================================================
# 8. ACCESO ADMIN — OPERACIONES PERMITIDAS
# ===========================================================================

class TestAccesoAdmin:
    def test_get_temas_admin(self):
        """GET /temas con token de admin → 200"""
        with patch(
            "app.services.supabase_service.supabase_service.get_temas",
            new_callable=AsyncMock,
            return_value=[
                {"id": 1, "nombre": "Ciencias", "descripcion": None, "libros_count": 10},
                {"id": 2, "nombre": "Arte", "descripcion": "Bellas artes", "libros_count": 2},
            ]
        ):
            resp = client.get("/api/v1/data/temas", headers=admin_headers())
        assert resp.status_code == 200
        assert len(resp.json()) == 2

    def test_patch_tema_admin_ok(self):
        """PATCH /temas/{id} con admin y datos válidos → 200"""
        with patch(
            "app.services.supabase_service.supabase_service.update_tema",
            new_callable=AsyncMock,
            return_value={"status": "success", "id": 1, "data": {"id": 1, "nombre": "Ciencias Exactas"}}
        ):
            resp = client.patch(
                "/api/v1/data/temas/1",
                json={"nombre": "Ciencias Exactas"},
                headers=admin_headers()
            )
        assert resp.status_code == 200
        body = resp.json()
        assert body["updated"] is True
        assert body["id"] == 1

    def test_toggle_tema_admin_ok(self):
        """PATCH /temas/{id}/toggle con admin → 200"""
        with patch(
            "app.services.supabase_service.supabase_service.toggle_tema",
            new_callable=AsyncMock,
            return_value={"status": "success", "id": 3, "activa": False, "data": {"activa": False}}
        ):
            resp = client.patch(
                "/api/v1/data/temas/3/toggle",
                json={"activa": False},
                headers=admin_headers()
            )
        assert resp.status_code == 200
        body = resp.json()
        assert body["updated"] is True
        assert body["activa"] is False

    def test_toggle_tema_sin_campo_activa(self):
        """PATCH /temas/{id}/toggle sin campo 'activa' → 400"""
        resp = client.patch(
            "/api/v1/data/temas/3/toggle",
            json={"otro_campo": True},
            headers=admin_headers()
        )
        assert resp.status_code == 400

    def test_patch_tema_id_no_modificable(self):
        """PATCH /temas/{id} intentando cambiar el id → el id del payload es ignorado"""
        with patch(
            "app.services.supabase_service.supabase_service.update_tema",
            new_callable=AsyncMock,
            return_value={"status": "success", "id": 1, "data": {"id": 1, "nombre": "Física"}}
        ) as mock_update:
            resp = client.patch(
                "/api/v1/data/temas/1",
                json={"id": 999, "nombre": "Física"},
                headers=admin_headers()
            )
            # El router debe haber eliminado `id` del payload antes de llamar al service
            call_kwargs = mock_update.call_args
            passed_payload = call_kwargs[0][1] if call_kwargs[0] else call_kwargs[1].get("payload", {})
            assert "id" not in passed_payload

        assert resp.status_code == 200

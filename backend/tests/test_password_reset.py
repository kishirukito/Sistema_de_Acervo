from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient

from app.main import app
from app.core.security import create_access_token
from app.api.v1 import auth_router


client = TestClient(app)


def _admin_headers(user_id: str = "admin-1") -> dict:
    token = create_access_token({
        "sub": user_id,
        "id": user_id,
        "email": "admin@upd.edu.mx",
        "rol": "admin",
        "kind": "ADMINISTRATIVE",
        "name": "Admin",
    })
    return {"Authorization": f"Bearer {token}"}


def _student_headers(user_id: str = "student-1") -> dict:
    token = create_access_token({
        "sub": user_id,
        "id": user_id,
        "email": "alumno@upd.edu.mx",
        "rol": "alumno",
        "kind": "NORMAL",
        "name": "Alumno",
    })
    return {"Authorization": f"Bearer {token}"}


def _clear_state():
    auth_router._reset_requests.clear()
    auth_router._rate_limit.clear()


def test_forgot_password_unknown_email_returns_generic_200():
    _clear_state()
    mock_resp = MagicMock(is_success=True)
    mock_resp.json.return_value = []

    with patch("app.api.v1.auth_router.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get.return_value = mock_resp
        mock_client_cls.return_value.__aenter__.return_value = mock_client

        resp = client.post("/api/v1/auth/forgot-password", json={"email": "noexiste@upd.edu.mx"})

    assert resp.status_code == 200
    assert "Si el correo está registrado" in resp.json()["message"]
    assert auth_router._reset_requests == {}


def test_pending_requires_auth_and_admin():
    _clear_state()
    assert client.get("/api/v1/auth/forgot-password/pending").status_code == 401
    assert client.get("/api/v1/auth/forgot-password/pending", headers=_student_headers()).status_code == 403


def test_admin_reset_requires_admin():
    resp = client.post("/api/v1/data/usuarios/u-2/password-reset", headers=_student_headers())
    assert resp.status_code == 403


def test_admin_cannot_reset_own_password():
    resp = client.post("/api/v1/data/usuarios/admin-1/password-reset", headers=_admin_headers("admin-1"))
    assert resp.status_code == 400


def test_forgot_password_to_admin_reset_happy_path():
    _clear_state()

    get_user_resp = MagicMock(is_success=True)
    get_user_resp.json.return_value = [
        {
            "id": "user-42",
            "nombre_completo": "Ana Pérez",
            "email": "ana@upd.edu.mx",
            "estado": "activo",
        }
    ]

    with patch("app.api.v1.auth_router.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get.return_value = get_user_resp
        mock_client_cls.return_value.__aenter__.return_value = mock_client

        forgot_resp = client.post("/api/v1/auth/forgot-password", json={"email": "ana@upd.edu.mx"})

    assert forgot_resp.status_code == 200

    # Admin sees pending request
    pending_resp = client.get("/api/v1/auth/forgot-password/pending", headers=_admin_headers())
    assert pending_resp.status_code == 200
    pending_list = pending_resp.json()
    assert len(pending_list) == 1
    assert pending_list[0]["user_id"] == "user-42"
    assert pending_list[0]["email"] == "ana@upd.edu.mx"

    # Admin resets password
    get_target_resp = MagicMock(is_success=True)
    get_target_resp.json.return_value = [{"id": "user-42", "estado": "activo"}]
    patch_resp = MagicMock(is_success=True)

    with patch("app.api.v1.data_router.httpx.AsyncClient") as mock_data_client_cls:
        mock_client = AsyncMock()
        mock_client.get.return_value = get_target_resp
        mock_client.patch.return_value = patch_resp
        mock_data_client_cls.return_value.__aenter__.return_value = mock_client

        reset_resp = client.post("/api/v1/data/usuarios/user-42/password-reset", headers=_admin_headers())

    assert reset_resp.status_code == 200
    assert len(reset_resp.json()["temp_password"]) >= 12

    # Pending request cleared automatically
    after_resp = client.get("/api/v1/auth/forgot-password/pending", headers=_admin_headers())
    assert after_resp.status_code == 200
    assert after_resp.json() == []

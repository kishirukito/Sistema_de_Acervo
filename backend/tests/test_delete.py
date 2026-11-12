import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

def test_delete_endpoints_unauthenticated():
    # Sin token -> debe responder 401 Unauthorized
    resp_book = client.delete("/api/v1/data/libros/00000000-0000-0000-0000-000000000000")
    assert resp_book.status_code == 401

    resp_user = client.delete("/api/v1/data/usuarios/00000000-0000-0000-0000-000000000000")
    assert resp_user.status_code == 401

    resp_loan = client.delete("/api/v1/data/prestamos/00000000-0000-0000-0000-000000000000")
    assert resp_loan.status_code == 401

    resp_ai = client.delete("/api/v1/ai/resumen/00000000-0000-0000-0000-000000000000")
    assert resp_ai.status_code == 401

def test_delete_endpoints_forbidden_for_student():
    student_token = create_access_token({
        "id": "student-test-uuid",
        "email": "carlos.hernandez@upd.edu.mx",
        "rol": "alumno",
        "role": "STUDENT",
        "kind": "NORMAL"
    })
    headers = {"Authorization": f"Bearer {student_token}"}

    resp_book = client.delete("/api/v1/data/libros/00000000-0000-0000-0000-000000000000", headers=headers)
    assert resp_book.status_code == 403

    resp_user = client.delete("/api/v1/data/usuarios/00000000-0000-0000-0000-000000000000", headers=headers)
    assert resp_user.status_code == 403

    resp_loan = client.delete("/api/v1/data/prestamos/00000000-0000-0000-0000-000000000000", headers=headers)
    assert resp_loan.status_code == 403

    resp_ai = client.delete("/api/v1/ai/resumen/00000000-0000-0000-0000-000000000000", headers=headers)
    assert resp_ai.status_code == 403

def test_delete_book_not_found_as_admin():
    admin_token = create_access_token({
        "id": "admin-test-uuid",
        "email": "admin@acervo.edu.mx",
        "rol": "admin",
        "role": "ADMINISTRATIVE",
        "kind": "ADMINISTRATIVE"
    })
    headers = {"Authorization": f"Bearer {admin_token}"}

    resp = client.delete("/api/v1/data/libros/ffffffff-ffff-ffff-ffff-ffffffffffff", headers=headers)
    assert resp.status_code == 404
    assert "No se encontró el libro" in resp.json().get("detail", "")

def test_patch_endpoints_unauthenticated_and_student():
    # Sin token -> 401
    assert client.patch("/api/v1/data/libros/00000000-0000-0000-0000-000000000000", json={"titulo": "Test"}).status_code == 401
    assert client.patch("/api/v1/data/usuarios/00000000-0000-0000-0000-000000000000", json={"estado": "inactivo"}).status_code == 401
    assert client.patch("/api/v1/data/prestamos/00000000-0000-0000-0000-000000000000", json={"estado": "devuelto"}).status_code == 401

    # Con token de alumno -> 403
    student_token = create_access_token({
        "id": "student-test-uuid",
        "email": "carlos.hernandez@upd.edu.mx",
        "rol": "alumno",
        "role": "STUDENT",
        "kind": "NORMAL"
    })
    headers = {"Authorization": f"Bearer {student_token}"}
    assert client.patch("/api/v1/data/libros/00000000-0000-0000-0000-000000000000", json={"titulo": "Test"}, headers=headers).status_code == 403
    assert client.patch("/api/v1/data/usuarios/00000000-0000-0000-0000-000000000000", json={"estado": "inactivo"}, headers=headers).status_code == 403
    assert client.patch("/api/v1/data/prestamos/00000000-0000-0000-0000-000000000000", json={"estado": "devuelto"}, headers=headers).status_code == 403


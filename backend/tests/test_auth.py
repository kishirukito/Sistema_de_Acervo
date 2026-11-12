import pytest
from app.core.security import create_access_token, decode_access_token
from fastapi import HTTPException

def test_jwt_create_and_decode():
    payload = {
        "id": "user-test-123",
        "email": "test@upd.edu.mx",
        "rol": "alumno",
        "kind": "NORMAL"
    }
    token = create_access_token(payload)
    assert isinstance(token, str)
    assert len(token.split(".")) == 3

    decoded = decode_access_token(token)
    assert decoded["id"] == "user-test-123"
    assert decoded["email"] == "test@upd.edu.mx"
    assert decoded["rol"] == "alumno"
    assert decoded["kind"] == "NORMAL"
    assert "exp" in decoded

def test_jwt_tampered_signature():
    token = create_access_token({"id": "valid-user", "rol": "admin"})
    parts = token.split(".")
    tampered = f"{parts[0]}.{parts[1]}.tampered_signature"
    with pytest.raises(HTTPException) as exc_info:
        decode_access_token(tampered)
    assert exc_info.value.status_code == 401


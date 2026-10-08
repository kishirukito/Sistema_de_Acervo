import pytest
from app.core.security import get_password_hash, verify_password, create_access_token
from jose import jwt
from app.core.config import settings

def test_password_hashing():
    """Prueba que el hashing y verificación de contraseñas sea correcto."""
    password = "SuperPassword123!"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("WrongPassword", hashed) is False

def test_jwt_token_generation():
    """Prueba la generación de token JWT y decodificación de payload."""
    user_id = "a0000000-0000-0000-0000-000000000001"
    role = "admin"
    token = create_access_token(subject=user_id, role=role)
    
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    assert payload.get("sub") == user_id
    assert payload.get("role") == role
    assert "exp" in payload

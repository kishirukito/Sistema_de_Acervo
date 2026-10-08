from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.core.config import settings
from app.schemas.user_schema import UserResponse
from app.core.database import supabase_client

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserResponse:
    """Extrae, decodifica el token JWT y valida al usuario en Supabase."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales no válidas o sesión expirada",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Consulta a Supabase
    try:
        response = supabase_client.table("usuarios").select("*").eq("id", user_id).single().execute()
        user = response.data
    except Exception:
        raise credentials_exception

    if not user:
        raise credentials_exception
    
    if user.get("estado") != "activo":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La cuenta del usuario se encuentra inactiva o suspendida"
        )

    return UserResponse(**user)

class RoleChecker:
    """Validador de roles permitidos para control de acceso (RBAC)."""
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: UserResponse = Depends(get_current_user)):
        if current_user.rol not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permisos insuficientes. Requiere uno de los siguientes roles: {self.allowed_roles}"
            )
        return current_user

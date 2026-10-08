from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.auth_schema import LoginRequest, Token
from app.schemas.user_schema import UserResponse, UserCreate
from app.core.security import verify_password, get_password_hash, create_access_token
from app.core.deps import get_current_user, RoleChecker
from app.core.database import supabase_client
from app.services.audit_service import log_action

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login", response_model=Token)
async def login(credentials: LoginRequest):
    """Autentica al usuario por correo y contraseña, emitiendo un token JWT."""
    try:
        result = supabase_client.table("usuarios").select("*").eq("email", credentials.email).execute()
        if not result.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo o contraseña incorrectos")
        
        user = result.data[0]
        if not verify_password(credentials.password, user["password_hash"]):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo o contraseña incorrectos")
        
        if user.get("estado") != "activo":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cuenta suspendida o inactiva")

        token = create_access_token(subject=user["id"], role=user["rol"])
        
        await log_action(
            usuario_id=user["id"],
            accion="LOGIN",
            tabla_afectada="usuarios",
            registro_id=user["id"],
            detalle_cambio={"email": user["email"]}
        )

        return Token(access_token=token, role=user["rol"], user_id=str(user["id"]))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en autenticación: {str(e)}")

@router.post("/token", response_model=Token, include_in_schema=False)
async def login_form(form_data: OAuth2PasswordRequestForm = Depends()):
    """Soporte para login mediante Swagger UI OAuth2."""
    return await login(LoginRequest(email=form_data.username, password=form_data.password))

@router.get("/me", response_model=UserResponse)
async def get_my_profile(current_user: UserResponse = Depends(get_current_user)):
    """Retorna la información del perfil del usuario actualmente autenticado."""
    return current_user

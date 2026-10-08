from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from app.schemas.user_schema import UserResponse, UserCreate, UserUpdate
from app.core.security import get_password_hash
from app.core.deps import get_current_user, RoleChecker
from app.core.database import supabase_client
from app.services.audit_service import log_action

router = APIRouter(prefix="/users", tags=["Usuarios"])

@router.get("/", response_model=List[UserResponse], dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def list_users():
    """Listado general de usuarios (Personal y Administradores)."""
    res = supabase_client.table("usuarios").select("*").order("created_at", desc=True).execute()
    return res.data

@router.post("/", response_model=UserResponse, dependencies=[Depends(RoleChecker(["admin"]))])
async def create_user(user_in: UserCreate, current_user: UserResponse = Depends(get_current_user)):
    """Crea un nuevo usuario en el sistema (Solo Administradores)."""
    # Verificar si el correo ya existe
    existing = supabase_client.table("usuarios").select("id").eq("email", user_in.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="El correo electrónico ya se encuentra registrado")

    user_dict = user_in.model_dump(exclude={"password"})
    user_dict["password_hash"] = get_password_hash(user_in.password)
    
    res = supabase_client.table("usuarios").insert(user_dict).execute()
    new_user = res.data[0]

    await log_action(
        usuario_id=current_user.id,
        accion="CREATE_USER",
        tabla_afectada="usuarios",
        registro_id=new_user["id"],
        detalle_cambio={"email": new_user["email"], "rol": new_user["rol"]}
    )

    return new_user

@router.get("/{user_id}", response_model=UserResponse, dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def get_user_by_id(user_id: UUID):
    """Consulta los datos de un usuario por su ID."""
    res = supabase_client.table("usuarios").select("*").eq("id", str(user_id)).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return res.data[0]

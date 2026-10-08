from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from datetime import datetime, timedelta, timezone
from app.schemas.loan_schema import LoanResponse, LoanCreate, LoanReturn
from app.schemas.user_schema import UserResponse
from app.core.deps import get_current_user, RoleChecker
from app.core.database import supabase_client
from app.services.audit_service import log_action

router = APIRouter(prefix="/loans", tags=["Préstamos"])

@router.get("/", response_model=List[LoanResponse], dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def list_loans():
    """Consulta el historial y estado de todos los préstamos registrados."""
    res = supabase_client.table("prestamos").select("*").order("created_at", desc=True).execute()
    return res.data

@router.post("/", response_model=LoanResponse, dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def create_loan(loan_in: LoanCreate, current_user: UserResponse = Depends(get_current_user)):
    """Registra el préstamo de un ejemplar físico a un usuario."""
    # Verificar disponibilidad del ejemplar
    ejemplar_res = supabase_client.table("ejemplares").select("*").eq("id", str(loan_in.ejemplar_id)).single().execute()
    if not ejemplar_res.data:
        raise HTTPException(status_code=404, detail="Ejemplar no encontrado")
    
    if ejemplar_res.data["estado"] != "disponible":
        raise HTTPException(status_code=400, detail=f"El ejemplar no está disponible (Estado: {ejemplar_res.data['estado']})")

    now = datetime.now(timezone.utc)
    due_date = now + timedelta(days=loan_in.dias_prestamo)

    loan_data = {
        "usuario_id": str(loan_in.usuario_id),
        "ejemplar_id": str(loan_in.ejemplar_id),
        "fecha_prestamo": now.isoformat(),
        "fecha_limite_devolucion": due_date.isoformat(),
        "estado": "activo",
        "notas": loan_in.notas
    }

    loan_res = supabase_client.table("prestamos").insert(loan_data).execute()
    new_loan = loan_res.data[0]

    # Actualizar estado del ejemplar a 'prestado'
    supabase_client.table("ejemplares").update({"estado": "prestado"}).eq("id", str(loan_in.ejemplar_id)).execute()

    await log_action(
        usuario_id=current_user.id,
        accion="CREATE_LOAN",
        tabla_afectada="prestamos",
        registro_id=new_loan["id"],
        detalle_cambio={"ejemplar_id": str(loan_in.ejemplar_id), "usuario_id": str(loan_in.usuario_id)}
    )

    return new_loan

@router.post("/{loan_id}/return", response_model=LoanResponse, dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def return_loan(loan_id: UUID, return_in: LoanReturn, current_user: UserResponse = Depends(get_current_user)):
    """Registra la devolución de un ejemplar prestado."""
    loan_res = supabase_client.table("prestamos").select("*").eq("id", str(loan_id)).single().execute()
    if not loan_res.data:
        raise HTTPException(status_code=404, detail="Préstamo no encontrado")
    
    loan = loan_res.data
    if loan["estado"] == "devuelto":
        raise HTTPException(status_code=400, detail="Este préstamo ya ha sido devuelto")

    now = datetime.now(timezone.utc).isoformat()
    updated_loan = supabase_client.table("prestamos").update({
        "estado": "devuelto",
        "fecha_devolucion_real": now,
        "notas": f"{loan.get('notas') or ''} | Devolución: {return_in.notas or 'Sin observaciones'}".strip()
    }).eq("id", str(loan_id)).execute()

    # Reintegrar ejemplar a estado disponible
    supabase_client.table("ejemplares").update({"estado": "disponible"}).eq("id", loan["ejemplar_id"]).execute()

    await log_action(
        usuario_id=current_user.id,
        accion="RETURN_LOAN",
        tabla_afectada="prestamos",
        registro_id=str(loan_id),
        detalle_cambio={"ejemplar_id": loan["ejemplar_id"], "fecha_devolucion": now}
    )

    return updated_loan.data[0]

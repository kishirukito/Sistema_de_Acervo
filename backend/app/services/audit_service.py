from typing import Optional, Any
from uuid import UUID
from app.core.database import supabase_client

async def log_action(
    usuario_id: Optional[UUID],
    accion: str,
    tabla_afectada: str,
    registro_id: str,
    detalle_cambio: Optional[dict[str, Any]] = None
):
    """Registra una acción en la bitácora de auditoría del sistema."""
    try:
        data = {
            "usuario_id": str(usuario_id) if usuario_id else None,
            "accion": accion,
            "tabla_afectada": tabla_afectada,
            "registro_id": str(registro_id),
            "detalle_cambio": detalle_cambio or {}
        }
        supabase_client.table("auditoria_logs").insert(data).execute()
    except Exception as e:
        print(f"[AUDIT ERROR] No se pudo guardar log de auditoría: {e}")

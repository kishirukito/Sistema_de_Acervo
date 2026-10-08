from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """Inicializa y retorna la instancia del cliente Supabase."""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Instancia singleton para reuso en dependencias
supabase_client = get_supabase_client()

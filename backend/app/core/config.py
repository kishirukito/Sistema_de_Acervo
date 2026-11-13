from pathlib import Path
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Microservicio de IA - Sistema de Acervo (CIU)"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Supabase Settings
    SUPABASE_URL: str = "https://ghddarooxlbyjcasbjtx.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # Local AI Service (Ollama / Local LLM)
    AI_PROVIDER: str = "local" # "local" o "cloud"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    LOCAL_AI_MODEL: str = "llama3.2:3b"
    LOCAL_EMBEDDING_MODEL: str = "nomic-embed-text"
    OLLAMA_KEEP_ALIVE: str = "-1" # Mantener modelos cargados en memoria RAM/VRAM indefinidamente
    AI_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=(str(BACKEND_DIR / ".env"), ".env", "backend/.env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

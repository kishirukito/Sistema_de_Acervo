from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

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
    AI_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sistema de Acervo (CIU)"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Supabase / DB
    SUPABASE_URL: str = "https://placeholder.supabase.co"
    SUPABASE_KEY: str = "placeholder_key"
    DATABASE_URL: Optional[str] = None

    # JWT Security
    SECRET_KEY: str = "super_secret_jwt_key_for_sistema_acervo_ciu_default"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # Local AI Service (Ollama / Local LLM / Transformers)
    AI_PROVIDER: str = "local" # "local" o "cloud"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    LOCAL_AI_MODEL: str = "llama3.2:3b"
    LOCAL_EMBEDDING_MODEL: str = "nomic-embed-text"
    AI_API_KEY: Optional[str] = None
    AI_MODEL: str = "llama3.2:3b"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api_router import api_router

app = FastAPI(
    title="Microservicio de IA - Sistema de Acervo (CIU)",
    description="Microservicio especializado en Inteligencia Artificial (FastAPI + Ollama) para generación de resúmenes analíticos, sugerencias temáticas y vectores de embeddings.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuración de CORS para permitir peticiones desde la app Fullstack de Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro del enrutador de IA
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Salud del Servicio"])
async def health_check():
    """Endpoint de comprobación de salud para Next.js y orquestadores."""
    return {
        "status": "healthy",
        "service": "ai-microservice",
        "provider": settings.AI_PROVIDER,
        "ollama_url": settings.OLLAMA_BASE_URL,
        "model": settings.LOCAL_AI_MODEL,
        "embedding_model": settings.LOCAL_EMBEDDING_MODEL
    }

@app.get("/", tags=["Root"])
async def root():
    """Información de bienvenida y catálogo de endpoints del microservicio."""
    return {
        "message": "Microservicio de Inteligencia Artificial - Sistema de Acervo CIU",
        "documentation": "/docs",
        "endpoints": {
            "resumen": f"{settings.API_V1_STR}/ai/resumen",
            "sugerencias": f"{settings.API_V1_STR}/ai/sugerencias",
            "embeddings": f"{settings.API_V1_STR}/ai/embeddings"
        }
    }

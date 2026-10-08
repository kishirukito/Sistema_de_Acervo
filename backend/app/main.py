from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api_router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API RESTful para el Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de rutas de la versión 1
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Salud del Sistema"])
async def health_check():
    """Endpoint para verificar que el servicio se encuentra activo."""
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT
    }

@app.get("/", tags=["Root"])
async def root():
    """Redirección informativa inicial."""
    return {
        "message": f"Bienvenido al backend de {settings.PROJECT_NAME}",
        "documentation": "/docs",
        "api_v1": settings.API_V1_STR
    }

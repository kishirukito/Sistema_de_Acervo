from fastapi import APIRouter
from app.api.v1 import ai
from app.api.v1 import data_router
from app.api.v1 import auth_router
from app.api.v1 import reports_router
from app.api.v1 import temas_routes

api_router = APIRouter()
api_router.include_router(ai.router)
api_router.include_router(data_router.router)
api_router.include_router(auth_router.router)
api_router.include_router(reports_router.router)
api_router.include_router(temas_routes.router)

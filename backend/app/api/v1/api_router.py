from fastapi import APIRouter
from app.api.v1 import auth, users, books, loans, ai

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(books.router)
api_router.include_router(loans.router)
api_router.include_router(ai.router)


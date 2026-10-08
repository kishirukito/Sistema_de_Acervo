from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None
    exp: Optional[int] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

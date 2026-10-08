from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from uuid import UUID
from app.schemas.book_schema import BookResponse, BookCreate, BookUpdate, EjemplarCreate, EjemplarResponse
from app.schemas.user_schema import UserResponse
from app.core.deps import get_current_user, RoleChecker
from app.core.database import supabase_client
from app.services.audit_service import log_action
from app.services.ai_service import AIService

router = APIRouter(prefix="/books", tags=["Libros e Inventario"])

@router.get("/", response_model=List[BookResponse])
async def list_books(
    search: Optional[str] = Query(None, description="Búsqueda por título, autor o ISBN"),
    limit: int = 50,
    offset: int = 0
):
    """Consulta el catálogo de libros con paginación y búsqueda."""
    query = supabase_client.table("libros").select("*, ejemplares(*)")
    if search:
        query = query.or_(f"titulo.ilike.%{search}%,autor.ilike.%{search}%,isbn.ilike.%{search}%")
    
    res = query.range(offset, offset + limit - 1).execute()
    return res.data

@router.post("/", response_model=BookResponse, dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def create_book(book_in: BookCreate, current_user: UserResponse = Depends(get_current_user)):
    """Registra una nueva obra bibliográfica en el catálogo."""
    existing = supabase_client.table("libros").select("id").eq("isbn", book_in.isbn).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Ya existe un libro con ese ISBN")

    book_data = book_in.model_dump(exclude={"tema_ids"})
    res = supabase_client.table("libros").insert(book_data).execute()
    new_book = res.data[0]

    # Asociar temas si existen
    if book_in.tema_ids:
        rel_data = [{"libro_id": new_book["id"], "tema_id": t_id} for t_id in book_in.tema_ids]
        supabase_client.table("libro_temas").insert(rel_data).execute()

    # Generar resumen IA en segundo plano o asíncrono
    try:
        summary_info = await AIService.generate_book_summary(new_book["titulo"], new_book["autor"])
        supabase_client.table("resumenes_ia").insert({
            "libro_id": new_book["id"],
            "resumen_texto": summary_info["resumen"],
            "palabras_clave": summary_info["palabras_clave"],
            "modelo_usado": summary_info["modelo"]
        }).execute()
    except Exception as e:
        print(f"[AI RESUMEN] No se pudo generar resumen automático: {e}")

    await log_action(
        usuario_id=current_user.id,
        accion="CREATE_BOOK",
        tabla_afectada="libros",
        registro_id=new_book["id"],
        detalle_cambio={"isbn": new_book["isbn"], "titulo": new_book["titulo"]}
    )

    return new_book

@router.get("/{book_id}", response_model=BookResponse)
async def get_book_detail(book_id: UUID):
    """Consulta la ficha técnica completa de un libro y sus ejemplares físicos."""
    res = supabase_client.table("libros").select("*, ejemplares(*)").eq("id", str(book_id)).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return res.data

@router.post("/{book_id}/ejemplares", response_model=EjemplarResponse, dependencies=[Depends(RoleChecker(["admin", "personal"]))])
async def add_ejemplar(book_id: UUID, ejemplar_in: EjemplarCreate, current_user: UserResponse = Depends(get_current_user)):
    """Agrega una copia física (ejemplar) a un libro existente."""
    ejemplar_data = ejemplar_in.model_dump()
    ejemplar_data["libro_id"] = str(book_id)

    res = supabase_client.table("ejemplares").insert(ejemplar_data).execute()
    new_ejemplar = res.data[0]

    await log_action(
        usuario_id=current_user.id,
        accion="CREATE_EJEMPLAR",
        tabla_afectada="ejemplares",
        registro_id=new_ejemplar["id"],
        detalle_cambio={"codigo_inventario": new_ejemplar["codigo_inventario"]}
    )

    return new_ejemplar

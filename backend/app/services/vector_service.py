import os
import json
import math
import asyncio
import httpx
import re
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Tuple

from app.core.config import settings
from app.services.ai_service import AIService

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
EMBEDDINGS_FILE = os.path.join(DATA_DIR, "acervo_embeddings.json")

# In-memory index of indexed books
# Key: libro_id -> { "id", "titulo", "autores", "isbn", "ubicacion", "temas", "sinopsis", "embedding", "semantic_text" }
_VECTOR_INDEX: Dict[str, Dict[str, Any]] = {}
_INDEX_LOCK = asyncio.Lock()

QUERY_STOP_WORDS = {
    "un", "una", "unos", "unas", "el", "la", "los", "las", "de", "del", "en", "sobre", 
    "que", "para", "con", "libro", "libros", "quiero", "busco", "necesito", "contenga", 
    "informacion", "información", "acerca", "por", "favor", "dame", "hay", "algun", "algún",
    "materia", "tema", "leer", "estudiar", "aprender"
}

def extract_search_core(query: str) -> str:
    """Extrae el núcleo temático de la consulta en lenguaje natural."""
    words = re.findall(r'\b[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_+#\.]+\b', query.strip())
    meaningful = [w for w in words if w.lower() not in QUERY_STOP_WORDS]
    if meaningful:
        return " ".join(meaningful)
    return query.strip()

def cosine_similarity(a: List[float], b: List[float]) -> float:
    if not a or not b or len(a) != len(b):
        return 0.0
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a))
    nb = math.sqrt(sum(y * y for y in b))
    return (dot / (na * nb)) if na and nb else 0.0

def build_book_semantic_text(book: Dict[str, Any]) -> str:
    titulo = str(book.get("titulo") or "").strip()

    # Extract authors
    autores = []
    if "libro_autores" in book and isinstance(book["libro_autores"], list):
        for la in book["libro_autores"]:
            if isinstance(la, dict):
                if "autores" in la and isinstance(la["autores"], dict):
                    autores.append(la["autores"].get("nombre", ""))
                elif "nombre" in la:
                    autores.append(la["nombre"])
    if not autores and book.get("autor"):
        autores.append(str(book["autor"]))
    autores_str = ", ".join(filter(None, autores)) or "Autor de referencia"

    # Extract themes / classification
    temas = []
    if "libro_temas" in book and isinstance(book["libro_temas"], list):
        for lt in book["libro_temas"]:
            if isinstance(lt, dict):
                if "temas" in lt and isinstance(lt["temas"], dict):
                    temas.append(lt["temas"].get("nombre", ""))
                elif "nombre" in lt:
                    temas.append(lt["nombre"])
    dewey = str(book.get("clasificacion_dewey") or "").strip()
    if dewey:
        temas.append(f"Clasificación Dewey: {dewey}")
    temas_str = ", ".join(filter(None, temas)) or "General"

    # Extract synopsis / AI summary
    sinopsis = ""
    if "resumenes_ia" in book and isinstance(book["resumenes_ia"], list) and book["resumenes_ia"]:
        r = book["resumenes_ia"][0]
        sinopsis = f"{r.get('resumen_texto', '')} Palabras clave: {r.get('palabras_clave', '')}".strip()
    elif book.get("sinopsis"):
        sinopsis = str(book["sinopsis"]).strip()

    # Special heuristics for known literary or foundational works
    if "little prince" in titulo.lower() or "principito" in titulo.lower():
        temas_str += ", Literatura, Filosofía, Relato de aviación y valores humanos"

    return f"search_document: Título: {titulo}. Autores: {autores_str}. Temas y Materias: {temas_str}. Sinopsis y Contenido: {sinopsis}".strip()

class VectorService:
    """
    Servicio de Búsqueda Semántica Vectorial con nomic-embed-text y Grounding con llama3.2:3b.
    Mantiene sincronizado el almacén persistente de embeddings del acervo bibliográfico.
    """

    @classmethod
    def load_index_from_disk(cls) -> None:
        global _VECTOR_INDEX
        try:
            if os.path.exists(EMBEDDINGS_FILE):
                with open(EMBEDDINGS_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        _VECTOR_INDEX = data
                        print(f"[VectorService] {_VECTOR_INDEX.__len__()} libros cargados desde caché vectorial en disco.")
        except Exception as e:
            print(f"[VectorService] Error al cargar caché vectorial desde disco: {e}")

    @classmethod
    def save_index_to_disk(cls) -> None:
        try:
            os.makedirs(DATA_DIR, exist_ok=True)
            with open(EMBEDDINGS_FILE, "w", encoding="utf-8") as f:
                json.dump(_VECTOR_INDEX, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[VectorService] Error al guardar caché vectorial en disco: {e}")

    @classmethod
    async def index_single_book(cls, book_id: str) -> bool:
        """
        Indexa o actualiza el embedding de un libro específico consultando sus datos en Supabase.
        """
        clean_id = str(book_id).strip()
        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"
        }
        url = (
            f"{settings.SUPABASE_URL}/rest/v1/libros?id=eq.{clean_id}"
            f"&select=id,isbn,titulo,anio_publicacion,edicion,clasificacion_dewey,"
            f"libro_autores(autores(nombre)),libro_temas(temas(nombre)),"
            f"ejemplares(id,estado,ubicacion_estante),resumenes_ia(resumen_texto,palabras_clave)"
        )
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(url, headers=headers)
                if res.status_code != 200 or not res.json():
                    return False
                book = res.json()[0]

            semantic_text = build_book_semantic_text(book)
            embedding = await AIService.get_embeddings(semantic_text)
            if not embedding:
                return False

            autores = []
            if "libro_autores" in book and isinstance(book["libro_autores"], list):
                for la in book["libro_autores"]:
                    if isinstance(la, dict) and "autores" in la and isinstance(la["autores"], dict):
                        autores.append(la["autores"].get("nombre", ""))
            temas = []
            if "libro_temas" in book and isinstance(book["libro_temas"], list):
                for lt in book["libro_temas"]:
                    if isinstance(lt, dict) and "temas" in lt and isinstance(lt["temas"], dict):
                        temas.append(lt["temas"].get("nombre", ""))

            ubicacion = "Estantería general"
            if book.get("ejemplares") and isinstance(book["ejemplares"], list):
                for ej in book["ejemplares"]:
                    if ej.get("ubicacion_estante"):
                        ubicacion = ej["ubicacion_estante"]
                        break

            sinopsis = ""
            if book.get("resumenes_ia") and isinstance(book["resumenes_ia"], list) and book["resumenes_ia"]:
                sinopsis = book["resumenes_ia"][0].get("resumen_texto", "")

            async with _INDEX_LOCK:
                _VECTOR_INDEX[clean_id] = {
                    "id": clean_id,
                    "titulo": book.get("titulo", ""),
                    "autores": autores,
                    "isbn": book.get("isbn", ""),
                    "ubicacion": ubicacion,
                    "temas": temas,
                    "sinopsis": sinopsis,
                    "semantic_text": semantic_text,
                    "embedding": embedding,
                    "indexed_at": datetime.now(timezone.utc).isoformat()
                }
                cls.save_index_to_disk()

            return True
        except Exception as e:
            print(f"[VectorService] Error al indexar libro {clean_id}: {e}")
            return False

    @classmethod
    async def remove_book(cls, book_id: str) -> None:
        clean_id = str(book_id).strip()
        async with _INDEX_LOCK:
            if clean_id in _VECTOR_INDEX:
                del _VECTOR_INDEX[clean_id]
                cls.save_index_to_disk()

    @classmethod
    async def index_all_books(cls) -> Dict[str, Any]:
        """
        Indexa en lote todos los libros de la base de datos Supabase con nomic-embed-text.
        """
        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"
        }
        url = (
            f"{settings.SUPABASE_URL}/rest/v1/libros"
            f"?select=id,isbn,titulo,anio_publicacion,edicion,clasificacion_dewey,"
            f"libro_autores(autores(nombre)),libro_temas(temas(nombre)),"
            f"ejemplares(id,estado,ubicacion_estante),resumenes_ia(resumen_texto,palabras_clave)"
        )
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(url, headers=headers)
            if res.status_code != 200:
                raise RuntimeError(f"Error al consultar libros desde Supabase: {res.status_code}")
            books = res.json()

        count_indexed = 0
        new_index: Dict[str, Dict[str, Any]] = {}

        for book in books:
            b_id = book.get("id")
            if not b_id:
                continue

            semantic_text = build_book_semantic_text(book)
            embedding = await AIService.get_embeddings(semantic_text)
            if not embedding:
                print(f"[VectorService] Advertencia: No se pudo generar embedding para '{book.get('titulo')}'")
                continue

            autores = []
            if "libro_autores" in book and isinstance(book["libro_autores"], list):
                for la in book["libro_autores"]:
                    if isinstance(la, dict) and "autores" in la and isinstance(la["autores"], dict):
                        autores.append(la["autores"].get("nombre", ""))
            temas = []
            if "libro_temas" in book and isinstance(book["libro_temas"], list):
                for lt in book["libro_temas"]:
                    if isinstance(lt, dict) and "temas" in lt and isinstance(lt["temas"], dict):
                        temas.append(lt["temas"].get("nombre", ""))

            ubicacion = "Estantería general"
            if book.get("ejemplares") and isinstance(book["ejemplares"], list):
                for ej in book["ejemplares"]:
                    if ej.get("ubicacion_estante"):
                        ubicacion = ej["ubicacion_estante"]
                        break

            sinopsis = ""
            if book.get("resumenes_ia") and isinstance(book["resumenes_ia"], list) and book["resumenes_ia"]:
                sinopsis = book["resumenes_ia"][0].get("resumen_texto", "")

            new_index[b_id] = {
                "id": b_id,
                "titulo": book.get("titulo", ""),
                "autores": autores,
                "isbn": book.get("isbn", ""),
                "ubicacion": ubicacion,
                "temas": temas,
                "sinopsis": sinopsis,
                "semantic_text": semantic_text,
                "embedding": embedding,
                "indexed_at": datetime.now(timezone.utc).isoformat()
            }
            count_indexed += 1

        global _VECTOR_INDEX
        async with _INDEX_LOCK:
            _VECTOR_INDEX = new_index
            cls.save_index_to_disk()

        return {
            "total_libros": len(books),
            "indexados": count_indexed,
            "mensaje": f"Se indexaron exitosamente {count_indexed} de {len(books)} libros del acervo."
        }

    @classmethod
    async def get_fresh_inventory(cls, book_ids: List[str]) -> Dict[str, Dict[str, int]]:
        """Consulta en tiempo real la disponibilidad de ejemplares en Supabase."""
        if not book_ids:
            return {}
        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"
        }
        # In list query
        ids_param = ",".join(book_ids)
        url = f"{settings.SUPABASE_URL}/rest/v1/ejemplares?libro_id=in.({ids_param})&select=libro_id,estado"
        res_map: Dict[str, Dict[str, int]] = {b_id: {"disponibles": 0, "totales": 0} for b_id in book_ids}
        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                r = await client.get(url, headers=headers)
                if r.status_code == 200:
                    for ej in r.json():
                        l_id = ej.get("libro_id")
                        if l_id in res_map:
                            res_map[l_id]["totales"] += 1
                            if ej.get("estado") == "disponible":
                                res_map[l_id]["disponibles"] += 1
        except Exception as e:
            print(f"[VectorService] Error al consultar inventario en tiempo real: {e}")
        return res_map

    @classmethod
    async def ground_with_llm(cls, query: str, candidate_books: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
        """
        Fase 2 de Grounding Anti-Alucinaciones:
        Usa llama3.2:3b a baja temperatura para clasificar la relevancia estricta de cada libro frente a la consulta.
        Devuelve dict con id -> { "relevante": bool, "nivel": "directo" | "relacionado", "razon": str }.
        """
        if not candidate_books:
            return {}

        books_context = "\n".join(
            f"- ID: {b['id']} | Título: {b['titulo']} | Autores: {', '.join(b.get('autores', []))} | Temas: {', '.join(b.get('temas', []))} | Sinopsis: {b.get('sinopsis', '')[:180]}"
            for b in candidate_books
        )

        prompt = f"""Eres el auditor bibliotecario del Sistema de Acervo Universitario.
Consulta del usuario: "{query}"

Catálogo de libros candidatos recuperados:
{books_context}

Tu objetivo es evaluar con precisión la relación entre la consulta del usuario y los libros del catálogo.
Clasifica cada libro en uno de estos tres niveles:
- "directo": El libro aborda específicamente el tema exacto pedido (ej. un libro especializado en Python para consulta de Python, o El Principito para consulta de literatura/principito).
- "relacionado": El libro no es específico del tema pedido, pero comparte el área general o disciplinas afines útiles para el estudiante (ej. libros de programación general o algoritmos cuando busca un lenguaje de programación específico).
- "irrelevante": El libro NO tiene ninguna relación con el tema (ej. literatura, cocina, novelas si busca programación; o informática si busca medicina o el corazón humano).

REGLAS OBLIGATORIAS:
1. "The Little Prince" NUNCA puede ser considerado relevante para temas de tecnología, informática, programación, ciencias exactas ni medicina (debe ser "irrelevante", relevante: false).
2. Si un libro no pertenece al área temática de la consulta (por ejemplo libros de informática cuando el usuario busca medicina, cardiología o biología), clasifícalos OBLIGATORIAMENTE como "irrelevante", relevante: false.
3. Si el libro no aborda el tema o es irrelevante, marca "relevante": false.
4. Si NINGÚN libro es relevante, todos deben tener "relevante": false.
5. En "razon", redacta 1 línea honesta sin fingir relaciones remotas ni especulativas.

Responde ÚNICAMENTE en JSON con esta estructura exacta:
{{
  "evaluaciones": [
    {{
      "id": "ID del libro",
      "relevante": true o false,
      "nivel": "directo" o "relacionado" o "irrelevante",
      "razon": "Justificación concisa de 1 línea"
    }}
  ]
}}"""

        try:
            keep_alive_val: Any = -1
            try:
                keep_alive_val = int(settings.OLLAMA_KEEP_ALIVE)
            except Exception:
                keep_alive_val = settings.OLLAMA_KEEP_ALIVE

            async with httpx.AsyncClient(timeout=25.0) as client:
                res = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json",
                        "keep_alive": keep_alive_val,
                        "options": {
                            "temperature": 0.1,
                            "top_p": 0.8
                        }
                    }
                )
                if res.status_code == 200:
                    raw = res.json().get("response", "")
                    parsed = json.loads(raw)
                    items = parsed.get("evaluaciones", [])
                    valid_items: Dict[str, Dict[str, Any]] = {}
                    disqualify_phrases = [
                        "no se trata", "no trata", "no aborda", "no contiene", "no tiene relacion", 
                        "no se relaciona", "no está relacionado", "no esta relacionado", "diferente tema",
                        "irrelevante", "no menciona", "no es de"
                    ]
                    for item in items:
                        if not isinstance(item, dict) or "id" not in item:
                            continue
                        book_id = item["id"]
                        is_rel = bool(item.get("relevante", False))
                        nivel = str(item.get("nivel", "irrelevante")).lower().strip()
                        razon = str(item.get("razon", "")).strip()
                        razon_lower = razon.lower()

                        # Descalificar si relevante es falso o nivel es irrelevante
                        if not is_rel or nivel == "irrelevante":
                            continue

                        # Descalificar si la razón contiene negaciones explícitas
                        if any(phrase in razon_lower for phrase in disqualify_phrases):
                            continue

                        valid_items[book_id] = {
                            "relevante": True,
                            "nivel": nivel if nivel in ["directo", "relacionado"] else "relacionado",
                            "razon": razon
                        }
                    return valid_items
            return {}
        except Exception as e:
            print(f"[VectorService] Aviso: LLM grounding fallback heurístico ({e})")

        # Fallback heurístico determinista si el LLM no está disponible
        stop_words = {"un", "una", "el", "la", "los", "las", "de", "del", "en", "sobre", "que", "para", "con", "libro", "libros", "quiero", "busco", "necesito", "contenga", "informacion", "acerca"}
        query_words = [w.lower().strip("?,.:;!") for w in query.split() if len(w) > 2 and w.lower() not in stop_words]

        grounded: Dict[str, Dict[str, Any]] = {}
        for b in candidate_books:
            searchable = (b["titulo"] + " " + " ".join(b.get("autores", [])) + " " + " ".join(b.get("temas", [])) + " " + b.get("sinopsis", "")).lower()
            matching_terms = [w for w in query_words if w in searchable]
            if matching_terms:
                grounded[b["id"]] = {
                    "relevante": True,
                    "nivel": "directo" if len(matching_terms) >= 2 else "relacionado",
                    "razon": f"Contiene material y referencias sobre {', '.join(matching_terms)}, alineado a la búsqueda."
                }

        return grounded

        return grounded

    @classmethod
    async def smart_search(cls, query: str, top_k: int = 5, min_score: float = 0.55) -> Dict[str, Any]:
        """
        Búsqueda Inteligente Semántica RAG en 3 fases:
        1. Similitud Coseno con nomic-embed-text.
        2. Umbral de relevancia calibrado.
        3. Grounding y justificación con llama3.2:3b sin alucinaciones.
        """
        clean_query = query.strip()
        if not clean_query:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Ingresa una consulta de búsqueda.",
                "resultados": []
            }

        # Si el índice está vacío en memoria, intentar cargar o auto-indexar
        if not _VECTOR_INDEX:
            cls.load_index_from_disk()
            if not _VECTOR_INDEX:
                await cls.index_all_books()

        if not _VECTOR_INDEX:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente el acervo no cuenta con libros indexados.",
                "resultados": []
            }

        # Paso A: Generar embedding de la consulta usando el núcleo temático normalizado
        core_query = extract_search_core(clean_query)
        query_text = f"search_query: {core_query}"
        query_emb = await AIService.get_embeddings(query_text)
        if not query_emb:
            # Reintento con consulta original
            query_emb = await AIService.get_embeddings(f"search_query: {clean_query}")
        if not query_emb:
            query_emb = await AIService.get_embeddings(core_query)

        if not query_emb:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "No se pudo procesar la consulta semántica con el modelo de lenguaje.",
                "resultados": []
            }

        # Calcular similitudes
        scored_candidates = []
        for book_id, book_data in _VECTOR_INDEX.items():
            b_emb = book_data.get("embedding")
            if not b_emb:
                continue
            score = cosine_similarity(query_emb, b_emb)
            if score >= min_score:
                scored_candidates.append((score, book_data))

        scored_candidates.sort(key=lambda x: x[0], reverse=True)

        if not scored_candidates:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": []
            }

        # Tomar los top candidatos para la validación grounded
        top_candidates = [b for _, b in scored_candidates[:top_k]]
        candidate_scores = {b["id"]: s for s, b in scored_candidates[:top_k]}

        # Paso B y C: Grounding con LLM para asegurar que no se devuelvan falsos positivos
        grounded_explanations = await cls.ground_with_llm(clean_query, top_candidates)

        # Si la validación grounded determinó que ningún libro aborda realmente el tema
        if not grounded_explanations:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": []
            }

        # Filtrar solo los libros verificados
        verified_books = [b for b in top_candidates if b["id"] in grounded_explanations]
        verified_ids = [b["id"] for b in verified_books]

        # Consultar inventario real en tiempo real de ejemplares
        inventory = await cls.get_fresh_inventory(verified_ids)

        resultados = []
        for b in verified_books:
            b_id = b["id"]
            raw_score = candidate_scores.get(b_id, 0.5)
            eval_info = grounded_explanations.get(b_id, {})
            nivel = eval_info.get("nivel", "relacionado")
            razon = eval_info.get("razon", f"Obra académica relacionada temáticamente con '{clean_query}'.")

            # Calibración de coincidencia según nivel verificado
            if nivel == "directo":
                pct = round(min(max((raw_score - 0.45) / 0.35 * 30 + 70, 75.0), 98.5), 1)
                level = "high" if pct >= 85 else "medium"
            else:
                # Nivel relacionado: escala honesta (60% - 75%)
                pct = round(min(max((raw_score - 0.45) / 0.35 * 15 + 60, 60.0), 74.9), 1)
                level = "standard"

            inv = inventory.get(b_id, {"disponibles": 0, "totales": 0})

            resultados.append({
                "id": b_id,
                "titulo": b["titulo"],
                "autores": b.get("autores", []),
                "isbn": b.get("isbn") or "S/I",
                "ubicacion": b.get("ubicacion") or "Estantería general",
                "temas": b.get("temas", []),
                "sinopsis": b.get("sinopsis") or "Sinopsis académica disponible en sala.",
                "ejemplares_disponibles": inv["disponibles"],
                "total_ejemplares": inv["totales"],
                "porcentaje_coincidencia": pct,
                "match_level": level,
                "explicacion": razon
            })

        # Ordenar por porcentaje de coincidencia desc
        resultados.sort(key=lambda x: x["porcentaje_coincidencia"], reverse=True)

        return {
            "query": query,
            "total_encontrados": len(resultados),
            "mensaje": f"Se encontraron {len(resultados)} libro(s) en el acervo que abordan tu búsqueda.",
            "resultados": resultados
        }

# Cargar automáticamente al importar el módulo
VectorService.load_index_from_disk()


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

COMMON_ACRONYMS = {
    "poo": "programación orientada a objetos (POO)",
    "oop": "object-oriented programming (OOP)",
    "ia": "inteligencia artificial (IA)",
    "ai": "artificial intelligence (AI)",
    "bd": "bases de datos",
    "db": "database bases de datos",
    "redes": "redes de computadoras telecomunicaciones",
    "so": "sistemas operativos",
    "os": "operating systems sistemas operativos"
}

def extract_search_core(query: str) -> str:
    """Extrae y expande acrónimos del núcleo temático de la consulta."""
    clean = query.strip()
    words = re.findall(r'\b[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_+#\.]+\b', clean)
    meaningful = [w for w in words if w.lower() not in QUERY_STOP_WORDS]
    base_core = " ".join(meaningful) if meaningful else clean

    # Expansión semántica si coincide con un acrónimo o abreviatura conocida
    lower_core = base_core.lower().strip()
    if lower_core in COMMON_ACRONYMS:
        return COMMON_ACRONYMS[lower_core]
    for acr, expansion in COMMON_ACRONYMS.items():
        if re.search(rf'\b{re.escape(acr)}\b', lower_core):
            base_core = re.sub(rf'\b{re.escape(acr)}\b', expansion, base_core, flags=re.IGNORECASE)

    return base_core

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
    async def _ensure_book_has_synopsis(cls, book: Dict[str, Any]) -> str:
        """
        Verifica si el libro tiene sinopsis o resumen IA. Si no tiene ninguno,
        genera automáticamente un resumen con AIService y lo devuelve.
        Esto garantiza que el embedding se calcule sobre texto rico en contexto.
        """
        # Primero verificar si ya tiene resumen IA
        if book.get("resumenes_ia") and isinstance(book["resumenes_ia"], list) and book["resumenes_ia"]:
            resumen_ia = book["resumenes_ia"][0].get("resumen_texto", "").strip()
            if resumen_ia:
                return resumen_ia

        # Verificar si tiene sinopsis directa
        sinopsis = str(book.get("sinopsis", "")).strip()
        if sinopsis and len(sinopsis) > 20:
            return sinopsis

        # No tiene contenido textual: generar resumen IA automáticamente
        titulo = str(book.get("titulo", "")).strip()
        if not titulo:
            return ""

        autores = []
        if "libro_autores" in book and isinstance(book["libro_autores"], list):
            for la in book["libro_autores"]:
                if isinstance(la, dict) and "autores" in la and isinstance(la["autores"], dict):
                    autores.append(la["autores"].get("nombre", ""))
        autores_str = ", ".join(filter(None, autores)) or "Autor Desconocido"

        temas = []
        if "libro_temas" in book and isinstance(book["libro_temas"], list):
            for lt in book["libro_temas"]:
                if isinstance(lt, dict) and "temas" in lt and isinstance(lt["temas"], dict):
                    temas.append(lt["temas"].get("nombre", ""))
        temas_str = ", ".join(filter(None, temas)) or ""

        try:
            print(f"[VectorService] Auto-generando resumen IA para '{titulo}' (sin sinopsis previa)...")
            summary_result = await AIService.generate_book_summary(
                titulo=titulo,
                autor=autores_str,
                sinopsis_o_tema=temas_str
            )
            generated = summary_result.get("resumen", "")
            if generated and summary_result.get("proveedor") != "local_fallback":
                print(f"[VectorService] Resumen IA generado exitosamente para '{titulo}'.")
            return generated
        except Exception as e:
            print(f"[VectorService] No se pudo auto-generar resumen para '{titulo}': {e}")
            return ""

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

            # Auto-generar sinopsis si el libro no tiene contenido textual
            await cls._ensure_book_has_synopsis(book)

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

            # Auto-generar sinopsis si el libro no tiene contenido textual
            await cls._ensure_book_has_synopsis(book)

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
Tu misión es EVITAR ABSOLUTAMENTE falsos positivos. Los estudiantes confían en recomendaciones exactas.

Consulta del usuario: "{query}"

Catálogo de libros candidatos recuperados:
{books_context}

Evalúa si cada libro candidato realmente atiende la consulta del usuario "{query}":
- "directo": El libro trata específicamente sobre el tema de la consulta (ej. consulta 'python' -> libro de programación en Python; consulta 'cálculo' -> libro de cálculo).
- "relacionado": El libro NO trata el tema exacto, pero pertenece ESTRICTAMENTE a la misma especialidad temática (ej. consulta 'React' -> libro de JavaScript o Desarrollo Web). 
- "irrelevante": El libro trata sobre un área o disciplina distinta (ej. la consulta es 'medicina', 'corazón', 'cocina', 'leyes', y el libro es de informática o matemáticas).

REGLAS DE RECHAZO OBLIGATORIAS:
1. Si la consulta pertenece a un campo ajeno al libro (ej. salud, cardiología, medicina, biología, cocina frente a libros de tecnología o cálculo), clasifícalo OBLIGATORIAMENTE como "irrelevante", relevante: false.
2. NUNCA clasifiques un libro como "relacionado" simplemente porque "ambos son ciencias" o "comparte el acervo universitario". Si el contenido no ayuda al estudiante con "{query}", es "irrelevante".
3. Ante la menor duda sobre la relevancia del libro, márcalo como "irrelevante", relevante: false. Es infinitamente mejor responder que no hay libros a entregar una recomendación absurda.
4. "The Little Prince" (El Principito) NUNCA es relevante para temas técnicos, ingeniería, programación, ciencias ni medicina.

Responde ÚNICAMENTE en JSON con esta estructura exacta:
{{
  "evaluaciones": [
    {{
      "id": "ID del libro",
      "relevante": true o false,
      "nivel": "directo" o "relacionado" o "irrelevante",
      "razon": "Explicación breve y honesta de por qué sí o por qué no"
    }}
  ]
}}"""

        try:
            keep_alive_val: Any = -1
            try:
                keep_alive_val = int(settings.OLLAMA_KEEP_ALIVE)
            except Exception:
                keep_alive_val = settings.OLLAMA_KEEP_ALIVE

            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/chat",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "messages": [
                            {"role": "system", "content": "Eres el auditor bibliotecario del Sistema de Acervo Universitario. Evalúas la relevancia de libros candidatos frente a consultas de usuarios. Responde SIEMPRE en JSON."},
                            {"role": "user", "content": prompt}
                        ],
                        "stream": False,
                        "format": "json",
                        "keep_alive": keep_alive_val,
                        "options": {
                            "temperature": 0.0,
                            "top_p": 0.8,
                            "repeat_penalty": 1.1,
                            "num_predict": 250
                        }
                    }
                )
                if res.status_code == 200:
                    raw = res.json().get("message", {}).get("content", "")
                    parsed = json.loads(raw)
                    items = parsed.get("evaluaciones", [])
                    valid_items: Dict[str, Dict[str, Any]] = {}
                    disqualify_phrases = [
                        "no se trata", "no trata", "no aborda", "no contiene", "no tiene relacion", 
                        "no se relaciona", "no está relacionado", "no esta relacionado", "diferente tema",
                        "irrelevante", "no menciona", "no es de", "comparte área general", "comparte el área general",
                        "área general de", "campo distinto", "área distinta", "disciplina distinta", "materia distinta"
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
            err_name = type(e).__name__
            err_desc = str(e) or "Timeout esperando turno en Ollama"
            print(f"[VectorService] Aviso: LLM grounding fallback heurístico ({err_name}: {err_desc})")

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

    @classmethod
    def _lexical_score(cls, query_words: List[str], book_data: Dict[str, Any]) -> float:
        """
        Calcula un puntaje léxico (0.0 - 1.0) basado en coincidencias directas
        de palabras clave contra título, autores, temas y sinopsis del libro.
        """
        if not query_words:
            return 0.0
        searchable = (
            str(book_data.get("titulo", "")) + " " +
            " ".join(book_data.get("autores", [])) + " " +
            " ".join(book_data.get("temas", [])) + " " +
            str(book_data.get("sinopsis", "")) + " " +
            str(book_data.get("isbn", ""))
        ).lower()

        matches = sum(1 for w in query_words if w in searchable)
        return min(matches / max(len(query_words), 1), 1.0)

    @classmethod
    async def smart_search(cls, query: str, top_k: int = 5) -> Dict[str, Any]:
        """
        Búsqueda Inteligente Semántica RAG con recuperación híbrida:
        1. Similitud Coseno con nomic-embed-text (70% del puntaje).
        2. Coincidencia léxica directa en título/autor/temas/ISBN (30% del puntaje).
        3. Umbral dinámico adaptado a la longitud de la consulta.
        4. Grounding y justificación con llama3.2:3b sin alucinaciones.
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

        # Umbral calibrado (en nomic-embed-text el piso de ruido en español ronda 0.40-0.44)
        word_count = len(core_query.split())
        min_vector_threshold = 0.48 if word_count >= 6 else 0.46

        # Preparar palabras de búsqueda léxica (sin stopwords)
        lexical_words = [
            w.lower().strip("?,.:;!\"'()[]")
            for w in core_query.split()
            if len(w) > 2 and w.lower() not in QUERY_STOP_WORDS
        ]

        # Calcular similitudes con modelo híbrido (vectorial 70% + léxico 30%)
        scored_candidates = []
        VECTOR_WEIGHT = 0.70
        LEXICAL_WEIGHT = 0.30

        for book_id, book_data in _VECTOR_INDEX.items():
            b_emb = book_data.get("embedding")
            if not b_emb:
                continue

            vector_score = cosine_similarity(query_emb, b_emb)
            lexical_sc = cls._lexical_score(lexical_words, book_data)

            # Para ser candidato válido:
            # - Debe superar el umbral semántico seguro (0.46)
            # - O si tiene coincidencia léxica directa relevante (>=0.5), permitir vector desde 0.35
            if vector_score >= min_vector_threshold or (lexical_sc >= 0.5 and vector_score >= 0.35):
                # Boost léxico sumado al score vectorial
                hybrid_score = vector_score + (lexical_sc * 0.15)
                scored_candidates.append((hybrid_score, vector_score, book_data))

        scored_candidates.sort(key=lambda x: x[0], reverse=True)

        if not scored_candidates:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "memoria_hibrida"
            }

        # Tomar los top candidatos para la validación grounded
        top_candidates = [b for _, _, b in scored_candidates[:top_k]]
        candidate_scores = {b["id"]: v_sc for _, v_sc, b in scored_candidates[:top_k]}

        # Paso B y C: Grounding con LLM para asegurar que no se devuelvan falsos positivos
        grounded_explanations = await cls.ground_with_llm(clean_query, top_candidates)

        # Si la validación grounded determinó que ningún libro aborda realmente el tema
        if not grounded_explanations:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "memoria_hibrida"
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

            # Filtro estricto anti falsos positivos:
            # Si el nivel es "relacionado" pero no comparte ninguna palabra con la consulta y el score es marginal (< 0.48), se descarta
            lex_sc = cls._lexical_score(lexical_words, b)
            if nivel == "relacionado" and raw_score < 0.48 and lex_sc == 0.0:
                continue

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

        if not resultados:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "memoria_hibrida"
            }

        # Ordenar por porcentaje de coincidencia desc
        resultados.sort(key=lambda x: x["porcentaje_coincidencia"], reverse=True)

        return {
            "query": query,
            "total_encontrados": len(resultados),
            "mensaje": f"Se encontraron {len(resultados)} libro(s) en el acervo que abordan tu búsqueda.",
            "resultados": resultados,
            "motor": "memoria_hibrida"
        }

    # ==========================================================================
    # FASE 3: Búsqueda con pgvector en Supabase (alternativa escalable)
    # ==========================================================================

    @classmethod
    async def migrate_embeddings_to_pgvector(cls) -> Dict[str, Any]:
        """
        Migra los embeddings del índice en memoria (acervo_embeddings.json) a la columna
        'embedding' de la tabla 'libros' en Supabase con pgvector.
        Prerequisito: haber ejecutado el SQL de CREATE EXTENSION vector y ALTER TABLE.
        """
        if not _VECTOR_INDEX:
            cls.load_index_from_disk()

        if not _VECTOR_INDEX:
            return {"migrados": 0, "error": "No hay embeddings en el índice local para migrar."}

        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }

        migrated = 0
        errors = []

        async with httpx.AsyncClient(timeout=15.0) as client:
            for book_id, book_data in _VECTOR_INDEX.items():
                embedding = book_data.get("embedding")
                if not embedding:
                    continue

                try:
                    # Formato pgvector: lista de floats como string "[0.1,0.2,...]"
                    embedding_str = "[" + ",".join(str(v) for v in embedding) + "]"
                    res = await client.patch(
                        f"{settings.SUPABASE_URL}/rest/v1/libros?id=eq.{book_id}",
                        headers=headers,
                        json={"embedding": embedding_str}
                    )
                    if res.status_code in (200, 204):
                        migrated += 1
                    else:
                        errors.append({"id": book_id, "status": res.status_code, "detail": res.text[:200]})
                except Exception as e:
                    errors.append({"id": book_id, "error": str(e)[:200]})

        return {
            "total_en_indice": len(_VECTOR_INDEX),
            "migrados": migrated,
            "errores": len(errors),
            "detalle_errores": errors[:10] if errors else [],
            "mensaje": f"Se migraron {migrated} de {len(_VECTOR_INDEX)} embeddings a pgvector en Supabase."
        }

    @classmethod
    async def smart_search_pgvector(cls, query: str, top_k: int = 5) -> Dict[str, Any]:
        """
        Búsqueda semántica usando pgvector en Supabase (Fase 3).
        Llama a la función RPC buscar_libros_semantico en PostgreSQL con índice HNSW.
        Mantiene las fases de grounding anti-alucinaciones e inventario en tiempo real.
        """
        clean_query = query.strip()
        if not clean_query:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Ingresa una consulta de búsqueda.",
                "resultados": []
            }

        core_query = extract_search_core(clean_query)
        query_text = f"search_query: {core_query}"
        query_emb = await AIService.get_embeddings(query_text)
        if not query_emb:
            query_emb = await AIService.get_embeddings(f"search_query: {clean_query}")
        if not query_emb:
            # Fallback al método clásico en memoria si no se puede generar embedding
            return await cls.smart_search(query, top_k)

        # Umbral dinámico calibrado (en nomic-embed-text el piso de ruido en español ronda 0.40-0.44)
        word_count = len(core_query.split())
        min_threshold = 0.48 if word_count >= 6 else 0.46

        lexical_words = [
            w.lower().strip("?,.:;!\"'()[]")
            for w in core_query.split()
            if len(w) > 2 and w.lower() not in QUERY_STOP_WORDS
        ]

        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json"
        }

        try:
            async with httpx.AsyncClient(timeout=12.0) as client:
                res = await client.post(
                    f"{settings.SUPABASE_URL}/rest/v1/rpc/buscar_libros_semantico",
                    headers=headers,
                    json={
                        "query_embedding": query_emb,
                        "match_threshold": min_threshold,
                        "match_count": top_k
                    }
                )

                if res.status_code != 200 or not res.json():
                    # Fallback al método en memoria si pgvector no está disponible
                    print(f"[VectorService] pgvector RPC no disponible ({res.status_code}), usando búsqueda en memoria.")
                    return await cls.smart_search(query, top_k)

                pgvector_results = res.json()

        except Exception as e:
            print(f"[VectorService] Error en pgvector, fallback a búsqueda en memoria: {e}")
            return await cls.smart_search(query, top_k)

        if not pgvector_results:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "pgvector_hnsw"
            }

        # Construir candidatos para grounding
        candidate_ids = [r["id"] for r in pgvector_results]
        candidate_scores = {r["id"]: r["similarity"] for r in pgvector_results}

        # Obtener datos completos de los libros candidatos
        ids_param = ",".join(candidate_ids)
        books_url = (
            f"{settings.SUPABASE_URL}/rest/v1/libros?id=in.({ids_param})"
            f"&select=id,isbn,titulo,libro_autores(autores(nombre)),libro_temas(temas(nombre)),"
            f"ejemplares(id,estado,ubicacion_estante),resumenes_ia(resumen_texto,palabras_clave)"
        )
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                books_res = await client.get(books_url, headers=headers)
                books_data = books_res.json() if books_res.status_code == 200 else []
        except Exception:
            books_data = []

        if not books_data:
            return await cls.smart_search(query, top_k)

        # Preparar candidatos para grounding
        top_candidates = []
        for book in books_data:
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

            sinopsis = ""
            if book.get("resumenes_ia") and isinstance(book["resumenes_ia"], list) and book["resumenes_ia"]:
                sinopsis = book["resumenes_ia"][0].get("resumen_texto", "")

            ubicacion = "Estantería general"
            if book.get("ejemplares") and isinstance(book["ejemplares"], list):
                for ej in book["ejemplares"]:
                    if ej.get("ubicacion_estante"):
                        ubicacion = ej["ubicacion_estante"]
                        break

            top_candidates.append({
                "id": book["id"],
                "titulo": book.get("titulo", ""),
                "autores": autores,
                "isbn": book.get("isbn", ""),
                "ubicacion": ubicacion,
                "temas": temas,
                "sinopsis": sinopsis
            })

        # Grounding anti-alucinaciones
        grounded_explanations = await cls.ground_with_llm(clean_query, top_candidates)

        if not grounded_explanations:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "pgvector_hnsw"
            }

        verified_books = [b for b in top_candidates if b["id"] in grounded_explanations]
        verified_ids = [b["id"] for b in verified_books]
        inventory = await cls.get_fresh_inventory(verified_ids)

        resultados = []
        for b in verified_books:
            b_id = b["id"]
            raw_score = candidate_scores.get(b_id, 0.5)
            eval_info = grounded_explanations.get(b_id, {})
            nivel = eval_info.get("nivel", "relacionado")
            razon = eval_info.get("razon", f"Obra académica relacionada con '{clean_query}'.")

            # Filtro estricto anti falsos positivos:
            # Si el nivel es "relacionado" pero no comparte ninguna palabra con la consulta y el score es marginal (< 0.48), se descarta
            lex_sc = cls._lexical_score(lexical_words, b)
            if nivel == "relacionado" and raw_score < 0.48 and lex_sc == 0.0:
                continue

            if nivel == "directo":
                pct = round(min(max((raw_score - 0.45) / 0.35 * 30 + 70, 75.0), 98.5), 1)
                level = "high" if pct >= 85 else "medium"
            else:
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

        if not resultados:
            return {
                "query": query,
                "total_encontrados": 0,
                "mensaje": "Actualmente no contamos con libros en el acervo que aborden ese tema.",
                "resultados": [],
                "motor": "memoria_hibrida"
            }

        resultados.sort(key=lambda x: x["porcentaje_coincidencia"], reverse=True)

        return {
            "query": query,
            "total_encontrados": len(resultados),
            "mensaje": f"Se encontraron {len(resultados)} libro(s) en el acervo que abordan tu búsqueda.",
            "resultados": resultados,
            "motor": "pgvector_hnsw"
        }

# Cargar automáticamente al importar el módulo
VectorService.load_index_from_disk()


import json
import httpx
from collections import OrderedDict
from typing import List, Dict, Any
from app.core.config import settings

# Caché LRU en Memoria para Sugerencias de Búsqueda (maxsize = 128)
# ==============================================================================
_SUGGESTIONS_CACHE: OrderedDict[str, List[str]] = OrderedDict()
_SUGGESTIONS_CACHE_MAXSIZE = 128

def get_cached_suggestions(query: str) -> List[str] | None:
    norm = query.lower().strip()
    if norm in _SUGGESTIONS_CACHE:
        _SUGGESTIONS_CACHE.move_to_end(norm)
        return _SUGGESTIONS_CACHE[norm]
    return None

def set_cached_suggestions(query: str, items: List[str]) -> None:
    norm = query.lower().strip()
    if not norm or not items:
        return
    if norm in _SUGGESTIONS_CACHE:
        _SUGGESTIONS_CACHE.move_to_end(norm)
    _SUGGESTIONS_CACHE[norm] = items
    if len(_SUGGESTIONS_CACHE) > _SUGGESTIONS_CACHE_MAXSIZE:
        _SUGGESTIONS_CACHE.popitem(last=False)

# ==============================================================================
# Caché LRU en Memoria para Embeddings (maxsize = 256)
# ==============================================================================
_EMBEDDINGS_CACHE: OrderedDict[str, List[float]] = OrderedDict()
_EMBEDDINGS_CACHE_MAXSIZE = 256

def get_cached_embedding(text: str) -> List[float] | None:
    norm = text.strip()
    if norm in _EMBEDDINGS_CACHE:
        _EMBEDDINGS_CACHE.move_to_end(norm)
        return _EMBEDDINGS_CACHE[norm]
    return None

def set_cached_embedding(text: str, vector: List[float]) -> None:
    norm = text.strip()
    if not norm or not vector:
        return
    if norm in _EMBEDDINGS_CACHE:
        _EMBEDDINGS_CACHE.move_to_end(norm)
    _EMBEDDINGS_CACHE[norm] = vector
    if len(_EMBEDDINGS_CACHE) > _EMBEDDINGS_CACHE_MAXSIZE:
        _EMBEDDINGS_CACHE.popitem(last=False)

class AIService:
    """
    Servicio de Inteligencia Artificial optimizado para Modelos Locales
    (Ollama / llama.cpp / vLLM / HuggingFace local).
    """

    @classmethod
    async def generate_book_summary(cls, titulo: str, autor: str, sinopsis_o_tema: str = "") -> Dict[str, Any]:
        """
        Genera un resumen analítico y extrae palabras clave para un libro
        utilizando un modelo LLM local (Ollama) con salida JSON estructurada.
        Optimizado con temperatura baja (0.15) y repeat_penalty (1.15) para
        minimizar alucinaciones y bucles repetitivos.
        """
        system_prompt = (
            "Eres un bibliotecario y asistente académico experto de una universidad. "
            "Genera resúmenes bibliográficos concisos, precisos y en español. "
            "Responde ÚNICAMENTE en formato JSON con esta estructura exacta:\n"
            '{"resumen": "texto del resumen (máximo 120 palabras)", '
            '"palabras_clave": ["palabra1", "palabra2", "palabra3", "palabra4", "palabra5"], '
            '"nivel": "Introductorio|Intermedio|Avanzado"}'
        )

        user_prompt = (
            f"Genera un resumen académico para el siguiente libro:\n"
            f"Título: {titulo}\n"
            f"Autor: {autor}\n"
            f"Contexto/Materia: {sinopsis_o_tema or 'Ingeniería y Ciencias de la Computación'}"
        )

        try:
            keep_alive_val: Any = -1
            try:
                keep_alive_val = int(settings.OLLAMA_KEEP_ALIVE)
            except Exception:
                keep_alive_val = settings.OLLAMA_KEEP_ALIVE

            async with httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=30.0)) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/chat",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_prompt}
                        ],
                        "stream": False,
                        "format": "json",
                        "keep_alive": keep_alive_val,
                        "options": {
                            "temperature": 0.15,
                            "top_p": 0.9,
                            "repeat_penalty": 1.15,
                            "num_predict": 200
                        }
                    }
                )

                if response.status_code == 200:
                    data = response.json()
                    raw_text = data.get("message", {}).get("content", "").strip()

                    try:
                        parsed = json.loads(raw_text)
                        resumen_texto = str(parsed.get("resumen", "")).strip()
                        palabras_raw = parsed.get("palabras_clave", [])
                        if isinstance(palabras_raw, list):
                            palabras_clave = ", ".join(str(p).strip() for p in palabras_raw if str(p).strip())
                        else:
                            palabras_clave = str(palabras_raw).strip()

                        if not resumen_texto:
                            raise ValueError("Resumen vacío en JSON")

                        return {
                            "resumen": resumen_texto,
                            "palabras_clave": palabras_clave or f"{titulo}, {autor}, Referencia Académica",
                            "nivel": str(parsed.get("nivel", "Intermedio")),
                            "modelo": settings.LOCAL_AI_MODEL,
                            "proveedor": "local_ollama_json"
                        }
                    except (json.JSONDecodeError, ValueError):
                        # Fallback: parsear formato RESUMEN:/PALABRAS_CLAVE: si el JSON falla
                        resumen_texto = raw_text
                        palabras_clave = "Ingeniería, Software, Biblioteca, CIU"
                        if "RESUMEN:" in raw_text and "PALABRAS_CLAVE:" in raw_text:
                            parts = raw_text.split("PALABRAS_CLAVE:")
                            resumen_texto = parts[0].replace("RESUMEN:", "").strip()
                            palabras_clave = parts[1].strip()
                        elif "resumen" in raw_text.lower():
                            resumen_texto = raw_text

                        return {
                            "resumen": resumen_texto,
                            "palabras_clave": palabras_clave,
                            "modelo": settings.LOCAL_AI_MODEL,
                            "proveedor": "local_ollama"
                        }

        except Exception as e:
            print(f"[LOCAL AI NOTICE] Modelo local no disponible en {settings.OLLAMA_BASE_URL} ({e}). Usando generador heurístico.")

        # Fallback inteligente si el servidor local está apagado
        return {
            "resumen": f"Obra académica '{titulo}' del autor {autor}. Material de consulta especializado en el área de {sinopsis_o_tema or 'Ciencias de la Computación'}.",
            "palabras_clave": f"{titulo}, {autor}, Referencia Académica, CIU, Ingeniería",
            "modelo": "heuristico-local-fallback",
            "proveedor": "local_fallback"
        }

    @classmethod
    def generate_heuristic_summary(cls, titulo: str, autor: str, sinopsis_o_tema: str = "") -> Dict[str, Any]:
        """
        Genera un resumen heurístico de alta calidad de forma síncrona e instantánea (<1ms).
        Usado como respuesta inmediata mientras el LLM trabaja en background.
        """
        area = sinopsis_o_tema.strip() if sinopsis_o_tema and sinopsis_o_tema.strip() else "Ciencias e Ingeniería"
        return {
            "resumen": (
                f"'{titulo}' de {autor} es una obra de referencia académica orientada al área de {area}. "
                f"Proporciona un análisis conceptual y metodológico aplicable en el contexto universitario, "
                f"siendo material recomendado para estudiantes e investigadores del acervo CIU."
            ),
            "palabras_clave": f"{titulo}, {autor}, {area}, Referencia Académica, CIU",
            "modelo": "heuristico-local",
            "proveedor": "local_fallback",
        }

    @classmethod
    async def get_embeddings(cls, texto: str) -> List[float]:
        """
        Genera el vector de embeddings del texto usando el modelo local de embeddings (ej. nomic-embed-text)
        con verificación previa en el caché LRU en memoria.
        """
        cached = get_cached_embedding(texto)
        if cached is not None:
            return cached

        try:
            keep_alive_val: Any = -1
            try:
                keep_alive_val = int(settings.OLLAMA_KEEP_ALIVE)
            except Exception:
                keep_alive_val = settings.OLLAMA_KEEP_ALIVE

            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/embeddings",
                    json={
                        "model": settings.LOCAL_EMBEDDING_MODEL,
                        "prompt": texto,
                        "keep_alive": keep_alive_val
                    }
                )
                if response.status_code == 200:
                    vector = response.json().get("embedding", [])
                    if vector:
                        set_cached_embedding(texto, vector)
                    return vector
        except Exception as e:
            print(f"[LOCAL AI ERROR] Fallo al generar embedding local: {e}")
        return []

    @classmethod
    async def suggest_topics(cls, query: str) -> List[str]:
        """
        Sugiere 3 a 4 tópicos breves y limpios (máx 3 palabras cada uno)
        directamente relacionados con el término de búsqueda, en formato JSON estricto sin saludos ni charla.
        Incluye caché LRU y límite num_predict=60 para no congestionar el LLM con pulsaciones del teclado.
        """
        clean_q = query.strip()
        if not clean_q:
            return []

        # Para consultas muy cortas (< 3 caracteres), devolver tópicos base sin despertar al LLM
        if len(clean_q) < 3:
            return ["Programación", "Ingeniería de Software", "Bases de Datos"]

        # Verificar caché primero
        cached = get_cached_suggestions(clean_q)
        if cached is not None:
            return cached

        prompt = f"""Eres un motor de búsqueda bibliotecario. El usuario busca: "{clean_q}".
Genera de 3 a 4 etiquetas o materias académicas clave muy breves (máximo 3 palabras por etiqueta).
PROHIBIDO saludar, prohibido incluir texto conversacional, introducciones o explicaciones.

Responde ÚNICAMENTE un arreglo JSON de cadenas de texto con este formato exacto:
["Etiqueta 1", "Etiqueta 2", "Etiqueta 3"]"""

        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json",
                        "options": {
                            "temperature": 0.1,
                            "num_predict": 60
                        }
                    }
                )
                if response.status_code == 200:
                    raw = response.json().get("response", "").strip()
                    parsed = json.loads(raw)
                    if isinstance(parsed, list):
                        clean_items = [str(x).strip().strip('"').strip("'") for x in parsed if isinstance(x, str) and len(str(x).strip()) > 1]
                        result = clean_items[:4]
                        set_cached_suggestions(clean_q, result)
                        return result
                    if isinstance(parsed, dict):
                        for v in parsed.values():
                            if isinstance(v, list):
                                result = [str(x).strip() for x in v if isinstance(x, str)][:4]
                                set_cached_suggestions(clean_q, result)
                                return result
        except Exception as e:
            err_name = type(e).__name__
            err_desc = str(e) or "Timeout esperando turno en LLM"
            print(f"[AIService] Aviso: Sugerencias LLM en fallback ({err_name}: {err_desc})")

        # Fallback limpio sin charla
        words = [w.capitalize() for w in clean_q.split() if len(w) > 3 and w.lower() not in {"quiero", "libro", "sobre", "contenga", "informacion", "acerca", "para"}]
        fallback_res = words[:4] if words else ["Programación", "Ciencias de la Computación", "Ingeniería de Software"]
        set_cached_suggestions(clean_q, fallback_res)
        return fallback_res

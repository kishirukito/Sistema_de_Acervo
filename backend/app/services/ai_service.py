import httpx
from collections import OrderedDict
from typing import List, Dict, Any
from app.core.config import settings

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
        utilizando un modelo LLM local (por defecto Ollama).
        """
        prompt = (
            f"Eres un bibliotecario y asistente académico experto. "
            f"Genera un resumen conciso en español (máximo 120 palabras) y una lista de 5 palabras clave "
            f"para el siguiente libro:\n"
            f"Título: {titulo}\n"
            f"Autor: {autor}\n"
            f"Contexto/Materia: {sinopsis_o_tema or 'Ingeniería y Ciencias de la Computación'}\n\n"
            f"Formato de respuesta:\n"
            f"RESUMEN: [Tu resumen aquí]\n"
            f"PALABRAS_CLAVE: [palabra1, palabra2, palabra3, palabra4, palabra5]"
        )

        try:
            # Conexión al servidor local de Ollama con keep_alive=-1 para retención permanente
            keep_alive_val: Any = -1
            try:
                keep_alive_val = int(settings.OLLAMA_KEEP_ALIVE)
            except Exception:
                keep_alive_val = settings.OLLAMA_KEEP_ALIVE

            async with httpx.AsyncClient(timeout=httpx.Timeout(30.0, connect=2.0)) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "keep_alive": keep_alive_val,
                        "options": {
                            "temperature": 0.3,
                            "top_p": 0.9
                        }
                    }
                )

                if response.status_code == 200:
                    data = response.json()
                    raw_text = data.get("response", "").strip()

                    # Parsear la respuesta
                    resumen_texto = raw_text
                    palabras_clave = "Ingeniería, Software, Biblioteca, CIU"

                    if "RESUMEN:" in raw_text and "PALABRAS_CLAVE:" in raw_text:
                        parts = raw_text.split("PALABRAS_CLAVE:")
                        resumen_texto = parts[0].replace("RESUMEN:", "").strip()
                        palabras_clave = parts[1].strip()

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
        """
        clean_q = query.strip()
        if not clean_q:
            return []

        prompt = f"""Eres un motor de búsqueda bibliotecario. El usuario busca: "{clean_q}".
Genera de 3 a 4 etiquetas o materias académicas clave muy breves (máximo 3 palabras por etiqueta).
PROHIBIDO saludar, prohibido incluir texto conversacional, introducciones o explicaciones.

Responde ÚNICAMENTE un arreglo JSON de cadenas de texto con este formato exacto:
["Etiqueta 1", "Etiqueta 2", "Etiqueta 3"]"""

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json",
                        "options": {
                            "temperature": 0.1
                        }
                    }
                )
                if response.status_code == 200:
                    raw = response.json().get("response", "").strip()
                    parsed = json.loads(raw)
                    if isinstance(parsed, list):
                        clean_items = [str(x).strip().strip('"').strip("'") for x in parsed if isinstance(x, str) and len(str(x).strip()) > 1]
                        return clean_items[:4]
                    if isinstance(parsed, dict):
                        # En caso de que el modelo devuelva {"etiquetas": [...]} o {"sugerencias": [...]}
                        for v in parsed.values():
                            if isinstance(v, list):
                                return [str(x).strip() for x in v if isinstance(x, str)][:4]
        except Exception as e:
            print(f"[AIService] Error generando sugerencias con LLM: {e}")

        # Fallback limpio sin charla
        words = [w.capitalize() for w in clean_q.split() if len(w) > 3 and w.lower() not in {"quiero", "libro", "sobre", "contenga", "informacion", "acerca", "para"}]
        if words:
            return words[:4]
        return ["Programación", "Ciencias de la Computación", "Ingeniería de Software"]

        return [query, f"Fundamentos de {query}", f"Arquitectura y {query}"]

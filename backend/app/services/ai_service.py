import httpx
from typing import List, Dict, Any
from app.core.config import settings

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
            # Conexión al servidor local de Ollama
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False,
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
        Genera el vector de embeddings del texto usando el modelo local de embeddings (ej. nomic-embed-text).
        """
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/embeddings",
                    json={
                        "model": settings.LOCAL_EMBEDDING_MODEL,
                        "prompt": texto
                    }
                )
                if response.status_code == 200:
                    return response.json().get("embedding", [])
        except Exception as e:
            print(f"[LOCAL AI ERROR] Fallo al generar embedding local: {e}")
        return []

    @classmethod
    async def suggest_topics(cls, query: str) -> List[str]:
        """
        Sugiere tópicos y áreas relacionadas con un término de búsqueda para la biblioteca.
        """
        prompt = (
            f"El usuario busca en la biblioteca universitaria el tema: '{query}'. "
            f"Proporciona 3 conceptos o materias académicas relacionadas directamente, separadas por coma."
        )
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LOCAL_AI_MODEL,
                        "prompt": prompt,
                        "stream": False
                    }
                )
                if response.status_code == 200:
                    raw = response.json().get("response", "")
                    return [item.strip() for item in raw.split(",") if item.strip()]
        except Exception:
            pass

        return [query, f"Fundamentos de {query}", f"Arquitectura y {query}"]

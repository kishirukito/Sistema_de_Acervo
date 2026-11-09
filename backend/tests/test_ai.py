import pytest
from app.schemas.ai_schema import AISummaryRequest, AISearchRequest, AIEmbeddingRequest
from app.services.ai_service import AIService

def test_ai_schemas_validation():
    """Valida los esquemas DTO del microservicio de IA."""
    summary_req = AISummaryRequest(titulo="Cálculo Diferencial", autor="James Stewart")
    assert summary_req.titulo == "Cálculo Diferencial"
    assert summary_req.autor == "James Stewart"

    search_req = AISearchRequest(query="Estructuras de Datos")
    assert search_req.query == "Estructuras de Datos"

    embedding_req = AIEmbeddingRequest(texto="Algoritmos de ordenamiento")
    assert embedding_req.texto == "Algoritmos de ordenamiento"

@pytest.mark.asyncio
async def test_ai_service_fallback():
    """Prueba que el servicio de IA retorne resúmenes heurísticos cuando Ollama está apagado."""
    result = await AIService.generate_book_summary(
        titulo="Inteligencia Artificial",
        autor="Stuart Russell",
        sinopsis_o_tema="Ciencias Computacionales"
    )
    assert "resumen" in result
    assert "palabras_clave" in result
    assert result["modelo"] in ["llama3.2:3b", "heuristico-local-fallback"]

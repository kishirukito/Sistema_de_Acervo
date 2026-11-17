# Mejoras al Sistema de Búsqueda Inteligente — Sistema de Acervo CIU

Análisis del estado actual y propuestas de mejora para el pipeline de búsqueda semántica RAG.

**Fecha de análisis:** 13 de noviembre de 2026  
**Archivos analizados:** `backend/app/services/vector_service.py`, `backend/app/services/ai_service.py`

---

## Arquitectura actual

El sistema implementa un pipeline RAG (Retrieval-Augmented Generation) de 3 fases:

```
Consulta del usuario
        │
        ▼
┌─────────────────────────────────────────────────┐
│  FASE 1 — Embedding de la consulta              │
│  nomic-embed-text genera vector de 768 dims     │
│  + expansión de acrónimos (POO, IA, BD, etc.)   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  FASE 2 — Similitud coseno                      │
│  Compara contra índice vectorial en memoria     │
│  (archivo acervo_embeddings.json en disco)      │
│  Umbral mínimo: 0.45 — devuelve top 5           │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  FASE 3 — Grounding anti-alucinaciones          │
│  llama3.2:1b clasifica cada candidato como:     │
│  "directo" / "relacionado" / "irrelevante"      │
│  Descarta los irrelevantes antes de responder   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Inventario en tiempo real (Supabase)           │
│  Consulta ejemplares disponibles por libro      │
└─────────────────────────────────────────────────┘
```

### Lo que funciona bien

- El grounding anti-alucinaciones evita devolver resultados irrelevantes
- Caché LRU en memoria (256 entradas) para embeddings repetidos
- Expansión de acrónimos mejora consultas cortas (`POO`, `IA`, `BD`, `SO`)
- Inventario en tiempo real de ejemplares disponibles por libro
- Fallback heurístico si Ollama no está disponible

---

## Problemas identificados

### Problema 1 — El índice vive en un archivo JSON

Todos los embeddings se persisten en `backend/app/data/acervo_embeddings.json`. Con cada búsqueda se itera **todos** los vectores en memoria para calcular la similitud coseno — complejidad O(n) sin índice aproximado.

**Impacto:** con 100+ libros el archivo puede pesar varios MB y la búsqueda se vuelve lenta. No hay índice ANN (Approximate Nearest Neighbor).

---

### Problema 2 — `llama3.2:1b` hace el grounding

El código usa `settings.LOCAL_AI_MODEL` (`llama3.2:1b`) para clasificar la relevancia de los candidatos. Un modelo de 1B parámetros tiene capacidad de razonamiento muy limitada para esta tarea — produce falsos negativos frecuentes (descarta libros que sí son relevantes).

El servidor ya tiene instalado `llama3.2:3b` que es notablemente mejor para razonamiento clasificatorio y no tiene costo adicional.

---

### Problema 3 — Libros sin resumen IA quedan con embedding pobre

`build_book_semantic_text()` usa `resumenes_ia` si existe, si no cae al campo `sinopsis`. Los libros sin ninguno de los dos quedan representados solo por título, autores y temas — embeddings de baja calidad que no aparecen en búsquedas semánticas aunque sean relevantes.

---

### Problema 4 — Umbral de similitud fijo (`min_score = 0.45`)

El umbral no se adapta al tipo de consulta. Una búsqueda muy específica como `"cálculo diferencial Stewart"` necesita un umbral diferente que una búsqueda general como `"matemáticas"`. Con el umbral fijo se pierden resultados en consultas cortas o se devuelven falsos positivos en consultas largas.

---

### Problema 5 — Re-indexado manual

Cuando se agrega un libro nuevo al catálogo, el administrador debe ejecutar manualmente el endpoint `/api/v1/ai/indexar-todos` para que aparezca en las búsquedas. El `data_router.py` (línea 347) tiene un comentario de sincronización pendiente pero no está implementado.

---

## Mejoras propuestas

### Mejora 1 — Usar `llama3.2:3b` para el grounding
**Esfuerzo:** 1 línea de código  
**Impacto:** Alto — mejor clasificación de relevancia, menos falsos negativos

El modelo 3b ya está instalado en el servidor. Solo hay que cambiar el modelo en `ground_with_llm()`:

```python
# vector_service.py — método ground_with_llm()
# ANTES:
"model": settings.LOCAL_AI_MODEL,   # llama3.2:1b

# DESPUÉS:
"model": "llama3.2:3b",             # mejor razonamiento para clasificar relevancia
```

Dejar `llama3.2:1b` para los resúmenes de libros (`ai_service.py`) ya que esa tarea es menos crítica y el modelo pequeño es suficiente.

---

### Mejora 2 — Umbral dinámico según longitud de consulta
**Esfuerzo:** 2 líneas  
**Impacto:** Medio — reduce pérdida de resultados en consultas cortas

```python
# vector_service.py — método smart_search()
# ANTES:
async def smart_search(cls, query: str, top_k: int = 5, min_score: float = 0.45)

# DESPUÉS — calcular umbral dinámicamente según palabras en la consulta:
word_count = len(clean_query.split())
min_score = 0.40 if word_count <= 2 else 0.48 if word_count >= 6 else 0.45
```

---

### Mejora 3 — Generar resumen IA antes de indexar libros sin contenido
**Esfuerzo:** ~10 líneas  
**Impacto:** Alto — mejora la calidad del embedding de libros sin sinopsis

En `index_all_books()` e `index_single_book()`, antes de generar el embedding verificar si el libro tiene contenido suficiente:

```python
# vector_service.py — dentro del loop de index_all_books()
sinopsis = ""
if book.get("resumenes_ia") and book["resumenes_ia"]:
    sinopsis = book["resumenes_ia"][0].get("resumen_texto", "")
elif book.get("sinopsis"):
    sinopsis = str(book["sinopsis"]).strip()

# Si no tiene contenido, generar resumen IA antes de embedder
if not sinopsis and book.get("titulo"):
    autores_str = ", ".join(autores) or "Desconocido"
    summary = await AIService.generate_book_summary(
        titulo=book.get("titulo", ""),
        autor=autores_str
    )
    sinopsis = summary.get("resumen", "")
```

---

### Mejora 4 — Re-indexado automático al crear o editar un libro
**Esfuerzo:** ~5 líneas  
**Impacto:** Medio — el índice siempre está al día sin intervención manual

En `data_router.py`, en el endpoint de creación/edición de libro, llamar a `index_single_book()` después de guardar:

```python
# data_router.py — al final del endpoint POST /libros o PATCH /libros/{id}
from app.services.vector_service import VectorService

# Indexar el libro nuevo en segundo plano (no bloquea la respuesta)
asyncio.create_task(VectorService.index_single_book(nuevo_libro_id))
```

---

### Mejora 5 — Migrar el índice vectorial a pgvector en Supabase
**Esfuerzo:** 1-2 días  
**Impacto:** Muy alto — escala a miles de libros, búsqueda ANN con índice HNSW

Esta es la mejora más importante a largo plazo. Supabase tiene la extensión **pgvector** que permite:
- Guardar vectores directamente en PostgreSQL
- Búsqueda ANN con índice HNSW (mucho más rápido que fuerza bruta)
- Eliminar el archivo JSON y el índice en memoria
- Escalar sin degradación de rendimiento

**Pasos de implementación:**

```sql
-- 1. Habilitar pgvector en Supabase (SQL Editor)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Agregar columna de embedding a la tabla libros
ALTER TABLE libros ADD COLUMN embedding vector(768);

-- 3. Crear índice HNSW para búsqueda aproximada eficiente
CREATE INDEX ON libros USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Función de búsqueda semántica en SQL
CREATE OR REPLACE FUNCTION buscar_libros_semantico(
    query_embedding vector(768),
    match_threshold float DEFAULT 0.45,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    id uuid,
    titulo text,
    similarity float
)
LANGUAGE sql STABLE AS $$
    SELECT id, titulo, 1 - (embedding <=> query_embedding) AS similarity
    FROM libros
    WHERE 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
$$;
```

```python
# vector_service.py — búsqueda usando pgvector en lugar del JSON
async def smart_search_pgvector(cls, query: str, top_k: int = 5):
    query_emb = await AIService.get_embeddings(f"search_query: {query}")

    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{settings.SUPABASE_URL}/rest/v1/rpc/buscar_libros_semantico",
            headers={"apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
                     "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"},
            json={"query_embedding": query_emb, "match_count": top_k}
        )
    return res.json()
```

---

## Resumen de impacto vs esfuerzo

| # | Mejora | Esfuerzo | Impacto | Prioridad |
|---|--------|----------|---------|-----------|
| 1 | Usar `llama3.2:3b` para grounding | 1 línea | Alto | 🔴 Inmediata |
| 2 | Umbral dinámico por longitud de consulta | 2 líneas | Medio | 🔴 Inmediata |
| 3 | Generar resumen IA antes de indexar | ~10 líneas | Alto | 🟡 Corto plazo |
| 4 | Re-indexado automático al crear libro | ~5 líneas | Medio | 🟡 Corto plazo |
| 5 | Migrar índice a pgvector en Supabase | 1-2 días | Muy alto | 🟢 Largo plazo |

---

## Estado del servidor actual

| Componente | Valor |
|---|---|
| Modelo de embedding | `nomic-embed-text` (768 dims) |
| Modelo de grounding actual | `llama3.2:1b` |
| Modelo recomendado para grounding | `llama3.2:3b` (ya instalado) |
| Almacenamiento del índice | `backend/app/data/acervo_embeddings.json` |
| Umbral de similitud | `0.45` fijo |
| Caché LRU embeddings | 256 entradas en memoria |

---

*Análisis generado el 13 de noviembre de 2026.*  
*Sistema de Acervo CIU — Universidad.*

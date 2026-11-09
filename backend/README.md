# 🤖 Microservicio de Inteligencia Artificial (FastAPI + Ollama)
## Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

Este componente es el **Microservicio especializado en Inteligencia Artificial** del sistema de acervo. Se encarga exclusivamente de las tareas de procesamiento del lenguaje natural (NLP), síntesis de información y generación de representaciones vectoriales (embeddings).

> ℹ️ **Nota de Arquitectura:** La lógica de negocio, autenticación, gestión de base de datos relacional y frontend son gestionadas por la aplicación Fullstack en **Next.js + TypeScript** conectada a **Supabase**.

---

## 🚀 Capacidades de la IA
* **Resúmenes automáticos:** Genera síntesis académicas concisas y extrae palabras clave para el catálogo bibliográfico.
* **Sugerencias temáticas:** Propone conceptos afines y temas de investigación para el motor de búsqueda.
* **Embeddings locales:** Genera vectores densos con `nomic-embed-text` para búsquedas vectoriales.
* **Resiliencia y Fallback:** Si el servidor local de Ollama está inactivo o en arranque, cuenta con un generador heurístico inteligente para evitar interrupciones en la experiencia de usuario.

---

## 🛠️ Requisitos Previos y Ejecución

1. **Entorno Virtual de Python 3.12:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

2. **Servidor Ollama Local (Opcional pero recomendado para inferencia):**
   ```bash
   ollama pull llama3.2:3b
   ollama pull nomic-embed-text
   ```

3. **Iniciar el Microservicio:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

4. **Documentación interactiva de la API de IA:**
   * Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

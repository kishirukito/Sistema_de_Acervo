# 🚀 Backend - Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

Backend desarrollado en **Python 3.12** utilizando **FastAPI** y **Supabase** (PostgreSQL) para la gestión del inventario de libros, ejemplares físicos, préstamos y usuarios, con integración de Inteligencia Artificial.

---

## 📋 Requisitos Previos
* Python 3.12 o superior.
* Acceso a una instancia de Supabase o PostgreSQL 15+.

---

## 🛠️ Instalación Rápida

1. **Crear entorno virtual:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. **Instalar librerías:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Variables de entorno:**
   ```bash
   cp .env.example .env
   ```

4. **Levantar el servidor:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

5. **Documentación Swagger:**
   * Abrir [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 Pruebas Automatizadas
Ejecutar la suite de pruebas unitarias:
```bash
pytest
```

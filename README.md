# 📚 Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

> Proyecto de desarrollo de software para la gestión integral del acervo bibliotecario institucional, inventario, control de préstamos, estadísticas e integración de Inteligencia Artificial para búsquedas semánticas y generación automática de resúmenes.

---

## 🏛️ Arquitectura del Sistema (Monorepo)

```text
sistema-acervo/
├── docs/                             # Documentación de arquitectura, guías y entregables
├── database/                         # Scripts DDL (PostgreSQL/Supabase) y datos semilla
├── backend/                          # API REST con FastAPI (Python 3.12) y servicios de IA
└── frontend/                         # Aplicación Web moderna (React 19 + TypeScript + Vite)
```

---

## 🚀 Puesta en Marcha Rápida

Para instrucciones detalladas de configuración, instalación de dependencias y variables de entorno, consulta:
👉 **[Guía de Setup y Repositorio](docs/GUIA_SETUP_Y_REPOSITORIO.md)**

### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 👥 Equipo de Desarrollo
* **Irvin Alejandro Ortiz Silvestre** — *Especialidad en Backend, BD, APIs e IA*
* **Andres Fernando Flores Carrillo** — *Especialidad en Frontend, UI/UX e Integración*

---

## 📄 Licencia
Desarrollado para la **Universidad Politécnica de Durango (UNIPOLI)**. Todos los derechos reservados.

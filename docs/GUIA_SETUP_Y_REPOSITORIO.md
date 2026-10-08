# ⚙️ Guía de Setup del Entorno de Desarrollo y Repositorio
## Proyecto: Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

---

## 1. Estructura Integral del Repositorio (Monorepo)

El proyecto está organizado en una arquitectura modular que contempla la Base de Datos, el Backend (FastAPI + IA) y el Frontend (React + TypeScript):

```text
sistema-acervo/
├── docs/                             # Documentación de arquitectura, guías y entregables
│   ├── GUIA_SETUP_Y_REPOSITORIO.md
│   └── ARQUITECTURA_Y_MODELO_DATOS.md
│
├── database/                         # Scripts de base de datos PostgreSQL / Supabase
│   ├── schema.sql                    # Definición de tablas, relaciones, índices y políticas RLS
│   └── seed.sql                      # Datos iniciales (roles, usuarios admin, catálogo base)
│
├── backend/                          # API REST con FastAPI, Python 3.12 y Servicios de IA
│   ├── .env.example                  # Plantilla de variables de entorno del backend
│   ├── .gitignore                    # Reglas de exclusión para Git en Python
│   ├── README.md                     # Documentación técnica del backend
│   ├── requirements.txt              # Dependencias de Python (FastAPI, Supabase, PyJWT, OpenAI/Gemini)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # Punto de entrada de FastAPI, CORS y middlewares
│   │   ├── core/                     # Configuraciones centrales
│   │   │   ├── __init__.py
│   │   │   ├── config.py             # Configuración con Pydantic Settings (.env)
│   │   │   ├── security.py           # Hashing de passwords y tokens JWT
│   │   │   ├── deps.py               # Inyección de dependencias y control de acceso (RBAC)
│   │   │   └── database.py           # Conexión al cliente Supabase / PostgreSQL
│   │   ├── api/                      # Controladores / Endpoints
│   │   │   └── v1/
│   │   │       ├── api_router.py     # Enrutador maestro v1
│   │   │       ├── auth.py           # Endpoints de login, registro y perfil (/me)
│   │   │       ├── books.py          # Endpoints de libros y ejemplares
│   │   │       ├── loans.py          # Endpoints de préstamos y devoluciones
│   │   │       ├── users.py          # Endpoints de gestión de usuarios
│   │   │       ├── stats.py          # Endpoints de estadísticas y reportes
│   │   │       └── ai.py             # 🤖 Endpoints de IA: búsqueda semántica y resúmenes
│   │   ├── schemas/                  # DTOs y validaciones Pydantic
│   │   │   ├── __init__.py
│   │   │   ├── auth_schema.py
│   │   │   ├── user_schema.py
│   │   │   ├── book_schema.py
│   │   │   ├── loan_schema.py
│   │   │   └── ai_schema.py          # 🤖 Schemas para prompts, sugerencias y resúmenes IA
│   │   └── services/                 # Lógica de negocio e integraciones externas
│   │       ├── __init__.py
│   │       ├── audit_service.py      # Servicio de bitácora y auditoría
│   │       ├── storage_service.py    # Gestión de portadas y archivos en Supabase Storage
│   │       └── ai_service.py         # 🤖 Integración con APIs de IA (Gemini / OpenAI / embeddings)
│   └── tests/                        # Pruebas automatizadas con pytest
│       ├── __init__.py
│       ├── test_auth.py
│       ├── test_books.py
│       └── test_loans.py
│
└── frontend/                         # Aplicación Web (React 19 + TypeScript + Vite)
    ├── .env.example                  # Variables de entorno del frontend (URL de API)
    ├── .gitignore                    # Reglas de exclusión para Node.js
    ├── index.html                    # HTML principal
    ├── package.json                  # Dependencias y scripts de frontend
    ├── tsconfig.json                 # Configuración de TypeScript
    ├── vite.config.ts                # Configuración de Vite
    └── src/
        ├── assets/                   # Recursos estáticos (logos, iconos, estilos globales)
        ├── components/               # Componentes UI reutilizables
        │   ├── common/               # Navbar, Sidebar, Modal, Button, Table, Badge
        │   └── ai/                   # 🤖 Widgets de IA (buscador temático, resumen inteligente)
        ├── pages/                    # Pantallas y vistas principales
        │   ├── auth/                 # Login y perfil
        │   ├── catalog/              # Catálogo de libros y vista de detalle
        │   ├── loans/                # Gestión de préstamos y devoluciones
        │   ├── admin/                # Inventario y administración de usuarios
        │   └── dashboard/            # Panel de estadísticas e indicadores
        ├── services/                 # Clientes y llamadas a la API REST
        │   ├── api.ts                # Cliente Axios / Fetch base configurado
        │   ├── authService.ts        # Métodos de autenticación y tokens
        │   ├── bookService.ts        # CRUD de libros y ejemplares
        │   ├── loanService.ts        # Operaciones de préstamos
        │   └── aiService.ts          # 🤖 Consumo de servicios de IA (búsqueda y resúmenes)
        ├── hooks/                    # Custom Hooks (useAuth, useLoans, useAI)
        ├── context/                  # Contextos globales de React (AuthContext, UIContext)
        └── types/                    # Definición de tipos e interfaces TypeScript
```

---

## 2. Convenciones de Código y Control de Versiones

### 2.1 Flujo de Trabajo con Git (Git Flow)
* **`main`**: Código estable y listo para producción.
* **`develop`**: Rama de integración donde convergen las nuevas funciones.
* **`feature/<nombre-tarea>`**: Ramas temporales para el desarrollo de módulos (ej: `feature/modulo-libros`, `feature/interfaz-catalogo`, `feature/servicio-ia`).
* **`fix/<nombre-bug>`**: Corrección de fallos específicos.

### 2.2 Convenciones de Commits (Conventional Commits)
* `feat:` Nueva funcionalidad (`feat(backend): implement ai semantic search endpoint` / `feat(frontend): create book catalog view`).
* `fix:` Corrección de errores (`fix(loans): fix loan expiration calculation`).
* `docs:` Cambios en documentación (`docs: update setup guide with frontend and AI`).
* `refactor:` Refactorización de código sin alterar su comportamiento.
* `test:` Adición o mejora de tests unitarios/integración.

---

## 3. Guía de Instalación y Puesta en Marcha

### Prerrequisitos Globales
* **Git** instalado.
* **Python 3.12+** instalado.
* **Node.js 20+** y **npm** instalados.
* Proyecto en **Supabase** creado (URL y claves disponibles).
* API Key de IA (**Google Gemini** u **OpenAI**).

---

### 3.1 Puesta en Marcha del Backend (FastAPI)

1. **Navegar a la carpeta backend:**
   ```bash
   cd sistema-acervo/backend
   ```

2. **Crear y activar el entorno virtual:**
   ```powershell
   # En Windows PowerShell:
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Instalar dependencias de Python:**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Configurar el archivo `.env`:**
   Copia `.env.example` a `.env` y configura tus variables:
   ```bash
   cp .env.example .env
   ```
   *Variables requeridas:*
   * `SUPABASE_URL`, `SUPABASE_KEY`, `DATABASE_URL`
   * `SECRET_KEY`, `ALGORITHM`
   * `AI_API_KEY`, `AI_MODEL`

5. **Iniciar el servidor de desarrollo:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

6. **Comprobar la documentación interactiva:**
   * **Swagger UI:** `http://127.0.0.1:8000/docs`
   * **ReDoc:** `http://127.0.0.1:8000/redoc`

---

### 3.2 Puesta en Marcha del Frontend (React + Vite)

1. **Navegar a la carpeta frontend:**
   ```bash
   cd sistema-acervo/frontend
   ```

2. **Instalar dependencias de Node:**
   ```bash
   npm install
   ```

3. **Configurar el archivo `.env`:**
   Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   *Variables requeridas:*
   * `VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1`

4. **Iniciar el servidor de desarrollo del Frontend:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación web:**
   * Abrir en el navegador: `http://localhost:5173`

# Guía de Setup del Entorno de Desarrollo y Repositorio

## Proyecto: Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

---

## 1. Estructura Integral del Repositorio (Monorepo)

El proyecto está organizado en una arquitectura desacoplada donde **Next.js + TypeScript** asume el rol Fullstack (Frontend + Backend API y lógica de negocio) y **Python** opera como Microservicio especializado de IA:

```text
sistema-acervo/
├── docs/                                  # Documentación de arquitectura, guías y entregables
│   ├── DOCUMENTO_ARQUITECTURA_Y_ER.md
│   └── GUIA_SETUP_Y_REPOSITORIO.md
│
├── database/                              # Scripts de base de datos PostgreSQL / Supabase
│   ├── schema.sql                         # Tablas, relaciones, índices, triggers y RLS
│   └── seed.sql                           # Datos semilla iniciales (usuarios, catálogo base)
│
├── backend/                               # Microservicio de IA (Python 3.12 + FastAPI + Ollama)
│   ├── .env.example                       # Variables del servicio de IA (Ollama URL y modelos)
│   ├── requirements.txt                   # Dependencias (FastAPI, httpx, pydantic, uvicorn)
│   ├── README.md                          # Documentación del microservicio de IA
│   └── app/
│       ├── main.py                        # Servidor FastAPI y endpoints de salud
│       ├── api/v1/ai.py                   # Endpoints: /resumen, /sugerencias, /embeddings
│       ├── core/config.py                 # Configuración de Ollama y variables
│       ├── schemas/ai_schema.py           # DTOs de IA
│       └── services/ai_service.py         # Motor de inferencia local con Ollama y fallback
│
└── frontend/                              # Aplicación Fullstack (Next.js 14+ con TypeScript)
    ├── .env.example                       # Variables de Supabase y URL del microservicio de IA
    ├── package.json                       # Dependencias de Next.js, React y Supabase
    ├── tsconfig.json                      # Configuración de TypeScript y paths (@/*)
    ├── next.config.mjs                    # Configuración de Next.js
    └── src/
        ├── app/                           # Next.js App Router
        │   ├── api/                       # ROUTE HANDLERS (Backend API de Next.js)
        │   │   ├── auth/login/route.ts    # Autenticación y sesión de usuarios
        │   │   ├── books/route.ts         # GET (catálogo/búsqueda) & POST (alta libro)
        │   │   ├── books/[id]/route.ts    # GET (detalle), PUT (edición), DELETE (baja)
        │   │   ├── books/[id]/cover/route.ts      # POST (subida a Supabase Storage)
        │   │   ├── books/[id]/ejemplares/route.ts # POST (alta de copia física)
        │   │   ├── loans/route.ts         # GET (préstamos) & POST (solicitar préstamo)
        │   │   ├── loans/[id]/return/route.ts     # POST (devolución de ejemplar)
        │   │   ├── users/route.ts         # GET (usuarios) & POST (alta de usuario)
        │   │   ├── users/[id]/route.ts    # GET (detalle) & PUT (actualización/estado)
        │   │   ├── audit/route.ts         # GET (consulta de bitácora)
        │   │   └── ai/                    # Proxies para invocar microservicio de IA
        │   ├── layout.tsx                 # Layout raíz con HTML y fuentes
        │   └── page.tsx                   # Punto de entrada de la UI
        ├── components/                    # Componentes UI (Navbar, Sidebar, Modales)
        ├── lib/                           # Servicios de Servidor en Next.js
        │   ├── supabase.ts                # Conexión cliente y admin (Service Role)
        │   ├── audit.ts                   # Servicio de bitácora de auditoría
        │   ├── storage.ts                 # Servicio de gestión de portadas y archivos
        │   ├── errors.ts                  # Manejador centralizado de errores y respuestas
        │   └── ai-client.ts               # Cliente HTTP hacia el microservicio de Python
        └── services/                      # Clientes de consumo para la UI
```

---

## 2. Guía de Setup Paso a Paso

### 🔹 1. Configuración de Base de Datos (Supabase)

1. Crear un proyecto en [Supabase](https://supabase.com/).
2. Ir al **SQL Editor** y ejecutar el contenido de \[database/schema.sql\](file:///c:/Users/ios27/OneDrive/Escritorio/Sistema%20de%20Acervo%20%28CIU%29/database/schema.sql).
3. Opcionalmente, ejecutar \[database/seed.sql\](file:///c:/Users/ios27/OneDrive/Escritorio/Sistema%20de%20Acervo%20%28CIU%29/database/seed.sql) para cargar datos de prueba.
4. En el panel de **Storage**, crear el bucket público denominado `portadas`.

---

### 🔹 2. Puesta en Marcha del Microservicio de IA (Python)

1. Abrir una terminal en la carpeta `backend`:

  ```powershell
  cd backend
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```
2. Iniciar el servicio en el puerto 8000:

  ```bash
  uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
  ```
3. Verificar estado en: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) y documentación en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

### 🔹 3. Puesta en Marcha de la Aplicación Fullstack (Next.js)

1. Abrir una terminal en la carpeta `frontend`:

  ```bash
  cd frontend
  npm install
  ```
2. Crear archivo `.env.local` a partir de `.env.example`:

  ```env
  NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
  SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"
  AI_MICROSERVICE_URL="http://localhost:8000/api/v1"
  ```
3. Iniciar el servidor de desarrollo:

  ```bash
  npm run dev
  ```
4. Abrir la aplicación web en: [http://localhost:3000](http://localhost:3000).
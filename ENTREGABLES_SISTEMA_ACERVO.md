# 📚 Sistema de Gestión Bibliotecaria (Sistema de Acervo - CIU)
## Documento Integral de Arquitectura, Modelo de Datos y Guía de Entorno

---

## 📌 1. Información General del Proyecto

* **Nombre del Proyecto:** Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)
* **Organización / Empresa:** Universidad Politécnica de Durango
* **Contacto de la Organización:** Julia Alejandra Alvarado Gonzales
* **Dirección:** Carretera Durango - México km. 9.5 C.P. 34300 Durango, Dgo.
* **Teléfono:** (618) 45 64 260
* **Periodo y Modalidad:** Septiembre - Diciembre | Estadía Profesional (10° A) - Modalidad Tradicional
* **Objetivo General:** Desarrollar e implementar un sistema de gestión bibliotecaria completo que permita el inventario de libros, el control de préstamos, el registro de usuarios, la generación de estadísticas y la integración de inteligencia artificial para búsqueda temática, sugerencias y resúmenes.

### Integrantes y Roles del Equipo
1. **Irvin Alejandro Ortiz Silvestre** (Matrícula: `2303150355`) — *Rol: Fullstack / Especialidad en Backend, BD, APIs e IA*
2. **Andres Fernando Flores Carrillo** (Matrícula: `2303150021`) — *Rol: Fullstack / Especialidad en Frontend, UI/UX e Integración*

---

## 📋 2. Desglose de Actividades por Integrante (Anteproyectos)

### 🔹 Plan de Actividades: Irvin Alejandro Ortiz Silvestre (600 Horas)

| # | Actividad | Descripción | Producto / Entregable | Horas |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Diseño de la arquitectura y modelo de la base de datos** | Definir arquitectura del sistema, stack tecnológico y modelo entidad-relación completo (libros, ejemplares, usuarios, préstamos, temas, resúmenes) | Documento de arquitectura + diagrama ER | 40 |
| 2 | **Configuración del entorno de desarrollo y repositorio** | Preparar entorno local, control de versiones, estructura del proyecto backend y convenciones de código | Repositorio configurado + guía de setup | 20 |
| 3 | **Implementación de autenticación, roles y permisos** | Desarrollar el sistema de login, autenticación (JWT o similar), roles (alumno, personal, admin) y control de acceso | Módulo de autenticación y autorización funcional | 25 |
| 4 | **Diseño e implementación de la base de datos** | Crear y normalizar la base de datos (tablas, relaciones, índices, restricciones) | Script de base de datos | 20 |
| 5 | **Módulo de registro e inventario de libros** | Desarrollar CRUD completo de libros y ejemplares: alta, edición, baja lógica, control de existencia y estado | Módulo de inventario funcional (API) | 50 |
| 6 | **Implementación de validaciones, logging y manejo de errores** | Agregar validaciones de negocio, sistema de logs y manejo centralizado de errores | Sistema de validaciones + logging implementado | 20 |
| 7 | **Implementación de sistema de auditoría y bitácora** | Registrar automáticamente quién crea, modifica o elimina libros, usuarios y préstamos (quién, qué y cuándo) | Módulo de auditoría / bitácora funcional | 20 |
| 8 | **Manejo de archivos (portadas y documentos)** | Implementar la subida, almacenamiento y consulta de portadas de libros y posibles archivos relacionados | Servicio de gestión de archivos | 20 |
| 9 | **Módulo de registro de usuarios** | Implementar registro y gestión de usuarios (alumnos y personal universitario) con roles y permisos a nivel RLS | Módulo de usuarios funcional (API) | 40 |
| 10 | **Integración de IA para búsqueda y sugerencias temáticas** | Investigar e integrar modelo/API de IA para que, al buscar un tema, el sistema proponga libros relacionados | Servicio de sugerencias temáticas por IA | 100 |
| 11 | **Generación automática de resúmenes de libros** | Implementar funcionalidad de IA que genere o recupere un resumen del contenido de un libro al consultarlo | Servicio de resúmenes de libros | 60 |
| 12 | **Motor de estadísticas de préstamos** | Desarrollar la lógica backend de estadísticas (libros más prestados, rotación, usuarios activos, etc.) | API de estadísticas | 40 |
| 13 | **Documentación técnica del backend y de la IA** | Documentar APIs, modelo de datos, integración de IA y decisiones técnicas | Manual técnico backend + documentación de IA | 40 |
| 14 | **Pruebas unitarias e integración del backend** | Escribir y ejecutar pruebas de los módulos desarrollados, corregir errores | Reporte de pruebas + código corregido | 50 |
| 15 | **Pruebas de rendimiento y carga del backend** | Realizar pruebas de carga para verificar el comportamiento del sistema con muchos usuarios simultáneos | Informe de pruebas de rendimiento | 10 |
| 16 | **Revisiones de código, refactorización y soporte a integración** | Revisar código con la otra persona, mejorar calidad y apoyar la integración fina | Código refactorizado + actas de revisión | 45 |
| | **Total de Horas** | | | **600** |

---

### 🔹 Plan de Actividades: Andres Fernando Flores Carrillo (600 Horas)

| # | Actividad | Descripción | Producto / Entregable | Horas |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Análisis y diseño de la interfaz del sistema** | Analizar los requerimientos del sistema y diseñar la estructura, navegación y prototipos de las principales interfaces. | Prototipos y estructura de interfaces. | 60 |
| 2 | **Configuración y estructura del frontend** | Preparar el entorno de desarrollo, organizar la estructura del proyecto y crear componentes reutilizables. | Proyecto frontend configurado. | 40 |
| 3 | **Desarrollo de interfaces de catálogo y usuarios** | Implementar las pantallas para consultar, registrar, editar y administrar libros, inventario y usuarios. | Módulos frontend de catálogo y usuarios. | 70 |
| 4 | **Desarrollo del módulo de préstamos y devoluciones** | Implementar las interfaces y funcionalidades para gestionar préstamos, devoluciones, fechas, vencimientos y estados. | Conjunto de datos revisado y depurado. | 90 |
| 5 | **Implementación de búsqueda inteligente y resúmenes** | Desarrollar las interfaces para realizar búsquedas por temas, mostrar sugerencias y consultar resúmenes generados mediante IA. | Módulo de búsqueda inteligente. | 60 |
| 6 | **Desarrollo de dashboard y reportes** | Crear las interfaces para visualizar estadísticas, indicadores, información de préstamos y reportes del sistema. | Dashboard y reportes funcionales. | 90 |
| 7 | **Integración de interfaces con el backend** | Conectar los diferentes módulos del frontend con las APIs, servicios de IA y base de datos del sistema. | Sistema frontend integrado. | 55 |
| 8 | **Pruebas y corrección de errores** | Realizar pruebas de funcionamiento, navegación y usabilidad, identificando y corrigiendo errores encontrados. | Reporte de pruebas y sistema corregido. | 60 |
| 9 | **Preparación y despliegue del sistema** | Configurar el entorno de producción, variables necesarias y realizar el despliegue de la aplicación. | Sistema desplegado y configurado. | 35 |
| 10 | **Comprobación de resultados y elaboración de evidencias** | Elaborar manuales de usuario, recopilar evidencias del desarrollo y apoyar en la documentación final del proyecto. | Manuales, evidencias y documentación final. | 40 |
| | **Total de Horas** | | | **600** |

---

## 🏛️ 3. Documento de Arquitectura del Sistema

### 3.1 Diagrama de Capas de la Arquitectura

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                            │
│                 React 19 + TypeScript / Vite / NextJS                  │
│   ├── Portal de Consulta y Préstamos (Alumnos / Docentes)              │
│   ├── Panel de Administración y Control de Inventario                  │
│   └── Dashboard de Estadísticas y Reportes                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (JSON / REST API)
┌───────────────────────────────────▼────────────────────────────────────┐
│                        CAPA DE SERVICIOS (BACKEND)                     │
│                           Python 3.12 + FastAPI                        │
│   ├── API Gateway & Routers (/auth, /books, /loans, /users, /ai)       │
│   ├── Middlewares: CORS, Rate Limiting, Logging, Manejo de Errores     │
│   ├── Seguridad: Validación de Tokens JWT y Control de Roles           │
│   └── Módulos de Lógica de Negocio y Auditoría Automática             │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
   PostgreSQL Driver / PostgREST                     │ SDK / Async Client
                   │                                 │
┌──────────────────▼───────────────────┐ ┌───────────▼───────────────────┐
│       BASE DE DATOS & STORAGE        │ │    SERVICIOS DE INTELIGENCIA  │
│              Supabase                │ │        ARTIFICIAL LOCAL       │
│   ├── PostgreSQL Relacional          │ │  Ollama / Local LLM Server    │
│   ├── Row Level Security (RLS)       │ │  ├── Modelo: Llama 3.2 / Qwen │
│   ├── Supabase Auth (Manejo usuarios)│ │  ├── Búsqueda Conceptual Local│
│   └── Supabase Storage (Portadas/PDF)│ │  └── Resúmenes de Libros      │
└──────────────────────────────────────┘ └───────────────────────────────┘
```

### 3.2 Justificación del Stack Tecnológico

1. **Python 3.12 + FastAPI:** 
   * Rendimiento asíncrono superior (`asyncio`), documentación OpenAPI/Swagger automática y tipado riguroso con `Pydantic v2`.
2. **Supabase / PostgreSQL:**
   * Motor relacional ACID de alto estándar, seguridad granular mediante políticas *Row Level Security* (RLS) y almacenamiento integrado para portadas.
3. **React 19 + TypeScript:**
   * Reactividad, componentes reutilizables, tipado en tiempo de compilación y excelente rendimiento para interfaces de usuario complejas.
4. **Modelos de Lenguaje Locales (Ollama / Llama 3.2 / Qwen 2.5):**
   * Procesamiento de lenguaje natural (NLP) e inferencia ejecutada localmente en la infraestructura universitaria: **sin costos recurrentes por API**, sin latencia de red externa, privacidad absoluta de la información institucional y soporte para embeddings locales.

---

## 🗄️ 4. Modelo Entidad-Relación (ER)

### 4.1 Diagrama ER (Mermaid)

```mermaid
erDiagram
    USUARIOS ||--o{ PRESTAMOS : "realiza"
    USUARIOS ||--o{ AUDITORIA_LOGS : "genera"
    LIBROS ||--o{ EJEMPLARES : "tiene"
    LIBROS ||--o{ LIBRO_TEMAS : "clasificado_en"
    TEMAS ||--o{ LIBRO_TEMAS : "asociado_a"
    LIBROS ||--o{ RESUMENES_IA : "posee"
    EJEMPLARES ||--o{ PRESTAMOS : "se_presta"

    USUARIOS {
        uuid id PK "Identificador único (Supabase Auth ID)"
        string email UK "Correo institucional"
        string nombre_completo "Nombre y apellidos"
        string matricula_o_nomina UK "Matrícula de alumno o nómina"
        string rol "admin | personal | alumno"
        string estado "activo | suspendido | inactivo"
        timestamp created_at "Fecha de registro"
    }

    TEMAS {
        int id PK "Identificador autonumérico"
        string nombre UK "Nombre de la materia o tema"
        text descripcion "Descripción del área del conocimiento"
    }

    LIBROS {
        uuid id PK "Identificador del libro"
        string isbn UK "Código ISBN-10 o ISBN-13"
        string titulo "Título completo de la obra"
        string autor "Autor(es) principales"
        string editorial "Casa editorial"
        int anio_publicacion "Año de publicación"
        string edicion "Número o descripción de edición"
        string portada_url "Ruta a la imagen en Supabase Storage"
        timestamp created_at "Fecha de alta"
    }

    LIBRO_TEMAS {
        uuid libro_id FK "Referencia a LIBROS"
        int tema_id FK "Referencia a TEMAS"
    }

    EJEMPLARES {
        uuid id PK "Identificador de copia física"
        uuid libro_id FK "Referencia al título general"
        string codigo_inventario UK "Código de barras / etiqueta física"
        string ubicacion_estante "Pasillo, estante y nivel"
        string estado "disponible | prestado | mantenimiento | extraviado"
        text observaciones "Detalles de desgaste o estado físico"
        timestamp created_at "Fecha de registro"
    }

    PRESTAMOS {
        uuid id PK "Identificador de la transacción"
        uuid usuario_id FK "Usuario solicitante"
        uuid ejemplar_id FK "Ejemplar entregado"
        timestamp fecha_prestamo "Fecha y hora de inicio"
        timestamp fecha_limite_devolucion "Fecha pactada de devolución"
        timestamp fecha_devolucion_real "Fecha en que se devolvió"
        string estado "activo | devuelto | vencido | renovado"
        text notas "Observaciones al recibir o entregar"
    }

    RESUMENES_IA {
        uuid id PK "Identificador del resumen"
        uuid libro_id FK "Libro al que pertenece"
        text resumen_texto "Contenido resumido generado por IA"
        string palabras_clave "Términos relevantes extraídos"
        string modelo_usado "Ej: gpt-4o-mini / gemini-1.5"
        timestamp generado_en "Fecha de procesamiento"
    }

    AUDITORIA_LOGS {
        uuid id PK "Identificador del registro"
        uuid usuario_id FK "Usuario que ejecutó la acción"
        string accion "INSERT | UPDATE | DELETE"
        string tabla_afectada "Nombre de la entidad alterada"
        string registro_id "ID del elemento modificado"
        jsonb detalle_cambio "Valores antes y después"
        timestamp created_at "Momento exacto del evento"
    }
```

---

## 💻 5. Repositorio Configurado y Guía de Setup

### 5.1 Estructura Recomendada del Proyecto (Monorepo)

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
│   │   ├── main.py                   # Aplicación FastAPI principal, CORS y middlewares
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py             # Configuración con Pydantic Settings (.env)
│   │   │   ├── security.py           # JWT, hashing de contraseñas y permisos
│   │   │   ├── deps.py               # Inyección de dependencias y control de rol (RBAC)
│   │   │   └── database.py           # Cliente Supabase y sesiones
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── api_router.py     # Router principal v1
│   │   │       ├── auth.py           # Endpoints de sesión y perfil (/me)
│   │   │       ├── books.py          # Endpoints de libros y ejemplares
│   │   │       ├── loans.py          # Endpoints de préstamos y devoluciones
│   │   │       ├── users.py          # Endpoints de usuarios y roles
│   │   │       ├── stats.py          # Métricas e indicadores para el dashboard
│   │   │       └── ai.py             # 🤖 Endpoints de IA (búsqueda semántica y resúmenes)
│   │   ├── schemas/                  # Validación de datos (Pydantic DTOs)
│   │   │   ├── auth_schema.py
│   │   │   ├── user_schema.py
│   │   │   ├── book_schema.py
│   │   │   ├── loan_schema.py
│   │   │   └── ai_schema.py          # 🤖 Schemas de prompts, resúmenes y sugerencias IA
│   │   └── services/                 # Lógica de negocio e integraciones externas
│   │       ├── audit_service.py      # Registro de bitácora y auditoría
│   │       ├── storage_service.py    # Gestión de portadas en Supabase Storage
│   │       └── ai_service.py         # 🤖 Conexión con APIs de IA (Gemini / OpenAI)
│   └── tests/                        # Pruebas automatizadas con pytest
│       ├── __init__.py
│       ├── test_auth.py
│       ├── test_books.py
│       └── test_loans.py
│
└── frontend/                         # Interfaz Web (React 19 + TypeScript + Vite)
    ├── .env.example                  # Variables de entorno del frontend (URL de API)
    ├── .gitignore                    # Reglas de exclusión para Node.js
    ├── index.html                    # HTML principal
    ├── package.json                  # Dependencias y scripts
    ├── tsconfig.json                 # Configuración de TypeScript
    ├── vite.config.ts                # Configuración de Vite
    └── src/
        ├── assets/                   # Recursos estáticos (logos, iconos, estilos)
        ├── components/               # Componentes UI reutilizables
        │   ├── common/               # Navbar, Sidebar, Modal, Button, Table, Badge
        │   └── ai/                   # 🤖 Widgets de IA (buscador temático, resumen inteligente)
        ├── pages/                    # Pantallas y vistas principales
        │   ├── auth/                 # Login y perfil
        │   ├── catalog/              # Catálogo de libros y vista individual
        │   ├── loans/                # Gestión de préstamos y devoluciones
        │   ├── admin/                # Inventario y administración de usuarios
        │   └── dashboard/            # Panel de estadísticas y métricas
        ├── services/                 # Clientes y llamadas a la API REST
        │   ├── api.ts                # Cliente Axios / Fetch base
        │   ├── authService.ts        # Métodos de autenticación
        │   ├── bookService.ts        # CRUD de libros y ejemplares
        │   ├── loanService.ts        # Operaciones de préstamos
        │   └── aiService.ts          # 🤖 Consumo de servicios de IA
        ├── hooks/                    # Custom Hooks (useAuth, useLoans, useAI)
        ├── context/                  # Estados globales de React (AuthContext, UIContext)
        └── types/                    # Interfaces y Tipos TypeScript
```

---

### 5.2 Convenciones de Código y Flujo Git

* **Estrategia de Ramas:**
  * `main`: Código en producción, 100% estable.
  * `develop`: Rama principal de integración y desarrollo.
  * `feature/<nombre-tarea>`: Ramas para desarrollo de nuevas funcionalidades (ej: `feature/interfaz-catalogo`, `feature/servicio-ia`).
  * `fix/<nombre-bug>`: Correcciones específicas.
* **Formato de Commits (Conventional Commits):**
  * `feat(libros): agregar búsqueda temática con IA`
  * `feat(frontend): diseñar vista de préstamos activos`
  * `fix(prestamos): calcular correctamente fecha de vencimiento`
  * `docs(readme): actualizar guía de setup con frontend e IA`
  * `refactor(auth): migrar validación de roles a middleware`
* **Estándar de Código:**
  * PEP 8 estricto mediante formateador `Black` y linter `Ruff` para Python.
  * `ESLint` + `Prettier` para TypeScript/React.
  * Type hints obligatorios en todas las firmas de funciones y componentes.

---

### 5.3 Guía de Setup Paso a Paso

#### 🔹 1. Puesta en Marcha del Backend (FastAPI)

1. **Navegar a la carpeta backend:**
   ```bash
   cd sistema-acervo/backend
   ```

2. **Crear y activar entorno virtual (Python 3.12):**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Instalar dependencias de Python:**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Configurar variables de entorno (`.env`):**
   ```bash
   cp .env.example .env
   ```
   *Variables principales:*
   ```env
   PROJECT_NAME="Sistema de Acervo CIU"
   API_V1_STR="/api/v1"
   ENVIRONMENT="development"
   SUPABASE_URL="https://tu-proyecto.supabase.co"
   SUPABASE_KEY="tu-anon-o-service-key"
   DATABASE_URL="postgresql://postgres:password@db.tu-proyecto.supabase.co:5432/postgres"
   SECRET_KEY="clave-secreta-para-firmar-jwt"
   ALGORITHM="HS256"
   ACCESS_TOKEN_EXPIRE_MINUTES=480
   AI_API_KEY="sk-tu-api-key-de-gemini-o-openai"
   AI_MODEL="gemini-1.5-flash"
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

6. **Documentación interactiva:**
   * **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

#### 🔹 2. Puesta en Marcha del Frontend (React + Vite)

1. **Navegar a la carpeta frontend:**
   ```bash
   cd sistema-acervo/frontend
   ```

2. **Instalar dependencias de Node.js:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (`.env`):**
   ```bash
   cp .env.example .env
   ```
   *Contenido:*
   ```env
   VITE_API_BASE_URL="http://127.0.0.1:8000/api/v1"
   ```

4. **Iniciar el servidor de desarrollo del Frontend:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación:**
   * Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

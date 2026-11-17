# Manual Técnico — Backend e Inteligencia Artificial
## Sistema de Acervo CIU — UNIPOLI

**Versión:** 1.0  
**Fecha:** 17 de noviembre de 2026  
**Stack:** Python 3.12 · FastAPI 0.162 · Uvicorn · Ollama 0.40 · Supabase (PostgreSQL 15+)  
**Servidor de producción:** `192.168.8.7` (Ubuntu 24.04.3 LTS)

---

## Índice

1. [Arquitectura del sistema](#1-arquitectura-del-sistema)
2. [Estructura del proyecto backend](#2-estructura-del-proyecto-backend)
3. [Variables de entorno](#3-variables-de-entorno)
4. [Modelo de datos](#4-modelo-de-datos)
5. [API REST — Referencia de endpoints](#5-api-rest--referencia-de-endpoints)
6. [Módulo de Inteligencia Artificial](#6-módulo-de-inteligencia-artificial)
7. [Sistema de caché](#7-sistema-de-caché)
8. [Seguridad y autenticación](#8-seguridad-y-autenticación)
9. [Decisiones técnicas](#9-decisiones-técnicas)

---

## 1. Arquitectura del sistema

```
Red LAN (192.168.8.x)
        │
        ▼
┌─────────────────────────────────────────────┐
│  SERVIDOR 192.168.8.7 (Ubuntu 24.04)        │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Nginx :80 (Reverse Proxy)           │  │
│  │  ├── /           → dist/ (React SPA) │  │
│  │  ├── /api/v1/    → :8000 (FastAPI)   │  │
│  │  ├── /health     → :8000             │  │
│  │  └── /docs       → :8000 (Swagger)   │  │
│  └───────────────────┬──────────────────┘  │
│                      │                      │
│  ┌───────────────────▼──────────────────┐  │
│  │  FastAPI / Uvicorn :8000             │  │
│  │  (acervo-backend.service)            │  │
│  │                                      │  │
│  │  Routers:                            │  │
│  │  ├── /api/v1/auth    → JWT + bcrypt  │  │
│  │  ├── /api/v1/data    → CRUD Supabase │  │
│  │  ├── /api/v1/reports → SIABUC stats  │  │
│  │  └── /api/v1/ai      → LLM + vectors │  │
│  └──────┬────────────────────┬──────────┘  │
│         │                    │              │
│  ┌──────▼──────┐   ┌─────────▼──────────┐  │
│  │  Ollama     │   │  Supabase          │  │
│  │  :11434     │   │  (cloud)           │  │
│  │  llama3.2:1b│   │  PostgreSQL 15+    │  │
│  │  nomic-emb  │   │  REST API          │  │
│  └─────────────┘   └────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Patrón de arquitectura:** API Gateway + Microservicio de IA integrado. El backend FastAPI actúa como capa única de acceso a Supabase — el frontend nunca llama directamente a Supabase sino a través del backend, garantizando que el `SUPABASE_SERVICE_ROLE_KEY` nunca se exponga al cliente.

---

## 2. Estructura del proyecto backend

```
backend/
├── app/
│   ├── main.py                  # Punto de entrada, CORS, registro de routers
│   ├── api/
│   │   └── v1/
│   │       ├── api_router.py    # Agrupador de todos los routers
│   │       ├── auth_router.py   # POST /auth/login, PATCH /auth/password
│   │       ├── data_router.py   # CRUD libros, usuarios, préstamos, solicitudes
│   │       ├── reports_router.py # GET /reports/siabuc y operaciones SIABUC
│   │       └── ai.py            # Endpoints de IA: resumen, búsqueda, embeddings
│   ├── core/
│   │   ├── config.py            # Settings con pydantic-settings (.env)
│   │   └── security.py         # JWT manual HMAC-SHA256, dependencias FastAPI
│   ├── schemas/
│   │   ├── book_schema.py       # BookCreateSchema, BookUpdateSchema (Pydantic)
│   │   └── ai_schema.py        # Schemas de IA: AISummaryRequest, SmartSearch...
│   ├── services/
│   │   ├── supabase_service.py  # Cliente HTTP hacia Supabase REST API
│   │   ├── ai_service.py        # Integración con Ollama (LLM + embeddings)
│   │   └── vector_service.py   # Pipeline RAG: indexado, búsqueda semántica
│   └── data/
│       └── acervo_embeddings.json  # Caché persistente de vectores en disco
├── tests/
│   ├── test_auth.py             # Pruebas JWT
│   ├── test_ai.py               # Pruebas esquemas IA y fallback
│   ├── test_dates.py            # Pruebas validación de fechas
│   └── test_delete.py           # Pruebas endpoints DELETE/PATCH con RBAC
├── .env                         # Variables de entorno (no versionado)
├── .env.example                 # Plantilla de variables
└── requirements.txt             # Dependencias Python
```

---

## 3. Variables de entorno

Archivo: `backend/.env`

| Variable | Descripción | Valor en producción |
|---|---|---|
| `PROJECT_NAME` | Nombre del servicio | `Microservicio de IA - Sistema de Acervo CIU` |
| `API_V1_STR` | Prefijo base de la API | `/api/v1` |
| `ENVIRONMENT` | Entorno de ejecución | `production` |
| `DEBUG` | Modo depuración | `False` |
| `AI_PROVIDER` | Proveedor de IA | `local` |
| `OLLAMA_BASE_URL` | URL del servidor Ollama | `http://localhost:11434` |
| `LOCAL_AI_MODEL` | Modelo LLM activo | `llama3.2:1b` |
| `LOCAL_EMBEDDING_MODEL` | Modelo de embeddings | `nomic-embed-text` |
| `OLLAMA_KEEP_ALIVE` | Retención del modelo en RAM | `-1` (indefinido) |
| `SUPABASE_URL` | URL del proyecto Supabase | `https://ghddarooxlbyjcasbjtx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio Supabase | `sb_secret_...` ⚠️ secreta |
| `AI_API_KEY` | Clave opcional de acceso a la API de IA | vacío |

> **Seguridad:** `SUPABASE_SERVICE_ROLE_KEY` nunca debe ser expuesta al cliente ni commiteada al repositorio. Es la clave que permite bypass de Row Level Security en Supabase.

---

## 4. Modelo de datos

Las tablas residen en Supabase (PostgreSQL 15+). El backend accede a ellas exclusivamente vía REST API de Supabase, nunca mediante conexión directa a PostgreSQL.

### Tablas principales

#### `usuarios`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `nombre_completo` | text | Nombre completo del usuario |
| `email` | text UNIQUE | Correo electrónico institucional |
| `password_hash` | text | Hash bcrypt de la contraseña |
| `rol` | text | `admin`, `personal`, `alumno`, `docente`, `egresado` |
| `tipo_usuario_id` | int FK | Referencia a `tipos_usuario` |
| `carrera_id` | uuid FK | Referencia a `carreras` (nullable) |
| `matricula_o_nomina` | text | Número de matrícula o nómina |
| `dependencia_o_area` | text | Área o dependencia institucional |
| `telefono` | text | Teléfono de contacto |
| `estado` | text | `activo`, `inactivo`, `suspendido` |
| `created_at` | timestamptz | Fecha de registro |

#### `libros`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `titulo` | text | Título del libro |
| `isbn` | text UNIQUE | Código ISBN |
| `editorial` | text | Editorial |
| `anio_publicacion` | int | Año de publicación |
| `edicion` | text | Edición |
| `clasificacion_dewey` | text | Clasificación decimal Dewey |
| `portada_url` | text | URL de portada en Supabase Storage |
| `sinopsis` | text | Sinopsis del libro |
| `creado_por_id` | uuid FK | Usuario administrador que lo registró |
| `created_at` | timestamptz | Fecha de alta en el acervo |

#### `ejemplares`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `libro_id` | uuid FK | Referencia al libro |
| `codigo_inventario` | text UNIQUE | Código de barras / inventario físico |
| `estado` | text | `disponible`, `prestado`, `mantenimiento`, `extraviado`, `baja` |
| `ubicacion_estante` | text | Ubicación física en la biblioteca |
| `observaciones` | text | Notas del ejemplar |

#### `prestamos`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `usuario_id` | uuid FK | Usuario que recibe el préstamo |
| `ejemplar_id` | uuid FK | Ejemplar físico prestado |
| `tipo_prestamo_id` | uuid FK | Tipo: domicilio, sala, interbibliotecario |
| `autorizado_por_id` | uuid FK | Administrador que autorizó |
| `fecha_prestamo` | timestamptz | Fecha y hora del préstamo |
| `fecha_limite_devolucion` | timestamptz | Fecha máxima de devolución |
| `fecha_devolucion_real` | timestamptz | Fecha real de devolución (nullable) |
| `estado` | text | `activo`, `devuelto`, `vencido` |
| `renovaciones_count` | int | Número de renovaciones |
| `institucion_convenio_id` | uuid FK | Para préstamos interbibliotecarios |

#### `solicitudes_prestamo`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `folio` | text | Folio correlativo `SOL-{timestamp}` |
| `usuario_id` | uuid FK | Alumno solicitante |
| `libro_id` | uuid FK | Libro solicitado |
| `fecha_solicitud` | timestamptz | Fecha de creación |
| `fecha_sugerida` | date | Fecha sugerida por el alumno |
| `lugar_recogida` | text | Punto de recogida |
| `estado` | text | `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED` |
| `atendido_por_id` | uuid FK | Admin que atendió (nullable) |

#### `resumenes_ia`
| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `libro_id` | uuid FK | Libro al que pertenece el resumen |
| `resumen_texto` | text | Resumen generado por el LLM |
| `palabras_clave` | text | Palabras clave extraídas |
| `modelo_usado` | text | Modelo que generó el resumen |
| `created_at` | timestamptz | Fecha de generación |

#### Tablas auxiliares

| Tabla | Descripción |
|---|---|
| `carreras` | 23 programas académicos UNIPOLI (nombre, nivel) |
| `tipos_usuario` | Categorías de usuario (admin, docente, alumno...) |
| `tipos_prestamo` | Modalidades: domicilio, sala, interbibliotecario |
| `temas` | Materias bibliográficas |
| `libro_temas` | Relación N:M libros-temas |
| `libro_autores` | Relación N:M libros-autores |
| `autores` | Catálogo de autores |
| `instituciones_convenio` | Bibliotecas externas en convenio |
| `sanciones_multas` | Multas y sanciones a usuarios |
| `espacios_biblioteca` | Cubículos y salas de estudio |
| `reservas_espacios` | Reservas de espacios |
| `equipos_computo` | Equipos del laboratorio |
| `sesiones_computo` | Sesiones de uso de cómputo |

---

## 5. API REST — Referencia de endpoints

**Base URL:** `http://192.168.8.7/api/v1`  
**Autenticación:** `Authorization: Bearer <JWT>`  
**Documentación interactiva:** `http://192.168.8.7/docs`

### 5.1 Autenticación (`/auth`)

#### `POST /auth/login`
Autentica un usuario contra Supabase y devuelve un JWT.

**Body:**
```json
{
  "email": "admin@upd.edu.mx",
  "password": "admin123",
  "remember_me": false
}
```

**Respuesta 200:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "Administrador General",
    "email": "admin@upd.edu.mx",
    "kind": "ADMINISTRATIVE",
    "role": "ADMIN",
    "status": "ACTIVE",
    "identifierCode": "EMP-001",
    "departmentOrCareer": "Dirección de Biblioteca"
  },
  "redirectUrl": "/admin/dashboard",
  "token": "eyJ..."
}
```

| Código | Causa |
|---|---|
| 200 | Login exitoso |
| 401 | Credenciales incorrectas o usuario no encontrado |
| 403 | Cuenta inactiva o suspendida |
| 500 | Error de conexión con Supabase |

#### `PATCH /auth/password`
Cambia la contraseña del usuario autenticado. Requiere JWT válido.

**Body:**
```json
{
  "current_password": "antigua",
  "new_password": "nuevaClave123"
}
```

---

### 5.2 Datos (`/data`)

Todos los endpoints requieren `Authorization: Bearer <JWT>`.

#### Libros

| Método | Ruta | Rol requerido | Descripción |
|---|---|---|---|
| GET | `/data/libros` | Autenticado | Catálogo completo con caché 60s |
| POST | `/data/libros` | Admin | Crear libro + ejemplares iniciales |
| PATCH | `/data/libros/{id}` | Admin | Actualizar libro y ajustar ejemplares |
| DELETE | `/data/libros/{id}` | Admin | Eliminar libro (bloquea si hay préstamos activos) |

**POST /data/libros — Body:**
```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "isbn": "978-0132350884",
  "editorial": "Prentice Hall",
  "anio_publicacion": 2008,
  "categoria": "000",
  "totalCopies": 3,
  "location": "Estante A-01"
}
```

**PATCH /data/libros/{id} — Ajuste de ejemplares:**  
Enviar `totalCopies` o `cantidad_ejemplares` para incrementar o reducir ejemplares físicos. El backend valida que no se pueda reducir por debajo de los ejemplares actualmente en préstamo activo (devuelve `HTTP 400`).

#### Usuarios

| Método | Ruta | Rol requerido | Descripción |
|---|---|---|---|
| GET | `/data/usuarios` | Admin | Lista todos los usuarios |
| GET | `/data/usuarios/{id}` | Autenticado | Ver perfil (admin: cualquiera; alumno: solo el propio) |
| POST | `/data/usuarios` | Admin | Crear usuario con contraseña temporal `Acervo2026!` |
| PATCH | `/data/usuarios/{id}` | Autenticado | Actualizar perfil (alumnos: solo nombre/teléfono; carrera bloqueada) |
| DELETE | `/data/usuarios/{id}` | Admin | Eliminar usuario (bloquea si tiene préstamos activos) |

#### Préstamos

| Método | Ruta | Rol requerido | Descripción |
|---|---|---|---|
| GET | `/data/prestamos` | Admin | Todos los préstamos institucionales |
| GET | `/data/prestamos/{id}` | Admin | Préstamo por ID |
| GET | `/data/mis-prestamos` | Autenticado | Solo préstamos del usuario en sesión |
| POST | `/data/prestamos` | Admin | Registrar préstamo (asigna `autorizado_por_id` automáticamente) |
| PATCH | `/data/prestamos/{id}` | Admin | Actualizar estado (devuelto, renovar) |
| DELETE | `/data/prestamos/{id}` | Admin | Eliminar registro y liberar ejemplar |

#### Solicitudes

| Método | Ruta | Rol requerido | Descripción |
|---|---|---|---|
| GET | `/data/solicitudes` | Autenticado | Admin: todas; alumno: las propias |
| POST | `/data/solicitudes` | Autenticado | Crear solicitud de préstamo con folio `SOL-{timestamp}` |
| PATCH | `/data/solicitudes/{id}` | Autenticado | Admin: aprobar/rechazar; alumno: cancelar las propias |

#### Catálogos auxiliares

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/data/carreras` | 23 carreras UNIPOLI (caché 60s) |
| GET | `/data/tipos-prestamo` | Modalidades de préstamo |
| GET | `/data/instituciones` | Bibliotecas en convenio |
| POST | `/data/instituciones` | Registrar nueva institución (Admin) |

---

### 5.3 Reportes SIABUC (`/reports`)

Todos requieren rol Admin.

#### `GET /reports/siabuc`
Devuelve los 4 bloques estadísticos estándar del sistema SIABUC con caché de 60 segundos.

**Estructura de la respuesta:**
```json
{
  "circulacion": { ... },       // Préstamos por tipo, carrera, ranking acervo, multas
  "procesos_tecnicos": { ... }, // Catalogación por año y catalogador
  "inventario": { ... },        // Estados de ejemplares, distribución Dewey
  "servicios": { ... },         // Espacios y sesiones de cómputo
  "resumen_ejecutivo": { ... }, // Métricas, tendencia mensual, top libros, alertas
  "catalogos": { ... }          // Listas de usuarios, espacios, equipos, ejemplares
}
```

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/reports/sancion` | Registrar multa o sanción |
| POST | `/reports/reserva-espacio` | Registrar uso de cubículo o sala |
| POST | `/reports/sesion-computo` | Registrar sesión de equipo de cómputo |
| POST | `/reports/ejemplar-estado` | Cambiar estado de un ejemplar (baja, extraviado) |

---

### 5.4 Inteligencia Artificial (`/ai`)

#### `POST /ai/resumen` — Admin
Genera resumen analítico y palabras clave de un libro.

**Body:**
```json
{
  "titulo": "Inteligencia Artificial",
  "autor": "Stuart Russell",
  "sinopsis_o_tema": "Fundamentos de IA y agentes inteligentes",
  "libro_id": "uuid-opcional"
}
```

**Respuesta:**
```json
{
  "resumen": "Texto del resumen...",
  "palabras_clave": "IA, agentes, búsqueda, lógica, aprendizaje",
  "modelo_usado": "llama3.2:1b",
  "guardado_en_db": true
}
```

#### `POST /ai/busqueda-inteligente` — Autenticado
Búsqueda semántica en lenguaje natural.

**Body:**
```json
{
  "query": "libros sobre redes de computadoras",
  "top_k": 5
}
```

**Respuesta:**
```json
{
  "query": "libros sobre redes de computadoras",
  "total_encontrados": 3,
  "mensaje": "Se encontraron 3 libro(s)...",
  "resultados": [
    {
      "id": "uuid",
      "titulo": "Redes de Computadoras",
      "autores": ["Andrew Tanenbaum"],
      "isbn": "978-...",
      "ubicacion": "Estante B-02",
      "temas": ["Redes", "Telecomunicaciones"],
      "sinopsis": "...",
      "ejemplares_disponibles": 2,
      "total_ejemplares": 3,
      "porcentaje_coincidencia": 92.5,
      "match_level": "high",
      "explicacion": "El libro aborda específicamente el tema de redes..."
    }
  ]
}
```

#### Otros endpoints de IA

| Método | Ruta | Rol | Descripción |
|---|---|---|---|
| POST | `/ai/sugerencias` | Autenticado | Sugerir tópicos relacionados con una consulta |
| POST | `/ai/embeddings` | Autenticado | Generar vector de embedding de un texto (768 dims) |
| POST | `/ai/indexar-acervo` | Admin | Re-indexar todos los libros en el índice vectorial |
| DELETE | `/ai/resumen/{libro_id}` | Admin | Eliminar resumen IA de un libro |

---

### 5.5 Endpoints de salud

| Ruta | Descripción |
|---|---|
| `GET /health` | Estado del servicio, modelo activo y URL de Ollama |
| `GET /` | Información de bienvenida y catálogo de endpoints |
| `GET /docs` | Documentación interactiva Swagger UI |
| `GET /redoc` | Documentación ReDoc |

---

## 6. Módulo de Inteligencia Artificial

### 6.1 Modelos utilizados

| Modelo | Proveedor | Uso | Tamaño |
|---|---|---|---|
| `llama3.2:1b` | Meta (via Ollama) | Generación de resúmenes y sugerencias | 1.3 GB |
| `nomic-embed-text` | Nomic AI (via Ollama) | Generación de embeddings vectoriales | 274 MB |

### 6.2 Pipeline de búsqueda semántica (RAG)

El sistema implementa un pipeline RAG (Retrieval-Augmented Generation) de 3 fases en `vector_service.py`:

**Fase 1 — Embedding de la consulta**
- Se extrae el núcleo temático de la consulta (elimina stopwords, expande acrónimos)
- `nomic-embed-text` genera un vector de 768 dimensiones
- Prefijo `search_query:` para alinear con el prefijo `search_document:` de los libros indexados

**Fase 2 — Similitud coseno**
- Compara el vector de la consulta contra todos los libros en `_VECTOR_INDEX` (en memoria)
- Umbral mínimo: `min_score = 0.45`
- Devuelve los `top_k` candidatos con mayor similitud

**Fase 3 — Grounding anti-alucinaciones**
- `llama3.2:1b` evalúa cada candidato con temperatura `0.1`
- Clasifica cada libro como `directo`, `relacionado` o `irrelevante`
- Descarta los irrelevantes antes de responder
- Fallback heurístico si Ollama no está disponible

**Texto semántico de cada libro (indexado):**
```
search_document: Título: {titulo}. Autores: {autores}. 
Temas y Materias: {temas}, Clasificación Dewey: {dewey}. 
Sinopsis y Contenido: {resumen_ia o sinopsis}.
```

### 6.3 Índice vectorial

- **Almacenamiento:** Diccionario en memoria RAM + persistencia en `backend/app/data/acervo_embeddings.json`
- **Caché de embeddings:** LRU en memoria, 256 entradas máximo
- **Actualización automática:** Al crear o editar un libro se llama `VectorService.index_single_book()` como tarea asíncrona en segundo plano
- **Re-indexado completo:** Endpoint `POST /ai/indexar-acervo`

### 6.4 Expansión de acrónimos

El sistema expande automáticamente términos cortos antes de generar el embedding:

| Término | Expansión |
|---|---|
| `poo` | programación orientada a objetos (POO) |
| `ia` | inteligencia artificial (IA) |
| `bd` | bases de datos |
| `so` | sistemas operativos |
| `redes` | redes de computadoras telecomunicaciones |

---

## 7. Sistema de caché

El backend implementa caché en memoria con invalidación inmediata ante mutaciones.

| Caché | TTL | Qué almacena | Se invalida cuando |
|---|---|---|---|
| `_data_cache["libros"]` | 60 s | Catálogo completo de libros | Se crea, edita o elimina un libro o préstamo |
| `_data_cache["carreras"]` | 60 s | 23 carreras UNIPOLI | No se invalida (datos estáticos) |
| `_siabuc_cache` | 60 s | Estadísticas SIABUC completas | Se crea/elimina préstamo, libro o sanción |
| `_EMBEDDINGS_CACHE` (LRU) | Indefinido | Vectores de embedding por texto | Cuando el caché LRU alcanza 256 entradas |

**Patrón de invalidación:** Las funciones `invalidate_books_cache()` e `invalidate_siabuc_cache()` se llaman sincrónicamente en todos los endpoints que mutan datos relevantes antes de retornar la respuesta.

---

## 8. Seguridad y autenticación

### JWT Manual (sin dependencias externas)

Implementado en `backend/app/core/security.py` usando solo la biblioteca estándar de Python:

- **Algoritmo:** HMAC-SHA256 (HS256)
- **Expiración:** 24 horas desde la emisión
- **Secreto:** `SUPABASE_SERVICE_ROLE_KEY` (si no se configura `JWT_SECRET` explícito)
- **Claims incluidos:** `sub`, `id`, `email`, `rol`, `kind`, `name`, `iat`, `exp`

### Control de acceso (RBAC)

| Dependencia FastAPI | Acceso permitido |
|---|---|
| `get_current_user` | Cualquier usuario con JWT válido |
| `require_admin` | Solo `rol` en `[admin, personal]` o `kind == ADMINISTRATIVE` |

**Reglas de negocio aplicadas en el backend:**
- Alumnos no pueden modificar `carrera_id`, `dependencia_o_area`, `rol`, `estado` ni `matricula_o_nomina` → `HTTP 403`
- Alumnos no pueden consultar ni modificar el perfil de otro usuario → `HTTP 403`
- No se puede eliminar un libro con ejemplares en préstamo activo → `HTTP 409`
- No se puede reducir ejemplares por debajo de los prestados actualmente → `HTTP 400`
- Duplicidad de ISBN → `HTTP 409`

### Hashing de contraseñas

- Algoritmo: `bcrypt` con `rounds=12`
- Contraseña temporal para usuarios creados por admin: `Acervo2026!`
- Fallback si bcrypt no está disponible: SHA-256 (solo entornos de desarrollo)

### CORS

Configurado en `main.py` con orígenes explícitos (no wildcard):
```
http://localhost:5173
http://127.0.0.1:5173
http://localhost:3000
http://127.0.0.1:3000
```

---

## 9. Decisiones técnicas

### ¿Por qué FastAPI y no Django/Flask?
FastAPI ofrece soporte nativo para `async/await`, validación automática con Pydantic y generación de documentación OpenAPI sin configuración adicional. Las llamadas a Supabase y Ollama son todas asíncronas — Django y Flask no tienen soporte async nativo equivalente.

### ¿Por qué JWT manual sin PyJWT?
Reduce dependencias externas y el riesgo de vulnerabilidades en librerías de terceros. HMAC-SHA256 está en la biblioteca estándar de Python. La implementación es transparente y auditable.

### ¿Por qué Supabase REST API y no conexión directa PostgreSQL?
El servidor no tiene acceso directo al puerto de PostgreSQL de Supabase (es un servicio en la nube). Usar la REST API de Supabase con `SERVICE_ROLE_KEY` permite bypass de RLS cuando es necesario y mantiene una interfaz uniforme sin gestionar pools de conexiones.

### ¿Por qué el índice vectorial en JSON y no pgvector?
En la fase actual del proyecto, el acervo tiene menos de 100 libros. El archivo JSON con búsqueda coseno en memoria tiene latencia < 10ms para ese volumen. La migración a pgvector está planificada para cuando el acervo supere los 500 títulos.

### ¿Por qué `llama3.2:1b` como modelo principal?
El servidor tiene 2 núcleos y 15 GB de RAM. `llama3.2:3b` consume ~4 GB de RAM durante inferencia. Con `llama3.2:1b` (~1.5 GB) hay margen suficiente para el sistema operativo y los otros servicios. Para el grounding de búsqueda semántica se recomienda migrar a `3b` cuando sea posible.

### ¿Por qué `nomic-embed-text` para embeddings?
Genera vectores de 768 dimensiones, es el modelo más eficiente disponible en Ollama para tareas de recuperación semántica, y está optimizado para el patrón `search_query:` / `search_document:` que implementa el sistema.

---

*Manual técnico generado el 17 de noviembre de 2026.*  
*Sistema de Acervo CIU — UNIPOLI.*

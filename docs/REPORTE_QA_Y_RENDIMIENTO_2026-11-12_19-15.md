# Reporte Ejecutivo de Auditoría de QA y Rendimiento Web
**Sistema de Acervo Bibliotecario (CIU)**  
**Repositorio:** `https://github.com/kishirukito/Sistema_de_Acervo`  
**Fecha de Generación:** 12 de Noviembre de 2026  
**Hora de Ejecución:** 19:15:00 CST (UTC-6)  
**Timestamp ISO:** `2026-11-12T19:15:00-06:00`  
**Rol del Auditor:** Senior QA Engineer & Web Performance Testing Specialist  

---

## 1. Resumen Ejecutivo del Entorno y Alcance

La presente auditoría fue ejecutada de manera automatizada y empírica sobre las instancias activas del sistema:
- **Frontend:** Single Page Application (SPA) en React 19 + TypeScript + Vite 8 (Puerto local: `5173`).
- **Backend:** API REST en Python 3 + FastAPI + Uvicorn (Puerto local: `8000`).
- **Base de Datos & Auth:** Supabase Cloud (PostgreSQL 15 + GoTrue Auth + PostgREST).
- **Herramientas de Evaluación:** HTTPX async runner para benchmarks de API, suite Selenium WebDriver con Google Chrome Headless para métricas de `PerformanceTiming`, análisis de responsividad en 3 viewports y captura de logs de consola/red.

---

## 2. Matriz de Ejecución de Pruebas

A continuación se presenta la matriz detallada con los casos de prueba ejecutados cubriendo flujos principales (*Happy Path*), control de acceso por roles (*RBAC*), casos negativos (*Edge Cases*), seguridad e integridad con concurrencia:

| ID | Módulo | Caso de Prueba | Datos de Entrada | Resultado Esperado | Resultado Obtenido | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-AUTH-01** | Autenticación | Inicio de sesión Admin con credenciales válidas | `admin@upd.edu.mx` / `admin123` | HTTP 200, JWT token generado, rol ADMIN, redirect `/admin/dashboard` | HTTP 200, JWT emitido, rol: ADMIN, redirect: `/admin/dashboard` | **PASS** |
| **TC-AUTH-02** | Autenticación | Inicio de sesión Lector con credenciales válidas | `alumno.prueba@upd.edu.mx` / `admin123` | HTTP 200, JWT token generado, kind NORMAL, redirect `/user/home` | HTTP 200, JWT emitido, kind: NORMAL, redirect: `/user/home` | **PASS** |
| **TC-RBAC-01** | Control de Acceso | Restricción de ruta administrativa (`/data/usuarios`) a usuario Lector | Token Bearer de Alumno Regular | HTTP 403 Forbidden con detalle de permisos | HTTP 403: *"Acceso denegado. Se requieren permisos de administrador para esta operación."* | **PASS** |
| **TC-RBAC-02** | Control de Acceso | Acceso sin autenticación a catálogo protegido | Petición GET sin encabezado `Authorization` | HTTP 401 Unauthorized | HTTP 401: *"Se requiere autenticación. Encabezado Authorization ausente."* | **PASS** |
| **TC-CRUD-01** | Gestión Acervo | Registro de nuevo título con ejemplares iniciales | Título: *Manual QA Automatizado*, ISBN único, 3 ejemplares | HTTP 200/201 con ID y estructura de datos creada | HTTP 200, ID `93d754f6-3433-4af4-a704-dfb696fc2c96` creado exitosamente | **PASS** |
| **TC-CRUD-02** | Gestión Acervo | Persistencia y consulta en catálogo general | `GET /data/libros` con token admin | HTTP 200 y registro localizado en catálogo | HTTP 200, total 7 libros, nuevo título verificado en lista | **PASS** |
| **TC-CRUD-03** | Gestión Acervo | Actualización de información de libro (`PATCH`) | ID existente, nuevo título de libro | HTTP 200 con `updated: true` y datos refrescados | HTTP 200, `updated: true` con timestamp de actualización | **PASS** |
| **TC-CRUD-04** | Gestión Acervo | Baja de libro sin préstamos activos (`DELETE`) | ID existente sin préstamos | HTTP 200 con `deleted: true` | HTTP 200, mensaje confirmando retiro del acervo | **PASS** |
| **TC-CRUD-05** | Gestión Acervo | Eliminación de recurso inexistente | ID ya retirado del sistema | HTTP 404 Not Found | HTTP 404: *"No se encontró el libro con ID..."* | **PASS** |
| **TC-LOAN-01** | Préstamos | Consulta de préstamos institucionales (Admin) | `GET /data/prestamos` con token Admin | HTTP 200 con historial y ejemplares | HTTP 200, listado de préstamos con relaciones embebidas | **PASS** |
| **TC-LOAN-02** | Préstamos | Consulta aislada de préstamos del usuario Lector | `GET /data/mis-prestamos` con token Alumno | HTTP 200 filtrando exclusivamente préstamos del `user_id` | HTTP 200, aislamiento total de registros del usuario autenticado | **PASS** |
| **TC-NEG-01** | Autenticación | Login con contraseña incorrecta | `admin@upd.edu.mx` / `PasswordErroneo!` | HTTP 401 Unauthorized | HTTP 401: *"El correo o la contraseña son incorrectos."* | **PASS** |
| **TC-NEG-02** | Autenticación | Login con usuario inexistente | `noexiste@upd.edu.mx` / `admin123` | HTTP 401 Unauthorized | HTTP 401: *"El correo o la contraseña son incorrectos."* | **PASS** |
| **TC-NEG-03** | Validación | Envío de título con 6,000 caracteres | Título: cadena de 6,000 chars | HTTP 422 o 400 controlado por esquema | HTTP 500 no controlado (*Internal Server Error*) | **FAIL** |
| **TC-NEG-04** | Validación | Soporte de caracteres Unicode / Emojis | *Diseño de Sistemas 🤖📚💡 & Cuántica ⚛️* | HTTP 200/201 con almacenamiento íntegro | HTTP 200, persistencia y decodificación limpia UTF-8 | **PASS** |
| **TC-NEG-05** | Validación | Envío de cuerpo vacío en Login | `{}` en `POST /auth/login` | HTTP 422 Unprocessable Entity | HTTP 422 con detalle de validación Pydantic | **PASS** |
| **TC-SEC-01** | Seguridad | Inyección SQL en autenticación | `' OR '1'='1` en email y password | HTTP 401 o 400 sin escape ni fuga | HTTP 401, consulta parametrizada segura en Supabase | **PASS** |
| **TC-SEC-02** | Seguridad | Inyección XSS en formulario de libro | `<script>alert('XSS')</script>` en título | Almacenamiento escapado/seguro | HTTP 200 almacenado como texto plano sin ejecución en UI | **PASS** |
| **TC-CONC-01**| Concurrencia | Doble clic / envío simultáneo con mismo ISBN | 2x peticiones paralelas `POST /data/libros` | 1 éxito (200), 1 rechazo controlado (409) | Petición 1: HTTP 200 / Petición 2: HTTP 500 (colisión de clave) | **WARNING** |
| **TC-UI-01**  | UI / UX | Empty state en búsqueda sin resultados | Query: `XYZ999NOEXISTE_QA` | Renderizado de estado vacío visual | Componente de "No se encontraron libros" desplegado | **PASS** |
| **TC-RESP-01**| Responsividad | Renderizado en Desktop (1920x1080) | Viewport 1920x1080 | Cero desbordamiento horizontal | `scrollWidth` = `clientWidth` (sin scroll horizontal) | **PASS** |
| **TC-RESP-02**| Responsividad | Renderizado en Móvil (375x812) en Admin | Viewport 375x812 en `/admin/*` | Adaptabilidad sin scroll horizontal | `scrollWidth` > `clientWidth` (Desbordamiento de 576px a 1109px) | **FAIL** |
| **TC-RESP-03**| Responsividad | Renderizado en Móvil (375x812) en Lector | Viewport 375x812 en `/user/*` | Adaptabilidad sin scroll horizontal | Totalmente adaptado (`overflow = false`) | **PASS** |

---

## 3. Tabla de Tiempos de Respuesta y Rendimiento (Medición Real)

Se ejecutaron **5 peticiones reales por endpoint** calculando tiempo mínimo, promedio, percentil 95 (p95) y `TTFB` (Time to First Byte). Se marcó como **CUELLO DE BOTELLA** cualquier ruta o petición que supere el umbral de **300 ms**:

| Endpoint / Pantalla | Método | Código HTTP | TTFB Prom. (ms) | Tiempo Mín. (ms) | Tiempo Prom. (ms) | Tiempo p95 (ms) | Evaluación |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/api/v1/auth/login` | POST | 200 | 472.17 | 439.99 | **472.61** | 569.81 | **CUELLO DE BOTELLA (>300ms)** |
| `/api/v1/data/libros` (Listado general) | GET | 200 | 229.14 | 212.39 | **229.68** | 255.33 | **ACEPTABLE (<300ms)** |
| `/api/v1/data/prestamos` (Admin) | GET | 200 | 233.04 | 212.68 | **233.51** | 253.96 | **ACEPTABLE (<300ms)** |
| `/api/v1/data/mis-prestamos` (Lector) | GET | 200 | 249.82 | 209.38 | **250.38** | 350.12 | **ACEPTABLE (<300ms)** |
| `/api/v1/data/usuarios` (Admin) | GET | 200 | 308.44 | 209.98 | **309.03** | 617.26 | **CUELLO DE BOTELLA (>300ms)** |
| `/api/v1/reports/siabuc` (Estadísticas) | GET | 200 | 540.20 | 482.17 | **546.43** | 675.19 | **CUELLO DE BOTELLA (>300ms)** |
| `/api/v1/data/libros` (Creación de Título) | POST | 200 | 880.37 | 909.16 | **1,035.73** | 1,223.76 | **CUELLO DE BOTELLA (>300ms)** |
| Pantalla `/login` (Frontend en Chrome) | GET | 200 | 25.00 | — | **DOMContentLoaded: 3,041 ms** | **FCP: 3,908 ms** | **MEJORABLE (Dev Mode)** |

---

## 4. Reporte de Defectos (Bugs)

### BUG-01: Desbordamiento Horizontal en Vistas del Panel de Administrador en Resoluciones Móviles
* **Severidad:** **Alta**
* **Módulo:** UI / UX & Responsividad (`/admin/dashboard`, `/admin/catalog`, `/admin/loans`, `/admin/reports`).
* **Pasos para reproducir:**
  1. Abrir la aplicación e iniciar sesión como Administrador (`admin@upd.edu.mx`).
  2. Ajustar el viewport a resolución móvil (`375x812` o inspección iPhone SE/12).
  3. Navegar a `/admin/catalog` o `/admin/reports`.
  4. Observar que la página genera una barra de desplazamiento horizontal indeseada (`scrollWidth` entre 885px y 1,109px frente a 375px visibles).
* **Evidencia:**
  * Prueba automatizada en Selenium: `has_horizontal_overflow: True` en las 4 pantallas administrativas analizadas.
* **Sugerencia técnica de solución:**
  * Envolver todas las tablas de datos (`<table>`) en un contenedor `<div className="overflow-x-auto w-full">` o con `max-width: 100%; overflow-x: auto;`.
  * En las tarjetas de resumen y métricas de `/admin/dashboard`, cambiar la regla de grid en CSS para pantallas `<= 640px` a `grid-template-columns: 1fr;`.

---

### BUG-02: Alta Latencia y Sobrecarga en Reportes Estadísticos SIABUC (`GET /api/v1/reports/siabuc`)
* **Severidad:** **Alta (Rendimiento)**
* **Módulo:** Backend / Base de Datos (`reports_router.py`).
* **Pasos para reproducir:**
  1. Realizar una petición `GET` autenticada a `http://127.0.0.1:8000/api/v1/reports/siabuc`.
  2. Medir el tiempo transcurrido hasta la recepción completa del payload.
* **Evidencia:**
  * Tiempo promedio medido: **546.43 ms** (p95: 675.19 ms).
  * En `backend/app/api/v1/reports_router.py`, cada petición ejecuta primero un `PATCH` secuencial a Supabase para marcar préstamos vencidos, y posteriormente dispara **9 peticiones HTTP independientes** a la API REST de Supabase en paralelo (`asyncio.gather`), descargando tablas completas y realizando las agregaciones en la CPU del servidor Python.
* **Sugerencia técnica de solución:**
  1. **Consolidación en BD:** Crear una función almacenada SQL (RPC) en Supabase / PostgreSQL (`get_siabuc_report_json()`) que ejecute los cálculos directamente en PostgreSQL y retorne el JSON compilado en una sola ida y vuelta (< 90 ms).
  2. **Caché en memoria:** Configurar un caché con TTL de 60 segundos en FastAPI para `/reports/siabuc`, evitando recalcular las 9 tablas en cada refresco de página.

---

### BUG-03: Latencia Excesiva en el Registro de Nuevos Títulos en el Acervo (`POST /api/v1/data/libros`)
* **Severidad:** **Media (Rendimiento)**
* **Módulo:** Backend (`supabase_service.py` -> `create_book`).
* **Pasos para reproducir:**
  1. Enviar una petición `POST` a `/api/v1/data/libros` con los datos de un libro nuevo (incluyendo autor, editorial y ejemplares iniciales).
* **Evidencia:**
  * Tiempo promedio registrado: **1,035.73 ms** (p95: 1,223.76 ms).
  * Inspección de código en `supabase_service.py`: El flujo realiza múltiples llamadas REST HTTP en cascada:
    1. Búsqueda/inserción de Editorial.
    2. Búsqueda/inserción de Autor.
    3. Inserción de Libro.
    4. Inserción de relación `libro_autores`.
    5. Inserción de relación `libro_temas`.
    6. Inserción iterativa de `ejemplares`.
* **Sugerencia técnica de solución:**
  * Migrar el procedimiento a una función almacenada o transacción por lotes (Batch Insert) mediante un procedimiento PL/pgSQL en PostgreSQL (`registrar_libro_completo`), reduciendo los 5 viajes WAN a 1 solo viaje HTTP.

---

### BUG-04: Error 500 no controlado ante Cadenas Extremas en Título de Libro
* **Severidad:** **Media**
* **Módulo:** Validación de Entradas (`/api/v1/data/libros`).
* **Pasos para reproducir:**
  1. Enviar un payload `POST /api/v1/data/libros` con un campo `"titulo"` que contenga 6,000 caracteres.
* **Evidencia:**
  * El endpoint responde con `HTTP 500 Internal Server Error` (*"Error al registrar el título en el catálogo"*).
  * Esto ocurre porque el endpoint recibe `payload: Dict[str, Any]` sin validación estricta de Pydantic, delegando el fallo a la base de datos que excede el límite de columna.
* **Sugerencia técnica de solución:**
  * Implementar un esquema Pydantic fuertemente tipado:
    ```python
    class BookCreateSchema(BaseModel):
        titulo: str = Field(..., min_length=1, max_length=255)
        autor: str = Field(..., min_length=1, max_length=150)
        isbn: str = Field(..., min_length=10, max_length=20)
    ```
    FastAPI retornará un `HTTP 422 Unprocessable Entity` estructurado antes de consultar la base de datos.

---

### BUG-05: Manejo de Excepción Genérica 500 en Doble Envío Simultáneo (Race Condition ISBN)
* **Severidad:** **Media**
* **Módulo:** Concurrencia e Integridad (`POST /api/v1/data/libros`).
* **Pasos para reproducir:**
  1. Enviar dos peticiones `POST /data/libros` concurrentes exactamente con el mismo código ISBN.
* **Evidencia:**
  * La primera petición responde `HTTP 200 OK`.
  * La segunda petición colisiona por restricción `UNIQUE (isbn)` y responde `HTTP 500` con mensaje genérico en lugar de `HTTP 409 Conflict`.
* **Sugerencia técnica de solución:**
  * Detectar el error `23505` (violación de unicidad en PostgreSQL/Supabase) en `supabase_service.py` y elevar `HTTPException(status_code=409, detail="El código ISBN ya está registrado.")`.

---

## 5. Conclusiones y Recomendaciones de Arquitectura

1. **Seguridad y Control de Roles (RBAC):** El sistema demostró una separación adecuada entre perfiles administrativos y de consulta general, con protección contra inyecciones SQL y escape nativo en frontend frente a ataques XSS.
2. **Optimización de Red y Consultas:** Se recomienda prioritariamente sustituir las llamadas REST encadenadas por funciones almacenadas (RPC) en Supabase para reducir los cuellos de botella identificados en el reporte SIABUC y en el registro de acervo.
3. **Producción Frontend:** Compilar los assets del frontend con `npm run build` para habilitar compresión Gzip/Brotli y *code-splitting*, lo cual reducirá el tiempo de carga inicial (`DOMContentLoaded` y `FCP`) por debajo de los 1.2 segundos.


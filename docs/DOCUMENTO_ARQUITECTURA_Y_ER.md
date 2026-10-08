# 🏛️ Documento de Arquitectura de Software y Diagrama Entidad-Relación (ER)
## Proyecto: Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

---

## 1. Visión General y Arquitectura del Sistema

El **Sistema de Gestión Bibliotecaria** se concibe bajo una **Arquitectura en Capas Desacoplada (Headless / Decoupled Client-Server)**, que maximiza la modularidad, escalabilidad, seguridad y mantenibilidad.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                            │
│                 React 19 + TypeScript / Vite / NextJS                  │
│  ├── Portal Web / Catálogo de Libros (Alumnos y Docentes)              │
│  ├── Gestión de Préstamos y Devoluciones (Personal)                   │
│  └── Dashboard Administrativo y Estadísticas                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST (JSON)
┌───────────────────────────────────▼────────────────────────────────────┐
│                        CAPA DE SERVICIOS (BACKEND)                     │
│                           Python 3.12 + FastAPI                        │
│  ├── API Gateway & Routers (/auth, /books, /loans, /users, /ai)        │
│  ├── Capa de Seguridad (OAuth2 + JWT Bearer + RBAC)                    │
│  ├── Middleware de Auditoría y Bitácora                                │
│  └── Orquestador de Servicios IA (Embeddings & Resúmenes)              │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
   PostgreSQL Driver / PostgREST                     │ SDK Asíncrono
                   │                                 │
┌──────────────────▼───────────────────┐ ┌───────────▼───────────────────┐
│       BASE DE DATOS & STORAGE        │ │    SERVICIOS DE INTELIGENCIA  │
│              Supabase                │ │        ARTIFICIAL LOCAL       │
│  ├── PostgreSQL 15+ (Relacional)     │ │  Ollama / Local LLM Server    │
│  ├── Row Level Security (RLS)        │ │  ├── Modelo: Llama 3.2 / Qwen │
│  ├── Supabase Auth (Identity)        │ │  ├── Búsqueda Semántica Local │
│  └── Supabase Storage (Portadas)     │ │  └── Síntesis y Resúmenes     │
└──────────────────────────────────────┘ └───────────────────────────────┘
```

---

## 2. Stack Tecnológico Seleccionado

| Componente | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Backend Framework** | Python 3.12 + FastAPI | Soporte asíncrono nativo (`asyncio`), auto-documentación OpenAPI (Swagger) y validación de tipos estricta con `Pydantic v2`. |
| **Base de Datos & Auth** | Supabase (PostgreSQL 15+) | Cumplimiento ACID, soporte para *Row Level Security* (RLS), triggers de auditoría en PL/pgSQL y gestión integral de usuarios. |
| **Storage de Archivos** | Supabase Storage | Almacenamiento distribuido optimizado y seguro para portadas de libros y documentos. |
| **Frontend Web** | React 19 + TypeScript + Vite | Ecosistema reactivo de alto rendimiento, soporte de tipado estático y velocidad de compilación. |
| **Inteligencia Artificial (Local)** | Ollama / Llama 3.2 (3B) / Qwen 2.5 + Nomic Embeddings | Inferencia 100% local en servidor/equipo propio: **cero costo por token**, privacidad total de datos bibliotecarios y funcionamiento offline sin depender de APIs de terceros. |
| **Calidad y Testing** | Pytest, Black, Ruff | Pruebas unitarias/integración automatizadas y estándares de código PEP 8 estrictos. |

---

## 3. Modelo Entidad-Relación (ER)

### 3.1 Diagrama Entidad-Relación (Mermaid)

```mermaid
erDiagram
    USUARIOS ||--o{ PRESTAMOS : "solicita / gestiona"
    USUARIOS ||--o{ AUDITORIA_LOGS : "genera"
    LIBROS ||--o{ EJEMPLARES : "contiene"
    LIBROS ||--o{ LIBRO_TEMAS : "clasificado_en"
    TEMAS ||--o{ LIBRO_TEMAS : "asocia"
    LIBROS ||--o{ RESUMENES_IA : "tiene"
    EJEMPLARES ||--o{ PRESTAMOS : "involucrado_en"

    USUARIOS {
        uuid id PK "Identificador único (Supabase Auth ID)"
        varchar email UK "Correo institucional único"
        varchar password_hash "Contraseña cifrada con bcrypt"
        varchar nombre_completo "Nombre y apellidos"
        varchar matricula_o_nomina UK "Identificador escolar o laboral"
        enum rol "admin, personal, alumno"
        enum estado "activo, suspendido, inactivo"
        timestamp created_at "Fecha de registro"
        timestamp updated_at "Última modificación"
    }

    TEMAS {
        serial id PK "ID autoincremental"
        varchar nombre UK "Nombre único del área temática"
        text descripcion "Detalle del tópico"
    }

    LIBROS {
        uuid id PK "ID único del libro"
        varchar isbn UK "Código ISBN-10 o ISBN-13"
        varchar titulo "Título de la publicación"
        varchar autor "Autor o autores"
        varchar editorial "Casa editorial"
        int anio_publicacion "Año de edición"
        varchar edicion "Número de edición"
        varchar portada_url "Ruta al bucket de Supabase"
        timestamp created_at "Fecha de alta"
    }

    LIBRO_TEMAS {
        uuid libro_id FK "ID del libro"
        int tema_id FK "ID del tema"
    }

    EJEMPLARES {
        uuid id PK "ID físico del ejemplar"
        uuid libro_id FK "ID del libro al que pertenece"
        varchar codigo_inventario UK "Código de barras único de la pieza"
        varchar ubicacion_estante "Ubicación (Pasillo-Estante-Nivel)"
        enum estado "disponible, prestado, mantenimiento, extraviado"
        text observaciones "Condición física o notas"
        timestamp created_at "Fecha de ingreso"
    }

    PRESTAMOS {
        uuid id PK "ID de la transacción"
        uuid usuario_id FK "Usuario receptor"
        uuid ejemplar_id FK "Copia física prestada"
        timestamp fecha_prestamo "Fecha de entrega"
        timestamp fecha_limite_devolucion "Fecha máxima de retorno"
        timestamp fecha_devolucion_real "Fecha en que se devuelve"
        enum estado "activo, devuelto, vencido, renovado"
        text notas "Observaciones del préstamo"
    }

    RESUMENES_IA {
        uuid id PK "ID del resumen"
        uuid libro_id FK "Libro analizado"
        text resumen_texto "Texto sintetizado por IA"
        varchar palabras_clave "Tags o conceptos clave"
        varchar modelo_usado "Ej: gpt-4o-mini"
        timestamp generado_en "Fecha de procesamiento"
    }

    AUDITORIA_LOGS {
        uuid id PK "ID del log"
        uuid usuario_id FK "Usuario responsable"
        varchar accion "INSERT, UPDATE, DELETE"
        varchar tabla_afectada "Nombre de la tabla"
        varchar registro_id "ID del registro intervenido"
        jsonb detalle_cambio "Valores previos y nuevos"
        timestamp created_at "Timestamp del suceso"
    }
```

### 3.2 Diccionario de Datos

1. **`usuarios`**: Almacena las cuentas de usuarios con control de acceso por roles (`admin`, `personal`, `alumno`).
2. **`libros`**: Almacena la ficha bibliográfica general de cada obra (ISBN, título, autor, editorial).
3. **`ejemplares`**: Registra cada copia física individualizada por su código de inventario y ubicación física.
4. **`temas`** y **`libro_temas`**: Clasificación taxonómica y temática de los títulos (relación muchos a muchos).
5. **`prestamos`**: Control de préstamos de ejemplares a usuarios, fechas límite y estados de devolución.
6. **`resumenes_ia`**: Síntesis y palabras clave generadas mediante LLM para optimizar búsquedas.
7. **`auditoria_logs`**: Trazabilidad completa de operaciones críticas sobre la información.

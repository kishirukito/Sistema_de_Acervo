# 🏛️ Documento de Arquitectura de Software y Diagrama Entidad-Relación (ER)
## Proyecto: Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)

---

## 1. Visión General y Arquitectura del Sistema

El **Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)** se fundamenta en una **Arquitectura Moderna Desacoplada Basada en Microservicios y Fullstack BFF (Backend-for-Frontend)**:

1. **Núcleo Fullstack (Next.js + TypeScript):** Gestiona la presentación visual (React), la lógica de negocio central, la API REST interna (Next.js App Router / Route Handlers), la autenticación de usuarios, el control de acceso por roles (RBAC), el inventario, los préstamos, la subida de portadas a Supabase Storage y el registro de bitácora de auditoría.
2. **Microservicio Especializado de IA (Python 3.12 + FastAPI):** Encapsula exclusivamente las tareas de Inteligencia Artificial (procesamiento del lenguaje natural, síntesis y resúmenes automáticos de libros con LLM local Ollama `llama3.2:3b` y generación de embeddings con `nomic-embed-text`).
3. **Capa de Persistencia y Almacenamiento (Supabase / PostgreSQL):** Base de datos relacional robusta con soporte para políticas *Row Level Security* (RLS), triggers automáticos y almacenamiento en la nube (Storage buckets) para portadas de libros.

```
┌────────────────────────────────────────────────────────────────────────┐
│             NÚCLEO FULLSTACK: NEXT.JS 14+ CON TYPESCRIPT               │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               CAPA DE PRESENTACIÓN (CLIENTE UI)                │   │
│   │  ├── Catálogo y Búsqueda Inteligente de Libros                 │   │
│   │  ├── Panel de Préstamos y Devoluciones                         │   │
│   │  ├── Panel de Control de Inventario y Ejemplares Físicos       │   │
│   │  └── Dashboard de Métricas y Estadísticas                      │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │ Fetch / Server Actions             │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │           CAPA DE SERVICIOS Y API (ROUTE HANDLERS)             │   │
│   │  ├── /api/auth    -> Login, validación de sesiones y roles     │   │
│   │  ├── /api/books   -> CRUD completo de libros y ejemplares      │   │
│   │  ├── /api/loans   -> Transacciones de préstamo y devolución    │   │
│   │  ├── /api/users   -> Gestión de usuarios (alumno, personal)    │   │
│   │  ├── /api/audit   -> Consulta de bitácora y auditoría          │   │
│   │  ├── /api/storage -> Subida de portadas (Supabase Storage)     │   │
│   │  └── /api/ai      -> Orquestación y consumo de servicios IA    │   │
│   └──────────────────────┬─────────────────────────┬───────────────┘   │
└──────────────────────────┼─────────────────────────┼───────────────────┘
                           │                         │
     PostgreSQL / RLS / SDK│                         │ HTTP REST (JSON)
                           │                         │
┌──────────────────────────▼───────────┐ ┌───────────▼───────────────────┐
│       BASE DE DATOS & STORAGE        │ │    MICROSERVICIO DEDICADO DE  │
│              Supabase                │ │        IA LOCAL (PYTHON)      │
│  ├── PostgreSQL 15+ (Relacional)     │ │  FastAPI + Ollama Engine      │
│  ├── Row Level Security (RLS)        │ │  ├── Modelo: Llama 3.2 (3B)   │
│  ├── Supabase Storage (Portadas)     │ │  ├── Resúmenes Analíticos     │
│  └── Tablas: Libros, Usuarios,       │ │  ├── Sugerencias Temáticas    │
│      Ejemplares, Préstamos, Logs     │ │  └── Embeddings Vectoriales   │
└──────────────────────────────────────┘ └───────────────────────────────┘
```

---

## 2. Stack Tecnológico Seleccionado

| Componente | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Núcleo Fullstack & API** | Next.js 14+ / TypeScript | Tipado estático de extremo a extremo, soporte para Server Components, App Router y Route Handlers (`/api/...`) de alto rendimiento para toda la lógica de negocio. |
| **Base de Datos Relacional** | Supabase (PostgreSQL 15+) | Motor ACID de grado empresarial, llaves foráneas con integridad referencial, índices optimizados y seguridad a nivel de fila (*Row Level Security*). |
| **Almacenamiento de Archivos** | Supabase Storage | Bucket dedicado (`portadas`) con generación de URLs públicas y control de subidas de archivos multipart. |
| **Microservicio de IA** | Python 3.12 + FastAPI + Ollama | Entorno especializado para LLMs y procesamiento de lenguaje natural local (`llama3.2:3b` y `nomic-embed-text`) con costo de inferencia $0 y privacidad institucional absoluta. |
| **Control de Auditoría** | Bitácora en BD (`auditoria_logs`) | Registro inmutable de eventos que almacena quién ejecutó la acción, en qué tabla, sobre qué ID y con qué valores antes/después. |

---

## 3. Modelo Entidad-Relación (ER)

### 3.1 Diagrama Entidad-Relación (Mermaid)

```mermaid
erDiagram
    TIPOS_USUARIO ||--o{ USUARIOS : "clasifica"
    USUARIOS ||--o{ PRESTAMOS : "realiza"
    USUARIOS ||--o{ AUDITORIA_LOGS : "genera"
    LIBROS ||--o{ EJEMPLARES : "tiene"
    LIBROS ||--o{ LIBRO_TEMAS : "clasificado_en"
    TEMAS ||--o{ LIBRO_TEMAS : "asociado_a"
    LIBROS ||--o{ RESUMENES_IA : "posee"
    EJEMPLARES ||--o{ PRESTAMOS : "se_presta"

    TIPOS_USUARIO {
        int id PK "Identificador único"
        string codigo UK "administrativo | docente | alumno | egresado_tesista | externo"
        string nombre "Nombre descriptivo de la categoría"
        int max_libros_simultaneos "Límite de libros prestados a la vez"
        int dias_prestamo_domicilio "Días concedidos para préstamo a domicilio"
        boolean permite_prestamo_domicilio "Si es false, solo permite consulta en sala"
        text descripcion "Reglas y observaciones del perfil"
    }

    USUARIOS {
        uuid id PK "Identificador único"
        int tipo_usuario_id FK "Referencia a TIPOS_USUARIO"
        string rol "admin | personal | lector"
        string email UK "Correo institucional o personal"
        string password_hash "Hash seguro de contraseña"
        string nombre_completo "Nombre y apellidos"
        string matricula_o_nomina UK "Matrícula, nómina o INE"
        string carrera_o_dependencia "Carrera, departamento o institución"
        date vigencia_hasta "Vigencia de credencial (2025, 2026, 2027)"
        string estado "activo | suspendido | inactivo"
        timestamp created_at "Fecha de registro"
        timestamp updated_at "Fecha de última modificación"
    }


    TEMAS {
        int id PK "Identificador autonumérico"
        string nombre UK "Nombre del tema o materia"
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
        timestamp updated_at "Fecha de modificación"
    }

    LIBRO_TEMAS {
        uuid libro_id FK "Referencia a LIBROS"
        int tema_id FK "Referencia a TEMAS"
    }

    EJEMPLARES {
        uuid id PK "Identificador de copia física"
        uuid libro_id FK "Referencia al título general"
        string codigo_inventario UK "Código físico de inventario / barras"
        string ubicacion_estante "Pasillo, estante y nivel"
        string estado "disponible | prestado | mantenimiento | extraviado"
        text observaciones "Detalles de desgaste o estado físico"
        timestamp created_at "Fecha de registro"
        timestamp updated_at "Fecha de modificación"
    }

    PRESTAMOS {
        uuid id PK "Identificador de la transacción"
        uuid usuario_id FK "Usuario solicitante"
        uuid ejemplar_id FK "Ejemplar físico entregado"
        string tipo_prestamo "domicilio | sala"
        timestamp fecha_prestamo "Fecha y hora de entrega"
        timestamp fecha_limite_devolucion "Fecha pactada de devolución"
        timestamp fecha_devolucion_real "Fecha efectiva de retorno"
        string estado "activo | devuelto | vencido | renovado"
        text notas "Observaciones al recibir o entregar"
        timestamp created_at "Fecha de registro"
    }

    RESUMENES_IA {
        uuid id PK "Identificador del resumen"
        uuid libro_id FK "Libro al que pertenece"
        text resumen_texto "Contenido analítico generado por IA"
        string palabras_clave "Términos relevantes extraídos"
        string modelo_usado "Ej: llama3.2:3b / nomic-embed"
        timestamp generado_en "Fecha de procesamiento"
    }

    AUDITORIA_LOGS {
        uuid id PK "Identificador del registro de auditoría"
        uuid usuario_id FK "Usuario que ejecutó la acción"
        string accion "CREATE | UPDATE | DELETE | LOGIN | UPLOAD"
        string tabla_afectada "Nombre de la entidad alterada"
        string registro_id "ID del elemento modificado"
        jsonb detalle_cambio "Valores antes y después del cambio"
        timestamp created_at "Momento exacto del evento"
    }
```

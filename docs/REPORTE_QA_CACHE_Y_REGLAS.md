# Reporte de Certificación QA: Consistencia de Caché, Reglas de Negocio y Seguridad (CIU)

**Fecha de Ejecución:** 12 de Noviembre de 2026 · **Hora:** 22:39 CST  
**Auditor Responsable:** Ingeniero Senior de QA & Auditor de Sistemas  
**Servidores Evaluados:**
- **Frontend Web:** `http://127.0.0.1:5173` (React 19 / Vite / TypeScript)
- **Backend API:** `http://127.0.0.1:8000` (FastAPI / Uvicorn)
- **Base de Datos:** Supabase PostgreSQL (`ghddarooxlbyjcasbjtx.supabase.co`)
- **Motor de Inferencia:** Ollama Local (`llama3.2:3b` / `nomic-embed-text`)

---

## 1. Resumen Ejecutivo de Resultados (Batería 5/5)

| # | Escenario Evaluado | Componente | Estado | Evidencia Clave / Métrica |
| :---: | :--- | :---: | :---: | :--- |
| **P1** | **Consistencia e Invalidación de Caché en Libros** | Backend | **PASS** | 2ª petición respondió en **3.85 ms** (< 15 ms). Tras registrar préstamo, el stock disponible disminuyó de 1 a 0 de forma inmediata sin esperar los 60s de TTL. Al devolverlo, retornó a 1 al instante. |
| **P2** | **Caché e Invalidación en Frontend (`sessionStorage` / RAM)** | Frontend | **PASS** | `sessionStorage` almacenó `loanTypes` e `instituciones`. La creación de una institución de prueba invalidó el catálogo y fue limpiada sin dejar rastro. |
| **P3** | **Seguridad y Reglas de Negocio (Bloqueo de Carrera y RBAC)** | Full-Stack | **PASS** | Frontend muestra carrera en modo **solo lectura** (`Tecnologías de Información e Innovación Digital`) sin `<select>` editable. Petición directa `PATCH` de alumno enviando `carrera_id` fue rechazada con **`HTTP 403 Forbidden`**. Actualización de teléfono permitida (**`HTTP 200 OK`**) y restaurada. |
| **P4** | **Préstamo Interbibliotecario con Trazabilidad Completa** | Backend / DB | **PASS** | Préstamo interbibliotecario creado con éxito. `autorizado_por_id` asignado automáticamente al Admin (`a0000000-0000-0000-0000-000000000001`). `GET /prestamos` y `GET /reports/siabuc` operaron con código **`200 OK`**. Registros eliminados. |
| **P5** | **Caché LRU de Embeddings en Ollama** | Microservicio IA | **PASS** | Consulta en frío generó vector de 768 dimensiones. Petición idéntica en caliente resolvió en **5.45 ms** (< 15 ms) desde la memoria RAM. |

---

## 2. Detalle Técnico de los Escenarios Evaluados

### Escenario 1: Consistencia e Invalidación Inmediata de Caché en Libros
- **Petición en Frío (`GET /api/v1/data/libros`):** `233.55 ms` (Lectura directa desde Supabase).
- **Petición en Caliente (`GET /api/v1/data/libros`):** `3.85 ms` (**Reducción del 98.3 %**).
- **Prueba de Mutación y Consistencia:**
  1. Se identificó el libro *"Clean Code: A Handbook of Agile Software Craftsmanship"* con **1 ejemplar disponible**.
  2. Se ejecutó `POST /api/v1/data/prestamos` prestando dicho ejemplar al alumno de prueba.
  3. De forma inmediata se consultó `GET /api/v1/data/libros`: la respuesta se obtuvo directamente de la base de datos en `217.46 ms` (confirmando que la mutación invalidó el caché en memoria) y reportó **0 ejemplares disponibles**.
  4. Se canceló/devolvió el préstamo con `DELETE /api/v1/data/prestamos/{id}`: la disponibilidad se restauró a **1 ejemplar disponible** al instante.

### Escenario 2: Caché e Invalidación en Frontend (SessionStorage / RAM)
- Se ejecutó una sesión headless con Selenium simulando el navegador del Administrador.
- Al cargar `/admin/loans/new`, los catálogos fueron almacenados en `sessionStorage` (`acervo_catalog_loanTypes`, `acervo_catalog_instituciones`).
- Se registró una institución temporal de prueba (`Institución QA Test`) mediante `POST /api/v1/data/instituciones`.
- La función `createInstitucion()` ejecutó la invalidación de la clave de instituciones.
- Al recargar la vista, los catálogos estáticos no repitieron peticiones a la red y la institución de prueba estuvo disponible para selección.
- Se procedió a la eliminación segura del registro temporal en Supabase.

### Escenario 3: Seguridad, Control de Acceso y Bloqueo de Carrera (RBAC)
- **Inspección de UI (`/user/profile`):**
  - El elemento `#input-carrera` tiene los atributos `disabled="true"` y `readonly="true"`.
  - El selector `<select>` fue completamente eliminado del árbol del DOM.
  - El valor visualizado corresponde al nombre oficial de la carrera: `Tecnologías de Información e Innovación Digital`.
  - Se muestra el aviso normativo: *"Para solicitar un cambio de carrera, acude a Servicios Escolares o Administración de Biblioteca."*
- **Ataque / Petición Negativa Directa a la API:**
  - Petición: `PATCH /api/v1/data/usuarios/a0000000-0000-0000-0000-000000000004` con token de estudiante enviando `{"carrera_id": "3150c559-ba61-47d6-bd92-4ce90e70bd5f"}`.
  - Respuesta del servidor: **`HTTP 403 Forbidden`** con detalle explícito de denegación.
- **Operación Autorizada:**
  - Petición enviando únicamente `{"telefono": "6189998877"}`: **`HTTP 200 OK`**.
  - El teléfono fue restaurado inmediatamente a su valor original (`6181234567`).

### Escenario 4: Préstamo Interbibliotecario y Trazabilidad Institucional
- Se creó una institución temporal: *"Universidad Tecnológica de Durango (QA Convenio)"* (`clave_convenio: UTD-QA-2026`).
- Se registró un préstamo interbibliotecario con los metadatos:
  - `responsable_externo_nombre`: *"Lic. Encargado Externo"*
  - `responsable_externo_cargo`: *"Coordinador de Biblioteca"*
  - `responsable_externo_contacto`: *"coordinador@utd.edu.mx"*
  - `folio_oficio`: *"OF-UTD-2026-QA"*
- **Validaciones:**
  - `autorizado_por_id` se asignó automáticamente al ID del administrador autenticado (`a0000000-0000-0000-0000-000000000001`).
  - `GET /api/v1/data/prestamos` devolvió el listado completo con joins relacionales correctos.
  - `GET /api/v1/reports/siabuc` devolvió **`HTTP 200 OK`** calculando las estadísticas sin colisiones.
- **Limpieza:** Se eliminó el préstamo de prueba, se restauró el ejemplar a `disponible` y se eliminó la institución temporal.

### Escenario 5: Caché LRU de Embeddings en Memoria
- Texto de prueba: *"Auditoría de Sistemas de Información y Base de Datos Distribuida"*.
- **Petición 1 (Inferencia Ollama / Cold):** Tiempo de respuesta dependiente del modelo local.
- **Petición 2 (Caché LRU / Warm):** Tiempo de respuesta de **`5.45 ms`** (**< 15 ms**) con vector denso de 768 dimensiones íntegro.

---

## 3. Verificación de Integridad Final de la Base de Datos

Tras completar la batería de pruebas y las rutinas de limpieza, se auditó el conteo de registros en Supabase:

```json
{
  "usuarios": 6,
  "prestamos": 2,
  "libros": 6,
  "ejemplares": 6,
  "instituciones_convenio": 0,
  "carreras": 23,
  "tipos_prestamo": 3
}
```

- **Usuarios:** 6 registros base (sin usuarios fantasma).
- **Préstamos:** 2 registros semilla iniciales (0 préstamos temporales activos).
- **Ejemplares:** 6 registros en su estado original correspondiente.
- **Instituciones en Convenio:** 0 registros (tabla limpia lista para convenios reales).
- **Carreras:** 23 programas académicos UNIPOLI intactos.
- **Tipos de Préstamo:** 3 modalidades normalizadas (`domicilio`, `sala`, `interbibliotecario`).

---

## 4. Estado de la Aplicación y Build

- **Compilación Frontend:** `npm run build` ejecutado satisfactoriamente en **1.47 segundos** (`tsc -b && vite build` sin errores).
- **Archivos Temporales:** Todos los scripts de prueba (`tests/run_qa_audit.py`) y archivos JSON intermedios fueron purgados.

**Dictamen:** **SISTEMA CERTIFICADO PARA PRODUCCIÓN (5/5 PASS)**.


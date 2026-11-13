# Reporte de Auditoría Integral de Rendimiento Web y Reglas de Negocio (CIU)

**Fecha de Ejecución:** 12 de Noviembre de 2026 · **Hora:** 22:25 CST  
**Auditor:** Ingeniero Senior de QA & Especialista en Rendimiento Web / Full-Stack  
**Entorno de Pruebas:**
- **Frontend:** `http://127.0.0.1:5173` (React 19 + TypeScript + Vite)
- **Backend:** `http://127.0.0.1:8000` (FastAPI + Pydantic v2)
- **Base de Datos:** Supabase PostgreSQL (`ghddarooxlbyjcasbjtx.supabase.co`)
- **Microservicio de IA:** Ollama (`llama3.2:3b` / `nomic-embed-text`)

---

## 1. Validación de Regla de Negocio: Bloqueo de Cambio de Carrera para Estudiantes

Se implementó el mecanismo de **Defensa en Profundidad** para impedir que un usuario con rol de estudiante o lector altere su carrera universitaria asignada.

### A. Capa de Presentación (Frontend — `UserProfilePage.tsx`)
- **Eliminación del Selector:** Se retiró el control `<select>` editable que listaba la oferta académica de la UNIPOLI.
- **Campo Deshabilitado de Solo Lectura:** Se implementó un campo de texto `<input disabled readOnly>` con icono de bloqueo (`Lock`), mostrando el nombre resuelto de la carrera del estudiante (`Tecnologías de Información e Innovación Digital`).
- **Aviso Institucional:** Se agregó el texto normativo al pie del campo:
  > *"Para solicitar un cambio de carrera, acude a Servicios Escolares o Administración de Biblioteca."*
- **Saneamiento de Payload:** El controlador `handleSavePersonalInfo` ya no envía `carrera_id` ni `dependencia_o_area` en las peticiones del formulario.

### B. Capa de Servicio y Enrutamiento (Backend — `data_router.py`)
El endpoint `PATCH /api/v1/data/usuarios/{user_id}` fue actualizado con validación estricta de permisos según los claims del token JWT:
1. **Petición con campos autorizados (Estudiante actualizando nombre/teléfono propio):**
   - **Resultado:** `HTTP 200 OK`
2. **Prueba negativa 1 (Estudiante intentando enviar `carrera_id` o `dependencia_o_area`):**
   - **Payload:** `{"carrera_id": "3150c559-ba61-47d6-bd92-4ce90e70bd5f"}`
   - **Resultado:** `HTTP 403 Forbidden`
   - **Mensaje:** `"Los estudiantes o usuarios lectores no tienen autorización para modificar su carrera universitaria o área asignada. Para cambios, acude a Servicios Escolares o Administración."`
3. **Prueba negativa 2 (Estudiante intentando modificar el perfil de otro usuario):**
   - **Resultado:** `HTTP 403 Forbidden` (`"No tienes permisos para modificar el perfil de otro usuario."`)

---

## 2. Benchmark de Endpoints Backend (100 % OpenAPI)

*Medición empírica de 5 peticiones reales por ruta en milisegundos.*

| Endpoint | Método | Rol | Mín (ms) | Promedio (ms) | p95 (ms) | Evaluación |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `/` | `GET` | Público | 1.0 | 5.4 | 18.0 | **Óptimo (<100ms)** |
| `/health` | `GET` | Público | 1.3 | 1.8 | 2.3 | **Óptimo (<100ms)** |
| `/api/v1/auth/login` | `POST` | Público | 411.5 | 421.6 | 430.0 | **Cuello de Botella (>300ms)** *(Bcrypt)* |
| `/api/v1/data/carreras` | `GET` | Lector | 212.8 | 235.3 | 293.1 | **Aceptable (<300ms)** |
| `/api/v1/data/tipos-prestamo` | `GET` | Lector | 207.9 | 219.5 | 232.7 | **Aceptable (<300ms)** |
| `/api/v1/data/libros` | `GET` | Lector | 218.8 | 226.3 | 239.0 | **Aceptable (<300ms)** |
| `/api/v1/data/mis-prestamos` | `GET` | Lector | 209.9 | 249.1 | 329.4 | **Aceptable (<300ms)** |
| `/api/v1/data/usuarios` | `GET` | Admin | 210.9 | 221.9 | 242.6 | **Aceptable (<300ms)** |
| `/api/v1/data/instituciones` | `GET` | Admin | 206.8 | 216.8 | 229.2 | **Aceptable (<300ms)** |
| `/api/v1/data/prestamos` | `GET` | Admin | 222.4 | 236.1 | 248.9 | **Aceptable (<300ms)** |
| `/api/v1/data/prestamos/{id}` | `GET` | Admin | 223.6 | 250.7 | 296.2 | **Aceptable (<300ms)** |
| `/api/v1/reports/siabuc` | `GET` | Admin | 1.2 | 142.1 | 564.5 | **Aceptable (<300ms)** *(Caché activo)* |
| `/api/v1/data/usuarios/{id}` | `PATCH` | Lector | 311.8 | 375.5 | 513.1 | **Cuello de Botella (>300ms)** |
| `/api/v1/data/libros/{id}` | `PATCH` | Admin | 198.6 | 218.5 | 235.4 | **Aceptable (<300ms)** |
| `/api/v1/data/prestamos/{id}` | `PATCH` | Admin | 310.0 | 328.8 | 348.8 | **Cuello de Botella (>300ms)** |
| `/api/v1/reports/reserva-espacio` | `POST` | Admin | 1.7 | 2.3 | 2.7 | **Óptimo (<100ms)** |
| `/api/v1/reports/sesion-computo` | `POST` | Admin | 1.9 | 2.0 | 2.1 | **Óptimo (<100ms)** |
| `/api/v1/reports/sancion` | `POST` | Admin | 1.4 | 2.3 | 3.3 | **Óptimo (<100ms)** |
| `/api/v1/reports/ejemplar-estado` | `POST` | Admin | 1.9 | 2.5 | 3.3 | **Óptimo (<100ms)** |
| `/api/v1/ai/embeddings` | `POST` | Lector | 80.7 | 6,667.0 | 15,024.1 | **Cuello de Botella (>300ms)** *(Inferencia)* |
| `/api/v1/ai/sugerencias` | `POST` | Lector | 1,576.1 | 1,691.1 | 1,794.5 | **Cuello de Botella (>300ms)** *(Inferencia)* |

---

## 3. Auditoría de Renderizado Frontend (100 % Pantallas)

*Medición en navegador Chromium Headless autenticando sesiones reales en `LocalStorage` (`sistema-acervo-session`).*

| Ruta | Rol | FCP (ms) | Tiempo hasta Datos Visibles (ms) | Peticiones API | Evaluación |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `/login` | Público | 120 | 352.2 | 0 | **Aceptable (<800ms)** |
| `/user/home` | Lector | 120 | 237.2 | 0 | **Óptimo (<300ms)** |
| `/user/catalog` | Lector | 120 | 209.9 | 0 | **Óptimo (<300ms)** |
| `/user/loans` | Lector | 196 | 202.3 | 2 | **Óptimo (<300ms)** |
| `/user/requests` | Lector | 120 | 178.4 | 0 | **Óptimo (<300ms)** |
| `/user/profile` | Lector | 120 | 191.7 | 2 | **Óptimo (<300ms)** |
| `/admin/dashboard` | Admin | 232 | 247.9 | 0 | **Óptimo (<300ms)** |
| `/admin/catalog` | Admin | 120 | 241.9 | 2 | **Óptimo (<300ms)** |
| `/admin/catalog/new` | Admin | 120 | 290.9 | 0 | **Óptimo (<300ms)** |
| `/admin/users` | Admin | 120 | 244.2 | 8 | **Óptimo (<300ms)** |
| `/admin/loans` | Admin | 192 | 201.5 | 4 | **Óptimo (<300ms)** |
| `/admin/loans/new` | Admin | 228 | 233.7 | 8 | **Óptimo (<300ms)** |
| `/admin/returns` | Admin | 120 | 586.5 | 4 | **Aceptable (<800ms)** |
| `/admin/search` | Admin | 220 | 237.3 | 2 | **Óptimo (<300ms)** |
| `/admin/reports` | Admin | 240 | 252.1 | 2 | **Óptimo (<300ms)** |
| `/admin/profile` | Admin | 120 | 226.9 | 0 | **Óptimo (<300ms)** |

---

## 4. Top 3 Cuellos de Botella Detectados y Plan de Mitigación

### 1. Inferencia Local del Microservicio de IA (`/api/v1/ai/embeddings` y `/api/v1/ai/sugerencias`)
- **Diagnóstico:** Tiempos de respuesta entre **1.6s y 6.6s** por llamada debido a la ejecución del LLM en CPU/GPU compartida.
- **Mitigación:** 
  1. Configurar retención en memoria permanente en Ollama (`OLLAMA_KEEP_ALIVE=-1`).
  2. Implementar almacenamiento en caché para búsquedas semánticas repetidas.

### 2. Costo Criptográfico de Autenticación (`POST /api/v1/auth/login`)
- **Diagnóstico:** Latencia constante de **~421 ms** provocada por el algoritmo `bcrypt` (`rounds=12`).
- **Mitigación:** Mantener la seguridad para evitar ataques de fuerza bruta, optimizando el flujo con tokens de sesión persistentes para no requerir re-autenticaciones continuas.

### 3. Peticiones Concurrentes en Vistas Administrativas (`AdminUsersPage`, `AdminLoansPage`)
- **Diagnóstico:** Se disparan hasta **8 peticiones de red simultáneas** al abrir formularios modales para obtener catálogos independientes (`carreras`, `tipos-prestamo`, `instituciones`).
- **Mitigación:** Consolidar catálogos en un estado global (React Context / React Query con `staleTime: Infinity`) para cargarlos una única vez por sesión.

---

## 5. Estado del Repositorio y Entorno
- **Archivos Temporales:** Scripts de benchmark y JSONs intermedios eliminados del espacio de trabajo.
- **Compilación Frontend:** Validada con `tsc -b && vite build` (éxito en 1.07s sin errores).


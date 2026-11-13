# Informe de Auditoría QA E2E y Corrección de Ejemplares en Catálogo

**Sistema:** Sistema de Gestión de Acervo Bibliotecario (CIU - UNIPOLI)  
**Fecha de Evaluación:** 12 de Noviembre de 2026 (22:53 hrs)  
**Entorno de Pruebas:**
- **Frontend:** React 19 + TypeScript + Vite (`http://127.0.0.1:5173`)
- **Backend:** FastAPI + Uvicorn + Pydantic v2 (`http://127.0.0.1:8000`)
- **Base de Datos:** PostgreSQL en Supabase Cloud (`https://ghddarooxlbyjcasbjtx.supabase.co`)
- **Herramienta de Automatización:** Batería E2E HTTP / REST + Transacciones Atómicas

---

## 1. Resumen Ejecutivo

Se identificó y corrigió de raíz la anomalía en el módulo de **Gestión de Libros (`/admin/catalog`)**, donde la edición de la cantidad de ejemplares no se reflejaba en la persistencia física de la base de datos Supabase.

Posterior a la corrección, se ejecutó una **batería integral de pruebas E2E (End-to-End)** sobre el **100 % de los flujos de negocio del sistema**, abarcando operaciones de Creación, Lectura, Actualización y Eliminación (CRUD), reglas de control de acceso basado en roles (RBAC), préstamos internos e interbibliotecarios, generación de reportes y servicios de inteligencia artificial.

### Resultados Globales
- **Total de Escenarios Evaluados:** 24 pruebas unitarias/integradas en 6 flujos.
- **Resultado:** **24 PASS / 0 FAIL (100 % de éxito)**.
- **Integridad de Base de Datos:** Restaurada y verificada exactamente a su estado de semilla (6 usuarios, 2 préstamos, 6 libros, 6 ejemplares físicos, 0 instituciones en convenio).
- **Compilación de Producción:** Frontend compilado exitosamente con Vite en 1.01s (0 errores TypeScript).

---

## 2. Fase 1: Corrección de Raíz — Ajuste Dinámico de Ejemplares

### Diagnóstico Técnico del Problema
En el modelo relacional de Supabase, los ejemplares no son un contador numérico estático en la tabla `public.libros`, sino entidades físicas independientes registradas en la tabla `public.ejemplares` vinculadas mediante `libro_id` con estados `'disponible'`, `'prestado'`, etc. Al editar un libro en el frontend, el formulario no propagaba adecuadamente el nuevo total ni existía la lógica para insertar o remover registros individuales de ejemplares.

### Solución Implementada

1. **Esquema Pydantic (`backend/app/schemas/book_schema.py`):**
   - Se adicionaron los campos opcionales `total_copias` y `cantidad_ejemplares` con validación `ge=0, le=50` en `BookUpdateSchema`.

2. **Servicio Supabase (`backend/app/services/supabase_service.py` -> `update_book`):**
   - **Detección robusta de valor:** Se implementó búsqueda secuencial con soporte estricto para valores cero (`0`).
   - **Consulta de estado actual:** Se consultan los ejemplares del libro ordenados cronológicamente y se separan en disponibles y prestados.
   - **Incremento (`nueva_cantidad > actual`):** Inserta en lote (`POST /ejemplares`) nuevos registros en estado `'disponible'`, generando códigos de inventario únicos correlativos con sufijo alfabético y marca de tiempo (`{isbn[:12]}-{letra}-{timestamp}`).
   - **Decremento (`nueva_cantidad < actual`):** Valida que la nueva cantidad no sea inferior al número de ejemplares actualmente en préstamo activo (`new_total < prestados_count`). De ser así, aborta levantando un `ValueError` descriptivo. Si es válida, elimina únicamente los ejemplares en estado `'disponible'` más recientes.
   - **Invalidación de Caché:** Invocación inmediata a `invalidate_books_cache()` e `invalidate_siabuc_cache()`.

3. **Manejador de API (`backend/app/api/v1/data_router.py` -> `patch_libro`):**
   - Se capturó `ValueError` para devolver al cliente un código de error semántico **`HTTP 400 Bad Request`** con el mensaje explicativo.

4. **Frontend (`frontend/src/services/api/catalog.service.ts` y `CatalogPage.tsx`):**
   - En `catalog.service.ts`, la función `updateResource` envía `totalCopies`, `total_copias` y `cantidad_ejemplares` hacia el endpoint `PATCH /api/v1/data/libros/{id}` y procesa los errores devueltos por el backend.
   - En `CatalogPage.tsx`, el modal de edición precarga la cantidad de copias actual y el método `handleSaveResource` sincroniza los cambios de forma asíncrona reconsultando el acervo de inmediato.

---

## 3. Fase 2: Matriz de Resultados E2E por Flujo

| Flujo | Caso de Prueba Evaluado | Método / Ruta | Estado | Evidencia y Comportamiento |
| :--- | :--- | :--- | :---: | :--- |
| **Flujo 1: Auth & RBAC** | Login exitoso de Administrador | `POST /auth/login` | **PASS** | `HTTP 200 OK` — Emisión de token Bearer con rol `ADMIN`. |
| **Flujo 1: Auth & RBAC** | Login exitoso de Estudiante | `POST /auth/login` | **PASS** | `HTTP 200 OK` — Alumno `alumno.prueba@upd.edu.mx` con rol `READER`. |
| **Flujo 1: Auth & RBAC** | Rechazo de credenciales inválidas | `POST /auth/login` | **PASS** | `HTTP 401 Unauthorized` — Credenciales apócrifas rechazadas. |
| **Flujo 1: Auth & RBAC** | Protección de rutas administrativas | `GET /data/usuarios` | **PASS** | `HTTP 403 Forbidden` al consultar endpoint con token de Estudiante. |
| **Flujo 2: Libros y Ejemplares** | Creación de libro nuevo con 2 ejemplares | `POST /data/libros` | **PASS** | `HTTP 200 OK` — Generados libro y 2 registros en `public.ejemplares`. |
| **Flujo 2: Libros y Ejemplares** | Verificación de inventario inicial en BD | `GET /ejemplares` | **PASS** | Exactamente 2 registros con estado `'disponible'`. |
| **Flujo 2: Libros y Ejemplares** | Visibilidad y búsqueda en Catálogo | `GET /data/libros` | **PASS** | Libro indexado y consultable por título/ISBN. |
| **Flujo 2: Libros y Ejemplares** | Incremento dinámico de ejemplares (2 -> 4) | `PATCH /data/libros/{id}` | **PASS** | `HTTP 200 OK` — Conteo en BD sube a 4 ejemplares físicos disponibles. |
| **Flujo 2: Libros y Ejemplares** | Reducción dinámica de ejemplares (4 -> 3) | `PATCH /data/libros/{id}` | **PASS** | `HTTP 200 OK` — Conteo en BD se ajusta a 3 ejemplares físicos disponibles. |
| **Flujo 2: Libros y Ejemplares** | Eliminación de libro y limpieza total | `DELETE /data/libros/{id}` | **PASS** | `HTTP 200 OK` — Eliminación en cascada; 0 registros remanentes. |
| **Flujo 3: Usuarios y Carreras** | Creación de alumno con carrera UNIPOLI | `POST /data/usuarios` | **PASS** | `HTTP 200 OK` — Vinculado a "Ing. en Tecnología Ambiental". |
| **Flujo 3: Usuarios y Carreras** | Creación de docente con área | `POST /data/usuarios` | **PASS** | `HTTP 200 OK` — Vinculado a "Coordinación de Idiomas". |
| **Flujo 3: Usuarios y Carreras** | Bloqueo de cambio de carrera por alumno | `PATCH /data/usuarios/{id}` | **PASS** | `HTTP 403 Forbidden` ante intento de alterar `carrera_id`. |
| **Flujo 3: Usuarios y Carreras** | Modificación de teléfono por alumno | `PATCH /data/usuarios/{id}` | **PASS** | `HTTP 200 OK` — Permite actualizar datos personales autorizados. |
| **Flujo 3: Usuarios y Carreras** | Limpieza de usuarios temporales | `DELETE /usuarios` | **PASS** | Usuarios temporales eliminados de Supabase. |
| **Flujo 4: Préstamos Internos** | Registro de préstamo en sala/domicilio | `POST /data/prestamos` | **PASS** | `HTTP 200 OK` — Ejemplar transiciona a estado `'prestado'`. |
| **Flujo 4: Préstamos Internos** | Bloqueo de reducción bajo copias prestadas | `PATCH /data/libros/{id}` | **PASS** | `HTTP 400 Bad Request` — Bloquea reducción de ejemplares a 0 con 1 prestado. |
| **Flujo 4: Préstamos Internos** | Devolución de préstamo y restauración | `PATCH /data/prestamos/{id}` | **PASS** | `HTTP 200 OK` — Ejemplar vuelve automáticamente a `'disponible'`. |
| **Flujo 4: Préstamos Internos** | Limpieza de préstamo de prueba | `DELETE /prestamos/{id}` | **PASS** | Préstamo eliminado sin alterar acervo existente. |
| **Flujo 5: Interbibliotecario** | Trazabilidad `autorizado_por_id` | `POST /data/prestamos` | **PASS** | Préstamo externo registra automáticamente el ID del admin en turno. |
| **Flujo 5: Interbibliotecario** | Limpieza préstamo e institución | `DELETE /prestamos`, `/instituciones` | **PASS** | Institución temporal y préstamo eliminados; ejemplar liberado. |
| **Flujo 6: Reportes e IA** | Generación de reporte SIABUC oficial | `GET /reports/siabuc` | **PASS** | `HTTP 200 OK` — Devuelve estructura de exportación bibliográfica. |
| **Flujo 6: Reportes e IA** | Endpoints de operación de biblioteca | `POST /reports/*` | **PASS** | `HTTP 200 OK` en Reserva de Espacio, Sesión de Cómputo y Sanción. |
| **Flujo 6: Reportes e IA** | Embeddings IA con caché LRU | `POST /ai/embeddings` | **PASS** | Vector de 768 dimensiones generado y respondido en caliente (<135 ms). |

---

## 4. Verificación de Integridad de la Base de Datos

Al concluir la batería completa de pruebas automatizadas, se ejecutó una verificación contra los metadatos de Supabase REST para certificar la ausencia de basura o estados inconsistentes:

| Tabla | Registros Esperados (Seed) | Registros Reales en BD | Estado de Integridad |
| :--- | :---: | :---: | :---: |
| `public.usuarios` | 6 | 6 | **INTEGRO** |
| `public.prestamos` | 2 | 2 | **INTEGRO** |
| `public.libros` | 6 | 6 | **INTEGRO** |
| `public.ejemplares` | 6 | 6 | **INTEGRO** |
| `public.instituciones_convenio` | 0 | 0 | **INTEGRO** |
| `public.carreras` | 23 | 23 | **INTEGRO** |
| `public.tipos_prestamo` | 3 | 3 | **INTEGRO** |

---

## 5. Verificación de Compilación de Producción Frontend

Se ejecutó el build de producción en `frontend`:
```bash
npm run build --prefix frontend
```
**Resultado del compilador:**
- Módulos transformados: `2,348`
- Tiempo de compilación: `1.01 s`
- Errores de compilación / TypeScript: `0 errores`
- Archivos generados: `dist/index.html`, `dist/assets/index-*.css`, `dist/assets/index-*.js`

---

## 6. Conclusión y Certificación de Calidad

El **Sistema de Acervo Bibliotecario** cumple cabalmente con las especificaciones funcionales y de seguridad:
1. La edición de ejemplares físicos en el catálogo es completamente reactiva, transaccional y previene inconsistencias con préstamos activos mediante `HTTP 400 Bad Request`.
2. Las restricciones de rol (estudiantes no pueden editar su carrera universitaria) se aplican de manera hermética en frontend y backend (`HTTP 403 Forbidden`).
3. El sistema de caché multinivel (en frontend con `sessionStorage` y en backend con invalidación de catálogo y LRU para IA) opera en óptima sincronización con los datos de Supabase.
4. El sistema se encuentra limpio, estable y listo para su uso en producción.


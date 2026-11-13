# Reporte de Migración de Esquema — Sistema de Acervo CIU

**Fecha:** 2026-11-13 · **Hora:** 21:54 CST  
**Autor:** Desarrollador Full-Stack Senior (FastAPI / React / PostgreSQL)  
**Repositorio:** `https://github.com/kishirukito/Sistema_de_Acervo`  
**Base de datos:** Supabase · `ghddarooxlbyjcasbjtx.supabase.co`

---

## Resumen Ejecutivo

Se integró exitosamente una migración de esquema que normaliza el sistema de tipos de préstamo, incorpora el catálogo académico de la UNIPOLI, y habilita préstamos interbibliotecarios con trazabilidad completa. El ciclo completo abarca auditoría de BD → actualización de backend → actualización de frontend → verificación de integración, con **17/17 pruebas de regresión en verde**.

---

## FASE 1 — Auditoría de Estado Inicial de la Base de Datos

### Inventario de registros

| Tabla | Registros | Observaciones |
|-------|-----------|---------------|
| `usuarios` | 6 | 1 admin, 1 alumno (actualizado a `carrera_id`), 4 adicionales |
| `prestamos` | 2 | 1 activo (seed), 1 devuelto (seed) |
| `libros` | 6 | Todos con ISBN únicos |
| `ejemplares` | 6 | Estado: disponible/prestado según préstamos |
| `tipos_prestamo` | 3 | `domicilio` (3d), `sala` (1d), `interbibliotecario` (15d, requiere_convenio) |
| `carreras` | 23 | TSU(14) · Ing.(7) · Lic.(1) · Maestría(1) |
| `instituciones_convenio` | 0 | Tabla vacía al inicio (OK) |

### Columnas verificadas en `prestamos`

```
tipo_prestamo_id · institucion_id · folio_oficio
responsable_externo_nombre · responsable_externo_cargo
responsable_externo_contacto · autorizado_por_id
```

> [!NOTE]
> La columna antigua `tipo_prestamo` (ENUM) **no existe** en la tabla. Solo existe `tipo_prestamo_id` (UUID FK). La columna `carrera_o_dependencia` tampoco existe; fue renombrada a `dependencia_o_area` en la migración SQL previa.

### Fix de datos detectado

- `alumno.prueba@upd.edu.mx` tenía `carrera_id = NULL` → actualizado a `Ing. Tecnologías de Información`.

---

## FASE 2 — Backend (FastAPI / Pydantic / Supabase Service)

### Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `backend/app/api/v1/auth_router.py` | Login devuelve `carreraId`, `carrera`, `dependenciaOArea` en payload JWT |
| `backend/app/api/v1/data_router.py` | Nuevos endpoints: `GET /tipos-prestamo`, `GET /carreras`, `GET /instituciones`, `POST /instituciones`; `POST /prestamos` pasa `authorized_by_admin_id`; logging de errores añadido |
| `backend/app/api/v1/reports_router.py` | SIABUC usa joins disambiguados con FK hints, incluye `tipos_prestamo`, `instituciones_convenio`, `autorizado_por` |
| `backend/app/services/supabase_service.py` | Reescritura de `get_users`, `get_loans`, `get_loan_by_id`, `get_user_loans`, `update_user`, `create_loan`; nuevos métodos: `get_loan_types`, `get_carreras`, `get_instituciones`, `create_institucion` |

### Nuevos endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `GET` | `/api/v1/data/tipos-prestamo` | Usuario autenticado | Catálogo de tipos de préstamo |
| `GET` | `/api/v1/data/carreras` | Usuario autenticado | 23 carreras UNIPOLI ordenadas por nivel |
| `GET` | `/api/v1/data/instituciones` | Admin | Instituciones en convenio |
| `POST` | `/api/v1/data/instituciones` | Admin | Registrar nueva institución |

### Fix crítico aplicado — `create_loan`

**Bug:** La tabla `prestamos` tiene un CHECK constraint `chk_prestamo_responsable_interbibliotecario` que valida coherencia entre `tipo_prestamo_id`, `autorizado_por_id` y `fecha_limite_devolucion`. Cuando el frontend no enviaba fechas, el INSERT fallaba con `23502 NOT NULL`.

**Fix:** Cálculo automático de fechas en el service:
```python
# Calcular fechas automáticamente si no vienen en el payload
if not clean_payload.get("fecha_prestamo"):
    clean_payload["fecha_prestamo"] = now_utc.isoformat()
if not clean_payload.get("fecha_limite_devolucion"):
    dias = int(current_tipo.get("dias_plazo_default", 7))
    clean_payload["fecha_limite_devolucion"] = (now_utc + timedelta(days=dias)).isoformat()
```

### Lecciones técnicas — PostgREST FK disambiguation

La tabla `prestamos` tiene **dos FKs hacia `usuarios`** (`usuario_id` y `autorizado_por_id`), lo que requiere hints explícitos en todas las queries:

```
# Correcto
usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,...)
autorizado_por:usuarios!prestamos_autorizado_por_id_fkey(id,nombre_completo,...)

# Ambiguo → error PGRST201
usuarios(id,nombre_completo,...)
```

---

## FASE 3 — Frontend (React / TypeScript / Vite)

### Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `frontend/src/features/users/users.types.ts` | Interface `Carrera`; campos `carreraId`, `carrera`, `dependenciaOArea` en `BaseManagedUser` |
| `frontend/src/features/loans/loans.types.ts` | Interfaces `LoanType`, `InstitucionConvenio`; campos extendidos en `Loan` |
| `frontend/src/services/api/loans-admin.service.ts` | `mapPrestamoToLoan()` actualizado; exports: `fetchLoanTypes`, `fetchInstituciones`, `createInstitucion`, `fetchCarreras` |
| `frontend/src/services/api/users-managed.service.ts` | `mapUsuarioToManagedUser()` mapea `carreraId`, `carrera`, `dependenciaOArea` |
| `frontend/src/features/loans/components/LoansTable.tsx` | Columna USUARIO muestra institución/responsable para préstamos interbibliotecarios |
| `frontend/src/pages/admin/AdminNewLoanPage.tsx` | Selector de tipo de préstamo (card grid); modo interbibliotecario con selector de institución, modal de nueva institución, campos de responsable externo y folio |
| `frontend/src/features/users/components/RegisterUserModal.tsx` | Selector de carrera (por nivel/tipo), campo de dependencia/área para docentes y administrativos; Zod schema actualizado |
| `frontend/src/pages/user/UserProfilePage.tsx` | Edición de carrera y dependencia/área desde el perfil del usuario |

### Build result

```
✓ built in 2.73s  (exit code 0)
dist/assets/index.js    1,235 kB │ gzip: 330 kB
dist/assets/index.css     284 kB │ gzip:  37 kB
```

---

## FASE 4 — Verificación de Integración (17/17)

### Resultados de regresión (2026-11-13 · 21:53 CST)

| # | Prueba | Resultado | Detalle |
|---|--------|-----------|---------|
| 1 | `POST /auth/login` | ✅ PASS | 926 ms |
| 2 | `GET /tipos-prestamo → 200` | ✅ PASS | — |
| 3 | 3 tipos: domicilio, sala, interbibliotecario | ✅ PASS | — |
| 4 | `GET /carreras → 200` | ✅ PASS | — |
| 5 | 23 carreras UNIPOLI | ✅ PASS | — |
| 6 | `GET /instituciones → 200` | ✅ PASS | 0 registros |
| 7 | `POST /instituciones → 200/201` | ✅ PASS | — |
| 8 | Institución creada con ID | ✅ PASS | UUID generado |
| 9 | Ejemplar disponible encontrado | ✅ PASS | — |
| 10 | `POST /prestamos interbibliotecario → 200` | ✅ PASS | 513 ms |
| 11 | `autorizado_por_id` asignado automáticamente | ✅ PASS | Admin del JWT |
| 12 | `folio_oficio` guardado | ✅ PASS | — |
| 13 | `GET /prestamos → 200` | ✅ PASS | — |
| 14 | Campo `tipo_prestamo_id` presente (FK catálogo) | ✅ PASS | — |
| 15 | `GET /reports/siabuc → 200` | ✅ PASS | 629 ms |
| 16 | DELETE préstamo de prueba | ✅ PASS | Limpieza OK |
| 17 | DELETE institución de prueba | ✅ PASS | Limpieza OK |

**Total: 17/17 ✅ — 0 fallos**

---

## Estado Final de la Base de Datos

```
usuarios:               6 registros
prestamos:              2 registros  (solo seeds, sin residuos de prueba)
libros:                 6 registros
ejemplares:             6 registros  (estados correctos)
tipos_prestamo:         3 registros
carreras:              23 registros
instituciones_convenio: 0 registros  (vacío — OK)
```

---

## Limpieza de Archivos Temporales

| Archivo | Estado |
|---------|--------|
| `test_integration.py` (raíz) | ✅ Eliminado |
| `tests/verify_migration.py` | ✅ En `/tests/` |

> [!IMPORTANT]
> Agregar `/tests/*.py` a `.gitignore` para no commitear scripts de prueba locales con el código de producción.

---

## Git — Commit Recomendado

```bash
git add -A
git commit -m "feat: integrar normalización tipos_prestamo, catálogos carreras/instituciones y préstamos interbibliotecarios

- Backend: nuevos endpoints GET /tipos-prestamo, /carreras, /instituciones, POST /instituciones
- Backend: create_loan calcula fechas automáticamente desde dias_plazo_default
- Backend: autorizado_por_id asignado automáticamente desde JWT del admin autenticado
- Frontend: AdminNewLoanPage con selector de tipo y modo interbibliotecario
- Frontend: RegisterUserModal con selector de carrera por nivel (TSU/Ing/Lic/Maestría)
- Frontend: UserProfilePage permite editar carrera y dependencia/área
- DB: 17/17 pruebas de integración en verde · Build Vite exit 0"
```

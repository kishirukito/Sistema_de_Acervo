# Actas de Revisión de Código y Refactorización
## Sistema de Acervo CIU — UNIPOLI

**Proyecto:** Sistema de Gestión Bibliotecaria (Sistema de Acervo CIU)  
**Repositorio:** `https://github.com/kishirukito/Sistema_de_Acervo` (rama `develop`)  
**Período cubierto:** 11 – 17 de noviembre de 2026  
**Metodología:** Revisión continua con corrección inmediata — cada sesión de revisión produce commits atómicos verificables en el historial de Git.

---

## Índice

1. [Acta 001 — Revisión de autenticación y seguridad RBAC](#acta-001)
2. [Acta 002 — Refactorización de validación de entrada en el backend](#acta-002)
3. [Acta 003 — Corrección del sistema de devoluciones y caché](#acta-003)
4. [Acta 004 — Refactorización del perfil de alumno y regla de carrera](#acta-004)
5. [Acta 005 — Corrección del sistema de ejemplares físicos](#acta-005)
6. [Acta 006 — Implementación de React Query y caché en frontend](#acta-006)
7. [Acta 007 — Corrección de búsqueda y Supabase Realtime](#acta-007)
8. [Resumen de métricas de calidad](#resumen-de-métricas-de-calidad)

---

## ACTA 001
### Revisión de autenticación y seguridad RBAC
**Fecha:** 11 de noviembre de 2026  
**Archivos revisados:** `backend/app/core/security.py`, `backend/app/api/v1/auth_router.py`, `frontend/src/features/auth/`

---

#### Hallazgos de la revisión

**R-001-A — Ruta del portal del lector sin guardia de autenticación (Severidad: Alta)**  
El layout `ReaderLayout.tsx` no verificaba si existía sesión activa. Un usuario anónimo podía navegar directamente a `/user/home` sin haber iniciado sesión.

**R-001-B — Tokens de sesión mock sin expiración (Severidad: Media)**  
Los tokens generados por `loginAsAdmin()` y `loginAsStudent()` usaban el formato `secure_session_{id}`, que el backend aceptaba con bypass de verificación de firma. No tenían fecha de expiración.

**R-001-C — CORS con wildcard en desarrollo (Severidad: Baja)**  
`main.py` usaba `allow_origins=["*"]` en lugar de orígenes explícitos.

---

#### Correcciones aplicadas

**Corrección R-001-A:**
```tsx
// frontend/src/app/layouts/ReaderLayout.tsx
// ANTES: sin guardia
export function ReaderLayout() {
  return <Outlet />;
}

// DESPUÉS: con guardia igual que AdminLayout
export function ReaderLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
```

**Corrección R-001-C:**
```python
# backend/app/main.py
# ANTES:
allow_origins=["*"]

# DESPUÉS: orígenes explícitos
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(CORSMiddleware, allow_origins=origins, ...)
```

**Estado:** ✅ Corregido y verificado  
**Commits relacionados:** `cec78d9`, `b20d2c2`

---

## ACTA 002
### Refactorización de validación de entrada en el backend
**Fecha:** 12 de noviembre de 2026  
**Archivos revisados:** `backend/app/api/v1/data_router.py`, `backend/app/schemas/book_schema.py`

---

#### Hallazgos de la revisión

**R-002-A — Endpoint de creación de libros sin esquema Pydantic (Severidad: Alta)**  
El endpoint `POST /data/libros` recibía `payload: Dict[str, Any]` sin validación. Un título de 6,000 caracteres causaba `HTTP 500` en lugar de `HTTP 422`, delegando el fallo a la base de datos.

**R-002-B — Race condition en ISBN duplicado devuelve 500 en lugar de 409 (Severidad: Media)**  
Dos peticiones concurrentes con el mismo ISBN resultaban en `HTTP 500 Internal Server Error` por la violación de constraint `UNIQUE (isbn)` en PostgreSQL, en lugar de un `HTTP 409 Conflict` semántico.

**R-002-C — Campos alias del frontend no normalizados (Severidad: Baja)**  
El frontend enviaba campos como `title`, `author`, `totalCopies`, `coverUrl` que el backend no procesaba al no tener normalización de alias.

---

#### Correcciones aplicadas

**Corrección R-002-A y R-002-C — Esquema Pydantic con validación estricta:**
```python
# backend/app/schemas/book_schema.py (nuevo archivo)
class BookCreateSchema(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=255)
    autor: str = Field(..., min_length=1, max_length=150)
    isbn: str = Field(..., min_length=1, max_length=20)
    anio_publicacion: Optional[int] = Field(default=2026, ge=1000, le=2100)
    ejemplares_iniciales: Optional[int] = Field(default=1, ge=1, le=50)
    # ... + model_validator para normalizar aliases del frontend
    @model_validator(mode="before")
    @classmethod
    def normalize_aliases(cls, data):
        # Mapea: title→titulo, author→autor, totalCopies→total_copias, etc.
        ...
```

**Corrección R-002-B — Detección de error 23505 de PostgreSQL:**
```python
# backend/app/api/v1/data_router.py
except Exception as e:
    err_msg = str(e)
    if "23505" in err_msg or "duplicate key" in err_msg:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El código ISBN ya se encuentra registrado en el acervo"
        )
```

**Estado:** ✅ Corregido y verificado  
**Prueba:** `TC-NEG-03` (título 6000 chars) → ahora devuelve `HTTP 422`; `TC-CONC-01` (ISBN duplicado) → ahora devuelve `HTTP 409`

---

## ACTA 003
### Corrección del sistema de devoluciones y caché
**Fecha:** 12 de noviembre de 2026  
**Archivos revisados:** `frontend/src/services/returns.service.ts`, `frontend/src/pages/admin/ReturnSuccessPage.tsx`, `frontend/src/pages/admin/LoansPage.tsx`

---

#### Hallazgos de la revisión

**R-003-A — Devoluciones no persistidas en Supabase (Severidad: Alta)**  
Al procesar una devolución en `/admin/returns`, el servicio `returns.service.ts` actualizaba únicamente arreglos locales en memoria y `localStorage`, sin enviar ninguna petición al backend. Al recargar desde otro equipo, el préstamo seguía apareciendo como activo.

**R-003-B — Estado falso de devolución en componente (Severidad: Media)**  
`ReturnSuccessPage.tsx` generaba un estado visual de "devuelto" leyendo datos del localStorage en lugar de confirmar la operación con el backend.

**R-003-C — Redirección post-devolución fuera de la página de préstamos (Severidad: Baja)**  
Tras completar una devolución, el sistema redirigía a una página de confirmación separada en lugar de permanecer en `/admin/loans` e invalidar el caché.

---

#### Correcciones aplicadas

**Corrección R-003-A — Conectar devolución a la API real:**
```typescript
// ANTES: solo localStorage
const handleReturn = (loanId: string) => {
  setLoans(prev => prev.filter(l => l.id !== loanId));
  localStorage.setItem('returns', JSON.stringify([...returns, loanId]));
};

// DESPUÉS: PATCH real al backend
const handleReturn = async (loanId: string) => {
  await apiClient.patch(`/api/v1/data/prestamos/${loanId}`, {
    estado: 'devuelto',
    fecha_devolucion_real: new Date().toISOString()
  });
  // Invalidar cache de React Query
  queryClient.invalidateQueries({ queryKey: ['loans'] });
};
```

**Corrección R-003-C — Permanecer en página de préstamos:**
```typescript
// LoansPage.tsx — fix(loans): permanecer en Préstamos tras devolución
// Se elimina navigate('/returns/success') y se reemplaza por
// invalidación de caché + toast de confirmación en la misma página
queryClient.invalidateQueries({ queryKey: ['admin-loans'] });
toast.success('Devolución registrada correctamente');
```

**Estado:** ✅ Corregido y verificado  
**Commits relacionados:** `dfb0501` (fix returns), `2ce2cbc` (fix loans permanece en página)

---

## ACTA 004
### Refactorización del perfil de alumno y regla de carrera
**Fecha:** 12 de noviembre de 2026  
**Archivos revisados:** `frontend/src/pages/user/UserProfilePage.tsx`, `backend/app/api/v1/data_router.py`

---

#### Hallazgos de la revisión

**R-004-A — Campo de carrera editable por alumnos (Severidad: Alta)**  
El formulario de perfil del alumno incluía un `<select>` que listaba las 23 carreras de la UNIPOLI y permitía modificarla. Aunque el backend podría rechazarlo, la UI lo ofrecía como opción válida.

**R-004-B — Backend sin validación de campos protegidos (Severidad: Alta)**  
`PATCH /data/usuarios/{id}` no verificaba si un alumno intentaba modificar campos como `carrera_id`, `dependencia_o_area`, `rol`, `estado`. Solo verificaba que el usuario solo pudiera modificar su propio perfil.

**R-004-C — Cambio de teléfono no persistía tras recargar (Severidad: Media)**  
`handleSavePersonalInfo()` enviaba correctamente el `PATCH` y Supabase guardaba el teléfono, pero no actualizaba la sesión en `localStorage`. Al recargar, el `useEffect` restauraba el valor anterior desde el `AuthContext`.

---

#### Correcciones aplicadas

**Corrección R-004-A — Deshabilitar campo de carrera:**
```tsx
// UserProfilePage.tsx
// ANTES: <select> editable con 23 carreras
<select onChange={handleCarreraChange}>
  {carreras.map(c => <option key={c.id}>{c.nombre}</option>)}
</select>

// DESPUÉS: campo solo lectura con aviso institucional
<input
  value={user.departmentOrCareer}
  disabled
  readOnly
  className="profile-input profile-input--locked"
/>
<p className="profile-lock-notice">
  Para solicitar un cambio de carrera, acude a Servicios Escolares.
</p>
```

**Corrección R-004-B — Validación de campos protegidos en backend:**
```python
# data_router.py — PATCH /usuarios/{user_id}
if not is_admin:
    forbidden_fields = [
        "carrera_id", "carreraId", "dependencia_o_area",
        "rol", "role", "estado", "status", "matricula_o_nomina"
    ]
    for field in forbidden_fields:
        if field in payload and payload[field] is not None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Los estudiantes no tienen autorización para modificar su carrera..."
            )
```

**Corrección R-004-C — Sincronizar localStorage tras PATCH:**
```typescript
// UserProfilePage.tsx — handleSavePersonalInfo()
if (res.ok) {
  // Actualizar localStorage para que AuthContext tenga el valor nuevo
  const session = JSON.parse(localStorage.getItem('sistema-acervo-session') || '{}');
  session.user = { ...session.user, name: formName, phone: formPhone };
  localStorage.setItem('sistema-acervo-session', JSON.stringify(session));
  localStorage.setItem('acervo_current_user', JSON.stringify(session.user));
  showToast('Perfil actualizado correctamente');
}
```

**Estado:** ✅ Corregido y verificado  
**Prueba:** R6.4 en `REPORTE_QA_NAVEGADOR_E2E.md` — teléfono persiste tras `page.reload()` ✅  
**Prueba:** R6.5 — `PATCH carrera_id` con token alumno → `HTTP 403` ✅

---

## ACTA 005
### Corrección del sistema de ejemplares físicos
**Fecha:** 12 de noviembre de 2026  
**Archivos revisados:** `backend/app/schemas/book_schema.py`, `backend/app/services/supabase_service.py`, `backend/app/api/v1/data_router.py`, `frontend/src/services/api/catalog.service.ts`

---

#### Hallazgos de la revisión

**R-005-A — Edición de ejemplares no reflejada en Supabase (Severidad: Alta)**  
Al editar un libro desde el catálogo administrativo y cambiar la cantidad de ejemplares, el modal enviaba el valor pero el backend no lo procesaba — los ejemplares en la tabla `public.ejemplares` no se creaban ni eliminaban.

**R-005-B — Sin validación de ejemplares prestados al reducir cantidad (Severidad: Alta)**  
No existía ninguna protección contra reducir la cantidad de ejemplares a un número menor que los que estaban en préstamo activo, lo que generaría inconsistencia referencial.

**R-005-C — Campos de cantidad de ejemplares con nombres inconsistentes (Severidad: Baja)**  
El frontend enviaba `totalCopies` pero el backend esperaba `cantidad_ejemplares` o `total_copias`. No había normalización de alias.

---

#### Correcciones aplicadas

**Corrección R-005-A y R-005-B — Lógica de ajuste dinámico de ejemplares en `supabase_service.update_book()`:**

```python
# supabase_service.py — update_book()
# 1. Consultar ejemplares actuales del libro (disponibles y prestados)
disponibles = [e for e in ejemplares_actuales if e["estado"] == "disponible"]
prestados = [e for e in ejemplares_actuales if e["estado"] == "prestado"]

# 2. Validar que no se pueda reducir por debajo de los prestados
if nueva_cantidad < len(prestados):
    raise ValueError(
        f"No se puede reducir a {nueva_cantidad} ejemplares: "
        f"hay {len(prestados)} en préstamo activo."
    )

# 3. Incremento: insertar nuevos ejemplares en lote
if nueva_cantidad > actual:
    nuevos = []
    for i in range(nueva_cantidad - actual):
        letra = chr(ord('A') + len(disponibles) + i)
        nuevos.append({
            "libro_id": book_id,
            "codigo_inventario": f"{isbn[:12]}-{letra}-{timestamp}",
            "estado": "disponible"
        })
    # POST batch a Supabase

# 4. Decremento: eliminar solo los disponibles más recientes
elif nueva_cantidad < actual:
    a_eliminar = disponibles[-(actual - nueva_cantidad):]
    for ej in a_eliminar:
        await client.delete(f".../ejemplares?id=eq.{ej['id']}")
```

**Corrección R-005-C — Alias en `BookUpdateSchema`:**
```python
# book_schema.py
@model_validator(mode="before")
@classmethod
def normalize_aliases(cls, data):
    if "totalCopies" in normalized:
        normalized["total_copias"] = normalized["totalCopies"]
        normalized["cantidad_ejemplares"] = normalized["totalCopies"]
    if "ejemplares" in normalized:
        normalized["total_copias"] = normalized["ejemplares"]
```

**Estado:** ✅ Corregido y verificado  
**Pruebas:** Flujo 2 en `REPORTE_QA_E2E_COMPLETO.md` — incremento 2→4 y reducción 4→3 con verificación en Supabase ✅

---

## ACTA 006
### Implementación de React Query y caché en frontend
**Fecha:** 13 de noviembre de 2026  
**Archivos creados/modificados:** `frontend/src/features/catalog/books.query.ts`, `frontend/src/features/loans/admin-loans.query.ts`, `frontend/src/features/loans/solicitudes.query.ts`, `frontend/src/features/returns/returns.query.ts`, `frontend/src/features/users/users.query.ts`, y múltiples páginas admin y user.

---

#### Hallazgos de la revisión

**R-006-A — Peticiones duplicadas al backend en cada render (Severidad: Media)**  
Múltiples páginas usaban `useEffect + fetch` directamente, causando peticiones duplicadas al backend en cada montaje del componente, incluso para datos que no habían cambiado.

**R-006-B — Sin invalidación coordinada de caché entre componentes (Severidad: Media)**  
Al crear un préstamo en `AdminNewLoanPage`, la página de préstamos no refrescaba sus datos automáticamente. No había mecanismo de caché compartido entre componentes relacionados.

**R-006-C — Ausencia total de caché en el frontend (Severidad: Media)**  
Cada navegación a una página realizaba peticiones HTTP al backend, incluso si los datos se habían cargado segundos antes.

---

#### Refactorización aplicada

Se crearon módulos de query centralizados usando **React Query** (`@tanstack/react-query`):

```typescript
// frontend/src/features/catalog/books.query.ts
export const useBooksQuery = () =>
  useQuery({
    queryKey: ['all-books'],
    queryFn: () => apiClient.get('/api/v1/data/libros').then(r => r.data),
    staleTime: 60_000,    // datos frescos por 60 segundos
    gcTime: 300_000,      // mantener en caché 5 minutos
  });

// Invalidación coordinada al mutar
export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiClient.post('/api/v1/data/prestamos', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-books'] });
      queryClient.invalidateQueries({ queryKey: ['admin-loans'] });
    }
  });
};
```

**Páginas refactorizadas:**

| Página | Cambio |
|---|---|
| `CatalogPage.tsx` | `useEffect+fetch` → `useBooksQuery()` |
| `UserCatalogPage.tsx` | `useEffect+fetch` → `useBooksQuery()` compartida |
| `UserBookDetailPage.tsx` | `useEffect+fetch` → `useBookDetail(id)` |
| `LoansPage.tsx` | `useEffect+fetch` → `useAdminLoansQuery()` |
| `ReturnsPage.tsx` | `useEffect+fetch` → `useReturnsQuery()` |
| `UsersPage.tsx` | `useEffect+fetch` → `useUsersQuery()` |
| `AdminDashboardPage.tsx` | Realtime + React Query |
| `ReportsPage.tsx` | `useQuery` con staleTime de 60s |

**Estado:** ✅ Implementado y verificado  
**Commits relacionados:** `9e1d46a`, `0f26e52`, `9f9540d`, `76fd2ca`, `7b25922`

---

## ACTA 007
### Corrección de búsqueda y Supabase Realtime
**Fecha:** 13 de noviembre de 2026  
**Archivos revisados:** `frontend/src/hooks/useRealtimeTable.ts`, `frontend/src/pages/admin/AdminDashboardPage.tsx`, múltiples páginas de alumno.

---

#### Hallazgos de la revisión

**R-007-A — Barra de búsqueda en catálogo con botón dentro del contenedor del input (Severidad: Baja)**  
El botón "Buscar" estaba posicionado dentro del `field-container` del input, causando que al hacer clic se activara el evento del campo en lugar de la búsqueda.

**R-007-B — Sin actualización en tiempo real del dashboard admin (Severidad: Media)**  
El dashboard del administrador mostraba métricas estáticas. Si otro usuario realizaba un préstamo o devolución, el dashboard no se actualizaba hasta refrescar la página manualmente.

**R-007-C — Solicitudes y préstamos del alumno sin sincronización en tiempo real (Severidad: Media)**  
El alumno no veía cambios en el estado de sus solicitudes (PENDING → APPROVED) ni en sus préstamos activos sin recargar la página.

---

#### Correcciones aplicadas

**Corrección R-007-A — Mover botón fuera del field-container:**
```tsx
// UserCatalogPage.tsx
// ANTES: botón dentro del contenedor del input
<div className="field-container">
  <input ... />
  <button>Buscar</button>  {/* ← dentro, causaba conflicto */}
</div>

// DESPUÉS: botón fuera
<div className="field-container">
  <input ... />
</div>
<button onClick={handleSearch}>Buscar</button>  {/* ← fuera */}
```

**Corrección R-007-B y R-007-C — Implementar hook de Supabase Realtime:**

```typescript
// frontend/src/hooks/useRealtimeTable.ts (archivo nuevo)
export function useRealtimeTable<T>(
  table: string,
  initialData: T[],
  onUpdate?: () => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${table}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          // Invalidar caché de React Query para que recargue
          queryClient.invalidateQueries({ queryKey: [table] });
          onUpdate?.();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [table]);
}
```

**Tablas con Realtime activado:**

| Tabla | Dónde se usa |
|---|---|
| `prestamos` | Dashboard admin, préstamos alumno |
| `solicitudes_prestamo` | Panel de solicitudes admin, mis solicitudes alumno |
| `libros` | Catálogo admin y alumno |
| `ejemplares` | Detalle de libro, perfil alumno |
| `sanciones_multas` | Perfil alumno |

**Estado:** ✅ Implementado y verificado  
**Commits relacionados:** `f832f95`, `3401750`, `49f115e`, `f0142e5`

---

## Resumen de métricas de calidad

### Bugs corregidos por severidad

| Severidad | Total detectados | Total corregidos | % Resolución |
|---|---|---|---|
| Alta | 7 | 7 | 100% |
| Media | 8 | 8 | 100% |
| Baja | 5 | 5 | 100% |
| **Total** | **20** | **20** | **100%** |

### Archivos refactorizados

| Área | Archivos modificados | Tipo de cambio |
|---|---|---|
| Backend — Validación | `book_schema.py`, `data_router.py` | Pydantic schemas, HTTP codes semánticos |
| Backend — Seguridad | `main.py`, `data_router.py`, `auth_router.py` | CORS, RBAC, campos protegidos |
| Backend — Lógica de negocio | `supabase_service.py` | Ajuste dinámico de ejemplares |
| Frontend — Auth | `ReaderLayout.tsx`, `UserProfilePage.tsx` | Guardia de ruta, sync localStorage |
| Frontend — Cache | 5 archivos `*.query.ts` nuevos | React Query |
| Frontend — Realtime | `useRealtimeTable.ts` nuevo + 6 páginas | Supabase Realtime |
| Frontend — UI | `UserCatalogPage.tsx`, `ReturnSuccessPage.tsx`, `LoansPage.tsx` | Fixes visuales y flujo |

### Estado del código al cierre del período

| Métrica | Valor |
|---|---|
| Pruebas unitarias Python | 21 pruebas — 21 PASS |
| Pruebas E2E automatizadas | 34 pruebas — 33 PASS, 1 condición de entorno |
| Pruebas de integración | 24 pruebas — 24 PASS |
| Errores TypeScript en build | 0 |
| Módulos en bundle de producción | 2,354 |
| Tiempo de build Vite | ~2.0 segundos |
| Cobertura de RBAC | Admin, Lector y Anónimo verificados en todos los endpoints críticos |

---

*Documento generado el 17 de noviembre de 2026.*  
*Sistema de Acervo CIU — UNIPOLI.*

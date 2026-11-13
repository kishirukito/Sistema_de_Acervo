# Reporte de Auditoría: Conexión 100% Real de `/admin/dashboard` a Supabase

> **Fecha:** 2026-11-12 — 2026-11-13  
> **Proyecto:** Sistema de Acervo Bibliotecario (CIU)  
> **Ámbito:** Frontend (`AdminDashboardPage`, `SimpleChart`, `RecentActivity`, `AlertsPanel`, `dashboard.service.ts`) + Backend FastAPI (`/api/v1/data/*`) + Base de Datos Supabase  
> **Estado:** ✅ Conexión 100% Real · 0 Datos Ficticios · Build Exitoso

---

## 1. Resumen Ejecutivo

Se realizó una auditoría y refactorización integral sobre el panel principal **`/admin/dashboard`** y las vistas administrativas asociadas para erradicar por completo los arreglos y textos estáticos de prueba (*"Ana García"*, *"El Principito"*, *"Luis Mendoza"*, *"Camila"*, curvas fijas de 100 préstamos por mes y textos fijos como *"hoy, 08:42 a.m."*).

A partir de esta intervención, **todos los widgets del dashboard consumen información en tiempo real de Supabase** a través de los endpoints optimizados de FastAPI (`/api/v1/data/libros`, `/api/v1/data/prestamos`, `/api/v1/data/usuarios`).

---

## 2. Detalle de Conexiones por Componente del Dashboard

### 2.1. Tarjetas KPI Superiores (`MetricCard.tsx`)
Conectadas a través de `fetchDashboardSnapshot()` en `dashboard.service.ts`:

| Tarjeta KPI | Conteo Real | Subtítulo / Métrica Dinámica | Origen de Datos |
|---|---|---|---|
| **TOTAL DE LIBROS** | **6** | `6 disponibles / 6 totales` | Suma de registros en `libros` y sus `ejemplares` (`estado = 'disponible'`) |
| **PRÉSTAMOS ACTIVOS** | **0** | `0 en circulación` | Conteo de préstamos en estado `'activo'` o `'renovado'` |
| **USUARIOS REGISTRADOS** | **6** | `6 usuarios activos` | Conteo real de usuarios en tabla `usuarios` |
| **PRÉSTAMOS VENCIDOS** | **0** | `Sin adeudos pendientes` | Préstamos no devueltos con `fecha_limite_devolucion < NOW()` o estado `'vencido'` |

---

### 2.2. Tabla "Actividad reciente" (`RecentActivity.tsx`)
- **Eliminación de datos ficticios:** Se eliminó el arreglo mock que mostraba *Ana García*, *Luis Mendoza*, *Sofía Ríos* y *Carlos Vega*.
- **Alimentación dinámica:** Muestra los últimos 6–8 movimientos reales de `public.prestamos` ordenados cronológicamente por la fecha más reciente (`fecha_prestamo` / `fecha_devolucion_real`).
- **Columnas reales visualizadas:**
  - **TIPO:** `Devolución` (si ya fue devuelto o tiene fecha de retorno) o `Préstamo` (si está activo/vencido).
  - **USUARIO:** Nombre del usuario (`usuarios.nombre_completo`) o de la institución/responsable en préstamos interbibliotecarios.
  - **LIBRO:** Título real del recurso (`ejemplares.libros.titulo`).
  - **FECHA:** Fecha formateada en español (`DD MMM YYYY`, ej. `12 Nov 2026`).
  - **ESTADO:** Badge real (`Activo`, `Devuelto`, `Vencido`).
- **Enlace "Ver todo":** Conectado con `useNavigate()` para redirigir directamente a `/admin/loans` (eliminando el `alert()` temporal).
- **Estado vacío:** Incluye fila descriptiva en caso de que no existan movimientos en el sistema.

---

### 2.3. Gráfica "Préstamos por mes" (`SimpleChart.tsx` - `MonthlyLoansChart`)
- **Eliminación de datos simulados:** Se erradicaron los valores hardcodeados de Enero a Septiembre.
- **Agrupación real:** Agrupa los préstamos reales de `public.prestamos` correspondientes al año en curso (`2026`). Los meses sin préstamos registran exactamente `0`.
- **Eje Y dinámico:** La escala ya no está anclada a un valor fijo de 100. Calcula automáticamente el máximo de actividad real y genera marcas enteras limpias (`[0, 1, 2, 3, 4]`).
- **Subtítulo:** Actualizado dinámicamente a `${año_actual} — Registro anual de circulación`.

---

### 2.4. Gráfica "Libros por categoría" (`SimpleChart.tsx` - `CategoryConsultsChart`)
- **Clasificación canónica Dewey:** Cada libro del acervo se clasifica en exactamente **una** categoría Dewey principal (`000 — Ciencias de las Computadoras...`, `800 — Literatura`, etc.), evitando multiplicaciones o etiquetas duplicadas.
- **Eje Y dinámico:** La escala del gráfico de barras se adapta dinámicamente al total de libros registrados en catálogo (eliminando el máximo estático de 240).

---

### 2.5. Tarjeta "Alertas" (`AlertsPanel.tsx`)
- **Detección inteligente:**
  - Si existen préstamos vencidos, genera una alerta de severidad crítica con acceso rápido a `/admin/returns`.
  - Si existen préstamos por vencer dentro de las próximas 48 horas, genera alerta preventiva con acceso a `/admin/loans`.
  - Si existen libros con ejemplares agotados (100% prestados), emite alerta con acceso a `/admin/catalog`.
  - En ausencia de incidencias, despliega: *"Todo en orden — No hay préstamos vencidos ni alertas pendientes en el acervo"*.
- **Hora de sincronización real:** Se sustituyó el texto estático *"hoy, 08:42 a.m."* por la hora real en que los datos fueron consultados del servidor (ej. `hoy, 23:45 hrs`).

---

### 2.6. Saludo Dinámico en Cabecera
- Se eliminó el nombre estático *"Camila"*.
- El encabezado evalúa la hora local (`Buenos días`, `Buenas tardes`, `Buenas noches`) e inserta el nombre del usuario autenticado en `useAuth()`.

---

## 3. Barrido Global Anti-Datos Ficticios en el Frontend

Se inspeccionó todo el árbol de `frontend/src/` para asegurar que ninguna otra pantalla inicializara o utilizara datos simulados:

| Archivo | Estado Anterior | Estado Actual |
|---|---|---|
| `frontend/src/pages/admin/AdminDashboardPage.tsx` | Inicializaba con 5 constantes `MOCK_*` | Inicializa con colecciones vacías y carga real vía `fetchDashboardSnapshot()` |
| `frontend/src/features/dashboard/dashboard.mock.ts` | Contenía nombres falsos y estadísticas ficticias | Vaciado a arreglos tipados limpios `[]` |
| `frontend/src/pages/admin/CatalogPage.tsx` | Inicializaba con `MOCK_RESOURCES` | Inicializa en `[]` y se puebla directamente con `fetchCatalogResources()` |
| `frontend/src/pages/admin/LoansPage.tsx` | Inicializaba con `MOCK_LOANS` y `MOCK_LOANS_SUMMARY` | Inicializa en `[]` y usa datos reales de `fetchAdminLoans()` |
| `frontend/src/pages/admin/ReturnsPage.tsx` | Inicializaba con `MOCK_RETURN_RECORDS` | Inicializa en `[]` y usa datos reales de `fetchReturnRecords()` |
| `frontend/src/pages/admin/UsersPage.tsx` | Inicializaba con `MOCK_MANAGED_USERS` y métricas mock | Inicializa en `[]` y usa datos reales de `fetchManagedUsers()` |
| `frontend/src/pages/user/UserCatalogPage.tsx` | Inicializaba con `MOCK_BOOKS` | Inicializa en `[]` y sincroniza directo desde `booksService.getAll()` |

---

## 4. Verificación Automatizada en Navegador Headless (Selenium)

Se ejecutó una auditoría interactiva mediante Selenium WebDriver sobre `http://127.0.0.1:5173/admin/dashboard`:

```text
=== 1. Login Admin ===
=== 2. Navegar a /admin/dashboard ===
=== 3. Inspeccionar Saludo ===
  Saludo: 'Buenas noches, Administrador'
  ✅ Saludo dinámico validado (sin 'Camila').
=== 4. Inspeccionar Tarjetas KPI ===
  Total tarjetas KPI encontradas: 4
  KPI 1: [TOTAL DE LIBROS] = 6 | 6 disponibles / 6 totales
  KPI 2: [PRÉSTAMOS ACTIVOS] = 0 | 0 en circulación
  KPI 3: [USUARIOS REGISTRADOS] = 6 | 6 usuarios activos
  KPI 4: [PRÉSTAMOS VENCIDOS] = 0 | Sin adeudos pendientes
  ✅ Los 4 KPIs reflejan exactamente los datos reales de la BD.
=== 5. Inspeccionar Actividad Reciente ===
  Filas de actividad encontradas: 2
   Fila: ['Devolución', 'Dr. Roberto Mendoza', 'Clean Code: A Handbook of Agile Software Craftsmanship', '12 Nov 2026', 'Devuelto']
   Fila: ['Devolución', 'Ing. Pedro Ramírez Ortiz', 'The Pragmatic Programmer: your journey to mastery', '11 Nov 2026', 'Devuelto']
  ✅ Cero nombres ficticios en Actividad reciente.
  ✅ Préstamos reales de Supabase visualizados correctamente.
=== 6. Inspeccionar Panel de Alertas ===
  Alertas: 'Todo en orden | No hay préstamos vencidos ni alertas pendientes en el acervo.'
  Footer: 'Última sincronización: hoy, 23:45 hrs'
  ✅ Tarjeta de Alertas dinámica validada con éxito.
=== 7. Probar Enlace 'Ver todo' ===
  URL tras click en 'Ver todo': http://127.0.0.1:5173/admin/loans
  ✅ Enlace 'Ver todo' navega directamente a /admin/loans.

🎉 AUDITORÍA VISUAL DEL DASHBOARD EXITOSA (100% DATOS REALES)
```

---

## 5. Validación de Compilación y Estado Final

1. **Compilación de Producción:**
   ```bash
   npm run build
   # ✓ 2347 modules transformed.
   # dist/assets/index-DrDXrv53.js   1,240.24 kB │ gzip: 331.95 kB
   # ✓ built in 1.33s (0 errores TypeScript/Vite)
   ```
2. **Higiene del Repositorio:**
   - 0 scripts temporales restantes en `tests/`.
   - 0 registros residuales de prueba en la base de datos de Supabase.
   - Datos semilla intactos: 6 libros, 6 usuarios, 2 préstamos devueltos.


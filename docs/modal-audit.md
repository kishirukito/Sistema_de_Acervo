# Auditoría de Acciones, Botones y Modales — Sistema de Acervo

> **Documento de Auditoría Técnica y Levantamiento de Requerimientos**  
> **Proyecto:** Sistema de Acervo  
> **Fecha:** 12 de Octubre de 2026  
> **Estado:** Fase de Auditoría previa a implementación de modales  

---

## 1. Resumen Ejecutivo

| Métrica | Cantidad | Descripción |
| :--- | :---: | :--- |
| **Total de acciones auditadas** | **34** | Botones principales, icon-buttons de tablas, dropdowns, acciones rápidas y disparadores de sesión. |
| **Modales actualmente implementadas** | **2** | `AISummaryModal` y `BookDetailModal` en el módulo de Búsqueda Inteligente (`/search`). |
| **Acciones que requieren nueva modal** | **11** | Acciones de formulario, confirmaciones destructivas, cambios de estado y visualización de detalles rápidos. |
| **Acciones funcionales sin modal (No aplica)** | **21** | Navegación entre rutas, filtros en página, paginación, descargas directas de reportes y toggles locales. |

---

## 2. Inventario Detallado por Pantalla

### 2.1 Dashboard Administrativo (`/admin/dashboard`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Dashboard** | `+ Agregar libro` | Navega a `/admin/catalog/new` | Redirige al formulario de alta de libro existente | **No (Navegación)** | No aplica *(Navegación completada)* | `QuickActions.tsx` (`<QuickActions />`) | N/A (**Completada**) |
| **Dashboard** | `+ Registrar usuario` | Navega a `/admin/users` | Redirige al módulo de usuarios para gestión y registro | **No (Navegación)** | No aplica *(Navegación completada)* | `QuickActions.tsx` (`<QuickActions />`) | N/A (**Completada**) |
| **Dashboard** | `+ Nuevo préstamo` | Navega a `/admin/loans` | Redirige al módulo de préstamos para consulta y nuevo registro | **No (Navegación)** | No aplica *(Navegación completada)* | `QuickActions.tsx` (`<QuickActions />`) | N/A (**Completada**) |
| **Dashboard** | `Registrar devolución` | Navega a `/admin/returns` | Redirige al módulo operativo de devoluciones | **No (Navegación)** | No aplica *(Navegación completada)* | `QuickActions.tsx` (`<QuickActions />`) | N/A (**Completada**) |
| **Dashboard** | `Ver todo` (Actividad reciente) | Ejecuta `alert()` simulado | Navegar al historial de préstamos `/admin/loans` | **No** | No aplica *(Navegación)* | `RecentActivity.tsx` (`<RecentActivity />`) | Baja |

---

### 2.2 Catálogo de Libros (`/admin/catalog`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Catálogo** | `Agregar libro` | Navega a `/admin/catalog/new` (formulario completo existente) | Mantiene navegación a la página de alta de libro | **No** | No aplica *(Navegación existente)* | `CatalogPage.tsx` (`<CatalogPage />`) | N/A (Ya funcional) |
| **Catálogo** | `Limpiar filtros` | Restablece filtros y paginación en memoria | Mantiene limpieza reactiva en página | **No** | No aplica *(Acción en página)* | `CatalogPage.tsx` (`<CatalogPage />`) | N/A (Ya funcional) |
| **Catálogo** | Fila: `Ver detalle` (Icono Ojo) | Abre `BookDetailModal` con ficha completa | Mantiene modal con la ficha bibliográfica detallada, portada, copias y sinopsis | **Implementada** | Detalle | `BookDetailModal.tsx` (`<BookDetailModal />`) | N/A (**Completada**) |
| **Catálogo** | Fila: `Editar` (Icono Lápiz) | Abre `EditResourceModal` de edición rápida | Permite editar metadatos, ejemplares y sinopsis con validación | **Implementada** | Formulario | `EditResourceModal.tsx` (`<EditResourceModal />`) | N/A (**Completada**) |
| **Catálogo** | Fila: `Eliminar` (Icono Papelera) | Abre `DeleteBookModal` con confirmación explícita | Diálogo modal accesible que previene eliminación con préstamos activos | **Implementada** | Confirmación | `DeleteBookModal.tsx` (`<DeleteBookModal />`) | N/A (**Completada**) |

---

### 2.3 Gestión de Usuarios (`/admin/users`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Usuarios** | `Registrar usuario` | Abre `RegisterUserModal` con formulario validado | Permite registrar usuarios prestatarios (alumnos, docentes, etc.) o administrativos con validación por Zod | **Implementada** | Formulario | `RegisterUserModal.tsx` (`<RegisterUserModal />`) | N/A (**Completada**) |
| **Usuarios** | `Limpiar filtros` | Restablece filtros y paginación en memoria | Mantiene limpieza reactiva en página | **No** | No aplica *(Acción en página)* | `UsersPage.tsx` (`<UsersPage />`) | N/A (Ya funcional) |
| **Usuarios** | Fila: `Ver detalles` (Icono Ojo) | Abre `UserDetailModal` con ficha institucional completa | Diálogo accesible de solo lectura con perfil, contacto, categoría/rol y actividad real de préstamos | **Implementada** | Detalle | `UserDetailModal.tsx` (`<UserDetailModal />`) | N/A (**Completada**) |
| **Usuarios** | Fila: `Editar usuario` (Icono Lápiz) | Abre `UserFormModal` (`mode="edit"`) con datos precargados | Modal reutilizable para editar datos personales, de contacto y rol/categoría con validación y confirmación de descarte | **Implementada** | Formulario | `RegisterUserModal.tsx` (`<RegisterUserModal />`) | N/A (**Completada**) |
| **Usuarios** | Fila: `Desactivar / Activar` (Icono Ban / Check) | Abre `UserStatusModal` con diálogo de confirmación diferenciado | Confirmación explícita alertdialog con textos contextuales para activar o desactivar usuarios y foco seguro en Cancelar | **Implementada** | Confirmación | `UserStatusModal.tsx` (`<UserStatusModal />`) | N/A (**Completada**) |

---

### 2.4 Gestión de Préstamos (`/admin/loans`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Préstamos** | `Nuevo préstamo` | Abre `RegisterLoanModal` para registro de préstamo activo | Modal administrativo amplio con selector de usuario elegible, buscador de libro disponible, fechas y observaciones | **Implementada** | Formulario / Selección | `RegisterLoanModal.tsx` (`<RegisterLoanModal />`) | N/A (**Completada**) |
| **Préstamos** | `Limpiar filtros` | Restablece filtros y paginación en memoria | Mantiene limpieza reactiva en página | **No** | No aplica *(Acción en página)* | `LoansPage.tsx` (`<LoansPage />`) | N/A (Ya funcional) |
| **Préstamos** | Fila: `Ver detalles` (Icono Ojo) | Abre `LoanDetailModal` con ficha institucional de consulta | Ficha de consulta de solo lectura con folio, estado, portada de recurso, prestatario, fechas, renovaciones y observaciones | **Implementada** | Detalle | `LoanDetailModal.tsx` (`<LoanDetailModal />`) | N/A (**Completada**) |
| **Préstamos** | Fila: `Registrar devolución` (Icono Retorno) | Abre `ReturnLoanModal` para confirmación operativa de entrega | Diálogo modal accesible con resumen de libro, prestatario, alerta de retraso, fecha de recepción editable y observaciones | **Implementada** | Confirmación | `ReturnLoanModal.tsx` (`<ReturnLoanModal />`) | N/A (**Completada**) |
| **Préstamos** | Fila: `Renovar préstamo` (Icono Reloj) | Abre `RenewLoanModal` para extensión de fecha límite | Diálogo modal accesible con comparación visual de fecha actual vs nueva fecha límite, validación de plazo y bloqueo por límite de renovaciones | **Implementada** | Confirmación | `RenewLoanModal.tsx` (`<RenewLoanModal />`) | N/A (**Completada**) |

---

### 2.5 Registro de Devoluciones (`/admin/returns`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Devoluciones** | `Registrar devolución` (Header) | Abre `SearchReturnLoanModal` para buscar y seleccionar préstamo pendiente | Modal de búsqueda rápida por folio, código, título o usuario que navega a `/admin/returns/:loanId` | **Implementada** | Selección / Navegación | `SearchReturnLoanModal.tsx` (`<SearchReturnLoanModal />`) | N/A (**Completada**) |
| **Devoluciones** | `Limpiar filtros` | Restablece filtros en memoria | Mantiene limpieza reactiva en página | **No** | No aplica *(Acción en página)* | `ReturnsPage.tsx` (`<ReturnsPage />`) | N/A (Ya funcional) |
| **Devoluciones** | Fila: `Registrar devolución` | Navega a `/admin/returns/:loanId` | Navega a pantalla dedicada de confirmación para inspección y cierre del préstamo | **No (Ruta dedicada)** | No aplica *(Pantalla completa completada)* | `AdminReturnConfirmationPlaceholderPage.tsx` | N/A (**Completada**) |

---

### 2.6 Búsqueda Inteligente (`/search`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Búsqueda** | `Buscar` / `Enter` | Filtra resultados en memoria | Mantiene búsqueda reactiva en página | **No** | No aplica *(Acción en página)* | `SearchBar.tsx` (`<SearchBar />`) | N/A (Ya funcional) |
| **Búsqueda** | `Limpiar búsqueda` | Borra campo de búsqueda | Mantiene acción en página | **No** | No aplica *(Acción en página)* | `SearchBar.tsx` (`<SearchBar />`) | N/A (Ya funcional) |
| **Búsqueda** | Filtros dropdown (4) | Filtra catálogo en tiempo real | Mantiene filtrado reactivo en página | **No** | No aplica *(Acción en página)* | `SearchFilters.tsx` (`<SearchFilters />`) | N/A (Ya funcional) |
| **Búsqueda** | Tarjeta: `Bookmark` (Favorito) | Toggle local de guardado | Mantiene toggle reactivo en memoria | **No** | No aplica *(Acción en página)* | `ResourceCard.tsx` (`<ResourceCard />`) | N/A (Ya funcional) |
| **Búsqueda** | Tarjeta: `Ver detalle` | **Abre `BookDetailModal`** | Mantiene modal existente de detalle completo | **Ya existe** | Detalle *(Implementada)* | `BookDetailModal.tsx` | N/A (**Completada**) |
| **Búsqueda** | Tarjeta: `Ver resumen IA` | **Abre `AISummaryModal`** | Mantiene modal existente con resumen IA y puntos clave | **Ya existe** | Detalle / IA *(Implementada)* | `AISummaryModal.tsx` | N/A (**Completada**) |
| **Búsqueda** | `Restablecer filtros` | Limpia filtros | Mantiene acción en página | **No** | No aplica *(Acción en página)* | `SearchResults.tsx` (`<SearchResults />`) | N/A (Ya funcional) |

---

### 2.7 Reportes y Estadísticas (`/admin/reports`)

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Reportes** | Selector de fechas | Abre dropdown de presets | Mantiene dropdown de presets rápidos (o modal solo si se solicita calendario personalizado) | **No** | No aplica *(Dropdown)* | `ReportsFilters.tsx` (`<ReportsFilters />`) | Baja |
| **Reportes** | `Aplicar filtros` | Aplica filtros en memoria | Mantiene filtrado reactivo | **No** | No aplica *(Acción en página)* | `ReportsFilters.tsx` (`<ReportsFilters />`) | N/A (Ya funcional) |
| **Reportes** | `Exportar reporte` | Descarga CSV + toast de éxito | Mantiene descarga directa con feedback | **No** | No aplica *(Descarga directa)* | `ReportsPage.tsx` (`<ReportsPage />`) | N/A (Ya funcional) |
| **Reportes** | `Ver todos los vencidos` | Navega a `/admin/loans` | Mantiene navegación hacia préstamos con filtro | **No** | No aplica *(Navegación)* | `OverdueLoansTable.tsx` (`<OverdueLoansTable />`) | N/A (Ya funcional) |
| **Reportes** | Items de reportes rápidos (5) | Descarga CSV + toast de progreso | Mantiene descarga directa en un clic | **No** | No aplica *(Descarga directa)* | `QuickReportsCard.tsx` (`<QuickReportsCard />`) | N/A (Ya funcional) |

---

### 2.8 Mi Perfil (`/admin/profile`) y Layout Global

| Pantalla | Botón o acción | Comportamiento actual | Comportamiento esperado | ¿Requiere modal? | Tipo de modal | Archivo y componente | Prioridad o dependencias |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Perfil** | `Cambiar foto` | Abre selector nativo de archivos (`<input type="file" />`) y actualiza avatar | Mantiene selector nativo directo (no requiere modal obligatorio) | **No** | No aplica *(Selector nativo)* | `ProfileIdentityCard.tsx` (`<ProfileIdentityCard />`) | Baja |
| **Perfil** | `Guardar cambios` | Valida y actualiza en memoria + toast | Mantiene guardado directo en página | **No** | No aplica *(Formulario en página)* | `PersonalInfoCard.tsx` (`<PersonalInfoCard />`) | N/A (Ya funcional) |
| **Perfil** | `Actualizar contraseña` | Valida y simula cambio + toast | Mantiene formulario en página | **No** | No aplica *(Formulario en página)* | `SecurityCard.tsx` (`<SecurityCard />`) | N/A (Ya funcional) |
| **Perfil** | `Cerrar sesión` (Card Sesión) | Cierra sesión inmediatamente y redirige a `/login` | **Acción destructiva:** Diálogo modal de confirmación para evitar pérdida accidental de sesión | **Sí** | Confirmación | `SessionCard.tsx` (`<SessionCard />`) | **Alta** |
| **Layout / Sidebar** | `Cerrar sesión` (Footer Sidebar) | Cierra sesión inmediatamente y redirige a `/login` | **Acción destructiva:** Mismo diálogo modal de confirmación antes de salir | **Sí** | Confirmación | `AppSidebar.tsx` (`<AppSidebar />`) | **Alta** (Reutiliza la misma modal) |
| **Layout / Topbar** | Campana de notificaciones | Ejecuta `alert()` simulado | Popover/Dropdown o modal de bandeja de notificaciones | **Sí / Dropdown** | Detalle *(o Popover)* | `Topbar.tsx` (`<Topbar />`) | Media |

---

## 3. Catálogo de Modales Propuestas para Implementación

De acuerdo a la auditoría, se identifican **6 componentes de modal reutilizables** que resolverán las 11 acciones pendientes:

```
src/components/ui/Modal/ (Infraestructura base reutilizable)
├── Modal.tsx              <- Backdrop accesible, Focus Trap, Escape key, Portal
└── Modal.css              <- Estilos puros, overlay difuminado, animaciones suaves

src/features/*/modals/ (Modales específicas de dominio)
├── ConfirmActionModal.tsx  <- Confirmación genérica (Eliminar libro, Desactivar usuario, Cerrar sesión)
├── UserFormModal.tsx       <- Alta y Edición de usuarios
├── UserDetailModal.tsx     <- Ficha completa de usuario
├── BookDetailModal.tsx     <- Detalle de libro (extender existente a Catálogo)
├── LoanFormModal.tsx       <- Nuevo préstamo (selección de libro + usuario)
└── LoanActionModal.tsx     <- Confirmación de Devolución y Renovación
```

### Clasificación por Tipo de Modal:

1. **Modales de Confirmación (Acciones destructivas / cambios sensibles):**
   - **`ConfirmLogoutModal`**: Previene salidas accidentales desde Perfil y Sidebar.
   - **`ConfirmDeleteBookModal`**: Confirmación destructiva antes de dar de baja un libro de catálogo.
   - **`ConfirmUserStatusModal`**: Confirmación antes de suspender o desactivar a un usuario.
   - **`ConfirmLoanReturnModal` / `ConfirmLoanRenewalModal`**: Confirmación operativa al devolver o renovar un préstamo.

2. **Modales de Formulario (Entrada de datos):**
   - **`UserFormModal` (Crear / Editar)**: Datos personales, rol institucional, teléfono y código.
   - **`LoanFormModal`**: Asignación de préstamo seleccionando usuario, libro y fecha límite.
   - **`BookFormModal`** *(opcional)*: Edición rápida de libro desde la tabla de catálogo.

3. **Modales de Detalle (Consulta de información):**
   - **`BookDetailModal`**: Ya existe en Búsqueda Inteligente; reutilizar directamente en la tabla de Catálogo.
   - **`UserDetailModal`**: Consulta de préstamos activos, adeudos e historial del usuario.
   - **`LoanDetailModal`**: Ficha detallada de fechas, días de mora y responsable de préstamo.

---

## 4. Próximos Pasos Recomendados

1. **Paso 1:** Crear el componente base accesible `<Modal />` en `src/components/ui/Modal/` con backdrop, cierre con Escape/backdrop, focus trap y accesibilidad ARIA (`role="dialog"`, `aria-modal="true"`).
2. **Paso 2:** Implementar la primera modal de mayor prioridad acordada con el usuario.

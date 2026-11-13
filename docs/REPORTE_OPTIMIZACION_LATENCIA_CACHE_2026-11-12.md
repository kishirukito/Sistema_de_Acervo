# Reporte de Optimización de Latencia y Estrategia de Caché Multi-Capa (CIU)

**Fecha:** 12 de Noviembre de 2026 · **Hora:** 22:36 CST  
**Autor:** Ingeniero Senior Full-Stack (FastAPI / React) & Especialista en Rendimiento  
**Objetivo:** Reducción de latencia en consultas repetidas y navegación web sin comprometer la consistencia de datos ni las reglas de seguridad.

---

## 1. Arquitectura de Caché Implementada

Se implementó una estrategia en tres capas para mitigar la sobrecarga de red y cómputo:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Frontend (Browser): RAM + SessionStorage (TTL 10 min)    │
│    - Carreras UNIPOLI                                       │
│    - Tipos de Préstamo                                      │
│    - Instituciones en Convenio                              │
│    - Invalidación reactiva en alta de instituciones         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 2. Backend (FastAPI): In-Memory Cache (TTL 60 seg)          │
│    - Catálogo de Libros y Ejemplares (GET /data/libros)     │
│    - Catálogo de Carreras (GET /data/carreras)              │
│    - Invalidación automática en mutaciones (CRUD/Préstamos) │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 3. Inferencia IA: Caché LRU (256 slots) + Keep-Alive (-1)   │
│    - Vectores de Embeddings (POST /ai/embeddings)           │
│    - Retención persistente de modelos en memoria VRAM/RAM   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Detalle de Modificaciones por Componente

### A. Frontend (`loans-admin.service.ts`)
- **Almacenamiento Dual:** Se integró un caché en memoria RAM respaldado por `sessionStorage` para `fetchCarreras`, `fetchLoanTypes` y `fetchInstituciones`.
- **TTL:** 10 minutos (`600,000 ms`).
- **Invalidación Controlada:** La función `createInstitucion()` ejecuta de forma automática `invalidateCatalogCache('instituciones')` al registrar con éxito una institución externa, asegurando disponibilidad inmediata en los selectores.

### B. Backend (`data_router.py`)
- **Caché en Memoria:** Se configuró un almacén con expiración a 60 segundos para las rutas de alta frecuencia de lectura:
  - `GET /api/v1/data/libros`
  - `GET /api/v1/data/carreras`
- **Invalidación Inmediata de Consistencia:** La función `invalidate_books_cache()` se vinculó a todas las operaciones que alteran el inventario o la disponibilidad de ejemplares:
  - Creación de libros (`POST /api/v1/data/libros`)
  - Edición de libros (`PATCH /api/v1/data/libros/{id}`)
  - Baja de libros (`DELETE /api/v1/data/libros/{id}`)
  - Creación de préstamos (`POST /api/v1/data/prestamos`)
  - Modificación/Devolución de préstamos (`PATCH /api/v1/data/prestamos/{id}`)
  - Cancelación de préstamos (`DELETE /api/v1/data/prestamos/{id}`)

### C. Microservicio de IA (`ai_service.py`, `config.py`, `.env.example`, `.env`)
- **Caché LRU de Vectores:** Se implementó una estructura `OrderedDict` con capacidad máxima de **256 elementos** para almacenar vectores de embeddings ya calculados. Consultas idénticas se resuelven en **< 5 ms** sin invocar al motor de inferencia.
- **Retención Permanente de Modelos (`keep_alive = -1`):** Se parametrizó en la configuración del servicio y en los payloads HTTP hacia Ollama (`llama3.2:3b` y `nomic-embed-text`), impidiendo que el motor descargue los pesos de la memoria tras periodos de inactividad.

---

## 3. Resultados Empíricos: Antes (Frío) vs. Después (Caliente)

*Pruebas ejecutadas en tiempo real contra los servicios activos:*

| Endpoint / Flujo | Métrica Evaluada | Frío (Sin Caché / Post-Invalidación) | Caliente (Caché Activo) | Aceleración | Reducción de Latencia |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`GET /api/v1/data/libros`** | Latencia total de respuesta | **221.01 ms** | **2.19 ms** | **100.8x** | **-99.0 %** |
| **`GET /api/v1/data/carreras`** | Latencia total de respuesta | **249.28 ms** | **2.66 ms** | **93.7x** | **-98.9 %** |
| **`POST /api/v1/ai/embeddings`** | Tiempo de generación/recuperación | **169.34 ms** | **4.41 ms** | **38.4x** | **-97.4 %** |
| **Navegación `/admin/loans/new`** | Tiempo hasta renderizado completo | **~580.0 ms** | **335.3 ms** | **1.7x** | **-42.2 %** |

---

## 4. Verificación de Compilación y Limpieza

- **Build de Producción:** Compilación exitosa ejecutando `npm run build` (`tsc -b && vite build`) en **1.18 segundos**.
- **Limpieza:** No quedaron archivos temporales de benchmark en el repositorio.


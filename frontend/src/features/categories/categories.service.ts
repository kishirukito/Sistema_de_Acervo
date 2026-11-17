/**
 * categories.service.ts
 * Capa de acceso a la API REST de temas/categorías del Sistema de Acervo.
 *
 * Endpoint base: GET/POST/PATCH/DELETE /api/v1/data/temas
 * El backend usa service-role key → bypassa RLS → requiere JWT de admin.
 *
 * Manejo de migración pendiente:
 *   Si el endpoint responde 404 se propaga el error para que la UI
 *   muestre "pendiente de migración" sin crashear.
 */

import { resolveCategory } from '../../constants';
import { supabase } from '../../services/api/supabase';

export interface Tema {
  id: number;
  nombre: string;
  /** Código Dewey (p.ej. "000"). Puede ser null si la migración aún no corrió. */
  codigo: string | null;
  descripcion?: string;
  /** Puede ser undefined antes de la migración — tratarlo como true por defecto. */
  activa: boolean;
  /** 'categoria' = Dewey principal, 'tema' = tema específico */
  tipo: string;
  /** Número de libros relacionados (devuelto por el backend) */
  booksCount?: number;
}

export interface CreateTemaPayload {
  nombre: string;
  codigo?: string;
  descripcion?: string;
  activa?: boolean;
  tipo?: string;
}

export interface UpdateTemaPayload {
  nombre?: string;
  codigo?: string;
  descripcion?: string;
  activa?: boolean;
  tipo?: string;
}

export interface DeleteTemaResult {
  success: boolean;
  error?: string;
  booksCount?: number;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('acervo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body?.detail === 'string') return body.detail;
    if (body?.detail?.message) return body.detail.message;
    if (typeof body?.error === 'string') return body.error;
  } catch {
    // response body is not JSON
  }
  return `Error del servidor (${res.status}).`;
}

function mapRawTemaToTema(item: any): Tema {
  let rawNombre = item.nombre ?? '';
  let codigo = item.codigo ?? null;
  let nombre = rawNombre;
  let tipo = item.tipo ?? 'tema';

  // Si codigo no viene pero el nombre trae el prefijo Dewey (ej: "000 — Ciencias...")
  if (!codigo) {
    const match = rawNombre.match(/^(\d{3})\s*[-—]\s*(.*)$/);
    if (match) {
      codigo = match[1];
      nombre = match[2].trim();
      tipo = 'categoria';
    } else {
      const resolved = resolveCategory(rawNombre);
      if (resolved) {
        codigo = resolved.code;
        nombre = resolved.name;
        tipo = 'categoria';
      }
    }
  }

  // Extraer el conteo de libros (soporta PostgREST array, backend proxy o número plano)
  let booksCount = 0;
  if (typeof item.booksCount === 'number') {
    booksCount = item.booksCount;
  } else if (typeof item.libros_count === 'number') {
    booksCount = item.libros_count;
  } else if (typeof item.books_count === 'number') {
    booksCount = item.books_count;
  } else if (Array.isArray(item.libro_temas) && item.libro_temas.length > 0) {
    booksCount = Number(item.libro_temas[0]?.count ?? 0);
  }

  return {
    id: item.id,
    nombre,
    codigo,
    descripcion: item.descripcion ?? undefined,
    activa: item.activa !== undefined ? Boolean(item.activa) : true,
    tipo,
    booksCount,
  };
}

/**
 * Obtiene todos los temas/categorías con su conteo de libros asociados.
 * Intenta primero el backend FastAPI proxy (/api/v1/data/temas) y, si no
 * responde o falla de red, consulta directamente Supabase con join a libro_temas.
 */
export async function fetchCategories(): Promise<Tema[]> {
  try {
    const res = await fetch('/api/v1/data/temas', {
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapRawTemaToTema);
      }
    }
  } catch (err) {
    console.warn('[CategoriesService] Backend proxy fetch failed, falling back to Supabase:', err);
  }

  // Fallback directo a Supabase
  try {
    // 1. Intentar query con campos post-migración
    const { data: fullData, error: fullError } = await supabase
      .from('temas')
      .select('id, nombre, descripcion, activa, codigo, tipo, libro_temas(count)')
      .order('nombre', { ascending: true });

    if (!fullError && fullData) {
      return fullData.map(mapRawTemaToTema);
    }

    // 2. Fallback si las columnas nuevas aún no existen en Supabase
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('temas')
      .select('id, nombre, descripcion, libro_temas(count)')
      .order('nombre', { ascending: true });

    if (!fallbackError && fallbackData) {
      return fallbackData.map(mapRawTemaToTema);
    }
  } catch (err) {
    console.error('[CategoriesService] Supabase fallback error:', err);
  }

  return [];
}

/** Crea un nuevo tema/categoría. */
export async function createCategory(payload: CreateTemaPayload): Promise<Tema> {
  const res = await fetch('/api/v1/data/temas', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json();
}

/** Actualiza un tema/categoría existente. */
export async function updateCategory(id: number, payload: UpdateTemaPayload): Promise<Tema> {
  const res = await fetch(`/api/v1/data/temas/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json();
}

/** Elimina un tema/categoría. Retorna {success, error?, booksCount?}. */
export async function deleteCategory(id: number): Promise<DeleteTemaResult> {
  const res = await fetch(`/api/v1/data/temas/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorMsg = await parseErrorMessage(res);
    // 409 Conflict: tiene libros asociados
    if (res.status === 409) {
      try {
        const body = await res.clone().json().catch(() => ({}));
        return {
          success: false,
          error: errorMsg,
          booksCount: body?.booksCount ?? body?.books_count ?? undefined,
        };
      } catch {
        return { success: false, error: errorMsg };
      }
    }
    return { success: false, error: errorMsg };
  }

  return { success: true };
}

/** Activa o desactiva un tema/categoría. */
export async function toggleCategory(id: number, activa: boolean): Promise<Tema> {
  const res = await fetch(`/api/v1/data/temas/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ activa }),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return res.json();
}

export const categoriesService = {
  fetchAll: fetchCategories,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
  toggle: toggleCategory,
};

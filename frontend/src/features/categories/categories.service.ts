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

/**
 * Obtiene todos los temas/categorías con su conteo de libros asociados.
 * Lanza Error si la migración no se ha aplicado (campo activa/codigo ausente
 * en la respuesta) — el llamador decide cómo presentarlo.
 */
export async function fetchCategories(): Promise<Tema[]> {
  const res = await fetch('/api/v1/data/temas', {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        'Gestión de categorías no disponible — pendiente de migración.'
      );
    }
    throw new Error(await parseErrorMessage(res));
  }

  const data = await res.json();

  // Normaliza: si el backend aún no tiene el campo activa/codigo, no crashea.
  return (Array.isArray(data) ? data : []).map((item: any) => {
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

    return {
      id: item.id,
      nombre,
      codigo,
      descripcion: item.descripcion ?? undefined,
      activa: item.activa !== undefined ? Boolean(item.activa) : true,
      tipo,
      booksCount: typeof item.booksCount === 'number' ? item.booksCount
        : typeof item.books_count === 'number' ? item.books_count
        : undefined,
    };
  });
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

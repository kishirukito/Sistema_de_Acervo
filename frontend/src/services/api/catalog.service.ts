/**
 * Catalog Service — Fetches resources (libros) from Supabase and maps them
 * to the frontend `Resource` type used by the catalog feature.
 *
 * Falls back to MOCK_RESOURCES when Supabase is unreachable.
 */

import { supabase } from './supabase';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import type { Resource, ResourceStatus } from '../../features/catalog/catalog.types';
import { getCategoryFullLabel } from '../../constants';

/**
 * Maps a raw Supabase `libros` row (with joined relations) to a `Resource`.
 */
function mapLibroToResource(row: any): Resource {
  // Extract first author name from the joined libro_autores → autores relation
  const authorNames: string[] = [];
  if (Array.isArray(row.libro_autores)) {
    for (const la of row.libro_autores) {
      if (la.autores?.nombre) {
        authorNames.push(la.autores.nombre);
      }
    }
  }
  const author = authorNames.length > 0 ? authorNames.join(', ') : 'Autor desconocido';

  // Publisher from joined editorial
  const publisher = row.editoriales?.nombre || '';

  // Count total & available copies from joined ejemplares
  let totalCopies = 0;
  let availableCopies = 0;
  let location = '';
  if (Array.isArray(row.ejemplares)) {
    totalCopies = row.ejemplares.length;
    for (const ej of row.ejemplares) {
      if (ej.estado === 'disponible') {
        availableCopies++;
        if (!location && ej.ubicacion_estante) {
          location = ej.ubicacion_estante;
        }
      }
    }
  }

  // Determine status
  let status: ResourceStatus = 'AVAILABLE';
  if (totalCopies === 0) {
    status = 'UNAVAILABLE';
  } else if (availableCopies === 0) {
    status = 'LOANED';
  } else if (availableCopies <= 1) {
    status = 'LOW_STOCK';
  }

  // Get category code from temas (first tema) or fallback
  let category = '000';
  if (Array.isArray(row.libro_temas) && row.libro_temas.length > 0) {
    const firstTema = row.libro_temas[0];
    if (firstTema.temas?.nombre) {
      // Try to resolve Dewey code from tema name
      category = firstTema.temas.nombre;
    }
  }

  // AI summary description
  let description = '';
  if (Array.isArray(row.resumenes_ia) && row.resumenes_ia.length > 0) {
    description = row.resumenes_ia[0].resumen_texto || '';
  }

  // Generate code from ISBN or ID
  const code = row.isbn ? `ISBN-${row.isbn.slice(-4)}` : `LIB-${String(row.id).slice(0, 8)}`;

  // Generate cover color deterministically from ID
  const colors = ['#2F80ED', '#27AE60', '#D97706', '#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B', '#6366F1'];
  const colorIndex = row.id ? row.id.charCodeAt(0) % colors.length : 0;

  // Initials from title
  const words = (row.titulo || '').split(' ').filter((w: string) => w.length > 0);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : (words[0] || 'LB').slice(0, 2).toUpperCase();

  return {
    id: row.id,
    code,
    title: row.titulo || 'Sin título',
    author,
    category,
    categoryLabel: getCategoryFullLabel(category),
    isbn: row.isbn || '',
    publicationYear: row.anio_publicacion || 0,
    totalCopies,
    availableCopies,
    location: location || 'Sin ubicación asignada',
    status,
    coverColor: colors[colorIndex],
    coverInitials: initials,
    publisher,
    description,
    coverUrl: row.portada_url || undefined,
    ejemplares: Array.isArray(row.ejemplares) ? row.ejemplares : [],
  };
}

/**
 * Fetches all resources from backend proxy or Supabase `libros` with joined relations.
 * Falls back to mock data if the query fails.
 */
export async function fetchCatalogResources(): Promise<Resource[]> {
  try {
    // 1. Try Python backend proxy first
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/libros', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapLibroToResource);
      }
    }
  } catch (err) {
    console.warn('[CatalogService] Backend proxy fetch failed, falling back to Supabase:', err);
  }

  try {
    const { data, error } = await supabase
      .from('libros')
      .select(`
        id,
        isbn,
        titulo,
        anio_publicacion,
        edicion,
        portada_url,
        editorial_id,
        editoriales ( nombre ),
        libro_autores ( orden, autores ( nombre ) ),
        libro_temas ( temas ( nombre ) ),
        ejemplares ( id, codigo_inventario, ubicacion_estante, estado ),
        resumenes_ia ( resumen_texto, palabras_clave )
      `)
      .order('titulo', { ascending: true });

    if (error) {
      console.warn('[CatalogService] Supabase error, falling back to mocks:', error.message);
      return [...MOCK_RESOURCES];
    }

    if (!data || data.length === 0) {
      console.info('[CatalogService] No records in Supabase, using mocks');
      return [...MOCK_RESOURCES];
    }

    return data.map(mapLibroToResource);
  } catch (err) {
    console.warn('[CatalogService] Network error, falling back to mocks:', err);
    return [...MOCK_RESOURCES];
  }
}

/**
 * Inserts a new book into Supabase.
 */
export async function createResource(resource: Partial<Resource>): Promise<Resource | null> {
  try {
    const { data, error } = await supabase
      .from('libros')
      .insert({
        isbn: resource.isbn,
        titulo: resource.title,
        anio_publicacion: resource.publicationYear,
        portada_url: resource.coverUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('[CatalogService] Insert error:', error.message);
      return null;
    }

    return mapLibroToResource(data);
  } catch (err) {
    console.error('[CatalogService] Insert failed:', err);
    return null;
  }
}

/**
 * Updates a book in Supabase via protected backend endpoint.
 * Requires administrative Bearer authentication.
 */
export async function updateResource(id: string, updates: Partial<Resource>): Promise<boolean> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`/api/v1/data/libros/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        isbn: updates.isbn,
        titulo: updates.title,
        anio_publicacion: updates.publicationYear,
        portada_url: updates.coverUrl,
        categoria: updates.category,
      }),
    });

    if (res.ok) {
      return true;
    }

    // Direct fallback if backend unreachable
    const { error } = await supabase
      .from('libros')
      .update({
        isbn: updates.isbn,
        titulo: updates.title,
        anio_publicacion: updates.publicationYear,
        portada_url: updates.coverUrl,
      })
      .eq('id', id);

    return !error;
  } catch (err) {
    console.error('[CatalogService] Update failed:', err);
    return false;
  }
}

export interface DeleteResourceResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Elimina un libro en Supabase a través del endpoint seguro del backend FastAPI.
 * Requiere autenticación administrativa con Bearer token.
 */
export async function deleteResource(id: string): Promise<DeleteResourceResult> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`/api/v1/data/libros/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers,
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: true,
        message: data.message || 'El libro fue eliminado correctamente del acervo.',
      };
    }

    const errData = await res.json().catch(() => ({}));
    const errorMessage =
      errData.detail ||
      errData.message ||
      (res.status === 401
        ? 'Se requiere autenticación para realizar esta acción.'
        : res.status === 403
        ? 'Acceso denegado: solo personal administrativo puede eliminar libros.'
        : res.status === 404
        ? 'El libro no fue encontrado en la base de datos.'
        : res.status === 409
        ? errData.detail || 'No es posible eliminar el libro porque cuenta con ejemplares en préstamo activo.'
        : `Error al eliminar el libro (${res.status})`);

    return {
      success: false,
      error: errorMessage,
    };
  } catch (err: any) {
    console.error('[CatalogService] Delete failed:', err);
    return {
      success: false,
      error: err?.message || 'Error de conexión con el servidor al eliminar el libro.',
    };
  }
}


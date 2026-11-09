/**
 * Search Service — Fetches books from Supabase for the smart search page
 * and maps them to `ResourceSearchResult`.
 *
 * Falls back to MOCK_SEARCH_RESULTS when Supabase is unreachable.
 */

import { supabase } from './supabase';
import { MOCK_SEARCH_RESULTS } from '../../features/search/search.mock';
import type { ResourceSearchResult, AvailabilityStatus } from '../../features/search/search.types';

const GRADIENTS = [
  { from: '#1E3A5F', to: '#2F80ED' },
  { from: '#D97706', to: '#F59E0B' },
  { from: '#15803D', to: '#22C55E' },
  { from: '#7C3AED', to: '#A855F7' },
  { from: '#1E40AF', to: '#3B82F6' },
  { from: '#0284C7', to: '#38BDF8' },
  { from: '#059669', to: '#10B981' },
  { from: '#4F46E5', to: '#6366F1' },
  { from: '#6366F1', to: '#8B5CF6' },
  { from: '#0D9488', to: '#14B8A6' },
];

function getInitials(title: string): string {
  const words = title.split(' ').filter(w => w.length > 0);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (title.slice(0, 2) || 'LB').toUpperCase();
}

function mapLibroToSearchResult(row: any, index: number): ResourceSearchResult {
  const authorNames: string[] = [];
  if (Array.isArray(row.libro_autores)) {
    for (const la of row.libro_autores) {
      if (la.autores?.nombre) authorNames.push(la.autores.nombre);
    }
  }

  const topics: string[] = [];
  if (Array.isArray(row.libro_temas)) {
    for (const lt of row.libro_temas) {
      if (lt.temas?.nombre) topics.push(lt.temas.nombre);
    }
  }

  let totalCopies = 0, availableCopies = 0, location = '';
  if (Array.isArray(row.ejemplares)) {
    totalCopies = row.ejemplares.length;
    for (const ej of row.ejemplares) {
      if (ej.estado === 'disponible') {
        availableCopies++;
        if (!location) location = ej.ubicacion_estante || '';
      }
    }
  }

  let availability: AvailabilityStatus = 'AVAILABLE';
  if (availableCopies === 0 && totalCopies > 0) availability = 'BORROWED';
  else if (totalCopies === 0) availability = 'UNAVAILABLE';

  let aiSummary = '';
  if (Array.isArray(row.resumenes_ia) && row.resumenes_ia.length > 0) {
    aiSummary = row.resumenes_ia[0].resumen_texto || '';
  }

  const gradient = GRADIENTS[index % GRADIENTS.length];

  return {
    id: row.id,
    title: row.titulo || 'Sin título',
    author: authorNames.join(', ') || 'Autor desconocido',
    publicationYear: row.anio_publicacion || 0,
    pages: 0,
    category: topics[0] || '000',
    resourceType: 'Libro impreso',
    subjects: topics,
    description: aiSummary || `Libro: ${row.titulo}`,
    location: location || 'Sin ubicación',
    isbn: row.isbn || '',
    totalCopies,
    availableCopies,
    availability,
    matchLevel: 'high',
    coverGradient: gradient,
    coverInitials: getInitials(row.titulo || ''),
    aiSummary: aiSummary || 'Resumen no disponible. Genera uno con IA desde el panel de administración.',
  };
}

/**
 * Searches books in Supabase by text query.
 */
export async function searchBooks(query: string): Promise<ResourceSearchResult[]> {
  try {
    if (!query.trim()) {
      // Return all books when no query
      const { data, error } = await supabase
        .from('libros')
        .select(`
          id, isbn, titulo, anio_publicacion, portada_url,
          libro_autores ( autores ( nombre ) ),
          libro_temas ( temas ( nombre ) ),
          ejemplares ( id, codigo_inventario, ubicacion_estante, estado ),
          resumenes_ia ( resumen_texto )
        `)
        .order('titulo')
        .limit(50);

      if (error || !data || data.length === 0) return [...MOCK_SEARCH_RESULTS];
      return data.map((r, i) => mapLibroToSearchResult(r, i));
    }

    // Search by title using ilike
    const { data, error } = await supabase
      .from('libros')
      .select(`
        id, isbn, titulo, anio_publicacion, portada_url,
        libro_autores ( autores ( nombre ) ),
        libro_temas ( temas ( nombre ) ),
        ejemplares ( id, codigo_inventario, ubicacion_estante, estado ),
        resumenes_ia ( resumen_texto )
      `)
      .ilike('titulo', `%${query}%`)
      .limit(50);

    if (error) {
      console.warn('[SearchService] Supabase error:', error.message);
      return [...MOCK_SEARCH_RESULTS];
    }

    if (!data || data.length === 0) {
      // Try fallback: search by ISBN
      const { data: isbnData } = await supabase
        .from('libros')
        .select(`
          id, isbn, titulo, anio_publicacion, portada_url,
          libro_autores ( autores ( nombre ) ),
          libro_temas ( temas ( nombre ) ),
          ejemplares ( id, codigo_inventario, ubicacion_estante, estado ),
          resumenes_ia ( resumen_texto )
        `)
        .ilike('isbn', `%${query}%`)
        .limit(50);

      if (isbnData && isbnData.length > 0) {
        return isbnData.map((r, i) => mapLibroToSearchResult(r, i));
      }

      return [...MOCK_SEARCH_RESULTS];
    }

    return data.map((r, i) => mapLibroToSearchResult(r, i));
  } catch (err) {
    console.warn('[SearchService] Network error:', err);
    return [...MOCK_SEARCH_RESULTS];
  }
}


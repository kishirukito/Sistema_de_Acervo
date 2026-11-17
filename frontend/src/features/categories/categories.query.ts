/**
 * categories.query.ts
 * React Query hooks para la gestión de categorías/temas del acervo.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories } from './categories.service';
import type { Tema } from './categories.service';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../constants';

export const CATEGORIES_KEY = ['admin-categories'] as const;

const CATEGORIES_STALE_MS = 2 * 60 * 1000; // 2 minutos

/** Hook principal: obtiene todos los temas con conteo de libros. */
export function useCategories() {
  return useQuery<Tema[]>({
    queryKey: CATEGORIES_KEY,
    queryFn: fetchCategories,
    staleTime: CATEGORIES_STALE_MS,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook derivado para selectores de libro: solo devuelve categorías activas
 * en el formato {label, value} que usa el componente Select.
 *
 * Fallback: si la query no tiene datos (endpoint inexistente o migración no
 * aplicada), usa la constante local BIBLIOGRAPHIC_CATEGORIES para que los
 * formularios de libro sigan funcionando.
 */
export function useActiveCategoriesForSelect() {
  const { data, isError } = useCategories();

  if (!data || isError) {
    // Fallback a constante local
    return BIBLIOGRAPHIC_CATEGORIES.map((c) => ({
      label: c.label,
      value: c.code,
    }));
  }

  return data
    .filter((t) => t.activa)
    .sort((a, b) => {
      // Categorías Dewey primero, luego temas específicos
      if (a.tipo === 'categoria' && b.tipo !== 'categoria') return -1;
      if (a.tipo !== 'categoria' && b.tipo === 'categoria') return 1;
      return a.nombre.localeCompare(b.nombre, 'es');
    })
    .map((t) => ({
      label: t.codigo ? `${t.codigo} — ${t.nombre}` : t.nombre,
      value: t.codigo || String(t.id),
    }));
}

/** Invalida el cache de categorías después de una operación de escritura. */
export function invalidateCategories(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
}

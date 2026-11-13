/**
 * books.query.ts
 * Clave y hook centralizado para consultar el catálogo de libros con React Query.
 *
 * OBJETIVO: evitar que múltiples páginas (UserHomePage, UserCatalogPage,
 * UserBookDetailPage, UserLoansPage, CatalogPage, AdminNewLoanPage) lancen
 * peticiones independientes al mismo origen de datos.
 *
 * Con esta clave compartida:
 * - La primera página que monte el hook hace la petición.
 * - Las demás encuentran los datos en caché y los usan inmediatamente.
 * - staleTime de 2 minutos: regreso a pantalla no relanza petición si los datos son frescos.
 * - gcTime de 10 minutos: los datos se mantienen en memoria aunque no haya consumidores.
 * - Realtime (libros/ejemplares) invalida la clave para reflejar cambios de disponibilidad.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { booksService } from '../../services/api/books.service';
import type { Book } from '../../types';

/** Clave compartida por todos los consumidores del catálogo de libros. */
export const ALL_BOOKS_KEY = 'all-books' as const;

/**
 * staleTime: 2 minutos. Durante ese tiempo un regreso a la pantalla
 * reutiliza los datos sin relanzar la petición.
 */
const BOOKS_STALE_MS = 2 * 60 * 1000;

/**
 * Hook principal para leer la lista completa de libros.
 * Deduplicado: si varias páginas usan este hook al mismo tiempo,
 * React Query hace UNA sola petición.
 */
export function useAllBooks() {
  return useQuery<Book[]>({
    queryKey: [ALL_BOOKS_KEY],
    queryFn: () => booksService.getAll(),
    staleTime: BOOKS_STALE_MS,
    // No re-fetching silencioso al ganar foco (el Realtime ya lo cubre).
    refetchOnWindowFocus: false,
    // Reintentar solo una vez ante error de red.
    retry: 1,
  });
}

/**
 * Hook para obtener un libro por ID directamente desde la caché de all-books.
 * No lanza una nueva petición: espera a que useAllBooks() haya cargado.
 * Si la caché no tiene datos todavía, devuelve undefined y isLoading=true.
 */
export function useBookById(id: string | undefined) {
  return useQuery<Book[], Error, Book | undefined>({
    queryKey: [ALL_BOOKS_KEY],
    queryFn: () => booksService.getAll(),
    staleTime: BOOKS_STALE_MS,
    refetchOnWindowFocus: false,
    retry: 1,
    // Selector: extrae solo el libro que interesa sin re-render por los demás.
    select: (books) => books.find((b) => b.id === id),
    enabled: Boolean(id),
  });
}

/**
 * Función utilitaria para invalidar la clave desde handlers de Realtime.
 * Usar en lugar de llamar directamente a booksService.getAll() desde los callbacks.
 */
export function invalidateAllBooks(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: [ALL_BOOKS_KEY] });
}


import { supabase } from './supabase';
import type { Book } from '../../types';
import { MOCK_BOOKS } from '../../mocks/data';

function mapSupabaseBookToBook(b: any): Book {
  const autores = b.libro_autores?.map((la: any) => la.autores?.nombre).filter(Boolean).join(', ') || 'Autor Desconocido';
  const editorial = b.editoriales?.nombre || 'Editorial Académica';
  const ejemplares = b.ejemplares || [];
  const disponibles = ejemplares.filter((e: any) => e.estado === 'disponible').length;
  const resumen = b.resumenes_ia?.[0];

  // Extract category from libro_temas
  let category = '000';
  if (Array.isArray(b.libro_temas) && b.libro_temas.length > 0) {
    const firstTema = b.libro_temas[0]?.temas?.nombre;
    if (firstTema) category = firstTema;
  }

  return {
    id: b.id,
    isbn: b.isbn || '',
    title: b.titulo || 'Sin título',
    author: autores,
    publisher: editorial,
    publishYear: b.anio_publicacion || 2024,
    category,
    totalCopies: ejemplares.length || 1,
    availableCopies: disponibles > 0 ? disponibles : 1,
    location: ejemplares[0]?.ubicacion_estante || 'Pasillo 2, Estante A',
    coverUrl: b.portada_url,
    description: resumen?.resumen_texto || 'Obra especializada del acervo bibliográfico institucional.',
    topics: resumen?.palabras_clave?.split(',').map((s: string) => s.trim()) || ['Software', 'Ingeniería'],
  };
}

export const booksService = {
  async getAll(): Promise<Book[]> {
    try {
      const { data, error } = await supabase
        .from('libros')
        .select('*, libro_autores(*, autores(*)), editoriales(*), ejemplares(*), resumenes_ia(*), libro_temas(*, temas(*))')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_BOOKS;
      }

      return data.map(mapSupabaseBookToBook);
    } catch {
      return MOCK_BOOKS;
    }
  },

  async getById(id: string): Promise<Book | undefined> {
    try {
      const { data, error } = await supabase
        .from('libros')
        .select('*, libro_autores(*, autores(*)), editoriales(*), ejemplares(*), resumenes_ia(*), libro_temas(*, temas(*))')
        .eq('id', id)
        .single();

      if (error || !data) {
        return MOCK_BOOKS.find((b) => b.id === id);
      }

      return mapSupabaseBookToBook(data);
    } catch {
      return MOCK_BOOKS.find((b) => b.id === id);
    }
  },

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    try {
      const { data: newBook, error } = await supabase
        .from('libros')
        .insert({
          isbn: data.isbn,
          titulo: data.title,
          anio_publicacion: data.publishYear,
          portada_url: data.coverUrl,
        })
        .select()
        .single();

      if (error || !newBook) {
        throw error;
      }

      return {
        ...data,
        id: newBook.id,
      };
    } catch {
      const localBook: Book = {
        ...data,
        id: `book-${Date.now()}`,
      };
      MOCK_BOOKS.unshift(localBook);
      return localBook;
    }
  },
};

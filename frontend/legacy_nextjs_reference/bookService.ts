import { api } from './api';
import { Book } from '../types';

export const bookService = {
  async getBooks(search?: string, categoria?: string): Promise<Book[]> {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (categoria) params.categoria = categoria;
    const { data } = await api.get('/books', { params });
    return data.data?.libros || data.libros || data;
  },

  async getBookById(id: string): Promise<Book> {
    const { data } = await api.get(`/books/${id}`);
    return data.data || data;
  },

  async createBook(book: Partial<Book>): Promise<Book> {
    const { data } = await api.post('/books', book);
    return data.data || data;
  },

  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const { data } = await api.put(`/books/${id}`, book);
    return data.data || data;
  },

  async deleteBook(id: string): Promise<void> {
    await api.delete(`/books/${id}`);
  },

  async uploadCover(id: string, file: File, usuarioId?: string): Promise<string> {
    const formData = new FormData();
    formData.append('cover', file);
    if (usuarioId) formData.append('usuario_id', usuarioId);

    const { data } = await api.post(`/books/${id}/cover`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data?.portada_url || data.portada_url;
  },

  async addEjemplar(id: string, codigoInventario: string, ubicacion: string, observaciones?: string, usuarioId?: string) {
    const { data } = await api.post(`/books/${id}/ejemplares`, {
      codigo_inventario: codigoInventario,
      ubicacion_estante: ubicacion,
      observaciones,
      usuario_id: usuarioId,
    });
    return data.data || data;
  },
};

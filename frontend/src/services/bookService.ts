import { api } from './api';
import { Book } from '../types';

export const bookService = {
  async getBooks(search?: string, categoria?: string): Promise<Book[]> {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (categoria) params.categoria = categoria;
    const { data } = await api.get<Book[]>('/books', { params });
    return data;
  },

  async getBookById(id: string): Promise<Book> {
    const { data } = await api.get<Book>(`/books/${id}`);
    return data;
  },

  async createBook(book: Partial<Book>): Promise<Book> {
    const { data } = await api.post<Book>('/books', book);
    return data;
  },

  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const { data } = await api.put<Book>(`/books/${id}`, book);
    return data;
  },

  async deleteBook(id: string): Promise<void> {
    await api.delete(`/books/${id}`);
  }
};

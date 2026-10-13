import { apiClient } from './client';
import type { Book } from '../../types';
import { MOCK_BOOKS } from '../../mocks/data';

export const booksService = {
  async getAll(): Promise<Book[]> {
    try {
      const response = await apiClient.get<Book[]>('/books');
      return response.data;
    } catch {
      // Fallback to local mock data during frontend development
      return MOCK_BOOKS;
    }
  },

  async getById(id: string): Promise<Book | undefined> {
    try {
      const response = await apiClient.get<Book>(`/books/${id}`);
      return response.data;
    } catch {
      return MOCK_BOOKS.find((b) => b.id === id);
    }
  },

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    try {
      const response = await apiClient.post<Book>('/books', data);
      return response.data;
    } catch {
      const newBook: Book = {
        ...data,
        id: `book-${Date.now()}`,
      };
      MOCK_BOOKS.unshift(newBook);
      return newBook;
    }
  },
};

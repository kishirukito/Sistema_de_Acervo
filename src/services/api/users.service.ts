import { apiClient } from './client';
import type { User } from '../../types';
import { MOCK_USERS } from '../../mocks/data';

export const usersService = {
  async getAll(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data;
    } catch {
      return MOCK_USERS;
    }
  },

  async getById(id: string): Promise<User | undefined> {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch {
      return MOCK_USERS.find((u) => u.id === id);
    }
  },
};

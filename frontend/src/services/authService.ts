import { api } from './api';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

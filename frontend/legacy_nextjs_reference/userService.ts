import { api } from './api';
import { User, UserRole } from '../types';

export interface CreateUserData {
  email: string;
  password: string;
  nombre_completo: string;
  matricula_o_nomina: string;
  rol: UserRole;
}

export interface UpdateUserData {
  nombre_completo?: string;
  rol?: UserRole;
  estado?: 'activo' | 'suspendido' | 'inactivo';
  password?: string;
}

export const userService = {
  async getUsers(search?: string, rol?: string, estado?: string): Promise<User[]> {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (rol) params.rol = rol;
    if (estado) params.estado = estado;
    const { data } = await api.get('/users', { params });
    return data.data || data;
  },

  async getUserById(id: string): Promise<User> {
    const { data } = await api.get(`/users/${id}`);
    return data.data || data;
  },

  async createUser(userData: CreateUserData, adminUsuarioId?: string): Promise<User> {
    const { data } = await api.post('/users', {
      ...userData,
      admin_usuario_id: adminUsuarioId,
    });
    return data.data || data;
  },

  async updateUser(id: string, userData: UpdateUserData, adminUsuarioId?: string): Promise<User> {
    const { data } = await api.put(`/users/${id}`, {
      ...userData,
      admin_usuario_id: adminUsuarioId,
    });
    return data.data || data;
  },
};

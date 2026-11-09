import { supabase } from './supabase';
import type { User } from '../../types';
import { MOCK_USERS } from '../../mocks/data';

function mapSupabaseUserToUser(u: any): User {
  const isAdmin = u.rol === 'admin' || u.rol === 'personal';
  return {
    id: u.id,
    name: u.nombre_completo,
    email: u.email,
    kind: isAdmin ? 'ADMINISTRATIVE' : 'NORMAL',
    role: u.rol === 'admin' ? 'ADMIN' : (u.rol === 'personal' ? 'LIBRARIAN' : undefined),
    category: !isAdmin ? (u.tipo_usuario_id === 2 ? 'TEACHER' : 'STUDENT') : undefined,
    status: u.estado === 'activo' ? 'ACTIVE' : (u.estado === 'suspendido' ? 'SUSPENDED' : 'INACTIVE'),
    identifierCode: u.matricula_o_nomina,
    departmentOrCareer: u.carrera_o_dependencia,
    createdAt: u.created_at || new Date().toISOString(),
  };
}

export const usersService = {
  async getAll(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_USERS;
      }

      return data.map(mapSupabaseUserToUser);
    } catch {
      return MOCK_USERS;
    }
  },

  async getById(id: string): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return MOCK_USERS.find((u) => u.id === id);
      }

      return mapSupabaseUserToUser(data);
    } catch {
      return MOCK_USERS.find((u) => u.id === id);
    }
  },
};

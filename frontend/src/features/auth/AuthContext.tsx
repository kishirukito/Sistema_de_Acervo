import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from './auth.types';
import {
  saveMockSession,
  getMockSession,
  clearMockSession,
} from './auth.mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUser: string | User) => Promise<User>;
  loginAsAdmin: () => void;
  loginAsStudent: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const sessionUser = getMockSession();
    if (sessionUser) return sessionUser;

    const saved = localStorage.getItem('acervo_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      saveMockSession(user);
    } else {
      clearMockSession();
    }
  }, [user]);

  const login = async (emailOrUser: string | User): Promise<User> => {
    let authenticatedUser: User;
    if (typeof emailOrUser !== 'string' && emailOrUser && 'kind' in emailOrUser) {
      authenticatedUser = emailOrUser;
    } else {
      const email = typeof emailOrUser === 'string' ? emailOrUser : (emailOrUser as any).email || '';
      const normalizedEmail = email.trim().toLowerCase();
      const isAdmin = normalizedEmail.includes('admin') || normalizedEmail.includes('biblioteca');
      authenticatedUser = {
        id: `usr-${Date.now()}`,
        name: isAdmin ? 'Administrador General' : normalizedEmail.split('@')[0],
        email: normalizedEmail,
        kind: isAdmin ? 'ADMINISTRATIVE' : 'NORMAL',
        role: isAdmin ? 'ADMIN' : undefined,
        category: isAdmin ? undefined : 'STUDENT',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
    }

    setUser(authenticatedUser);
    saveMockSession(authenticatedUser);
    return authenticatedUser;
  };

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'a0000000-0000-0000-0000-000000000001',
      name: 'Administrador General',
      email: 'admin@upd.edu.mx',
      kind: 'ADMINISTRATIVE',
      role: 'ADMIN',
      status: 'ACTIVE',
      identifierCode: 'EMP-001',
      departmentOrCareer: 'Dirección de Biblioteca',
      createdAt: new Date().toISOString(),
    };
    setUser(adminUser);
    saveMockSession(adminUser, true, `secure_session_${adminUser.id}`);
  };

  const loginAsStudent = () => {
    const studentUser: User = {
      id: 'a0000000-0000-0000-0000-000000000004',
      name: 'Carlos Hernández Gómez',
      email: 'alumno.prueba@upd.edu.mx',
      kind: 'NORMAL',
      category: 'STUDENT',
      status: 'ACTIVE',
      identifierCode: '2303150999',
      departmentOrCareer: 'Ingeniería en Software',
      createdAt: new Date().toISOString(),
    };
    setUser(studentUser);
    saveMockSession(studentUser, true, `secure_session_${studentUser.id}`);
  };

  const logout = () => {
    setUser(null);
    clearMockSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        loginAsAdmin,
        loginAsStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

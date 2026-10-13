import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from './auth.types';
import {
  MOCK_ACCOUNTS,
  saveMockSession,
  getMockSession,
  clearMockSession,
} from './auth.mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<User>;
  loginAsAdmin: () => void;
  loginAsStudent: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Try primary session storage key first, fallback to legacy key
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

  const login = async (email: string): Promise<User> => {
    const normalizedEmail = email.trim().toLowerCase();
    const mockAccount = MOCK_ACCOUNTS.find(
      (acc) => acc.user.email.toLowerCase() === normalizedEmail
    );

    const authenticatedUser: User = mockAccount
      ? mockAccount.user
      : {
          id: `usr-${Date.now()}`,
          name: normalizedEmail.split('@')[0],
          email: normalizedEmail,
          kind: 'NORMAL',
          category: 'STUDENT',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        };

    setUser(authenticatedUser);
    saveMockSession(authenticatedUser);
    return authenticatedUser;
  };

  const loginAsAdmin = () => {
    const adminAccount = MOCK_ACCOUNTS.find((acc) => acc.user.email === 'admin@acervo.com');
    if (adminAccount) {
      setUser(adminAccount.user);
      saveMockSession(adminAccount.user);
    }
  };

  const loginAsStudent = () => {
    const studentAccount = MOCK_ACCOUNTS.find((acc) => acc.user.email === 'alumno@acervo.com');
    if (studentAccount) {
      setUser(studentAccount.user);
      saveMockSession(studentAccount.user);
    }
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

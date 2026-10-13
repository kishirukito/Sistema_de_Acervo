import type { User, LoginCredentials, AuthResult } from './auth.types';

export const SESSION_STORAGE_KEY = 'sistema-acervo-session';

export interface MockAccount {
  user: User;
  passwordHash: string;
  redirectUrl: string;
}

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    user: {
      id: 'usr-admin-01',
      name: 'Administrador del Sistema',
      email: 'admin@acervo.com',
      kind: 'ADMINISTRATIVE',
      role: 'ADMIN',
      status: 'ACTIVE',
      identifierCode: 'ADM-2024-001',
      departmentOrCareer: 'Dirección de Acervo Bibliográfico',
      createdAt: '2024-01-15T08:00:00Z',
    },
    passwordHash: 'Admin1234',
    redirectUrl: '/admin/dashboard',
  },
  {
    user: {
      id: 'usr-std-02',
      name: 'Carlos Mendoza Ruiz',
      email: 'alumno@acervo.com',
      kind: 'NORMAL',
      category: 'STUDENT',
      status: 'ACTIVE',
      identifierCode: '2023-TI-0482',
      departmentOrCareer: 'Ingeniería en Tecnologías de la Información',
      createdAt: '2024-09-01T10:30:00Z',
    },
    passwordHash: 'Alumno1234',
    redirectUrl: '/user/home',
  },
  {
    user: {
      id: 'usr-inact-03',
      name: 'Usuario Inactivo',
      email: 'inactivo@acervo.com',
      kind: 'NORMAL',
      category: 'STUDENT',
      status: 'INACTIVE',
      identifierCode: '2023-TI-0999',
      departmentOrCareer: 'Ingeniería Mecatrónica',
      createdAt: '2024-02-10T09:00:00Z',
    },
    passwordHash: 'Inactivo1234',
    redirectUrl: '/user/home',
  },
  {
    user: {
      id: 'usr-susp-04',
      name: 'Usuario Suspendido',
      email: 'suspendido@acervo.com',
      kind: 'NORMAL',
      category: 'STUDENT',
      status: 'SUSPENDED',
      identifierCode: '2023-TI-0888',
      departmentOrCareer: 'Licenciatura en Administración',
      createdAt: '2024-03-14T14:00:00Z',
    },
    passwordHash: 'Suspendido1234',
    redirectUrl: '/user/home',
  },
];

/**
 * Authenticates user credentials against mock account database.
 */
export const authenticateMockUser = (credentials: LoginCredentials): AuthResult => {
  const normalizedEmail = credentials.email.trim().toLowerCase();
  const account = MOCK_ACCOUNTS.find(
    (acc) => acc.user.email.toLowerCase() === normalizedEmail
  );

  if (!account || account.passwordHash !== credentials.password) {
    return {
      success: false,
      error: 'El correo o la contraseña son incorrectos.',
    };
  }

  if (account.user.status === 'INACTIVE') {
    return {
      success: false,
      error: 'Tu cuenta se encuentra inactiva. Por favor contacta al administrador.',
    };
  }

  if (account.user.status === 'SUSPENDED') {
    return {
      success: false,
      error: 'Tu cuenta está suspendida por infracciones o cargos pendientes. Contacta a administración.',
    };
  }

  // Save session to localStorage
  saveMockSession(account.user, Boolean(credentials.rememberMe));

  return {
    success: true,
    user: account.user,
    redirectUrl: account.redirectUrl,
  };
};

/**
 * Local storage session helpers
 */
export const saveMockSession = (user: User, rememberMe = false): void => {
  try {
    const sessionData = {
      user,
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      rememberMe,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    // Also update acervo_current_user for backward compatibility with existing context
    localStorage.setItem('acervo_current_user', JSON.stringify(user));
    localStorage.setItem('acervo_token', sessionData.token);
  } catch (e) {
    console.error('Error saving session to localStorage:', e);
  }
};

export const getMockSession = (): User | null => {
  try {
    const saved = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed.user || null;
  } catch {
    return null;
  }
};

export const clearMockSession = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem('acervo_current_user');
  localStorage.removeItem('acervo_token');
};

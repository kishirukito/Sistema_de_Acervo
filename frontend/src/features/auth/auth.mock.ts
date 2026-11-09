import type { User, LoginCredentials, AuthResult } from './auth.types';

export const SESSION_STORAGE_KEY = 'sistema-acervo-session';

/**
 * Authenticates user credentials securely via backend FastAPI endpoint.
 * No passwords or user lists are stored or checked on the client side.
 */
export const authenticateMockUser = async (credentials: LoginCredentials): Promise<AuthResult> => {
  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
        remember_me: Boolean(credentials.rememberMe),
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errData.detail || 'El correo o la contraseña son incorrectos.',
      };
    }

    const data = await res.json();
    if (data.success && data.user) {
      saveMockSession(data.user, Boolean(credentials.rememberMe));
      return {
        success: true,
        user: data.user,
        redirectUrl: data.redirectUrl,
      };
    }

    return {
      success: false,
      error: 'Error inesperado al iniciar sesión.',
    };
  } catch (err) {
    console.error('[AuthService] Network error:', err);
    return {
      success: false,
      error: 'No se pudo conectar con el servidor de autenticación.',
    };
  }
};

/**
 * Local storage session helpers
 */
export const saveMockSession = (user: User, rememberMe = false): void => {
  try {
    const sessionData = {
      user,
      token: `secure_token_${user.id}_${Date.now()}`,
      rememberMe,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
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

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Bookmark, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../schemas/login.schema';
import { authenticateMockUser } from '../auth.mock';
import { useAuth } from '../AuthContext';

interface LoginFormProps {
  onSuccessRedirect: (url: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccessRedirect }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [forgotNotice, setForgotNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    setForgotNotice(null);

    try {
      // Simulate 500ms network delay for realistic loading feedback
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = authenticateMockUser({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (!result.success || !result.user) {
        setAuthError(result.error || 'El correo o la contraseña son incorrectos.');
        return;
      }

      // Sync with global auth context state
      await login(result.user.email);

      // Redirect based on user kind/role
      const targetUrl = result.redirectUrl || (result.user.kind === 'ADMINISTRATIVE' ? '/admin/dashboard' : '/user/home');
      onSuccessRedirect(targetUrl);
    } catch {
      setAuthError('Ocurrió un error inesperado al procesar el inicio de sesión.');
    }
  };

  const handleQuickAccess = (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
    setAuthError(null);
  };

  const handleForgotPassword = () => {
    setForgotNotice('Para recuperar tu contraseña, por favor contacta al departamento de soporte de la biblioteca.');
  };

  return (
    <div className="login-card">
      <div className="login-header-icon" aria-hidden="true">
        <Bookmark size={22} fill="#2F80ED" color="#2F80ED" />
      </div>

      <h1 className="login-title">Bienvenidos</h1>
      <p className="login-subtitle">
        Inicia sesión para acceder al sistema de biblioteca.
      </p>

      {authError && (
        <div className="login-alert-error" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{authError}</span>
        </div>
      )}

      {forgotNotice && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            lineHeight: '1.4',
          }}
          role="status"
        >
          {forgotNotice}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
        {/* Email input field */}
        <div className="login-field-group">
          <label htmlFor="login-email" className="login-label">
            Correo electrónico
          </label>
          <div className="login-input-wrapper">
            <input
              id="login-email"
              type="email"
              placeholder="correo@ejemplo.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`login-input ${errors.email ? 'login-input--error' : ''}`}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <span id="email-error" className="login-field-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password input field with visibility toggle */}
        <div className="login-field-group">
          <label htmlFor="login-password" className="login-label">
            Contraseña
          </label>
          <div className="login-input-wrapper">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`login-input ${errors.password ? 'login-input--error' : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <span id="password-error" className="login-field-error" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Checkbox and Forgot Password Link */}
        <div className="login-options-row">
          <label className="login-checkbox-label" htmlFor="login-remember">
            <input
              id="login-remember"
              type="checkbox"
              className="login-checkbox"
              {...register('rememberMe')}
            />
            <span>Recordarme</span>
          </label>

          <button
            type="button"
            className="login-forgot-link"
            onClick={handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="login-submit-btn"
        >
          {isSubmitting ? (
            <>
              <span className="login-submit-spinner" aria-hidden="true" />
              <span>Iniciando sesión...</span>
            </>
          ) : (
            <span>Iniciar sesión</span>
          )}
        </button>
      </form>

      {/* Demo Credentials Quick Fill Access */}
      <div className="login-demo-access">
        <span className="login-demo-title">Credenciales de prueba</span>
        <div className="login-demo-buttons">
          <button
            type="button"
            className="login-demo-btn"
            onClick={() => handleQuickAccess('admin@acervo.com', 'Admin1234')}
          >
            <span className="login-demo-role">🔑 Admin</span>
            <span className="login-demo-email">admin@acervo.com</span>
          </button>
          <button
            type="button"
            className="login-demo-btn"
            onClick={() => handleQuickAccess('alumno@acervo.com', 'Alumno1234')}
          >
            <span className="login-demo-role">🎓 Alumno</span>
            <span className="login-demo-email">alumno@acervo.com</span>
          </button>
        </div>
      </div>

      <footer className="login-footer">
        Sistema de gestión de acervo © 2026
      </footer>
    </div>
  );
};

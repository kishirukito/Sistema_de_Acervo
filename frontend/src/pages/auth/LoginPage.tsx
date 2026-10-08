import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Key, Mail, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Credenciales inválidas. Verifica tus datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <BookOpen size={36} className="brand-icon" />
          <h2>Sistema de Acervo CIU</h2>
          <p>Universidad Politécnica de Durango</p>
          <span className="badge-ai-sub"><Sparkles size={12} /> Búsqueda & Resúmenes con IA</span>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label><Mail size={16} /> Correo Institucional</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alumno@unipoli.edu.mx"
            />
          </div>

          <div className="form-group">
            <label><Key size={16} /> Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Iniciando sesión...' : 'Ingresar al Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};

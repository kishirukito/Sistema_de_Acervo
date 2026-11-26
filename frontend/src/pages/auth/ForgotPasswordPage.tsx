import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import '../../features/auth/login.css';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!res.ok) {
        throw new Error('No se pudo enviar la solicitud en este momento.');
      }

      setSubmitted(true);
      setCooldown(60);
    } catch {
      setError('Ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-layout">
      <section className="login-banner" aria-label="Presentación Sistema de Acervo">
        <div className="login-banner-content">
          <div className="login-illustration" aria-hidden="true">
            <svg
              width="280"
              height="180"
              viewBox="0 0 280 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="45" cy="40" r="2" fill="white" fillOpacity="0.6" />
              <circle cx="120" cy="25" r="1.5" fill="white" fillOpacity="0.5" />
              <circle cx="235" cy="45" r="2" fill="white" fillOpacity="0.6" />
              <circle cx="210" cy="15" r="1.5" fill="white" fillOpacity="0.4" />
              <rect x="40" y="140" width="200" height="8" rx="4" fill="white" fillOpacity="0.35" />
              <rect x="50" y="55" width="24" height="85" rx="3" fill="#162D4A" fillOpacity="0.8" />
              <line x1="56" y1="72" x2="68" y2="72" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <line x1="56" y1="80" x2="68" y2="80" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <rect x="77" y="68" width="22" height="72" rx="3" fill="#2C4E75" fillOpacity="0.85" />
              <line x1="82" y1="88" x2="94" y2="88" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <rect x="102" y="85" width="20" height="55" rx="3" fill="#3B679B" fillOpacity="0.9" />
              <line x1="106" y1="102" x2="118" y2="102" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <line x1="106" y1="110" x2="118" y2="110" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <rect x="132" y="48" width="100" height="92" rx="8" fill="white" fillOpacity="0.25" />
              <line x1="182" y1="52" x2="182" y2="136" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
              <line x1="142" y1="62" x2="172" y2="62" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="72" x2="172" y2="72" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="82" x2="172" y2="82" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="62" x2="222" y2="62" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="72" x2="222" y2="72" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="82" x2="222" y2="82" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="login-banner-title">Sistema de Acervo</h2>
          <p className="login-banner-description">
            Gestiona libros, usuarios, préstamos y reportes desde un solo lugar.
          </p>
        </div>
      </section>

      <main className="login-form-section">
        <div className="login-card">
          <div className="login-header-icon" aria-hidden="true">
            <Bookmark size={22} fill="#2F80ED" color="#2F80ED" />
          </div>

          <h1 className="login-title">Recuperar contraseña</h1>
          <p className="login-subtitle">
            Ingresa tu correo institucional y notificaremos al administrador de la biblioteca para ayudarte a restablecer tu acceso.
          </p>

          {error && (
            <div className="login-alert-error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {submitted && (
            <div
              role="status"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                padding: '0.875rem 1rem',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '0.5rem',
                color: '#065F46',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                lineHeight: 1.45,
              }}
            >
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Si el correo está registrado, hemos notificado al administrador de tu solicitud. Acude a la biblioteca o espera asistencia del administrador.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="login-field-group">
              <label htmlFor="forgot-email" className="login-label">
                Correo electrónico
              </label>
              <div className="login-input-wrapper">
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@upd.edu.mx"
                  className="login-input"
                  autoComplete="email"
                  disabled={loading}
                  required
                />
                <span className="login-input-icon" aria-hidden="true" style={{ right: '0.875rem', pointerEvents: 'none' }}>
                  <Mail size={16} color="#9CA3AF" />
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cooldown > 0}
              className="login-submit-btn"
            >
              {loading ? (
                <>
                  <span className="login-submit-spinner" aria-hidden="true" />
                  <span>Enviando solicitud...</span>
                </>
              ) : cooldown > 0 ? (
                <span>Reintentar en {cooldown}s</span>
              ) : (
                <span>Solicitar restablecimiento</span>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link
              to="/login"
              className="login-forgot-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}
            >
              <ArrowLeft size={15} />
              <span>Volver al inicio de sesión</span>
            </Link>
          </div>

          <footer className="login-footer">
            Sistema de gestión de acervo © 2026
          </footer>
        </div>
      </main>
    </div>
  );
};

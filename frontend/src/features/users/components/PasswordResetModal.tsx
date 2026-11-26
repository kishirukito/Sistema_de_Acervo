import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, AlertTriangle, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import type { ManagedUser } from '../users.types';
import './PasswordResetModal.css';

export interface PasswordResetModalProps {
  user: ManagedUser | null;
  onClose: () => void;
  onRequestHandled?: (userId: string) => void;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  user,
  onClose,
  onRequestHandled,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  // Limpiar estado al abrir o cambiar de usuario
  useEffect(() => {
    setLoading(false);
    setError(null);
    setTempPassword(null);
    setCopied(false);
    setShowPassword(true);
  }, [user?.id]);

  if (!user) return null;

  const handleGenerateTempPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('acervo_token');
      const res = await fetch(`/api/v1/data/usuarios/${encodeURIComponent(user.id)}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || 'No se pudo restablecer la contraseña.');
      }

      setTempPassword(data.temp_password);
      onRequestHandled?.(user.id);
    } catch (err: any) {
      setError(err?.message || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  // "Marcar como atendida" / "Cancelar con acción" — borra la solicitud pendiente
  const handleMarkHandledAndClose = async () => {
    try {
      const token = localStorage.getItem('acervo_token');
      await fetch(`/api/v1/auth/forgot-password/pending/${encodeURIComponent(user.id)}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      onRequestHandled?.(user.id);
    } catch {
      // Ignorar si ya fue eliminada
    } finally {
      setTempPassword(null);
      onClose();
    }
  };

  const handleCopy = async () => {
    if (!tempPassword) return;
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso
    }
  };

  return (
    <Modal
      open={Boolean(user)}
      onClose={onClose}
      size="medium"
      role="dialog"
      closeOnBackdrop={!loading}
      closeOnEscape={!loading}
      title="Restablecer contraseña"
      description="Asistencia administrativa para acceso de usuario."
      icon={
        <div className="password-reset-icon-wrapper" aria-hidden="true">
          <KeyRound size={20} />
        </div>
      }
      closeButtonAriaLabel="Cerrar ventana de restablecimiento"
      footer={
        <div className="password-reset-modal-footer">
          <Button
            type="button"
            variant="outline"
            onClick={tempPassword ? onClose : handleMarkHandledAndClose}
            disabled={loading}
          >
            {tempPassword ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!tempPassword && (
            <Button
              type="button"
              variant="primary"
              leftIcon={<KeyRound size={16} />}
              onClick={handleGenerateTempPassword}
              disabled={loading}
            >
              {loading ? 'Generando...' : 'Generar contraseña'}
            </Button>
          )}
        </div>
      }
    >
      <div className="password-reset-modal-content">
        <div className="password-reset-user-box">
          <div className="password-reset-user-name">{user.fullName}</div>
          <div className="password-reset-user-email">
            {user.email || 'Sin correo registrado'} • {user.borrowerCode}
          </div>
        </div>

        <div className="password-reset-security-note" role="note">
          <ShieldAlert size={16} aria-hidden="true" />
          <span>
            Por seguridad, las contraseñas no pueden consultarse; solo restablecerse.
          </span>
        </div>

        {!user.email && (
          <div className="password-reset-warning" role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>
              Este usuario no tiene correo registrado. Puedes generar una contraseña temporal y entregársela directamente.
            </span>
          </div>
        )}

        {error && (
          <div className="password-reset-error" role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {tempPassword && (
          <div className="password-reset-result">
            <div className="password-reset-result-header">
              <label className="password-reset-result-label">
                Contraseña temporal generada:
              </label>
              <button
                type="button"
                className="password-reset-toggle-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                title={showPassword ? 'Ocultar' : 'Mostrar'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                <span>{showPassword ? 'Ocultar' : 'Mostrar'}</span>
              </button>
            </div>
            <div className="password-reset-copy-row">
              <code className="password-reset-code">
                {showPassword ? tempPassword : '•'.repeat(tempPassword.length)}
              </code>
              <button
                type="button"
                className="password-reset-copy-btn"
                onClick={handleCopy}
                aria-label="Copiar contraseña temporal"
                title="Copiar contraseña"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copiada' : 'Copiar'}</span>
              </button>
            </div>
            <p className="password-reset-once-warning">
              ⚠ Esta contraseña se mostrará una sola vez. Ciérrala cuando la hayas compartido con el usuario.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

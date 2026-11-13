import React, { useState } from 'react';
import { Info, Lock, Eye, EyeOff } from 'lucide-react';
import type { PasswordFormErrors } from '../profile.types';

interface SecurityCardProps {
  onPasswordUpdated: () => void;
  userId?: string;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({ onPasswordUpdated }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<PasswordFormErrors>({});

  const validate = (): boolean => {
    const newErrors: PasswordFormErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Debes ingresar tu contraseña actual';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Ingresa una nueva contraseña';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la nueva contraseña';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('acervo_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch('/api/v1/auth/password', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        let msg = 'Error al actualizar la contraseña.';
        try {
          const data = await res.json();
          if (data.detail) msg = data.detail;
        } catch {}
        setServerError(msg);
        return;
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      onPasswordUpdated();
    } catch (err: any) {
      setServerError(err.message || 'Error de conexión al actualizar contraseña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Seguridad</h3>

      {/* Info Alert Banner */}
      <div className="profile-info-banner" role="status">
        <Info size={16} className="profile-info-banner-icon" />
        <p className="profile-info-banner-text">
          Para cambiar tu contraseña, confirma primero tu contraseña actual.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="profile-security-stack">
          {/* Contraseña Actual */}
          <div className="profile-field-group">
            <label htmlFor="sec-current-pwd" className="profile-field-label">
              CONTRASEÑA ACTUAL
            </label>
            <div className="profile-input-wrapper">
              <input
                id="sec-current-pwd"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Tu contraseña actual"
                className={`profile-input-field ${
                  errors.currentPassword ? 'profile-input-field--error' : ''
                }`}
              />
              <button
                type="button"
                className="profile-input-eye-btn"
                onClick={() => setShowCurrent((prev) => !prev)}
                aria-label={showCurrent ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showCurrent ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="profile-field-error" role="alert">
                {errors.currentPassword}
              </span>
            )}
          </div>

          {/* Nueva Contraseña */}
          <div className="profile-field-group">
            <label htmlFor="sec-new-pwd" className="profile-field-label">
              NUEVA CONTRASEÑA
            </label>
            <div className="profile-input-wrapper">
              <input
                id="sec-new-pwd"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className={`profile-input-field ${
                  errors.newPassword ? 'profile-input-field--error' : ''
                }`}
              />
              <button
                type="button"
                className="profile-input-eye-btn"
                onClick={() => setShowNew((prev) => !prev)}
                aria-label={showNew ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showNew ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.newPassword && (
              <span className="profile-field-error" role="alert">
                {errors.newPassword}
              </span>
            )}
          </div>

          {/* Confirmar Nueva Contraseña */}
          <div className="profile-field-group">
            <label htmlFor="sec-confirm-pwd" className="profile-field-label">
              CONFIRMAR NUEVA CONTRASEÑA
            </label>
            <div className="profile-input-wrapper">
              <input
                id="sec-confirm-pwd"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la nueva contraseña"
                className={`profile-input-field ${
                  errors.confirmPassword ? 'profile-input-field--error' : ''
                }`}
              />
              <button
                type="button"
                className="profile-input-eye-btn"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="profile-field-error" role="alert">
                {errors.confirmPassword}
              </span>
            )}
            <p className="profile-field-helper">
              Usa una contraseña segura de al menos 8 caracteres.
            </p>
          </div>
        </div>

        {/* Action Button */}
        {serverError && (
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              color: '#b91c1c',
              fontSize: '0.85rem',
              marginBottom: '12px',
            }}
            role="alert"
          >
            {serverError}
          </div>
        )}

        <div className="profile-actions-row">
          <button type="submit" className="profile-btn-dark" disabled={isSubmitting}>
            <Lock size={15} />
            <span>{isSubmitting ? 'Actualizando...' : 'Actualizar contraseña'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

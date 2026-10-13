import React, { useState } from 'react';
import { Info, Lock, Eye, EyeOff } from 'lucide-react';
import type { PasswordFormErrors } from '../profile.types';

interface SecurityCardProps {
  onPasswordUpdated: () => void;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({ onPasswordUpdated }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate password change success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    onPasswordUpdated();
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
        <div className="profile-actions-row">
          <button type="submit" className="profile-btn-dark">
            <Lock size={15} />
            <span>Actualizar contraseña</span>
          </button>
        </div>
      </form>
    </div>
  );
};

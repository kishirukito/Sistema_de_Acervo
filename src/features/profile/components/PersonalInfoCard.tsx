import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import type { UserProfileData, ProfileFormErrors } from '../profile.types';

interface PersonalInfoCardProps {
  profile: UserProfileData;
  onSave: (updatedData: Partial<UserProfileData>) => void;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  profile,
  onSave,
}) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const validate = (): boolean => {
    const newErrors: ProfileFormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'El nombre completo es obligatorio';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Ingresa un formato de correo válido';
    }

    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Información personal</h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="profile-form-grid">
          {/* Nombre Completo */}
          <div className="profile-field-group">
            <label htmlFor="profile-fullname" className="profile-field-label">
              NOMBRE COMPLETO
            </label>
            <div className="profile-input-wrapper">
              <input
                id="profile-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`profile-input-field ${
                  errors.fullName ? 'profile-input-field--error' : ''
                }`}
                placeholder="Nombre completo"
              />
            </div>
            {errors.fullName && (
              <span className="profile-field-error" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="profile-field-group">
            <label htmlFor="profile-email" className="profile-field-label">
              CORREO ELECTRÓNICO
            </label>
            <div className="profile-input-wrapper">
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`profile-input-field ${
                  errors.email ? 'profile-input-field--error' : ''
                }`}
                placeholder="correo@ejemplo.com"
              />
            </div>
            {errors.email && (
              <span className="profile-field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div className="profile-field-group">
            <label htmlFor="profile-phone" className="profile-field-label">
              TELÉFONO
            </label>
            <div className="profile-input-wrapper">
              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`profile-input-field ${
                  errors.phone ? 'profile-input-field--error' : ''
                }`}
                placeholder="493 000 0000"
              />
            </div>
            {errors.phone && (
              <span className="profile-field-error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Rol (Deshabilitado / Readonly) */}
          <div className="profile-field-group">
            <label htmlFor="profile-role" className="profile-field-label">
              ROL
            </label>
            <div className="profile-input-wrapper">
              <input
                id="profile-role"
                type="text"
                value={profile.role}
                disabled
                readOnly
                className="profile-input-field profile-input-field--disabled"
              />
              <span className="profile-input-lock-icon" aria-hidden="true">
                <Lock size={15} />
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="profile-actions-row">
          <button type="submit" className="profile-btn-primary">
            <Check size={16} />
            <span>Guardar cambios</span>
          </button>
        </div>
      </form>
    </div>
  );
};

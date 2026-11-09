import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import type { UserProfileData } from '../profile.types';

interface ProfileIdentityCardProps {
  profile: UserProfileData;
  onAvatarChange: (newAvatarUrl: string) => void;
}

export const ProfileIdentityCard: React.FC<ProfileIdentityCardProps> = ({
  profile,
  onAvatarChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAvatarChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-card profile-identity-card">
      <div className="profile-identity-left">
        {/* Avatar circle */}
        <div className="profile-avatar-circle" aria-label={`Avatar de ${profile.fullName}`}>
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="profile-avatar-img"
            />
          ) : (
            <span>{profile.initials || 'CF'}</span>
          )}
        </div>

        {/* User identification */}
        <div className="profile-identity-meta">
          <h2 className="profile-identity-name">{profile.fullName}</h2>
          <p className="profile-identity-email">{profile.email}</p>
          <div className="profile-role-pill">{profile.role}</div>
        </div>
      </div>

      {/* Change photo button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-label="Cargar nueva foto de perfil"
        />
        <button
          type="button"
          onClick={handlePhotoClick}
          className="profile-change-photo-btn"
          aria-label="Cambiar foto de perfil"
        >
          <ImageIcon size={15} />
          <span>Cambiar foto</span>
        </button>
      </div>
    </div>
  );
};

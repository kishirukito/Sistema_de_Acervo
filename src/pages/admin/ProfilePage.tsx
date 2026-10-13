import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import {
  getStoredProfile,
  saveStoredProfile,
} from '../../features/profile/profile.mock';
import type { UserProfileData } from '../../features/profile/profile.types';
import { ProfileIdentityCard } from '../../features/profile/components/ProfileIdentityCard';
import { PersonalInfoCard } from '../../features/profile/components/PersonalInfoCard';
import { SecurityCard } from '../../features/profile/components/SecurityCard';
import { SessionCard } from '../../features/profile/components/SessionCard';
import '../../features/profile/profile.css';

export const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfileData>(() => getStoredProfile());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleSavePersonalInfo = (updatedData: Partial<UserProfileData>) => {
    // Generate initials from name if changed
    let initials = profile.initials;
    if (updatedData.fullName) {
      const parts = updatedData.fullName.trim().split(/\s+/);
      initials = parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0]?.slice(0, 2).toUpperCase() || 'CF';
    }

    const newProfile: UserProfileData = {
      ...profile,
      ...updatedData,
      initials,
    };

    setProfile(newProfile);
    saveStoredProfile(newProfile);
    showToast('Información personal guardada correctamente');
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    const newProfile: UserProfileData = {
      ...profile,
      avatarUrl: newAvatarUrl,
    };
    setProfile(newProfile);
    saveStoredProfile(newProfile);
    showToast('Foto de perfil actualizada correctamente');
  };

  const handlePasswordUpdated = () => {
    showToast('Contraseña actualizada correctamente');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page-container">
      {/* Page Header matching Figma */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">Mi perfil</h1>
        <p className="profile-page-subtitle">
          Consulta y actualiza tu información personal y la seguridad de tu cuenta.
        </p>
      </div>

      {/* Card 1: Identity & Avatar */}
      <ProfileIdentityCard
        profile={profile}
        onAvatarChange={handleAvatarChange}
      />

      {/* Card 2: Información Personal */}
      <PersonalInfoCard
        profile={profile}
        onSave={handleSavePersonalInfo}
      />

      {/* Card 3: Seguridad */}
      <SecurityCard
        onPasswordUpdated={handlePasswordUpdated}
      />

      {/* Card 4: Sesión */}
      <SessionCard
        onLogout={handleLogout}
      />

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="profile-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="#22C55E" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import type { UserProfileData } from '../../features/profile/profile.types';
import { ProfileIdentityCard } from '../../features/profile/components/ProfileIdentityCard';
import { PersonalInfoCard } from '../../features/profile/components/PersonalInfoCard';
import { SecurityCard } from '../../features/profile/components/SecurityCard';
import { SessionCard } from '../../features/profile/components/SessionCard';
import '../../features/profile/profile.css';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return (name.slice(0, 2) || 'AG').toUpperCase();
}

export const ProfilePage: React.FC = () => {
  const { user, updateCurrentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Inicializar estado usando los datos reales de useAuth / localStorage
  const [profile, setProfile] = useState<UserProfileData>(() => {
    const name = user?.name || 'Administrador General';
    const email = user?.email || 'admin@upd.edu.mx';
    const phone = (user as any)?.phone || '';
    const role = (user as any)?.role === 'ADMIN' ? 'Administrador' : (user?.kind === 'ADMINISTRATIVE' ? 'Administrativo' : 'Lector');
    return {
      id: user?.id || '',
      fullName: name,
      email: email,
      phone: phone,
      role: role,
      initials: getInitials(name),
      avatarUrl: (user as any)?.avatarUrl,
      createdAt: (user as any)?.createdAt,
    };
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Sincronizar y consultar datos reales del backend al montar
  useEffect(() => {
    if (!user?.id) return;
    const fetchFreshUser = async () => {
      try {
        const token = localStorage.getItem('acervo_token');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const res = await fetch(`/api/v1/data/usuarios/${encodeURIComponent(user.id)}`, { headers });
        if (res.ok) {
          const fresh = await res.json();
          const freshName = fresh.nombre_completo || user.name || 'Administrador General';
          const freshEmail = fresh.email || user.email || 'admin@upd.edu.mx';
          const freshPhone = fresh.telefono || (user as any)?.phone || '';
          const freshRole = fresh.rol === 'admin' ? 'Administrador' : (fresh.rol === 'personal' ? 'Bibliotecario' : 'Lector');

          setProfile((prev) => ({
            ...prev,
            id: fresh.id,
            fullName: freshName,
            email: freshEmail,
            phone: freshPhone,
            role: freshRole,
            initials: getInitials(freshName),
            avatarUrl: fresh.avatar_url || prev.avatarUrl,
            createdAt: fresh.created_at || prev.createdAt,
          }));

          updateCurrentUser({
            name: freshName,
            email: freshEmail,
            phone: freshPhone,
          } as any);
        }
      } catch (err) {
        console.warn('[ProfilePage] Error fetching fresh user:', err);
      }
    };

    fetchFreshUser();
  }, [user?.id]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message: string, isError = false) => {
    setToastMessage({ text: message, isError });
  };

  const handleSavePersonalInfo = async (updatedData: Partial<UserProfileData>) => {
    const newName = updatedData.fullName || profile.fullName;
    const newEmail = updatedData.email || profile.email;
    const newPhone = updatedData.phone !== undefined ? updatedData.phone : profile.phone;
    const newInitials = getInitials(newName);

    // 1. Guardar en backend (Supabase)
    const targetId = user?.id || profile.id;
    if (targetId) {
      try {
        const token = localStorage.getItem('acervo_token');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const res = await fetch(`/api/v1/data/usuarios/${encodeURIComponent(targetId)}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            nombre_completo: newName,
            email: newEmail,
            telefono: newPhone,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          showToast(errData.detail || 'Error al guardar los cambios en la base de datos.', true);
          return;
        }
      } catch (err: any) {
        showToast(err.message || 'Error de conexión con el servidor.', true);
        return;
      }
    }

    // 2. Actualizar estado local y AuthContext
    const newProfile: UserProfileData = {
      ...profile,
      ...updatedData,
      fullName: newName,
      email: newEmail,
      phone: newPhone,
      initials: newInitials,
    };

    setProfile(newProfile);
    updateCurrentUser({
      name: newName,
      email: newEmail,
      phone: newPhone,
    } as any);

    showToast('Información personal guardada correctamente en el sistema');
  };

  const handleAvatarChange = async (newAvatarUrl: string) => {
    const targetId = user?.id || profile.id;
    if (targetId) {
      try {
        const token = localStorage.getItem('acervo_token');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        await fetch(`/api/v1/data/usuarios/${encodeURIComponent(targetId)}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ avatar_url: newAvatarUrl }),
        });
      } catch {}
    }

    const newProfile: UserProfileData = {
      ...profile,
      avatarUrl: newAvatarUrl,
    };
    setProfile(newProfile);
    updateCurrentUser({ avatarUrl: newAvatarUrl } as any);
    showToast('Foto de perfil actualizada correctamente');
  };

  const handlePasswordUpdated = () => {
    showToast('Contraseña actualizada correctamente en la base de datos');
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
        userId={profile.id}
        onPasswordUpdated={handlePasswordUpdated}
      />

      {/* Card 4: Sesión */}
      <SessionCard
        onLogout={handleLogout}
      />

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div
          className="profile-toast"
          style={{
            borderColor: toastMessage.isError ? '#fca5a5' : '#86efac',
            backgroundColor: toastMessage.isError ? '#fef2f2' : '#f0fdf4',
          }}
          role="status"
          aria-live="polite"
        >
          {toastMessage.isError ? (
            <AlertCircle size={18} color="#EF4444" />
          ) : (
            <CheckCircle2 size={18} color="#22C55E" />
          )}
          <span style={{ color: toastMessage.isError ? '#991b1b' : '#166534' }}>
            {toastMessage.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

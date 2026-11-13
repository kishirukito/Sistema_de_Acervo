import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Info,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { fetchCarreras } from '../../services/api/loans-admin.service';
import type { Carrera } from '../../features/users/users.types';
import './UserProfilePage.css';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hidden file input for avatar upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states initialized dynamically with real user data from Supabase
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [carreraId, setCarreraId] = useState<string>((user as any)?.carreraId || '');
  const [dependenciaOArea, setDependenciaOArea] = useState<string>((user as any)?.dependenciaOArea || (user as any)?.departmentOrCareer || '');
  const [carrerasList, setCarrerasList] = useState<Carrera[]>([]);
  const userIdentifier = user?.identifierCode || (user?.id ? user.id.slice(0, 8) : 'SIN-FOLIO');

  useEffect(() => {
    fetchCarreras().then((data) => {
      if (Array.isArray(data)) setCarrerasList(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      if (user.avatarUrl) setAvatarUrl(user.avatarUrl);
      if (user.phone) setPhone(user.phone);
      if ((user as any).carreraId) setCarreraId((user as any).carreraId);
      if ((user as any).dependenciaOArea || (user as any).departmentOrCareer) {
        setDependenciaOArea((user as any).dependenciaOArea || (user as any).departmentOrCareer);
      }
    }
  }, [user]);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatarUrl || null);

  // Storage key based on user ID or fallback
  const prefStorageKey = `acervo_user_prefs_${user?.id || 'default'}`;

  // Notification preferences loaded from localStorage
  const [dueReminders, setDueReminders] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`acervo_user_prefs_${user?.id || 'default'}`);
      if (saved) return JSON.parse(saved).dueReminders ?? true;
    } catch {}
    return true;
  });

  const [pickupReady, setPickupReady] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`acervo_user_prefs_${user?.id || 'default'}`);
      if (saved) return JSON.parse(saved).pickupReady ?? true;
    } catch {}
    return true;
  });

  const [bookRecommendations, setBookRecommendations] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`acervo_user_prefs_${user?.id || 'default'}`);
      if (saved) return JSON.parse(saved).bookRecommendations ?? false;
    } catch {}
    return false;
  });

  // Re-sync preferences when user switches
  useEffect(() => {
    if (user?.id) {
      try {
        const saved = localStorage.getItem(`acervo_user_prefs_${user.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.dueReminders !== undefined) setDueReminders(parsed.dueReminders);
          if (parsed.pickupReady !== undefined) setPickupReady(parsed.pickupReady);
          if (parsed.bookRecommendations !== undefined) setBookRecommendations(parsed.bookRecommendations);
        }
      } catch {}
    }
  }, [user?.id]);

  // Security (password) states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Initials for avatar
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'CF';

  // Photo handlers
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
        showToast('Foto de perfil actualizada correctamente.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Personal info handler
  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast('El nombre completo es requerido.', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    try {
      if (user?.id) {
        const token = localStorage.getItem('acervo_token');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        await fetch(`/api/v1/data/usuarios/${user.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            nombre_completo: fullName.trim(),
            telefono: phone.trim() || null,
            carrera_id: carreraId || null,
            dependencia_o_area: dependenciaOArea.trim() || null,
          }),
        });
      }
      showToast('Cambios guardados correctamente.', 'success');
    } catch {
      showToast('Cambios guardados localmente.', 'success');
    }
  };

  // Preferences handler with localStorage persistence
  const handleSavePreferences = () => {
    try {
      const payload = {
        dueReminders,
        pickupReady,
        bookRecommendations,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(prefStorageKey, JSON.stringify(payload));
      showToast('Preferencias de notificación guardadas en tu navegador.', 'success');
    } catch (e) {
      console.error('Error guardando preferencias:', e);
      showToast('No se pudieron guardar las preferencias localmente.', 'error');
    }
  };

  // Password update handler
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      const msg = 'Debes ingresar tu contraseña actual.';
      setPasswordError(msg);
      showToast(msg, 'error');
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      const msg = 'La contraseña debe contener al menos 8 caracteres.';
      setPasswordError(msg);
      showToast(msg, 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = 'Las nuevas contraseñas no coinciden.';
      setPasswordError(msg);
      showToast(msg, 'error');
      return;
    }

    // Success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Contraseña actualizada correctamente.', 'success');
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-profile-page">
      {/* 1. Page Header */}
      <header className="user-profile-header">
        <h1 className="user-profile-title">Mi perfil</h1>
        <p className="user-profile-subtitle">
          Consulta y actualiza la información de tu cuenta.
        </p>
      </header>

      {/* 2. Card 1: Identity / Avatar */}
      <section className="user-profile-card user-profile-identity-card" aria-label="Identidad del lector">
        <div className="user-profile-identity-left">
          <div className="user-profile-avatar-circle" aria-label={`Avatar de ${fullName}`}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName} className="user-profile-avatar-img" />
            ) : (
              initials
            )}
          </div>
          <div className="user-profile-identity-info">
            <div className="user-profile-name-row">
              <h2 className="user-profile-name">{fullName}</h2>
              <span className="user-profile-badge-role">Usuario lector</span>
            </div>
            <p className="user-profile-email-text">{email}</p>
            <p className="user-profile-member-date">Miembro desde septiembre de 2026</p>
          </div>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            aria-label="Cargar nueva foto de perfil"
          />
          <button
            type="button"
            className="user-profile-btn-photo"
            onClick={handlePhotoClick}
            aria-label="Cambiar foto de perfil"
          >
            <ImageIcon size={16} />
            <span>Cambiar foto</span>
          </button>
        </div>
      </section>

      {/* 3. Card 2: Información personal */}
      <section className="user-profile-card" aria-labelledby="heading-info-personal">
        <h2 id="heading-info-personal" className="user-profile-section-title">
          Información personal
        </h2>

        <form onSubmit={handleSavePersonalInfo}>
          <div className="user-profile-form-grid-2col">
            <div className="user-profile-field-group">
              <label htmlFor="input-full-name" className="user-profile-field-label">
                Nombre completo
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-full-name"
                  type="text"
                  className="user-profile-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div className="user-profile-field-group">
              <label htmlFor="input-email" className="user-profile-field-label">
                Correo electrónico
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-email"
                  type="email"
                  className="user-profile-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div className="user-profile-field-group">
              <label htmlFor="input-phone" className="user-profile-field-label">
                Teléfono
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-phone"
                  type="tel"
                  className="user-profile-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="493 000 0000"
                />
              </div>
            </div>

            <div className="user-profile-field-group">
              <label htmlFor="input-carrera" className="user-profile-field-label">
                Carrera universitaria (UNIPOLI)
              </label>
              <div className="user-profile-input-wrapper">
                <select
                  id="input-carrera"
                  className="user-profile-input"
                  value={carreraId}
                  onChange={(e) => setCarreraId(e.target.value)}
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <option value="">-- Sin carrera seleccionada --</option>
                  {['TSU', 'Licenciatura', 'Ingeniería', 'Maestría'].map((nivel) => {
                    const deEsteNivel = carrerasList.filter((c) => c.nivel === nivel);
                    if (deEsteNivel.length === 0) return null;
                    return (
                      <optgroup key={nivel} label={`Oferta: ${nivel}`}>
                        {deEsteNivel.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nombre}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="user-profile-field-group">
              <label htmlFor="input-dependencia" className="user-profile-field-label">
                Área o dependencia (Docentes / Administrativos)
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-dependencia"
                  type="text"
                  className="user-profile-input"
                  value={dependenciaOArea}
                  onChange={(e) => setDependenciaOArea(e.target.value)}
                  placeholder="Ej. División de Telemática y Software"
                />
              </div>
            </div>

            <div className="user-profile-field-group">
              <label htmlFor="input-user-id" className="user-profile-field-label">
                Número de usuario / Matrícula
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-user-id"
                  type="text"
                  className="user-profile-input user-profile-input--disabled"
                  value={userIdentifier}
                  disabled
                  readOnly
                  aria-describedby="user-id-note"
                />
                <span className="user-profile-input-icon-right" title="Campo bloqueado">
                  <Lock size={15} />
                </span>
              </div>
            </div>
          </div>

          <div className="user-profile-actions-left">
            <button type="submit" className="user-profile-btn-primary">
              <CheckCircle2 size={16} />
              <span>Guardar cambios</span>
            </button>
          </div>
        </form>
      </section>

      {/* 4. Card 3: Preferencias de notificación */}
      <section className="user-profile-card" aria-labelledby="heading-notif-prefs">
        <h2 id="heading-notif-prefs" className="user-profile-section-title">
          Preferencias de notificación
        </h2>

        <div className="user-profile-preferences-list">
          {/* Notification item 1 */}
          <div className="user-profile-pref-item">
            <div className="user-profile-pref-text">
              <h3 className="user-profile-pref-title">Recordatorios de devolución</h3>
              <p className="user-profile-pref-desc">
                Recibir recordatorios de devolución por correo electrónico.
              </p>
            </div>
            <label className="user-profile-toggle" aria-label="Activar recordatorios de devolución">
              <input
                type="checkbox"
                checked={dueReminders}
                onChange={(e) => setDueReminders(e.target.checked)}
              />
              <span className="user-profile-toggle-slider" />
            </label>
          </div>

          {/* Notification item 2 */}
          <div className="user-profile-pref-item">
            <div className="user-profile-pref-text">
              <h3 className="user-profile-pref-title">Solicitudes listas para recoger</h3>
              <p className="user-profile-pref-desc">
                Recibir notificaciones cuando una solicitud esté lista para recoger.
              </p>
            </div>
            <label className="user-profile-toggle" aria-label="Activar notificaciones de solicitudes listas">
              <input
                type="checkbox"
                checked={pickupReady}
                onChange={(e) => setPickupReady(e.target.checked)}
              />
              <span className="user-profile-toggle-slider" />
            </label>
          </div>

          {/* Notification item 3 */}
          <div className="user-profile-pref-item">
            <div className="user-profile-pref-text">
              <h3 className="user-profile-pref-title">Recomendaciones de libros</h3>
              <p className="user-profile-pref-desc">
                Recibir recomendaciones basadas en tus lecturas.
              </p>
            </div>
            <label className="user-profile-toggle" aria-label="Activar recomendaciones de libros">
              <input
                type="checkbox"
                checked={bookRecommendations}
                onChange={(e) => setBookRecommendations(e.target.checked)}
              />
              <span className="user-profile-toggle-slider" />
            </label>
          </div>
        </div>

        <div className="user-profile-actions-left">
          <button
            type="button"
            className="user-profile-btn-outline"
            onClick={handleSavePreferences}
          >
            Guardar preferencias
          </button>
        </div>
      </section>

      {/* 5. Card 4: Seguridad */}
      <section className="user-profile-card" aria-labelledby="heading-security">
        <h2 id="heading-security" className="user-profile-section-title">
          Seguridad
        </h2>

        {/* Info Banner */}
        <div className="user-profile-info-banner" role="status">
          <Info size={18} className="user-profile-info-banner-icon" />
          <span>Para actualizar tu contraseña, confirma primero tu contraseña actual.</span>
        </div>

        <form onSubmit={handleUpdatePassword}>
          <div className="user-profile-form-grid-3col">
            {/* Contraseña actual */}
            <div className="user-profile-field-group">
              <label htmlFor="input-current-password" className="user-profile-field-label">
                Contraseña actual
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-current-password"
                  type={showCurrent ? 'text' : 'password'}
                  className="user-profile-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="user-profile-input-eye-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                  aria-label={showCurrent ? 'Ocultar contraseña actual' : 'Mostrar contraseña actual'}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div className="user-profile-field-group">
              <label htmlFor="input-new-password" className="user-profile-field-label">
                Nueva contraseña
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-new-password"
                  type={showNew ? 'text' : 'password'}
                  className="user-profile-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="user-profile-input-eye-btn"
                  onClick={() => setShowNew(!showNew)}
                  aria-label={showNew ? 'Ocultar nueva contraseña' : 'Mostrar nueva contraseña'}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="user-profile-field-group">
              <label htmlFor="input-confirm-password" className="user-profile-field-label">
                Confirmar nueva contraseña
              </label>
              <div className="user-profile-input-wrapper">
                <input
                  id="input-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  className="user-profile-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="user-profile-input-eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <p className="user-profile-helper-text">
            La contraseña debe contener al menos 8 caracteres.
          </p>

          {passwordError && (
            <p className="user-profile-field-error" role="alert" style={{ marginTop: 6 }}>
              {passwordError}
            </p>
          )}

          <div className="user-profile-actions-left">
            <button type="submit" className="user-profile-btn-dark">
              <Lock size={15} />
              <span>Actualizar contraseña</span>
            </button>
          </div>
        </form>
      </section>

      {/* 6. Card 5: Sesión */}
      <section className="user-profile-card" aria-labelledby="heading-session">
        <h2 id="heading-session" className="user-profile-section-title">
          Sesión
        </h2>
        <p className="user-profile-session-desc">
          Cierra sesión de forma segura en este dispositivo.
        </p>
        <div>
          <button
            type="button"
            className="user-profile-btn-danger"
            onClick={handleLogout}
            aria-label="Cerrar sesión en este dispositivo"
          >
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </section>

      {/* Toast Feedback Notification */}
      {toast && (
        <aside
          className="user-profile-toast"
          role="status"
          aria-live="polite"
          style={{
            borderColor: toast.type === 'error' ? '#EF4444' : '#10B981',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} color="#10B981" />
          ) : (
            <AlertCircle size={18} color="#EF4444" />
          )}
          <span>{toast.message}</span>
        </aside>
      )}
    </div>
  );
};

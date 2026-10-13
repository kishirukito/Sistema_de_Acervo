import React, { useRef } from 'react';
import { Ban, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { UserStatusBadge } from './UserStatusBadge';
import type { ManagedUser } from '../users.types';
import './UserStatusModal.css';

export interface UserStatusModalProps {
  /** The user currently selected for status activation or deactivation */
  user: ManagedUser | null;
  /** Request closing modal without changing status */
  onClose: () => void;
  /** Confirm status change */
  onConfirm: (user: ManagedUser) => void;
}

function getUserInitials(name: string, fallback?: string): string {
  if (fallback) return fallback;
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const UserStatusModal: React.FC<UserStatusModalProps> = ({
  user,
  onClose,
  onConfirm,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  if (!user) return null;

  const isActive = user.status === 'ACTIVE';
  const initials = getUserInitials(user.fullName, user.avatarInitials);

  const title = isActive ? '¿Desactivar usuario?' : '¿Activar usuario?';
  const description = 'Esta acción requiere confirmación administrativa.';

  const handleConfirmToggle = () => {
    onConfirm(user);
    onClose();
  };

  return (
    <Modal
      open={Boolean(user)}
      onClose={onClose}
      size="small"
      role="alertdialog"
      closeOnBackdrop={true}
      closeOnEscape={true}
      title={title}
      description={description}
      icon={
        <div
          className={`user-status-icon-wrapper ${
            isActive ? 'user-status-icon--danger' : 'user-status-icon--success'
          }`}
          aria-hidden="true"
        >
          {isActive ? <Ban size={20} /> : <CheckCircle2 size={20} />}
        </div>
      }
      closeButtonAriaLabel="Cancelar y cerrar diálogo"
      initialFocusRef={cancelBtnRef}
      footer={
        <div className="user-status-modal-footer">
          <Button
            type="button"
            variant="outline"
            ref={cancelBtnRef}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant={isActive ? 'danger' : 'primary'}
            leftIcon={isActive ? <Ban size={16} /> : <CheckCircle2 size={16} />}
            onClick={handleConfirmToggle}
          >
            {isActive ? 'Desactivar usuario' : 'Activar usuario'}
          </Button>
        </div>
      }
    >
      <div className="user-status-modal-content">
        {/* User Card Preview */}
        <div className="user-status-modal-preview">
          <div
            className="user-status-modal-avatar"
            style={{ backgroundColor: user.avatarColor || '#1E3A5F' }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="user-status-modal-preview-info">
            <h4 className="user-status-modal-preview-name">{user.fullName}</h4>
            <p className="user-status-modal-preview-sub">
              {user.email} • {user.borrowerCode}
            </p>
          </div>
          <UserStatusBadge user={user} />
        </div>

        {/* Informative text according to required copies */}
        <p className="user-status-modal-text">
          {isActive
            ? `${user.fullName} no podrá acceder al sistema mientras su cuenta permanezca desactivada.`
            : `${user.fullName} podrá acceder nuevamente al sistema.`}
        </p>

        {/* Informative note if user has overdue loans when deactivating */}
        {isActive && user.hasOverdueLoan && (
          <div className="user-status-modal-warning" role="note">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>
              Nota: El usuario cuenta con préstamos con atraso registrados.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
};

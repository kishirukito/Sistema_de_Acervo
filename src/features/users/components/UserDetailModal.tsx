import React, { useRef, useMemo } from 'react';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  Calendar,
  BookOpen,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Hash,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { UserTypeBadge } from './UserTypeBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { MOCK_LOANS } from '../../loans/loans.mock';
import type { ManagedUser } from '../users.types';
import type { Loan } from '../../loans/loans.types';
import './UserDetailModal.css';

export interface UserDetailModalProps {
  /** The selected user to view in the modal, or null when closed */
  user: ManagedUser | null;
  /** Callback triggered when the modal requests to close */
  onClose: () => void;
}

function getUserInitials(name: string, fallback?: string): string {
  if (fallback) return fallback;
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getCategoryRoleLabel(user: ManagedUser): string {
  if (user.kind === 'ADMINISTRATIVE') {
    return user.role === 'ADMIN'
      ? 'Administrador del sistema'
      : 'Bibliotecario';
  }

  switch (user.category) {
    case 'STUDENT':
      return 'Estudiante (Lector)';
    case 'TEACHER':
      return 'Docente';
    case 'GRADUATE':
      return 'Egresado';
    case 'EXTERNAL':
      return 'Persona externa';
    case 'ROOM':
      return 'Sala de lectura / Cómputo';
    default:
      return 'Usuario';
  }
}

function getLoanStatusBadge(status: Loan['status']) {
  switch (status) {
    case 'ACTIVE':
      return (
        <span className="user-detail-loan-tag user-detail-loan-tag--active">
          <Clock size={11} aria-hidden="true" /> Activo
        </span>
      );
    case 'OVERDUE':
      return (
        <span className="user-detail-loan-tag user-detail-loan-tag--overdue">
          <AlertTriangle size={11} aria-hidden="true" /> Vencido
        </span>
      );
    case 'DUE_SOON':
      return (
        <span className="user-detail-loan-tag user-detail-loan-tag--warning">
          <Clock size={11} aria-hidden="true" /> Por vencer
        </span>
      );
    case 'RETURNED':
      return (
        <span className="user-detail-loan-tag user-detail-loan-tag--returned">
          <CheckCircle2 size={11} aria-hidden="true" /> Devuelto
        </span>
      );
    default:
      return (
        <span className="user-detail-loan-tag user-detail-loan-tag--default">
          {status}
        </span>
      );
  }
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cross-reference existing loans associated with this user in mock data
  const associatedLoans = useMemo(() => {
    if (!user) return [];
    return MOCK_LOANS.filter(
      (loan) =>
        loan.userId === user.id ||
        (loan.userName &&
          loan.userName.trim().toLowerCase() === user.fullName.trim().toLowerCase())
    );
  }, [user]);

  if (!user) return null;

  const initials = getUserInitials(user.fullName, user.avatarInitials);
  const avatarBg = user.avatarColor || '#1E3A5F';

  // Only render activity section if there are active loans or registered loan records
  const hasLoanActivity = user.activeLoans > 0 || associatedLoans.length > 0;

  return (
    <Modal
      open={Boolean(user)}
      onClose={onClose}
      size="medium"
      title="Detalles del Usuario"
      description={`Ficha institucional de consulta de ${user.fullName}`}
      icon={<User size={18} />}
      closeButtonAriaLabel="Cerrar detalles del usuario"
      initialFocusRef={closeButtonRef}
      footer={
        <div className="user-detail-footer-actions">
          <Button
            ref={closeButtonRef}
            variant="secondary"
            onClick={onClose}
            aria-label="Cerrar ficha de detalles"
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <div className="user-detail-modal-body">
        {/* Header Profile Summary */}
        <section
          className="user-detail-header-card"
          aria-label="Resumen de perfil del usuario"
        >
          <div
            className="user-detail-avatar"
            style={{ backgroundColor: avatarBg }}
            aria-hidden="true"
          >
            {initials}
          </div>

          <div className="user-detail-header-info">
            <h3 className="user-detail-name">{user.fullName}</h3>

            <div className="user-detail-code-row">
              <span className="user-detail-code-label">Código / Matrícula:</span>
              <span className="user-detail-code-badge">{user.borrowerCode}</span>
            </div>

            <div className="user-detail-badges-row">
              <UserTypeBadge user={user} />
              <UserStatusBadge user={user} />
              {user.kind === 'ADMINISTRATIVE' && (
                <span className="user-detail-admin-pill">
                  <ShieldCheck size={12} aria-hidden="true" />
                  Acceso Administrativo
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Section: Contact Information */}
        <section
          className="user-detail-section"
          aria-labelledby="user-detail-contact-title"
        >
          <h4 id="user-detail-contact-title" className="user-detail-section-title">
            <Mail size={15} aria-hidden="true" />
            Información de Contacto
          </h4>

          <div className="user-detail-grid">
            <div className="user-detail-item">
              <span className="user-detail-label">
                <Mail size={12} aria-hidden="true" />
                Correo institucional
              </span>
              <span className="user-detail-value user-detail-value--selectable">
                {user.email}
              </span>
            </div>

            <div className="user-detail-item">
              <span className="user-detail-label">
                <Phone size={12} aria-hidden="true" />
                Teléfono de contacto
              </span>
              <span className="user-detail-value">
                {user.phone ? user.phone : 'No registrado'}
              </span>
            </div>
          </div>
        </section>

        {/* Section: Institutional Information */}
        <section
          className="user-detail-section"
          aria-labelledby="user-detail-inst-title"
        >
          <h4 id="user-detail-inst-title" className="user-detail-section-title">
            <Building2 size={15} aria-hidden="true" />
            Información Institucional
          </h4>

          <div className="user-detail-grid">
            <div className="user-detail-item">
              <span className="user-detail-label">Tipo de perfil</span>
              <span className="user-detail-value">
                {user.kind === 'ADMINISTRATIVE'
                  ? 'Personal Administrativo'
                  : 'Lector / Prestatario'}
              </span>
            </div>

            <div className="user-detail-item">
              <span className="user-detail-label">
                {user.kind === 'ADMINISTRATIVE'
                  ? 'Rol en el sistema'
                  : 'Categoría asignada'}
              </span>
              <span className="user-detail-value">
                {getCategoryRoleLabel(user)}
              </span>
            </div>

            <div className="user-detail-item">
              <span className="user-detail-label">
                <Hash size={12} aria-hidden="true" />
                Identificador institucional
              </span>
              <span className="user-detail-value">{user.borrowerCode}</span>
            </div>

            {user.createdAt && (
              <div className="user-detail-item">
                <span className="user-detail-label">
                  <Calendar size={12} aria-hidden="true" />
                  Fecha de registro
                </span>
                <span className="user-detail-value">{user.createdAt}</span>
              </div>
            )}

            {user.kind === 'NORMAL' &&
              user.category === 'ROOM' &&
              user.roomResponsibleName && (
                <div className="user-detail-item user-detail-item--full">
                  <span className="user-detail-label">
                    Responsable de la sala
                  </span>
                  <span className="user-detail-value">
                    {user.roomResponsibleName}
                  </span>
                </div>
              )}
          </div>
        </section>

        {/* Section: Activity and Loans (Only if real data exists in model or mock) */}
        {hasLoanActivity && (
          <section
            className="user-detail-section"
            aria-labelledby="user-detail-loans-title"
          >
            <h4
              id="user-detail-loans-title"
              className="user-detail-section-title"
            >
              <BookOpen size={15} aria-hidden="true" />
              Actividad de Préstamos
            </h4>

            {/* Overdue alert if applicable */}
            {user.hasOverdueLoan && (
              <div className="user-detail-overdue-alert" role="status">
                <AlertTriangle size={16} aria-hidden="true" />
                <div>
                  <strong>Préstamo con atraso:</strong> El usuario tiene al menos
                  un recurso bibliográfico vencido pendiente de entrega.
                </div>
              </div>
            )}

            {/* Loans summary pill */}
            <div className="user-detail-loans-summary">
              <div className="user-detail-loans-stat">
                <span className="user-detail-loans-stat-count">
                  {user.activeLoans}
                </span>
                <span className="user-detail-loans-stat-label">
                  {user.activeLoans === 1
                    ? 'Préstamo activo en posesión'
                    : 'Préstamos activos en posesión'}
                </span>
              </div>
              <span
                className={`user-detail-standing-tag ${
                  user.hasOverdueLoan
                    ? 'user-detail-standing-tag--overdue'
                    : 'user-detail-standing-tag--ok'
                }`}
              >
                {user.hasOverdueLoan ? 'Con adeudo pendiente' : 'Al corriente'}
              </span>
            </div>

            {/* List of associated loan details if present in MOCK_LOANS */}
            {associatedLoans.length > 0 && (
              <div className="user-detail-loans-list">
                <h5 className="user-detail-loans-list-title">
                  Recursos en préstamo registrados
                </h5>
                <div className="user-detail-loans-cards">
                  {associatedLoans.map((loan) => (
                    <article key={loan.id} className="user-detail-loan-card">
                      <div className="user-detail-loan-card-header">
                        <span className="user-detail-loan-folio">
                          Folio: {loan.folio}
                        </span>
                        {getLoanStatusBadge(loan.status)}
                      </div>
                      <h6 className="user-detail-loan-title">
                        {loan.resourceTitle}
                      </h6>
                      <p className="user-detail-loan-author">
                        por {loan.resourceAuthor}
                      </p>
                      <div className="user-detail-loan-dates">
                        <span>
                          Préstamo: <strong>{loan.checkoutDate}</strong>
                        </span>
                        <span>
                          Vence: <strong>{loan.dueDate}</strong>
                          {loan.dueDateNote && (
                            <span className="user-detail-loan-note">
                              {' '}
                              ({loan.dueDateNote})
                            </span>
                          )}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </Modal>
  );
};

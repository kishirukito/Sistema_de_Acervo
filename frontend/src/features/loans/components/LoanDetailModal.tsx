import React, { useRef, useMemo } from 'react';
import {
  BookMarked,
  BookOpen,
  User,
  Calendar,
  RotateCcw,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Hash,
  Mail,
  Phone,
  Barcode,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { LoanStatusBadge } from './LoanStatusBadge';
import { CATEGORY_LABELS } from '../../../constants';
import { MOCK_MANAGED_USERS } from '../../users/users.mock';
import { MOCK_RESOURCES } from '../../catalog/catalog.mock';
import { MOCK_BOOKS } from '../../../mocks/data';
import type { Loan } from '../loans.types';
import './LoanDetailModal.css';

export interface LoanDetailModalProps {
  /** The selected loan to inspect, or null when closed */
  loan: Loan | null;
  /** Callback triggered when modal requests closing */
  onClose: () => void;
}

export const LoanDetailModal: React.FC<LoanDetailModalProps> = ({
  loan,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cross-reference user data from MOCK_MANAGED_USERS
  const matchedUser = useMemo(() => {
    if (!loan) return null;
    return (
      MOCK_MANAGED_USERS.find(
        (u) =>
          u.id === loan.userId ||
          (u.fullName &&
            u.fullName.trim().toLowerCase() === loan.userName.trim().toLowerCase())
      ) || null
    );
  }, [loan]);

  // Cross-reference catalog resource from MOCK_RESOURCES
  const matchedResource = useMemo(() => {
    if (!loan) return null;
    return (
      MOCK_RESOURCES.find(
        (r) =>
          r.id === loan.resourceId ||
          r.id === loan.resourceId.replace('-00', '-') ||
          r.id === loan.resourceId.replace('-0', '-') ||
          (r.title &&
            r.title.trim().toLowerCase() === loan.resourceTitle.trim().toLowerCase())
      ) || null
    );
  }, [loan]);

  // Cross-reference books catalog data for additional bibliographic metadata
  const matchedBook = useMemo(() => {
    if (!loan) return null;
    return (
      MOCK_BOOKS.find(
        (b) =>
          b.id === loan.resourceId ||
          (b.title &&
            b.title.trim().toLowerCase() === loan.resourceTitle.trim().toLowerCase())
      ) || null
    );
  }, [loan]);

  if (!loan) return null;

  // Derived resource cover styling
  const coverBackground = matchedResource?.coverColor || '#1E3A5F';

  const coverInitials =
    matchedResource?.coverInitials ||
    loan.resourceTitle.slice(0, 2).toUpperCase();

  const inventoryCode = matchedResource?.code || '—';
  const isbn = matchedResource?.isbn || matchedBook?.isbn || '—';
  const categoryLabel =
    matchedResource?.categoryLabel || matchedBook?.category || null;
  const location = matchedResource?.location || null;

  // Derived borrower information
  const userInitials = loan.userInitials || (matchedUser ? matchedUser.avatarInitials : 'US');
  const userAvatarBg = loan.userAvatarColor || matchedUser?.avatarColor || '#1E3A5F';
  const borrowerCategory =
    CATEGORY_LABELS[loan.userCategory] || loan.userCategory;
  const borrowerCode = matchedUser?.borrowerCode || '—';
  const borrowerEmail = matchedUser?.email || null;
  const borrowerPhone = matchedUser?.phone || null;

  // Due status styling helpers
  const isOverdue = loan.status === 'OVERDUE';
  const isDueSoon = loan.status === 'DUE_SOON';
  const isReturned = loan.status === 'RETURNED';

  return (
    <Modal
      open={Boolean(loan)}
      onClose={onClose}
      size="medium"
      title="Detalle del préstamo"
      description={`Consulta administrativa del préstamo ${loan.folio}`}
      icon={<BookMarked size={18} />}
      closeButtonAriaLabel="Cerrar detalle del préstamo"
      initialFocusRef={closeButtonRef}
      footer={
        <div className="loan-detail-footer-actions">
          <Button
            ref={closeButtonRef}
            variant="secondary"
            onClick={onClose}
            aria-label="Cerrar ficha de detalle del préstamo"
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <div className="loan-detail-modal-body">
        {/* 1. Header Card (Folio + Badges) */}
        <div
          className="loan-detail-header-card"
          aria-label="Folio y estado actual del préstamo"
        >
          <div className="loan-detail-folio-wrap">
            <span className="loan-detail-folio-label">Folio:</span>
            <span className="loan-detail-folio-badge">{loan.folio}</span>
          </div>

          <div className="loan-detail-header-status">
            <LoanStatusBadge status={loan.status} />
            {loan.returnDate && (
              <span className="loan-detail-returned-pill">
                <CheckCircle2 size={12} aria-hidden="true" />
                Devuelto el {loan.returnDate}
              </span>
            )}
          </div>
        </div>

        {/* 2. Recurso prestado */}
        <section
          className="loan-detail-section"
          aria-labelledby="loan-detail-resource-heading"
        >
          <h3
            id="loan-detail-resource-heading"
            className="loan-detail-section-title"
          >
            <BookOpen size={15} aria-hidden="true" />
            Recurso prestado
          </h3>

          <div className="loan-detail-card">
            <div className="loan-detail-resource-layout">
              {/* Book Cover */}
              <div
                className="loan-detail-book-cover"
                style={{ background: coverBackground }}
                aria-hidden="true"
              >
                <BookOpen size={20} />
                <span className="loan-detail-book-initials">
                  {coverInitials}
                </span>
              </div>

              {/* Bibliographic Info */}
              <div className="loan-detail-resource-info">
                {categoryLabel && (
                  <span className="loan-detail-category-pill">
                    {categoryLabel}
                  </span>
                )}
                <h4 className="loan-detail-resource-title">
                  {loan.resourceTitle}
                </h4>
                <p className="loan-detail-resource-author">
                  por {loan.resourceAuthor}
                </p>

                <div className="loan-detail-meta-grid">
                  <div className="loan-detail-meta-item">
                    <span className="loan-detail-meta-label">
                      <Barcode size={12} aria-hidden="true" />
                      Código de inventario
                    </span>
                    <span className="loan-detail-meta-value">
                      {inventoryCode}
                    </span>
                  </div>

                  <div className="loan-detail-meta-item">
                    <span className="loan-detail-meta-label">
                      <Hash size={12} aria-hidden="true" />
                      ISBN
                    </span>
                    <span className="loan-detail-meta-value">{isbn}</span>
                  </div>

                  {location && (
                    <div className="loan-detail-meta-item" style={{ gridColumn: 'span 2' }}>
                      <span className="loan-detail-meta-label">
                        <MapPin size={12} aria-hidden="true" />
                        Ubicación en biblioteca
                      </span>
                      <span className="loan-detail-meta-value">{location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Usuario prestatario */}
        <section
          className="loan-detail-section"
          aria-labelledby="loan-detail-user-heading"
        >
          <h3
            id="loan-detail-user-heading"
            className="loan-detail-section-title"
          >
            <User size={15} aria-hidden="true" />
            Usuario prestatario
          </h3>

          <div className="loan-detail-card">
            <div className="loan-detail-user-layout">
              <div
                className="loan-detail-user-avatar"
                style={{ backgroundColor: userAvatarBg }}
                aria-hidden="true"
              >
                {userInitials}
              </div>

              <div className="loan-detail-user-info">
                <h4 className="loan-detail-user-name">{loan.userName}</h4>

                <div className="loan-detail-user-badges">
                  <span className="loan-detail-category-pill">
                    {borrowerCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="loan-detail-meta-grid">
              <div className="loan-detail-meta-item">
                <span className="loan-detail-meta-label">
                  <Hash size={12} aria-hidden="true" />
                  Código / Matrícula
                </span>
                <span className="loan-detail-meta-value">{borrowerCode}</span>
              </div>

              {borrowerEmail && (
                <div className="loan-detail-meta-item">
                  <span className="loan-detail-meta-label">
                    <Mail size={12} aria-hidden="true" />
                    Correo institucional
                  </span>
                  <span className="loan-detail-meta-value">{borrowerEmail}</span>
                </div>
              )}

              {borrowerPhone && (
                <div className="loan-detail-meta-item">
                  <span className="loan-detail-meta-label">
                    <Phone size={12} aria-hidden="true" />
                    Teléfono
                  </span>
                  <span className="loan-detail-meta-value">{borrowerPhone}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Fechas del préstamo */}
        <section
          className="loan-detail-section"
          aria-labelledby="loan-detail-dates-heading"
        >
          <h3
            id="loan-detail-dates-heading"
            className="loan-detail-section-title"
          >
            <Calendar size={15} aria-hidden="true" />
            Fechas del préstamo
          </h3>

          <div className="loan-detail-dates-grid">
            {/* Fecha de Préstamo */}
            <div className="loan-detail-date-box">
              <span className="loan-detail-date-label">
                <Calendar size={12} aria-hidden="true" />
                Fecha de préstamo
              </span>
              <span className="loan-detail-date-value">
                {loan.checkoutDate}
              </span>
            </div>

            {/* Fecha Límite */}
            <div
              className={`loan-detail-date-box ${
                isOverdue
                  ? 'loan-detail-date-box--overdue'
                  : isDueSoon
                  ? 'loan-detail-date-box--due'
                  : ''
              }`}
            >
              <span className="loan-detail-date-label">
                <Clock size={12} aria-hidden="true" />
                Fecha límite
              </span>
              <span className="loan-detail-date-value">{loan.dueDate}</span>
              {loan.dueDateNote && (
                <span
                  className={`loan-detail-date-note ${
                    isOverdue
                      ? 'loan-detail-date-note--overdue'
                      : isDueSoon
                      ? 'loan-detail-date-note--warning'
                      : 'loan-detail-date-note--normal'
                  }`}
                >
                  {isOverdue && <AlertCircle size={11} aria-hidden="true" />}
                  {isDueSoon && <Clock size={11} aria-hidden="true" />}
                  {loan.dueDateNote}
                </span>
              )}
            </div>

            {/* Fecha de Devolución (solo si existe o estado devuelto) */}
            <div
              className={`loan-detail-date-box ${
                isReturned ? 'loan-detail-date-box--returned' : ''
              }`}
            >
              <span className="loan-detail-date-label">
                <CheckCircle2 size={12} aria-hidden="true" />
                Fecha de devolución
              </span>
              <span className="loan-detail-date-value">
                {loan.returnDate ? loan.returnDate : 'Pendiente'}
              </span>
              {isReturned && (
                <span className="loan-detail-date-note loan-detail-date-note--returned">
                  <CheckCircle2 size={11} aria-hidden="true" />
                  Devuelto
                </span>
              )}
            </div>
          </div>
        </section>

        {/* 5. Renovaciones */}
        {typeof loan.renewalCount === 'number' && (
          <section
            className="loan-detail-section"
            aria-labelledby="loan-detail-renewals-heading"
          >
            <h3
              id="loan-detail-renewals-heading"
              className="loan-detail-section-title"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Renovaciones
            </h3>

            <div className="loan-detail-renewals-card">
              <div className="loan-detail-renewals-info">
                <span className="loan-detail-renewals-label">
                  Renovaciones realizadas
                </span>
                <span className="loan-detail-renewals-val">
                  {typeof loan.renewalLimit === 'number'
                    ? `${loan.renewalCount} de ${loan.renewalLimit} permitidas`
                    : `${loan.renewalCount} realizadas`}
                </span>
              </div>

              {typeof loan.renewalLimit === 'number' && (
                <span
                  className={`loan-detail-renewals-tag ${
                    loan.renewalCount >= loan.renewalLimit
                      ? 'loan-detail-renewals-tag--limit'
                      : 'loan-detail-renewals-tag--ok'
                  }`}
                >
                  {loan.renewalCount >= loan.renewalLimit
                    ? 'Límite de renovaciones alcanzado'
                    : `${loan.renewalLimit - loan.renewalCount} disponibles`}
                </span>
              )}
            </div>
          </section>
        )}

        {/* 6. Observaciones (solo si existe con contenido) */}
        {loan.notes && loan.notes.trim().length > 0 && (
          <section
            className="loan-detail-section"
            aria-labelledby="loan-detail-notes-heading"
          >
            <h3
              id="loan-detail-notes-heading"
              className="loan-detail-section-title"
            >
              <FileText size={15} aria-hidden="true" />
              Observaciones
            </h3>

            <div className="loan-detail-notes-card">
              <p className="loan-detail-notes-text">{loan.notes.trim()}</p>
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
};

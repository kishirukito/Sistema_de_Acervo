import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  CheckCheck,
  RotateCcw,
  BookOpen,
  User,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Ban,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { LoanStatusBadge } from './LoanStatusBadge';
import { CATEGORY_LABELS } from '../../../constants';
import { MOCK_MANAGED_USERS } from '../../users/users.mock';
import { MOCK_RESOURCES } from '../../catalog/catalog.mock';
import type { Loan } from '../loans.types';
import './RenewLoanModal.css';

export interface RenewLoanModalProps {
  /** The loan currently selected for renewal */
  loan: Loan | null;
  /** Request closing modal without performing the renewal */
  onClose: () => void;
  /** Confirm renewal with new due date and formatted display string */
  onConfirm: (
    loan: Loan,
    details: { newDueDate: string; dueDateNote: string }
  ) => void;
}

function parseDisplayOrIsoDate(dateStr: string): number | null {
  if (!dateStr) return null;
  // Case 1: ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    const [y, m, d] = dateStr.trim().split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  // Case 2: Display format like "25 sep. 2026"
  const monthMap: Record<string, number> = {
    'ene.': 0, 'feb.': 1, 'mar.': 2, 'abr.': 3, 'may.': 4, 'jun.': 5,
    'jul.': 6, 'ago.': 7, 'sep.': 8, 'oct.': 9, 'nov.': 10, 'dic.': 11,
    'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
    'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11,
  };
  const parts = dateStr.trim().split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].toLowerCase();
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && monthMap[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, monthMap[monthKey], day).getTime();
    }
  }
  return null;
}

function toIsoDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(isoDateStr: string): string {
  if (!isoDateStr) return '';
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayStr = String(day).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  return `${dayStr} ${monthNames[date.getMonth()]} ${year}`;
}

export const RenewLoanModal: React.FC<RenewLoanModalProps> = ({
  loan,
  onClose,
  onConfirm,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const [newDueDate, setNewDueDate] = useState<string>('');
  const [dateError, setDateError] = useState<string | null>(null);

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

  // Eligibility evaluation
  const isReturned = loan?.status === 'RETURNED';
  const isLimitReached =
    Boolean(loan) &&
    typeof loan?.renewalLimit === 'number' &&
    (loan?.renewalCount ?? 0) >= (loan?.renewalLimit ?? 0);
  const isEligible = Boolean(loan) && !isReturned && !isLimitReached;

  // Calculate baseline date boundaries
  const { minDateIso, defaultSuggestedIso } = useMemo(() => {
    if (!loan) return { minDateIso: '', defaultSuggestedIso: '' };

    const todayTime = new Date().setHours(0, 0, 0, 0);
    const currentDueTime = parseDisplayOrIsoDate(loan.dueDate) ?? todayTime;
    const baseReference = Math.max(todayTime, currentDueTime);

    // Minimum date must be at least +1 day from baseline
    const minTime = baseReference + 24 * 60 * 60 * 1000;
    // Suggest 7 days extension by default for convenient selection
    const defaultTime = baseReference + 7 * 24 * 60 * 60 * 1000;

    return {
      minDateIso: toIsoDateString(minTime),
      defaultSuggestedIso: toIsoDateString(defaultTime),
    };
  }, [loan]);

  // Reset or initialize date when modal opens for an eligible loan
  useEffect(() => {
    if (loan && isEligible) {
      setNewDueDate(defaultSuggestedIso);
      setDateError(null);
    } else {
      setNewDueDate('');
      setDateError(null);
    }
  }, [loan, isEligible, defaultSuggestedIso]);

  // Handle manual date change
  const handleDateChange = (val: string) => {
    setNewDueDate(val);

    if (!val) {
      setDateError('Debes seleccionar una nueva fecha límite.');
      return;
    }

    if (loan) {
      const todayTime = new Date().setHours(0, 0, 0, 0);
      const currentDueTime = parseDisplayOrIsoDate(loan.dueDate) ?? todayTime;
      const selectedTime = parseDisplayOrIsoDate(val);

      if (selectedTime === null) {
        setDateError('Fecha inválida.');
        return;
      }

      if (selectedTime <= currentDueTime) {
        setDateError(
          `La nueva fecha límite debe ser posterior a la fecha actual (${loan.dueDate}).`
        );
        return;
      }

      if (selectedTime <= todayTime) {
        setDateError('La nueva fecha límite debe ser posterior a la fecha de hoy.');
        return;
      }
    }

    setDateError(null);
  };

  if (!loan) return null;

  // Title and description based on eligibility
  const modalTitle = isEligible
    ? 'Renovar préstamo'
    : 'No es posible renovar el préstamo';

  const modalDescription = isEligible
    ? 'Confirma la renovación para extender la fecha límite de devolución.'
    : isReturned
    ? 'El recurso ya fue devuelto.'
    : 'Este préstamo alcanzó el límite de renovaciones permitido.';

  const inventoryCode = matchedResource?.code || '—';
  const borrowerCategory =
    CATEGORY_LABELS[loan.userCategory] || loan.userCategory;
  const borrowerCode = matchedUser?.borrowerCode || '—';

  const coverBg = matchedResource?.coverColor || '#1E3A5F';
  const coverInitials =
    matchedResource?.coverInitials || loan.resourceTitle.slice(0, 2).toUpperCase();

  const handleConfirm = () => {
    if (!isEligible || dateError || !newDueDate) return;

    const todayTime = new Date().setHours(0, 0, 0, 0);
    const selectedTime = parseDisplayOrIsoDate(newDueDate) ?? todayTime;
    const diffDays = Math.ceil((selectedTime - todayTime) / (24 * 60 * 60 * 1000));
    const newDueDateNote = diffDays > 0 ? `${diffDays}d restantes (renovado)` : 'Vence hoy (renovado)';

    onConfirm(loan, {
      newDueDate: formatDisplayDate(newDueDate),
      dueDateNote: newDueDateNote,
    });
    onClose();
  };

  return (
    <Modal
      open={Boolean(loan)}
      onClose={onClose}
      size="medium"
      role="alertdialog"
      closeOnBackdrop={true}
      closeOnEscape={true}
      title={modalTitle}
      description={modalDescription}
      icon={
        isEligible ? (
          <CheckCheck size={18} />
        ) : (
          <Ban size={18} style={{ color: '#DC2626' }} />
        )
      }
      closeButtonAriaLabel="Cancelar y cerrar diálogo"
      initialFocusRef={cancelBtnRef}
      footer={
        <div className="renew-loan-modal-footer">
          <Button
            type="button"
            variant="outline"
            ref={cancelBtnRef}
            onClick={onClose}
            aria-label={isEligible ? 'Cancelar renovación' : 'Cerrar ventana informativa'}
          >
            {isEligible ? 'Cancelar' : 'Cerrar'}
          </Button>

          {isEligible && (
            <Button
              type="button"
              variant="primary"
              leftIcon={<CheckCheck size={16} />}
              onClick={handleConfirm}
              disabled={Boolean(dateError) || !newDueDate}
              aria-label="Confirmar y registrar renovación del préstamo"
            >
              Confirmar renovación
            </Button>
          )}
        </div>
      }
    >
      <div className="renew-loan-modal-body">
        {/* 1. Identification Header Card */}
        <div
          className="renew-loan-header-card"
          aria-label="Folio y estado del préstamo a renovar"
        >
          <div className="renew-loan-folio-wrap">
            <span className="renew-loan-folio-label">Folio:</span>
            <span className="renew-loan-folio-badge">{loan.folio}</span>
          </div>

          <div className="renew-loan-header-badges">
            <LoanStatusBadge status={loan.status} />
          </div>
        </div>

        {/* Ineligible Explanation Banner if applicable */}
        {!isEligible && (
          <div className="renew-loan-ineligible-banner" role="alert">
            <AlertTriangle size={20} className="renew-loan-ineligible-icon" aria-hidden="true" />
            <div className="renew-loan-ineligible-content">
              <h4 className="renew-loan-ineligible-title">
                {isReturned
                  ? 'Préstamo ya finalizado'
                  : 'Límite de renovaciones alcanzado'}
              </h4>
              <p className="renew-loan-ineligible-desc">{modalDescription}</p>
            </div>
          </div>
        )}

        {/* 2. Read-only Summary Cards: Book and User */}
        <div className="renew-loan-summary-grid">
          {/* Book Summary Card */}
          <div className="renew-loan-summary-card">
            <h4 className="renew-loan-card-title">
              <BookOpen size={13} aria-hidden="true" />
              Recurso bibliográfico
            </h4>
            <div className="renew-loan-item-row">
              <div
                className="renew-loan-book-cover"
                style={{ backgroundColor: coverBg }}
                aria-hidden="true"
              >
                <BookOpen size={14} />
                <span className="renew-loan-book-initials">{coverInitials}</span>
              </div>
              <div className="renew-loan-book-meta">
                <span className="renew-loan-book-title" title={loan.resourceTitle}>
                  {loan.resourceTitle}
                </span>
                <span className="renew-loan-book-author" title={loan.resourceAuthor}>
                  por {loan.resourceAuthor}
                </span>
                <span className="renew-loan-book-code">Cód: {inventoryCode}</span>
              </div>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="renew-loan-summary-card">
            <h4 className="renew-loan-card-title">
              <User size={13} aria-hidden="true" />
              Prestatario
            </h4>
            <div className="renew-loan-item-row">
              <div
                className="renew-loan-user-avatar"
                style={{ backgroundColor: loan.userAvatarColor }}
                aria-hidden="true"
              >
                {loan.userInitials}
              </div>
              <div className="renew-loan-user-meta">
                <span className="renew-loan-user-name" title={loan.userName}>
                  {loan.userName}
                </span>
                <div className="renew-loan-user-sub">
                  <span className="renew-loan-category-pill">
                    {borrowerCategory}
                  </span>
                  <span className="renew-loan-book-code">{borrowerCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Renewals Limit & Status */}
        {typeof loan.renewalCount === 'number' && typeof loan.renewalLimit === 'number' && (
          <div className="renew-loan-counter-card">
            <span className="renew-loan-counter-label">
              <RotateCcw size={13} aria-hidden="true" />
              Renovaciones del préstamo:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="renew-loan-counter-val">
                {loan.renewalCount} de {loan.renewalLimit} permitidas
              </span>
              {isEligible && (
                <span className="renew-loan-counter-badge">
                  +{loan.renewalLimit - loan.renewalCount} disponible
                  {loan.renewalLimit - loan.renewalCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 4. Visual Date Comparison & Input (Only when eligible) */}
        {isEligible && (
          <div className="renew-loan-dates-comparison-card">
            <div className="renew-loan-comparison-grid">
              {/* Previous Due Date */}
              <div className="renew-loan-comparison-box">
                <span className="renew-loan-box-label">Fecha límite actual</span>
                <span className="renew-loan-box-date">{loan.dueDate}</span>
                {loan.dueDateNote && (
                  <span style={{ fontSize: '0.71875rem', color: '#6B7280' }}>
                    {loan.dueDateNote}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <div className="renew-loan-arrow-wrap" aria-hidden="true">
                <ArrowRight size={18} />
              </div>

              {/* New Due Date Display */}
              <div className="renew-loan-comparison-box renew-loan-comparison-box--new">
                <span className="renew-loan-box-label" style={{ color: '#047857' }}>
                  Nueva fecha límite
                </span>
                <span className="renew-loan-box-date renew-loan-box-date--new">
                  {newDueDate ? formatDisplayDate(newDueDate) : 'Selecciona fecha'}
                </span>
                {newDueDate && !dateError && (
                  <span style={{ fontSize: '0.71875rem', color: '#059669', fontWeight: 600 }}>
                    Extensión aplicada
                  </span>
                )}
              </div>
            </div>

            {/* Date Input */}
            <div className="renew-loan-form-section">
              <label htmlFor="renew-date-input" className="renew-loan-field-label">
                <Calendar size={13} aria-hidden="true" />
                <span>Seleccionar nueva fecha límite *</span>
              </label>
              <input
                id="renew-date-input"
                type="date"
                min={minDateIso}
                value={newDueDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`renew-loan-input-date ${
                  dateError ? 'renew-loan-input-date--error' : ''
                }`}
                aria-invalid={Boolean(dateError)}
                aria-describedby={dateError ? 'renew-date-error' : 'renew-date-helper'}
                required
              />
              {dateError ? (
                <span id="renew-date-error" className="renew-loan-field-error" role="alert">
                  {dateError}
                </span>
              ) : (
                <span id="renew-date-helper" className="renew-loan-helper-text">
                  La nueva fecha debe ser posterior a la fecha límite actual ({loan.dueDate}).
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

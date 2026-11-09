import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  RotateCcw,
  BookOpen,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { LoanStatusBadge } from './LoanStatusBadge';
import { CATEGORY_LABELS } from '../../../constants';
import { MOCK_MANAGED_USERS } from '../../users/users.mock';
import { MOCK_RESOURCES } from '../../catalog/catalog.mock';
import type { Loan } from '../loans.types';
import './ReturnLoanModal.css';

export interface ReturnLoanModalProps {
  /** The loan currently selected for return registration */
  loan: Loan | null;
  /** Request closing modal without performing the return */
  onClose: () => void;
  /** Confirm return registration with return date and optional notes */
  onConfirm: (
    loan: Loan,
    details: { returnDate: string; notes?: string }
  ) => void;
}

function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
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

export const ReturnLoanModal: React.FC<ReturnLoanModalProps> = ({
  loan,
  onClose,
  onConfirm,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const [returnDate, setReturnDate] = useState(getTodayIsoString());
  const [notes, setNotes] = useState('');
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

  // Reset form whenever a new loan is selected
  useEffect(() => {
    if (loan) {
      setReturnDate(getTodayIsoString());
      setNotes('');
      setDateError(null);
    }
  }, [loan]);

  // Validate return date on change
  const handleDateChange = (newIsoDate: string) => {
    setReturnDate(newIsoDate);

    if (!newIsoDate) {
      setDateError('La fecha de devolución es requerida.');
      return;
    }

    if (loan) {
      const checkoutTime = parseDisplayOrIsoDate(loan.checkoutDate);
      const returnTime = parseDisplayOrIsoDate(newIsoDate);

      if (checkoutTime !== null && returnTime !== null && returnTime < checkoutTime) {
        setDateError(
          `La fecha de devolución no puede ser anterior a la fecha de préstamo (${loan.checkoutDate}).`
        );
        return;
      }
    }

    setDateError(null);
  };

  if (!loan) return null;

  const isAlreadyReturned = loan.status === 'RETURNED';
  const isOverdue = loan.status === 'OVERDUE';
  const isDueSoon = loan.status === 'DUE_SOON';

  const inventoryCode = matchedResource?.code || '—';
  const borrowerCategory =
    CATEGORY_LABELS[loan.userCategory] || loan.userCategory;
  const borrowerCode = matchedUser?.borrowerCode || '—';

  const coverBg = matchedResource?.coverColor || '#1E3A5F';
  const coverInitials =
    matchedResource?.coverInitials || loan.resourceTitle.slice(0, 2).toUpperCase();

  const handleConfirm = () => {
    if (isAlreadyReturned || dateError || !returnDate) return;
    onConfirm(loan, {
      returnDate: formatDisplayDate(returnDate),
      notes: notes.trim() || undefined,
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
      title="Registrar devolución"
      description="Confirma que el recurso fue recibido para finalizar el préstamo."
      icon={<RotateCcw size={18} />}
      closeButtonAriaLabel="Cancelar y cerrar diálogo"
      initialFocusRef={cancelBtnRef}
      footer={
        <div className="return-loan-modal-footer">
          <Button
            type="button"
            variant="outline"
            ref={cancelBtnRef}
            onClick={onClose}
            aria-label="Cancelar registro de devolución"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            leftIcon={<RotateCcw size={15} />}
            onClick={handleConfirm}
            disabled={isAlreadyReturned || Boolean(dateError) || !returnDate}
            aria-label="Confirmar entrega y registrar devolución"
          >
            Confirmar devolución
          </Button>
        </div>
      }
    >
      <div className="return-loan-modal-body">
        {/* 1. Identification Header Card */}
        <div
          className="return-loan-header-card"
          aria-label="Folio y estado del préstamo a devolver"
        >
          <div className="return-loan-folio-wrap">
            <span className="return-loan-folio-label">Folio:</span>
            <span className="return-loan-folio-badge">{loan.folio}</span>
          </div>

          <LoanStatusBadge status={loan.status} />
        </div>

        {/* 2. Read-only Summary Cards: Book and User */}
        <div className="return-loan-summary-grid">
          {/* Book Summary Card */}
          <div className="return-loan-summary-card">
            <h4 className="return-loan-card-title">
              <BookOpen size={13} aria-hidden="true" />
              Recurso bibliográfico
            </h4>
            <div className="return-loan-item-row">
              <div
                className="return-loan-book-cover"
                style={{ backgroundColor: coverBg }}
                aria-hidden="true"
              >
                <BookOpen size={14} />
                <span className="return-loan-book-initials">{coverInitials}</span>
              </div>
              <div className="return-loan-book-meta">
                <span className="return-loan-book-title" title={loan.resourceTitle}>
                  {loan.resourceTitle}
                </span>
                <span className="return-loan-book-author" title={loan.resourceAuthor}>
                  por {loan.resourceAuthor}
                </span>
                <span className="return-loan-book-code">Cód: {inventoryCode}</span>
              </div>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="return-loan-summary-card">
            <h4 className="return-loan-card-title">
              <User size={13} aria-hidden="true" />
              Prestatario
            </h4>
            <div className="return-loan-item-row">
              <div
                className="return-loan-user-avatar"
                style={{ backgroundColor: loan.userAvatarColor }}
                aria-hidden="true"
              >
                {loan.userInitials}
              </div>
              <div className="return-loan-user-meta">
                <span className="return-loan-user-name" title={loan.userName}>
                  {loan.userName}
                </span>
                <div className="return-loan-user-sub">
                  <span className="return-loan-category-pill">
                    {borrowerCategory}
                  </span>
                  <span className="return-loan-book-code">{borrowerCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dates & Delay Information */}
        <div className="return-loan-dates-card">
          <div className="return-loan-dates-grid">
            <div className="return-loan-date-item">
              <span className="return-loan-date-label">
                <Calendar size={12} aria-hidden="true" />
                Fecha de préstamo
              </span>
              <span className="return-loan-date-val">{loan.checkoutDate}</span>
            </div>

            <div className="return-loan-date-item">
              <span className="return-loan-date-label">
                <Clock size={12} aria-hidden="true" />
                Fecha límite original
              </span>
              <span className="return-loan-date-val">{loan.dueDate}</span>
            </div>
          </div>

          {/* Delay / On-time Status Banner */}
          {isOverdue && (
            <div className="return-loan-delay-alert return-loan-delay-alert--overdue" role="status">
              <AlertTriangle size={15} aria-hidden="true" />
              <span>
                Préstamo con retraso: {loan.dueDateNote || 'Fecha límite vencida'}
              </span>
            </div>
          )}

          {isDueSoon && (
            <div className="return-loan-delay-alert return-loan-delay-alert--warning" role="status">
              <Clock size={15} aria-hidden="true" />
              <span>
                Próximo a vencer: {loan.dueDateNote || 'Requiere devolución pronta'}
              </span>
            </div>
          )}

          {!isOverdue && !isDueSoon && !isAlreadyReturned && (
            <div className="return-loan-delay-alert return-loan-delay-alert--ok" role="status">
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>
                Entrega dentro del plazo ({loan.dueDateNote || 'Al corriente'})
              </span>
            </div>
          )}

          {isAlreadyReturned && (
            <div className="return-loan-delay-alert return-loan-delay-alert--warning" role="alert">
              <AlertCircle size={15} aria-hidden="true" />
              <span>
                Este préstamo ya se encuentra marcado como devuelto ({loan.returnDate}).
              </span>
            </div>
          )}
        </div>

        {/* 4. Operational Form: Return Date & Optional Notes */}
        {!isAlreadyReturned && (
          <div className="return-loan-form-section">
            {/* Return Date Input */}
            <div className="return-loan-field-group">
              <label htmlFor="return-date-input" className="return-loan-field-label">
                <span>Fecha de devolución *</span>
              </label>
              <input
                id="return-date-input"
                type="date"
                value={returnDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`return-loan-input-date ${
                  dateError ? 'return-loan-input-date--error' : ''
                }`}
                aria-invalid={Boolean(dateError)}
                aria-describedby={dateError ? 'return-date-error' : undefined}
                required
              />
              {dateError && (
                <span id="return-date-error" className="return-loan-field-error" role="alert">
                  {dateError}
                </span>
              )}
            </div>

            {/* Optional Notes Textarea */}
            <div className="return-loan-field-group">
              <label htmlFor="return-notes-input" className="return-loan-field-label">
                <span>
                  <FileText size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                  Observaciones de devolución (opcional)
                </span>
                <span className="return-loan-char-count">{notes.length}/250</span>
              </label>
              <textarea
                id="return-notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 250))}
                placeholder="Indica condiciones físicas del ejemplar, sellos o incidencias de recepción..."
                rows={2}
                className="return-loan-textarea"
                maxLength={250}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

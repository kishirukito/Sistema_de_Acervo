import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  BookPlus,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  Calendar,
  BookOpen,
  MapPin,
  X,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { UserTypeBadge } from '../../users/components/UserTypeBadge';
import { UserStatusBadge } from '../../users/components/UserStatusBadge';
import { MOCK_MANAGED_USERS } from '../../users/users.mock';
import { MOCK_RESOURCES } from '../../catalog/catalog.mock';
import type { Loan } from '../loans.types';
import type { ManagedUser, NormalUserCategory } from '../../users/users.types';
import type { Resource } from '../../catalog/catalog.types';
import './RegisterLoanModal.css';

export interface RegisterLoanModalProps {
  /** Controls open state of the modal */
  open: boolean;
  /** Existing loans list for calculating next folio */
  existingLoans: Loan[];
  /** Callback triggered when modal requests to close */
  onClose: () => void;
  /** Callback executed when a loan is successfully registered */
  onSuccess: (newLoan: Loan) => void;
}

function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayStr = String(day).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  return `${dayStr} ${monthNames[date.getMonth()]} ${year}`;
}

function calculateDueNote(checkoutIso: string, dueIso: string): string {
  if (!checkoutIso || !dueIso) return '14d restantes';
  const cDate = new Date(checkoutIso);
  const dDate = new Date(dueIso);
  const diffTime = dDate.getTime() - cDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays}d restantes` : 'Vence hoy';
}

function getUserInitials(name: string, fallback?: string): string {
  if (fallback) return fallback;
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const RegisterLoanModal: React.FC<RegisterLoanModalProps> = ({
  open,
  existingLoans,
  onClose,
  onSuccess,
}) => {
  const userSearchRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Form selections and state
  const [userQuery, setUserQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const [resourceQuery, setResourceQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const [checkoutDate, setCheckoutDate] = useState(getTodayIsoString());
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setUserQuery('');
      setSelectedUser(null);
      setResourceQuery('');
      setSelectedResource(null);
      setCheckoutDate(getTodayIsoString());
      setDueDate('');
      setNotes('');
      setShowDiscardConfirm(false);
      setIsSubmitting(false);
    }
  }, [open]);

  // Filter users based on query
  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    return MOCK_MANAGED_USERS.filter((u) => {
      if (!q) return true;
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.borrowerCode.toLowerCase().includes(q)
      );
    });
  }, [userQuery]);

  // Filter resources based on query
  const filteredResources = useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    return MOCK_RESOURCES.filter((r) => {
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.isbn.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q)
      );
    });
  }, [resourceQuery]);

  // Validation rules
  const isUserEligible = Boolean(
    selectedUser &&
      selectedUser.kind === 'NORMAL' &&
      selectedUser.status === 'ACTIVE'
  );

  const isResourceAvailable = Boolean(
    selectedResource && selectedResource.availableCopies > 0
  );

  const isDateValid = Boolean(
    checkoutDate &&
      dueDate &&
      dueDate > checkoutDate
  );

  const isFormValid = Boolean(
    selectedUser &&
      isUserEligible &&
      selectedResource &&
      isResourceAvailable &&
      isDateValid
  );

  const hasChanges = Boolean(
    selectedUser ||
      selectedResource ||
      userQuery.trim() ||
      resourceQuery.trim() ||
      dueDate ||
      notes.trim()
  );

  const handleRequestClose = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  const handleSelectUser = (u: ManagedUser) => {
    setSelectedUser(u);
    setUserQuery('');
  };

  const handleSelectResource = (r: Resource) => {
    setSelectedResource(r);
    setResourceQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || !isUserEligible) {
      userSearchRef.current?.focus();
      return;
    }

    if (!selectedResource || !isResourceAvailable) {
      return;
    }

    if (!isDateValid) {
      dateInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    // Calculate unique folio sequence
    const nextNum =
      Math.max(
        ...existingLoans.map((l) => {
          const match = l.folio.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        }),
        0
      ) + 1;

    const nextFolio = `PR-${String(nextNum).padStart(3, '0')}`;
    const nextId = `loan-${String(nextNum).padStart(3, '0')}`;

    const newLoan: Loan = {
      id: nextId,
      folio: nextFolio,
      userId: selectedUser.id,
      userName: selectedUser.fullName,
      userKind: selectedUser.kind,
      userCategory:
        selectedUser.kind === 'NORMAL'
          ? (selectedUser.category as NormalUserCategory)
          : 'STUDENT',
      userInitials:
        selectedUser.avatarInitials || getUserInitials(selectedUser.fullName),
      userAvatarColor: selectedUser.avatarColor || '#1E3A5F',
      resourceId: selectedResource.id,
      resourceTitle: selectedResource.title,
      resourceAuthor: selectedResource.author,
      checkoutDate: formatDisplayDate(checkoutDate),
      dueDate: formatDisplayDate(dueDate),
      dueDateNote: calculateDueNote(checkoutDate, dueDate),
      status: 'ACTIVE',
      renewalCount: 0,
      renewalLimit: 2,
      notes: notes.trim() || undefined,
    };

    // Update resource copy count locally in mock
    selectedResource.availableCopies = Math.max(
      0,
      selectedResource.availableCopies - 1
    );
    if (selectedResource.availableCopies === 0) {
      selectedResource.status = 'LOANED';
    }

    // Update user active loans count locally in mock
    selectedUser.activeLoans += 1;

    onSuccess(newLoan);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      size="large"
      title="Registrar nuevo préstamo"
      description="Selecciona al usuario y el recurso que se prestará."
      icon={<BookPlus size={18} />}
      closeButtonAriaLabel="Cerrar registro de préstamo"
      initialFocusRef={userSearchRef}
      footer={
        <div className="register-loan-footer-actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleRequestClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="register-loan-form"
            variant="primary"
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
            leftIcon={<BookPlus size={16} />}
          >
            Registrar préstamo
          </Button>
        </div>
      }
    >
      <div style={{ position: 'relative' }}>
        <form
          id="register-loan-form"
          className="register-loan-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* ================================================================
              SECCIÓN 1: SELECCIÓN DE USUARIO
             ================================================================ */}
          <section
            className="register-loan-section"
            aria-labelledby="section-user-title"
          >
            <div className="register-loan-section-header">
              <span className="register-loan-step-badge">1</span>
              <h3 id="section-user-title" className="register-loan-section-title">
                Usuario prestatario
              </h3>
            </div>

            {!selectedUser ? (
              <div className="register-loan-search-block">
                <div className="register-loan-search-input-wrapper">
                  <Search
                    size={16}
                    className="register-loan-search-icon"
                    aria-hidden="true"
                  />
                  <input
                    ref={userSearchRef}
                    type="search"
                    className="register-loan-search-input"
                    placeholder="Buscar por nombre, correo o matrícula..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    aria-label="Buscar usuario para el préstamo"
                  />
                  {userQuery && (
                    <button
                      type="button"
                      className="register-loan-search-clear"
                      onClick={() => setUserQuery('')}
                      aria-label="Limpiar búsqueda de usuarios"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div
                  className="register-loan-results-list"
                  role="listbox"
                  aria-label="Resultados de usuarios"
                >
                  {filteredUsers.length === 0 ? (
                    <div className="register-loan-no-results">
                      No se encontraron usuarios con "{userQuery}".
                    </div>
                  ) : (
                    filteredUsers.map((u) => {
                      const isAdm = u.kind === 'ADMINISTRATIVE';
                      const isInactive = u.status === 'INACTIVE';
                      const isSuspended = u.status === 'SUSPENDED';
                      const eligible = !isAdm && !isInactive && !isSuspended;

                      const initials = getUserInitials(
                        u.fullName,
                        u.avatarInitials
                      );

                      return (
                        <div
                          key={u.id}
                          className={`register-loan-user-row ${
                            !eligible ? 'register-loan-user-row--ineligible' : ''
                          }`}
                        >
                          <div
                            className="register-loan-user-avatar"
                            style={{
                              backgroundColor: u.avatarColor || '#1E3A5F',
                            }}
                            aria-hidden="true"
                          >
                            {initials}
                          </div>

                          <div className="register-loan-user-info">
                            <div className="register-loan-user-name-line">
                              <span className="register-loan-user-name">
                                {u.fullName}
                              </span>
                              <UserTypeBadge user={u} />
                              <UserStatusBadge user={u} />
                            </div>
                            <div className="register-loan-user-meta-line">
                              <span>{u.email}</span>
                              <span className="register-loan-separator">•</span>
                              <span className="register-loan-code-pill">
                                {u.borrowerCode}
                              </span>
                            </div>

                            {!eligible && (
                              <div
                                className="register-loan-ineligible-reason"
                                role="alert"
                              >
                                <AlertCircle size={12} aria-hidden="true" />
                                <span>
                                  {isAdm
                                    ? 'Cuentas administrativas no pueden recibir préstamos.'
                                    : isSuspended
                                    ? 'Usuario suspendido: no elegible para préstamos.'
                                    : 'Usuario inactivo: no elegible para préstamos.'}
                                </span>
                              </div>
                            )}
                          </div>

                          <Button
                            type="button"
                            size="sm"
                            variant={eligible ? 'primary' : 'outline'}
                            disabled={!eligible}
                            onClick={() => handleSelectUser(u)}
                            aria-label={`Seleccionar a ${u.fullName}`}
                          >
                            Seleccionar
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              <div className="register-loan-selected-card">
                <div
                  className="register-loan-user-avatar"
                  style={{
                    backgroundColor: selectedUser.avatarColor || '#1E3A5F',
                  }}
                  aria-hidden="true"
                >
                  {getUserInitials(
                    selectedUser.fullName,
                    selectedUser.avatarInitials
                  )}
                </div>

                <div className="register-loan-selected-info">
                  <div className="register-loan-user-name-line">
                    <h4 className="register-loan-selected-title">
                      {selectedUser.fullName}
                    </h4>
                    <UserTypeBadge user={selectedUser} />
                    <UserStatusBadge user={selectedUser} />
                  </div>
                  <p className="register-loan-selected-sub">
                    {selectedUser.email} • Matrícula/Código:{' '}
                    <strong>{selectedUser.borrowerCode}</strong>
                  </p>
                  {selectedUser.kind === 'NORMAL' &&
                    selectedUser.category === 'ROOM' &&
                    selectedUser.roomResponsibleName && (
                      <p className="register-loan-selected-sub">
                        Responsable de sala:{' '}
                        <strong>{selectedUser.roomResponsibleName}</strong>
                      </p>
                    )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon={<RefreshCw size={13} />}
                  onClick={() => setSelectedUser(null)}
                  aria-label="Cambiar usuario seleccionado"
                >
                  Cambiar
                </Button>
              </div>
            )}
          </section>

          {/* ================================================================
              SECCIÓN 2: SELECCIÓN DE RECURSO BIBLIOGRÁFICO
             ================================================================ */}
          <section
            className="register-loan-section"
            aria-labelledby="section-resource-title"
          >
            <div className="register-loan-section-header">
              <span className="register-loan-step-badge">2</span>
              <h3
                id="section-resource-title"
                className="register-loan-section-title"
              >
                Recurso bibliográfico
              </h3>
            </div>

            {!selectedResource ? (
              <div className="register-loan-search-block">
                <div className="register-loan-search-input-wrapper">
                  <Search
                    size={16}
                    className="register-loan-search-icon"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    className="register-loan-search-input"
                    placeholder="Buscar por título, autor, ISBN o código de inventario..."
                    value={resourceQuery}
                    onChange={(e) => setResourceQuery(e.target.value)}
                    aria-label="Buscar recurso bibliográfico para prestar"
                  />
                  {resourceQuery && (
                    <button
                      type="button"
                      className="register-loan-search-clear"
                      onClick={() => setResourceQuery('')}
                      aria-label="Limpiar búsqueda de recursos"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div
                  className="register-loan-results-list"
                  role="listbox"
                  aria-label="Resultados de libros y recursos"
                >
                  {filteredResources.length === 0 ? (
                    <div className="register-loan-no-results">
                      No se encontraron libros con "{resourceQuery}".
                    </div>
                  ) : (
                    filteredResources.map((r) => {
                      const isAvailable = r.availableCopies > 0;
                      const coverInitials =
                        r.coverInitials || r.title.slice(0, 2).toUpperCase();

                      return (
                        <div
                          key={r.id}
                          className={`register-loan-resource-row ${
                            !isAvailable
                              ? 'register-loan-resource-row--unavailable'
                              : ''
                          }`}
                        >
                          <div
                            className="register-loan-book-thumb"
                            style={{ backgroundColor: r.coverColor || '#2F80ED' }}
                            aria-hidden="true"
                          >
                            <span>{coverInitials}</span>
                          </div>

                          <div className="register-loan-resource-info">
                            <div className="register-loan-resource-title-line">
                              <span className="register-loan-resource-title">
                                {r.title}
                              </span>
                              <span className="register-loan-category-pill">
                                {r.categoryLabel}
                              </span>
                            </div>
                            <div className="register-loan-resource-author">
                              por {r.author}
                            </div>
                            <div className="register-loan-resource-meta-line">
                              <span>ISBN: {r.isbn}</span>
                              <span className="register-loan-separator">•</span>
                              <span>Código: {r.code}</span>
                              <span className="register-loan-separator">•</span>
                              <span className="register-loan-location">
                                <MapPin size={11} aria-hidden="true" />
                                {r.location}
                              </span>
                            </div>

                            <div className="register-loan-avail-line">
                              {isAvailable ? (
                                <span className="register-loan-avail-badge">
                                  <CheckCircle2 size={12} aria-hidden="true" />
                                  {r.availableCopies} ejemplares disponibles
                                </span>
                              ) : (
                                <span className="register-loan-unavail-badge">
                                  <AlertCircle size={12} aria-hidden="true" />
                                  Sin existencias disponibles
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            type="button"
                            size="sm"
                            variant={isAvailable ? 'primary' : 'outline'}
                            disabled={!isAvailable}
                            onClick={() => handleSelectResource(r)}
                            aria-label={`Seleccionar libro ${r.title}`}
                          >
                            {isAvailable ? 'Seleccionar' : 'No disponible'}
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              /* Selected Book Card conforming to Figma visual pattern */
              <div className="register-loan-selected-book-card">
                <div
                  className="register-loan-selected-book-cover"
                  style={{
                    backgroundColor: selectedResource.coverColor || '#2F80ED',
                  }}
                  aria-hidden="true"
                >
                  <BookOpen size={24} color="#FFFFFF" />
                  <span className="register-loan-selected-book-initials">
                    {selectedResource.coverInitials ||
                      selectedResource.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="register-loan-selected-book-details">
                  <span className="register-loan-category-pill">
                    {selectedResource.categoryLabel}
                  </span>
                  <h4 className="register-loan-selected-book-title">
                    {selectedResource.title}
                  </h4>
                  <p className="register-loan-selected-book-author">
                    {selectedResource.author}
                  </p>

                  <div className="register-loan-selected-book-meta">
                    <div>
                      <span className="register-loan-meta-key">ISBN:</span>{' '}
                      {selectedResource.isbn}
                    </div>
                    <div>
                      <span className="register-loan-meta-key">Código:</span>{' '}
                      {selectedResource.code}
                    </div>
                    <div>
                      <span className="register-loan-meta-key">Ubicación:</span>{' '}
                      {selectedResource.location}
                    </div>
                  </div>

                  <div className="register-loan-avail-line" style={{ marginTop: 6 }}>
                    <span className="register-loan-avail-badge">
                      <CheckCircle2 size={12} aria-hidden="true" />
                      {selectedResource.availableCopies} ejemplares disponibles
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon={<RefreshCw size={13} />}
                  onClick={() => setSelectedResource(null)}
                  aria-label="Cambiar libro seleccionado"
                >
                  Cambiar
                </Button>
              </div>
            )}
          </section>

          {/* ================================================================
              SECCIÓN 3: FECHAS DEL PRÉSTAMO
             ================================================================ */}
          <section
            className="register-loan-section"
            aria-labelledby="section-dates-title"
          >
            <div className="register-loan-section-header">
              <span className="register-loan-step-badge">3</span>
              <h3
                id="section-dates-title"
                className="register-loan-section-title"
              >
                Fechas del préstamo
              </h3>
            </div>

            <div className="register-loan-dates-grid">
              <div className="register-loan-field-group">
                <label
                  htmlFor="loan-checkout-date"
                  className="register-loan-field-label"
                >
                  <Calendar size={13} aria-hidden="true" />
                  Fecha de entrega del préstamo
                </label>
                <input
                  id="loan-checkout-date"
                  type="date"
                  className="register-loan-date-input"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                  required
                />
                <span className="register-loan-field-helper">
                  Fecha en la que el usuario recibe el ejemplar.
                </span>
              </div>

              <div className="register-loan-field-group">
                <label
                  htmlFor="loan-due-date"
                  className="register-loan-field-label"
                >
                  <Clock size={13} aria-hidden="true" />
                  Fecha límite de devolución *
                </label>
                <input
                  ref={dateInputRef}
                  id="loan-due-date"
                  type="date"
                  className={`register-loan-date-input ${
                    dueDate && dueDate <= checkoutDate
                      ? 'register-loan-date-input--error'
                      : ''
                  }`}
                  value={dueDate}
                  min={checkoutDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                {dueDate && dueDate <= checkoutDate ? (
                  <span className="register-loan-field-error">
                    La fecha límite debe ser posterior a la fecha de entrega.
                  </span>
                ) : (
                  <span className="register-loan-field-helper">
                    {dueDate
                      ? `Plazo: ${calculateDueNote(checkoutDate, dueDate)} (${formatDisplayDate(dueDate)})`
                      : 'Selecciona una fecha límite en el calendario.'}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* ================================================================
              SECCIÓN 4: OBSERVACIONES (OPCIONAL)
             ================================================================ */}
          <section
            className="register-loan-section"
            aria-labelledby="section-notes-title"
          >
            <div className="register-loan-section-header">
              <span className="register-loan-step-badge">4</span>
              <h3
                id="section-notes-title"
                className="register-loan-section-title"
              >
                Observaciones (opcional)
              </h3>
            </div>

            <div className="register-loan-field-group">
              <textarea
                id="loan-notes"
                className="register-loan-textarea"
                rows={2}
                maxLength={250}
                placeholder="Indica detalles sobre el estado del ejemplar o notas adicionales..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                aria-label="Observaciones del préstamo"
              />
              <div className="register-loan-char-counter">
                {notes.length} / 250 caracteres
              </div>
            </div>
          </section>
        </form>

        {/* Confirmation overlay when discarding unsaved loan data */}
        {showDiscardConfirm && (
          <div
            className="register-loan-discard-overlay"
            role="alertdialog"
            aria-labelledby="discard-loan-title"
            aria-describedby="discard-loan-desc"
          >
            <div className="register-loan-discard-card">
              <div className="register-loan-discard-header">
                <div className="register-loan-discard-icon" aria-hidden="true">
                  <AlertTriangle size={20} />
                </div>
                <h4
                  id="discard-loan-title"
                  className="register-loan-discard-title"
                >
                  ¿Descartar préstamo?
                </h4>
              </div>
              <p id="discard-loan-desc" className="register-loan-discard-text">
                Se perderá la información capturada.
              </p>
              <div className="register-loan-discard-actions">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDiscardConfirm(false)}
                >
                  Seguir registrando
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  leftIcon={<RotateCcw size={14} />}
                  onClick={handleConfirmDiscard}
                >
                  Descartar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export const LoanFormModal = RegisterLoanModal;

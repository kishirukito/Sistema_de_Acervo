import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
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
  Info,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { UserTypeBadge } from '../../features/users/components/UserTypeBadge';
import { UserStatusBadge } from '../../features/users/components/UserStatusBadge';
import { MOCK_MANAGED_USERS } from '../../features/users/users.mock';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import type { ManagedUser } from '../../features/users/users.types';
import type { Resource } from '../../features/catalog/catalog.types';
import {
  getTodayIsoString,
  formatDisplayDate,
  calculateDueNote,
  getUserInitials,
  executeCreateLoan,
} from '../../features/loans/loans.service';
import './AdminNewLoanPage.css';

export const AdminNewLoanPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleRequestCancel = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      navigate('/admin/loans');
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    navigate('/admin/loans');
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

    const newLoan = executeCreateLoan({
      user: selectedUser,
      resource: selectedResource,
      checkoutDateIso: checkoutDate,
      dueDateIso: dueDate,
      notes: notes.trim() || undefined,
    });

    // Navigate to dedicated success screen
    navigate(`/admin/loans/${newLoan.id}/success`, {
      state: { loanId: newLoan.id },
      replace: true,
    });
  };

  return (
    <div className="new-loan-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Miga de pan" className="new-loan-breadcrumb">
        <button
          type="button"
          onClick={handleRequestCancel}
          className="new-loan-breadcrumb-link"
        >
          Préstamos
        </button>
        <span className="new-loan-breadcrumb-sep">/</span>
        <span className="new-loan-breadcrumb-current">Nuevo préstamo</span>
      </nav>

      {/* Page Header */}
      <div className="new-loan-header">
        <div className="new-loan-header-titles">
          <h1 className="new-loan-title">Registrar nuevo préstamo</h1>
          <p className="new-loan-subtitle">
            Selecciona al usuario y el recurso que se prestará.
          </p>
        </div>

        <Button
          variant="outline"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handleRequestCancel}
          aria-label="Volver a la lista de préstamos"
        >
          Volver a préstamos
        </Button>
      </div>

      {/* Main Form Grid */}
      <form
        id="register-loan-full-form"
        className="new-loan-grid"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Left Column: Selection Sections */}
        <div className="new-loan-col-main">
          {/* Card 1: Usuario prestatario */}
          <Card>
            <CardHeader
              title="1. Usuario prestatario"
              subtitle="Selecciona la persona habilitada para solicitar el material"
            />
            <CardBody>
              <div className="new-loan-card-section">
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
                      style={{ maxHeight: 240 }}
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
                          const initials = getUserInitials(u.fullName, u.avatarInitials);

                          return (
                            <div
                              key={u.id}
                              className={`register-loan-user-row ${
                                !eligible ? 'register-loan-user-row--ineligible' : ''
                              }`}
                            >
                              <div
                                className="register-loan-user-avatar"
                                style={{ backgroundColor: u.avatarColor || '#1E3A5F' }}
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
                      style={{ backgroundColor: selectedUser.avatarColor || '#1E3A5F' }}
                      aria-hidden="true"
                    >
                      {getUserInitials(selectedUser.fullName, selectedUser.avatarInitials)}
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
              </div>
            </CardBody>
          </Card>

          {/* Card 2: Recurso bibliográfico */}
          <Card>
            <CardHeader
              title="2. Recurso bibliográfico"
              subtitle="Busca y elige el libro físico disponible en inventario"
            />
            <CardBody>
              <div className="new-loan-card-section">
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
                        placeholder="Buscar por título, autor, ISBN o código..."
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
                      style={{ maxHeight: 240 }}
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
                                !isAvailable ? 'register-loan-resource-row--unavailable' : ''
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
                  <div className="register-loan-selected-book-card">
                    <div
                      className="register-loan-selected-book-cover"
                      style={{ backgroundColor: selectedResource.coverColor || '#2F80ED' }}
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
              </div>
            </CardBody>
          </Card>

          {/* Card 3: Fechas y Observaciones */}
          <Card>
            <CardHeader
              title="3. Fechas y observaciones"
              subtitle="Establece el período de préstamo y notas adicionales"
            />
            <CardBody>
              <div className="new-loan-card-section">
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

                {/* Observaciones */}
                <div className="register-loan-field-group" style={{ marginTop: '0.5rem' }}>
                  <label htmlFor="loan-notes" className="register-loan-field-label">
                    Observaciones (opcional)
                  </label>
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
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Resumen del Préstamo & Acciones */}
        <div className="new-loan-col-side">
          <Card>
            <CardHeader
              title="Resumen del préstamo"
              subtitle="Verificación antes del registro"
            />
            <CardBody>
              <div className="new-loan-summary-box">
                {/* Status Badge */}
                <div className="new-loan-summary-badge-row">
                  <span className="new-loan-summary-label">Estado inicial</span>
                  <span className="new-loan-summary-badge">
                    <span className="new-loan-summary-badge-dot" aria-hidden="true" />
                    Activo
                  </span>
                </div>

                {/* Summary Key-Values */}
                <div className="new-loan-summary-list">
                  <div className="new-loan-summary-item">
                    <span className="new-loan-summary-label">Usuario</span>
                    {selectedUser ? (
                      <span className="new-loan-summary-val">
                        <Check size={14} color="#16A34A" />
                        {selectedUser.fullName}
                      </span>
                    ) : (
                      <span className="new-loan-summary-val new-loan-summary-val--empty">
                        Sin seleccionar
                      </span>
                    )}
                  </div>

                  <div className="new-loan-summary-item">
                    <span className="new-loan-summary-label">Recurso</span>
                    {selectedResource ? (
                      <span className="new-loan-summary-val">
                        <Check size={14} color="#16A34A" />
                        {selectedResource.title}
                      </span>
                    ) : (
                      <span className="new-loan-summary-val new-loan-summary-val--empty">
                        Sin seleccionar
                      </span>
                    )}
                  </div>

                  <div className="new-loan-summary-item">
                    <span className="new-loan-summary-label">Fecha de préstamo</span>
                    <span className="new-loan-summary-val">
                      {formatDisplayDate(checkoutDate)}
                    </span>
                  </div>

                  <div className="new-loan-summary-item">
                    <span className="new-loan-summary-label">Fecha límite</span>
                    {dueDate && dueDate > checkoutDate ? (
                      <span className="new-loan-summary-val" style={{ color: '#166534' }}>
                        {formatDisplayDate(dueDate)}
                      </span>
                    ) : (
                      <span className="new-loan-summary-val new-loan-summary-val--empty">
                        Por definir
                      </span>
                    )}
                  </div>

                  {dueDate && dueDate > checkoutDate && (
                    <div className="new-loan-summary-item">
                      <span className="new-loan-summary-label">Plazo estipulado</span>
                      <span className="new-loan-summary-val">
                        {calculateDueNote(checkoutDate, dueDate)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Information Notice */}
                <div className="new-loan-summary-notice">
                  <Info size={16} className="new-loan-summary-notice-icon" aria-hidden="true" />
                  <span>
                    Al confirmar, se creará un préstamo con folio único y se descontará un ejemplar físico del catálogo.
                  </span>
                </div>

                {/* Form Actions */}
                <div className="new-loan-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="new-loan-submit-btn"
                    disabled={!isFormValid || isSubmitting}
                    isLoading={isSubmitting}
                    leftIcon={<BookPlus size={16} />}
                  >
                    Registrar préstamo
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="new-loan-cancel-btn"
                    onClick={handleRequestCancel}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>

      {/* Discard Changes Confirmation Modal */}
      <Modal
        open={showDiscardConfirm}
        onClose={() => setShowDiscardConfirm(false)}
        role="alertdialog"
        size="small"
        title="¿Descartar préstamo?"
        description="Se perderá la información capturada."
        icon={<AlertTriangle size={18} />}
        closeButtonAriaLabel="Cerrar confirmación"
        footer={
          <div className="new-loan-discard-footer">
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
        }
      >
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
          Has capturado información para un nuevo préstamo. Si sales ahora, los cambios no se guardarán.
        </p>
      </Modal>
    </div>
  );
};

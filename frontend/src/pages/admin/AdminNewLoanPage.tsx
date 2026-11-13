import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  Building2,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { UserTypeBadge } from '../../features/users/components/UserTypeBadge';
import { UserStatusBadge } from '../../features/users/components/UserStatusBadge';
import type { ManagedUser } from '../../features/users/users.types';
import type { Resource } from '../../features/catalog/catalog.types';
import type { LoanType, InstitucionConvenio } from '../../features/loans/loans.types';
import { fetchManagedUsers } from '../../services/api/users-managed.service';
import { fetchCatalogResources } from '../../services/api/catalog.service';
import {
  fetchLoanTypes,
  fetchInstituciones,
  createInstitucion,
} from '../../services/api/loans-admin.service';
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

  // Loaded database data
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [instituciones, setInstituciones] = useState<InstitucionConvenio[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Form selections and state
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null);

  // Modo Interbibliotecario
  const [selectedInstitucionId, setSelectedInstitucionId] = useState<string>('');
  const [responsableExternoNombre, setResponsableExternoNombre] = useState<string>('');
  const [responsableExternoCargo, setResponsableExternoCargo] = useState<string>('');
  const [responsableExternoContacto, setResponsableExternoContacto] = useState<string>('');
  const [folioOficio, setFolioOficio] = useState<string>('');

  // Modal para agregar nueva institución rápido
  const [showAddInstModal, setShowAddInstModal] = useState(false);
  const [newInstNombre, setNewInstNombre] = useState('');
  const [newInstBiblioteca, setNewInstBiblioteca] = useState('');
  const [newInstTitular, setNewInstTitular] = useState('');
  const [newInstEmail, setNewInstEmail] = useState('');
  const [newInstTelefono, setNewInstTelefono] = useState('');
  const [isSavingInst, setIsSavingInst] = useState(false);

  // Modo normal (Alumnos / Docentes)
  const [userQuery, setUserQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const [resourceQuery, setResourceQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const [checkoutDate, setCheckoutDate] = useState(getTodayIsoString());
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInterbibliotecario = selectedLoanType?.clave === 'interbibliotecario' || selectedLoanType?.requiere_convenio;

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoadingData(true);
      try {
        const [usersData, resourcesData, typesData, instData] = await Promise.all([
          fetchManagedUsers(),
          fetchCatalogResources(),
          fetchLoanTypes(),
          fetchInstituciones(),
        ]);
        if (isMounted) {
          setUsers(usersData);
          setResources(resourcesData);
          setLoanTypes(typesData);
          setInstituciones(instData);

          if (typesData.length > 0) {
            const defaultType = typesData.find((t: LoanType) => t.clave === 'domicilio') || typesData[0];
            setSelectedLoanType(defaultType);

            // Calcular fecha sugerida según dias_plazo_default
            const today = new Date();
            const due = new Date(today.getTime() + (defaultType.dias_plazo_default || 3) * 86400000);
            setDueDate(due.toISOString().split('T')[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching loan form data:', err);
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Recalcular fecha límite cuando cambia el tipo de préstamo
  const handleTypeChange = (typeId: string) => {
    const found = loanTypes.find((t) => t.id === typeId);
    if (!found) return;
    setSelectedLoanType(found);
    const start = checkoutDate ? new Date(checkoutDate) : new Date();
    const plazo = found.dias_plazo_default || 3;
    const due = new Date(start.getTime() + plazo * 86400000);
    setDueDate(due.toISOString().split('T')[0]);
  };

  // Filter users based on query with accent-insensitivity
  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return users;
    const normalizedQ = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return users.filter((u) => {
      const normalizedName = (u.fullName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const email = (u.email || '').toLowerCase();
      const code = (u.borrowerCode || '').toLowerCase();
      return (
        normalizedName.includes(normalizedQ) ||
        normalizedName.includes(q) ||
        email.includes(q) ||
        code.includes(q)
      );
    });
  }, [userQuery, users]);

  // Filter resources based on query with accent-insensitivity
  const filteredResources = useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    if (!q) return resources;
    const normalizedQ = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return resources.filter((r) => {
      const normalizedTitle = (r.title || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedAuthor = (r.author || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const isbn = (r.isbn || '').toLowerCase();
      const code = (r.code || '').toLowerCase();
      return (
        normalizedTitle.includes(normalizedQ) ||
        normalizedAuthor.includes(normalizedQ) ||
        isbn.includes(q) ||
        code.includes(q)
      );
    });
  }, [resourceQuery, resources]);

  // Validation rules
  const isUserEligible = isInterbibliotecario
    ? Boolean(selectedInstitucionId && responsableExternoNombre.trim())
    : Boolean(
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
      selectedInstitucionId ||
      responsableExternoNombre.trim() ||
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

  const handleCreateNewInstitucion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstNombre.trim()) return;
    setIsSavingInst(true);
    try {
      const created = await createInstitucion({
        nombre: newInstNombre.trim(),
        nombre_biblioteca: newInstBiblioteca.trim() || undefined,
        responsable_titular: newInstTitular.trim() || undefined,
        responsable_email: newInstEmail.trim() || undefined,
        responsable_telefono: newInstTelefono.trim() || undefined,
      });
      setInstituciones((prev) => [...prev, created]);
      setSelectedInstitucionId(created.id);
      if (newInstTitular.trim() && !responsableExternoNombre.trim()) {
        setResponsableExternoNombre(newInstTitular.trim());
      }
      setShowAddInstModal(false);
      setNewInstNombre('');
      setNewInstBiblioteca('');
      setNewInstTitular('');
      setNewInstEmail('');
      setNewInstTelefono('');
    } catch (err: any) {
      alert(err.message || 'Error al guardar la institución');
    } finally {
      setIsSavingInst(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUserEligible) {
      if (!isInterbibliotecario) {
        userSearchRef.current?.focus();
      }
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

    try {
      // Find available physical copy (ejemplar)
      const availableCopy = selectedResource.ejemplares?.find((ej) => ej.estado === 'disponible');
      const ejemplarId = availableCopy ? availableCopy.id : undefined;

      const token = localStorage.getItem('acervo_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Payload adaptado según modalidad
      const payload: any = {
        ejemplar_id: ejemplarId || selectedResource.id,
        tipo_prestamo_id: selectedLoanType?.id,
        fecha_prestamo: checkoutDate ? new Date(checkoutDate).toISOString() : new Date().toISOString(),
        fecha_limite_devolucion: dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 7 * 86400000).toISOString(),
        estado: 'activo',
        notas: notes.trim() || undefined,
      };

      if (isInterbibliotecario) {
        payload.institucion_id = selectedInstitucionId;
        payload.responsable_externo_nombre = responsableExternoNombre.trim();
        payload.responsable_externo_cargo = responsableExternoCargo.trim() || undefined;
        payload.responsable_externo_contacto = responsableExternoContacto.trim() || undefined;
        payload.folio_oficio = folioOficio.trim() || undefined;
        payload.usuario_id = null;
      } else {
        payload.usuario_id = selectedUser?.id;
      }

      const res = await fetch('/api/v1/data/prestamos', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      let realLoanId: string | undefined;
      if (res.ok) {
        const created = await res.json();
        realLoanId = created?.id;
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Error al guardar el préstamo en el servidor');
      }

      // Also create local record for client state synchronicity
      const selectedInst = instituciones.find((i) => i.id === selectedInstitucionId);
      const userProxy: any = isInterbibliotecario
        ? {
            id: selectedInstitucionId,
            fullName: selectedInst ? selectedInst.nombre : 'Institución Externa',
            email: responsableExternoContacto || 'convenio@institucion.edu',
            kind: 'NORMAL',
            category: 'EXTERNAL',
            status: 'ACTIVE',
            borrowerCode: folioOficio || 'CONVENIO',
          }
        : selectedUser!;

      const newLoan = executeCreateLoan({
        user: userProxy,
        resource: selectedResource,
        checkoutDateIso: checkoutDate,
        dueDateIso: dueDate,
        notes: notes.trim() || undefined,
      });

      navigate(`/admin/loans/${newLoan.id}/success`, {
        state: { loanId: newLoan.id, realId: realLoanId },
        replace: true,
      });
    } catch (err: any) {
      console.error('Error submitting loan to backend:', err);
      alert(err.message || 'Error al procesar el registro del préstamo');
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Card 0: Modalidad de Préstamo */}
          <Card>
            <CardHeader
              title="Modalidad de préstamo"
              subtitle="Selecciona el tipo de préstamo autorizado en el sistema"
            />
            <CardBody>
              <div className="new-loan-card-section">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {loanTypes.map((lt) => {
                    const isSelected = selectedLoanType?.id === lt.id;
                    return (
                      <div
                        key={lt.id}
                        onClick={() => handleTypeChange(lt.id)}
                        style={{
                          border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? '#1E40AF' : '#1E293B' }}>
                            {lt.nombre}
                          </span>
                          {isSelected && <CheckCircle2 size={16} color="#2563EB" />}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          Plazo: <strong>{lt.dias_plazo_default} días</strong> {lt.requiere_convenio ? '• Requiere Convenio' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 1: Solicitante (Usuario interno o Institución Convenio) */}
          <Card>
            <CardHeader
              title={isInterbibliotecario ? "1. Institución y responsable externo" : "1. Usuario prestatario"}
              subtitle={isInterbibliotecario ? "Selecciona la universidad/biblioteca en convenio y los datos del responsable" : "Selecciona la persona habilitada para solicitar el material"}
            />
            <CardBody>
              <div className="new-loan-card-section">
                {isInterbibliotecario ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="register-loan-field-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <label className="register-loan-field-label">
                          <Building2 size={13} /> Universidad / Biblioteca en convenio *
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus size={13} />}
                          onClick={() => setShowAddInstModal(true)}
                        >
                          Nueva institución
                        </Button>
                      </div>
                      <select
                        className="register-loan-date-input"
                        value={selectedInstitucionId}
                        onChange={(e) => {
                          setSelectedInstitucionId(e.target.value);
                          const inst = instituciones.find((i) => i.id === e.target.value);
                          if (inst && inst.responsable_titular && !responsableExternoNombre) {
                            setResponsableExternoNombre(inst.responsable_titular);
                          }
                          if (inst && inst.responsable_email && !responsableExternoContacto) {
                            setResponsableExternoContacto(inst.responsable_email);
                          }
                        }}
                        required
                      >
                        <option value="">-- Selecciona una institución en convenio --</option>
                        {instituciones.map((inst) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.nombre} {inst.nombre_biblioteca ? `(${inst.nombre_biblioteca})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                      <div className="register-loan-field-group">
                        <label className="register-loan-field-label">Nombre del responsable externo *</label>
                        <input
                          type="text"
                          className="register-loan-search-input"
                          placeholder="Ej. Dra. Martha Elena Ruiz"
                          value={responsableExternoNombre}
                          onChange={(e) => setResponsableExternoNombre(e.target.value)}
                          required
                        />
                      </div>
                      <div className="register-loan-field-group">
                        <label className="register-loan-field-label">Cargo o puesto</label>
                        <input
                          type="text"
                          className="register-loan-search-input"
                          placeholder="Ej. Coordinadora de Biblioteca"
                          value={responsableExternoCargo}
                          onChange={(e) => setResponsableExternoCargo(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                      <div className="register-loan-field-group">
                        <label className="register-loan-field-label">Contacto (correo o teléfono)</label>
                        <input
                          type="text"
                          className="register-loan-search-input"
                          placeholder="Ej. biblioteca@itdurango.edu.mx"
                          value={responsableExternoContacto}
                          onChange={(e) => setResponsableExternoContacto(e.target.value)}
                        />
                      </div>
                      <div className="register-loan-field-group">
                        <label className="register-loan-field-label">Folio de oficio o solicitud</label>
                        <input
                          type="text"
                          className="register-loan-search-input"
                          placeholder="Ej. OFICIO-PI-2026-088"
                          value={folioOficio}
                          onChange={(e) => setFolioOficio(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
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
                      {isLoadingData ? (
                        <div className="register-loan-no-results">
                          Cargando usuarios de la base de datos...
                        </div>
                      ) : filteredUsers.length === 0 ? (
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
                      {isLoadingData ? (
                        <div className="register-loan-no-results">
                          Cargando catálogo de la base de datos...
                        </div>
                      ) : filteredResources.length === 0 ? (
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
                    <span className="new-loan-summary-label">Modalidad</span>
                    <span className="new-loan-summary-val" style={{ fontWeight: 600 }}>
                      {selectedLoanType?.nombre || 'General'}
                    </span>
                  </div>

                  <div className="new-loan-summary-item">
                    <span className="new-loan-summary-label">{isInterbibliotecario ? 'Institución / Resp.' : 'Usuario'}</span>
                    {isInterbibliotecario ? (
                      selectedInstitucionId && responsableExternoNombre.trim() ? (
                        <span className="new-loan-summary-val" style={{ color: '#7C3AED' }}>
                          <Check size={14} color="#7C3AED" />
                          {instituciones.find((i) => i.id === selectedInstitucionId)?.nombre} ({responsableExternoNombre})
                        </span>
                      ) : (
                        <span className="new-loan-summary-val new-loan-summary-val--empty">
                          Incompleto
                        </span>
                      )
                    ) : selectedUser ? (
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

      {/* Modal para Registrar Nueva Institución Convenio */}
      <Modal
        open={showAddInstModal}
        onClose={() => setShowAddInstModal(false)}
        size="medium"
        title="Nueva institución en convenio"
        description="Registra una universidad o biblioteca externa autorizada"
        icon={<Building2 size={18} />}
        closeButtonAriaLabel="Cerrar ventana de institución"
      >
        <form onSubmit={handleCreateNewInstitucion} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Nombre de la institución / universidad *</label>
            <input
              type="text"
              required
              placeholder="Ej. Instituto Tecnológico de Durango"
              value={newInstNombre}
              onChange={(e) => setNewInstNombre(e.target.value)}
              className="register-loan-search-input"
              style={{ width: '100%', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Nombre de la biblioteca o centro de información</label>
            <input
              type="text"
              placeholder="Ej. Centro de Información Ing. José Gutiérrez"
              value={newInstBiblioteca}
              onChange={(e) => setNewInstBiblioteca(e.target.value)}
              className="register-loan-search-input"
              style={{ width: '100%', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Titular / Responsable</label>
              <input
                type="text"
                placeholder="Ej. Dra. Martha Elena Ruiz"
                value={newInstTitular}
                onChange={(e) => setNewInstTitular(e.target.value)}
                className="register-loan-search-input"
                style={{ width: '100%', marginTop: '0.25rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Teléfono</label>
              <input
                type="text"
                placeholder="Ej. 618 123 4567"
                value={newInstTelefono}
                onChange={(e) => setNewInstTelefono(e.target.value)}
                className="register-loan-search-input"
                style={{ width: '100%', marginTop: '0.25rem' }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Correo electrónico de contacto</label>
            <input
              type="email"
              placeholder="Ej. biblioteca@itdurango.edu.mx"
              value={newInstEmail}
              onChange={(e) => setNewInstEmail(e.target.value)}
              className="register-loan-search-input"
              style={{ width: '100%', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddInstModal(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSavingInst}
              leftIcon={<Plus size={14} />}
            >
              Guardar institución
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

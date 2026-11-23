import React, { useState, useMemo } from 'react';
import {
  Plus,
  SearchX,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  CalendarCog,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { UsersMetrics } from '../../features/users/components/UsersMetrics';
import { UserClassificationTabs } from '../../features/users/components/UserClassificationTabs';
import { UsersToolbar } from '../../features/users/components/UsersToolbar';
import { UsersTable } from '../../features/users/components/UsersTable';
import { UsersPagination } from '../../features/users/components/UsersPagination';
import { RegisterUserModal } from '../../features/users/components/RegisterUserModal';
import { UserDetailModal } from '../../features/users/components/UserDetailModal';
import { UserStatusModal } from '../../features/users/components/UserStatusModal';
import { BulkImportUsersModal } from '../../features/users/components/BulkImportUsersModal';
import { GenerationConfigModal } from '../../features/users/components/GenerationConfigModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { MOCK_MANAGED_USERS } from '../../features/users/users.mock';
import {
  updateManagedUser,
  createManagedUser,
} from '../../services/api/users-managed.service';
import {
  useAdminUsers,
  deriveUsersMetrics,
  invalidateAdminUsers,
  ADMIN_USERS_KEY,
} from '../../features/users/users.query';
import {
  extractGeneration,
  getAvailableGenerations,
} from '../../features/users/users.generation';
import type {
  ManagedUser,
  UsersFilterState,
  UserClassification,
  UserStatus,
} from '../../features/users/users.types';
import '../../features/users/users.css';

const INITIAL_FILTERS: UsersFilterState = {
  searchQuery: '',
  classification: 'ALL',
  generation: '',
  status: '',
};

export const UsersPage: React.FC = () => {
  const queryClient = useQueryClient();

  // ── React Query: lista de usuarios con caché de 2 minutos ────────────────
  const { data: usersList = [], isLoading } = useAdminUsers();

  // KPIs derivados de la misma consulta — sin segunda petición a /api/v1/data/usuarios
  const metrics = useMemo(() => deriveUsersMetrics(usersList), [usersList]);

  // Generaciones detectadas en los usuarios disponibles
  const availableGenerations = useMemo(
    () => getAvailableGenerations(usersList),
    [usersList]
  );

  const [filters, setFilters] = useState<UsersFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState<boolean>(false);
  const [isGenConfigOpen, setIsGenConfigOpen] = useState<boolean>(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState<ManagedUser | null>(null);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [statusTargetUser, setStatusTargetUser] = useState<ManagedUser | null>(null);

  const itemsPerPage = 8;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastType(type);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 4500);
  };

  const handleClassificationChange = (newClassification: UserClassification) => {
    setFilters((prev) => ({
      ...prev,
      classification: newClassification,
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: UsersFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Filtrado compuesto: Clasificación + Generación + Búsqueda + Estado
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      // 1. Clasificación por Tipo de Usuario
      if (filters.classification && filters.classification !== 'ALL') {
        switch (filters.classification) {
          case 'STUDENT':
            if (user.kind !== 'NORMAL' || (user.category && user.category !== 'STUDENT')) {
              return false;
            }
            break;
          case 'TEACHER':
            if (user.kind !== 'NORMAL' || user.category !== 'TEACHER') {
              return false;
            }
            break;
          case 'ADMINISTRATIVE':
            if (user.kind !== 'ADMINISTRATIVE') {
              return false;
            }
            break;
          case 'GRADUATE':
            if (user.kind !== 'NORMAL' || user.category !== 'GRADUATE') {
              return false;
            }
            break;
          case 'EXTERNAL':
            if (user.kind !== 'NORMAL' || user.category !== 'EXTERNAL') {
              return false;
            }
            break;
          default:
            break;
        }
      }

      // 2. Filtro por Generación (derivada de la matrícula)
      if (filters.generation) {
        const genYear = parseInt(filters.generation, 10);
        const userGen = extractGeneration(user.matricula || user.borrowerCode);
        if (!userGen || userGen.year !== genYear) {
          return false;
        }
      }

      // 3. Search Query (Nombre, Matrícula/Código, Correo, Teléfono, Carrera/Área)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = user.fullName.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesPhone = Boolean(user.phone && user.phone.toLowerCase().includes(query));
        const matchesCode = user.borrowerCode.toLowerCase().includes(query);
        const matchesMatricula = Boolean(
          user.matricula && user.matricula.toLowerCase().includes(query)
        );
        const matchesCarrera = Boolean(
          user.carrera?.nombre && user.carrera.nombre.toLowerCase().includes(query)
        );
        const matchesArea = Boolean(
          user.dependenciaOArea && user.dependenciaOArea.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesEmail &&
          !matchesPhone &&
          !matchesCode &&
          !matchesMatricula &&
          !matchesCarrera &&
          !matchesArea
        ) {
          return false;
        }
      }

      // 4. Status Filter (Activo / Inactivo / Suspendido / Con préstamo vencido)
      if (filters.status) {
        if (filters.status === 'OVERDUE') {
          if (!user.hasOverdueLoan) {
            return false;
          }
        } else if (user.status !== filters.status) {
          return false;
        }
      }

      return true;
    });
  }, [usersList, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleViewUser = (user: ManagedUser) => {
    setSelectedUserDetail(user);
  };

  const handleEditUser = (user: ManagedUser) => {
    setEditingUser(user);
  };

  const handleEditUserSuccess = (updatedUser: ManagedUser) => {
    // Actualización optimista en caché RQ
    queryClient.setQueryData<ManagedUser[]>([ADMIN_USERS_KEY], (prev = []) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    // Persistir en Supabase e invalidar caché para confirmar desde servidor
    updateManagedUser(updatedUser.id, {
      fullName: updatedUser.fullName,
      phone: updatedUser.phone,
    }).then(() => {
      invalidateAdminUsers(queryClient);
    });

    // Sincronizar mock en memoria
    const mockIdx = MOCK_MANAGED_USERS.findIndex((u) => u.id === updatedUser.id);
    if (mockIdx !== -1) {
      MOCK_MANAGED_USERS[mockIdx] = updatedUser;
    }

    showToast(`Usuario "${updatedUser.fullName}" actualizado con éxito.`);
  };

  const handleToggleUserStatus = (user: ManagedUser) => {
    setStatusTargetUser(user);
  };

  const handleConfirmUserStatus = (user: ManagedUser) => {
    const nextStatus: UserStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const wasActive = user.status === 'ACTIVE';

    // Actualización optimista en caché RQ
    queryClient.setQueryData<ManagedUser[]>([ADMIN_USERS_KEY], (prev = []) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );

    // Persistir en Supabase e invalidar caché para confirmar desde servidor
    updateManagedUser(user.id, { status: nextStatus }).then(() => {
      invalidateAdminUsers(queryClient);
    });

    // Sincronizar mock en memoria
    const mockIdx = MOCK_MANAGED_USERS.findIndex((u) => u.id === user.id);
    if (mockIdx !== -1) {
      MOCK_MANAGED_USERS[mockIdx] = {
        ...MOCK_MANAGED_USERS[mockIdx],
        status: nextStatus,
      };
    }

    showToast(
      wasActive
        ? 'Usuario desactivado correctamente.'
        : 'Usuario activado correctamente.'
    );
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCreateUserSuccess = async (newUser: ManagedUser) => {
    const rol =
      newUser.kind === 'ADMINISTRATIVE'
        ? newUser.role === 'LIBRARIAN'
          ? 'personal'
          : 'admin'
        : newUser.category === 'TEACHER'
        ? 'docente'
        : 'lector';

    try {
      const created = await createManagedUser({
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        borrowerCode: newUser.borrowerCode,
        rol,
        carreraId: newUser.carreraId || null,
        dependenciaOArea: newUser.dependenciaOArea || null,
      });

      if (created && created.id) {
        newUser.id = created.id;
      }
    } catch (err: any) {
      const msg = err?.message || 'No se pudo guardar el usuario en la base de datos.';
      showToast(`Error al registrar usuario: ${msg}`, 'error');
      return;
    }

    // Actualización optimista en caché RQ
    queryClient.setQueryData<ManagedUser[]>([ADMIN_USERS_KEY], (prev = []) => [newUser, ...prev]);
    MOCK_MANAGED_USERS.unshift(newUser);
    setCurrentPage(1);
    invalidateAdminUsers(queryClient);
    showToast(
      `Usuario "${newUser.fullName}" registrado exitosamente con folio ${newUser.borrowerCode}.`,
      'success'
    );
  };

  return (
    <div className="users-page-container">
      {/* Page Header */}
      <div className="users-header">
        <div className="users-header-titles">
          <h1 className="users-title">Gestión de usuarios</h1>
          <p className="users-subtitle">
            Consulta, filtra por tipo o generación, y administra los usuarios del acervo.
          </p>
        </div>

        <div className="users-header-actions">
          {/* Botón de Configuración de Generaciones */}
          <button
            type="button"
            onClick={() => setIsGenConfigOpen(true)}
            className="users-gen-config-btn"
            aria-label="Abrir configuración de generaciones pasadas"
            title="Revisar y desactivar usuarios de generaciones pasadas sin adeudos"
          >
            <CalendarCog size={18} />
            <span>Configuración de generaciones</span>
          </button>

          {/* Botón Carga Masiva */}
          <button
            type="button"
            onClick={() => setIsBulkImportOpen(true)}
            className="users-bulk-import-btn"
            aria-label="Carga masiva de usuarios en Excel o CSV"
          >
            <FileSpreadsheet size={18} />
            <span>Carga masiva</span>
          </button>

          {/* Botón Registrar Usuario */}
          <button
            type="button"
            onClick={handleOpenRegisterModal}
            className="users-register-btn"
            aria-label="Registrar un nuevo usuario"
          >
            <Plus size={18} />
            <span>Registrar usuario</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <UsersMetrics metrics={metrics} />

      {/* Barra de Clasificación por Tipo de Usuario (Botones con Contadores) */}
      <UserClassificationTabs
        activeClassification={filters.classification}
        onChange={handleClassificationChange}
        users={usersList}
      />

      {/* Search & Filter Toolbar */}
      <UsersToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalFilteredCount={filteredUsers.length}
        currentPage={currentPage}
        totalPages={totalPages}
        availableGenerations={availableGenerations}
      />

      {/* Table / Results / Empty State */}
      {isLoading ? (
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando usuarios desde el sistema..." />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="users-empty-card" role="region" aria-label="Sin resultados">
          <div className="users-empty-icon" aria-hidden="true">
            <SearchX size={28} />
          </div>
          <h2 className="users-empty-title">No se encontraron usuarios</h2>
          <p className="users-empty-desc">
            No hay registros que coincidan con la clasificación o los criterios de búsqueda seleccionados.
          </p>
          <Button variant="primary" size="sm" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <>
          <UsersTable
            users={paginatedUsers}
            onViewUser={handleViewUser}
            onEditUser={handleEditUser}
            onToggleUserStatus={handleToggleUserStatus}
          />

          <UsersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`users-toast-banner${
            toastType === 'error' ? ' users-toast-banner--error' : ''
          }`}
          role={toastType === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {toastType === 'error' ? (
            <AlertCircle size={18} color="#DC2626" />
          ) : (
            <CheckCircle2 size={18} color="#27AE60" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal: Configuración de Generaciones */}
      <GenerationConfigModal
        open={isGenConfigOpen}
        onClose={() => setIsGenConfigOpen(false)}
        users={usersList}
        onSuccess={(count, generationYear) => {
          invalidateAdminUsers(queryClient);
          showToast(
            `Se desactivaron exitosamente ${count} usuarios de la Generación ${generationYear}.`,
            'success'
          );
        }}
      />

      {/* Register User Modal */}
      <RegisterUserModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleCreateUserSuccess}
      />

      {/* Edit User Modal */}
      <RegisterUserModal
        mode="edit"
        user={editingUser}
        open={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        onSuccess={handleEditUserSuccess}
      />

      {/* User Detail Consultation Modal */}
      <UserDetailModal
        user={selectedUserDetail}
        onClose={() => setSelectedUserDetail(null)}
      />

      {/* User Status Confirmation Modal */}
      <UserStatusModal
        user={statusTargetUser}
        onClose={() => setStatusTargetUser(null)}
        onConfirm={handleConfirmUserStatus}
      />

      {/* Bulk Import Users / Students Modal */}
      <BulkImportUsersModal
        open={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onSuccess={(count) => {
          invalidateAdminUsers(queryClient);
          showToast(`Se importaron ${count} usuarios exitosamente al sistema.`, 'success');
        }}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Plus, SearchX, CheckCircle2 } from 'lucide-react';
import { UsersMetrics } from '../../features/users/components/UsersMetrics';
import { UsersToolbar } from '../../features/users/components/UsersToolbar';
import { UsersTable } from '../../features/users/components/UsersTable';
import { UsersPagination } from '../../features/users/components/UsersPagination';
import { RegisterUserModal } from '../../features/users/components/RegisterUserModal';
import { UserDetailModal } from '../../features/users/components/UserDetailModal';
import { UserStatusModal } from '../../features/users/components/UserStatusModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import {
  MOCK_MANAGED_USERS,
  MOCK_USERS_METRICS,
} from '../../features/users/users.mock';
import type {
  ManagedUser,
  UsersFilterState,
  UsersMetricsData,
  UserStatus,
} from '../../features/users/users.types';
import '../../features/users/users.css';

const INITIAL_FILTERS: UsersFilterState = {
  searchQuery: '',
  kind: '',
  roleOrCategory: '',
  status: '',
};

export const UsersPage: React.FC = () => {
  const [usersList, setUsersList] = useState<ManagedUser[]>(() => [...MOCK_MANAGED_USERS]);
  const [filters, setFilters] = useState<UsersFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState<ManagedUser | null>(null);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [statusTargetUser, setStatusTargetUser] = useState<ManagedUser | null>(null);
  const [metrics, setMetrics] = useState<UsersMetricsData>(() => ({ ...MOCK_USERS_METRICS }));

  const itemsPerPage = 5;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 4500);
  };

  const handleFilterChange = (newFilters: UsersFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      // 1. Search Query (name, email, phone, borrowerCode, roomResponsibleName)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = user.fullName.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesPhone = Boolean(user.phone && user.phone.toLowerCase().includes(query));
        const matchesCode = user.borrowerCode.toLowerCase().includes(query);
        const matchesResponsible = Boolean(
          user.roomResponsibleName && user.roomResponsibleName.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesCode && !matchesResponsible) {
          return false;
        }
      }

      // 2. Kind Filter (ADMINISTRATIVE / NORMAL)
      if (filters.kind) {
        if (user.kind !== filters.kind) {
          return false;
        }
      }

      // 3. Role or Category Filter
      if (filters.roleOrCategory) {
        if (user.kind === 'ADMINISTRATIVE') {
          if (user.role !== filters.roleOrCategory) {
            return false;
          }
        } else if (user.kind === 'NORMAL') {
          if (user.category !== filters.roleOrCategory) {
            return false;
          }
        }
      }

      // 4. Status Filter
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
    setUsersList((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    // Keep in-memory mock synchronized
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

    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === user.id) {
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );

    // Keep in-memory mock synchronized
    const mockIdx = MOCK_MANAGED_USERS.findIndex((u) => u.id === user.id);
    if (mockIdx !== -1) {
      MOCK_MANAGED_USERS[mockIdx] = {
        ...MOCK_MANAGED_USERS[mockIdx],
        status: nextStatus,
      };
    }

    // Update KPI metrics
    setMetrics((prev) => ({
      ...prev,
      activeUsers: wasActive
        ? Math.max(0, prev.activeUsers - 1)
        : prev.activeUsers + 1,
    }));

    showToast(
      wasActive
        ? 'Usuario desactivado correctamente.'
        : 'Usuario activado correctamente.'
    );
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCreateUserSuccess = (newUser: ManagedUser) => {
    setUsersList((prev) => [newUser, ...prev]);

    // Keep in-memory mock synchronized
    MOCK_MANAGED_USERS.unshift(newUser);

    // Update KPI metrics
    setMetrics((prev) => ({
      ...prev,
      totalUsers: prev.totalUsers + 1,
      activeUsers: newUser.status === 'ACTIVE' ? prev.activeUsers + 1 : prev.activeUsers,
    }));

    // Reset pagination to first page so new user appears on top
    setCurrentPage(1);

    showToast(`Usuario "${newUser.fullName}" registrado exitosamente con folio ${newUser.borrowerCode}.`);
  };

  return (
    <div className="users-page-container">
      {/* Page Header */}
      <div className="users-header">
        <div className="users-header-titles">
          <h1 className="users-title">Gestión de usuarios</h1>
          <p className="users-subtitle">
            Consulta, registra y administra los usuarios de la biblioteca.
          </p>
        </div>

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

      {/* KPI Summary Cards */}
      <UsersMetrics metrics={metrics} />

      {/* Search & Filter Toolbar */}
      <UsersToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalFilteredCount={filteredUsers.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Table / Results / Empty State */}
      {isLoading ? (
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando usuarios..." />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="users-empty-card" role="region" aria-label="Sin resultados">
          <div className="users-empty-icon" aria-hidden="true">
            <SearchX size={28} />
          </div>
          <h2 className="users-empty-title">No se encontraron usuarios</h2>
          <p className="users-empty-desc">
            No hay registros que coincidan con los criterios de búsqueda o filtros seleccionados.
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
        <div className="users-toast-banner" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="#27AE60" />
          <span>{toastMessage}</span>
        </div>
      )}

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
    </div>
  );
};

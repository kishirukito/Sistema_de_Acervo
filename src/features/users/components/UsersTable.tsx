import React from 'react';
import { Eye, SquarePen, Ban, CheckCircle2 } from 'lucide-react';
import { UserTypeBadge } from './UserTypeBadge';
import { UserStatusBadge } from './UserStatusBadge';
import type { ManagedUser } from '../users.types';

interface UsersTableProps {
  users: ManagedUser[];
  onViewUser: (user: ManagedUser) => void;
  onEditUser: (user: ManagedUser) => void;
  onToggleUserStatus: (user: ManagedUser) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onViewUser,
  onEditUser,
  onToggleUserStatus,
}) => {
  return (
    <div className="users-table-card">
      <div className="users-table-wrapper">
        <table className="users-table" aria-label="Tabla de usuarios del sistema">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '19%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">USUARIO</th>
              <th scope="col">CORREO ELECTRÓNICO</th>
              <th scope="col">TELÉFONO</th>
              <th scope="col">ROL</th>
              <th scope="col">ESTADO</th>
              <th scope="col" className="users-th-center">PRÉSTAMOS ACTIVOS</th>
              <th scope="col" className="users-th-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const initials =
                user.avatarInitials ||
                user.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

              return (
                <tr key={user.id} className="users-table-row" title={`Folio: ${user.borrowerCode}`}>
                  {/* USUARIO: Avatar + Nombre + Subtítulo */}
                  <td className="users-td-user">
                    <div className="users-user-cell">
                      <div
                        className="users-avatar"
                        style={{ backgroundColor: user.avatarColor || '#1E3A5F' }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                      <div className="users-user-info">
                        <span className="users-user-name">{user.fullName}</span>
                        <span className="users-user-meta">
                          {user.kind === 'NORMAL' && user.category === 'ROOM' ? (
                            <span className="users-room-tag">
                              Responsable: {user.roomResponsibleName || 'No asignado'}
                            </span>
                          ) : (
                            <span>{user.createdAt}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CORREO ELECTRÓNICO */}
                  <td className="users-td-email">
                    <span className="users-email-text">{user.email}</span>
                  </td>

                  {/* TELÉFONO */}
                  <td className="users-td-phone">
                    <span className="users-phone-text">{user.phone || '—'}</span>
                  </td>

                  {/* ROL / CATEGORÍA */}
                  <td className="users-td-role">
                    <UserTypeBadge user={user} />
                  </td>

                  {/* ESTADO */}
                  <td className="users-td-status">
                    <UserStatusBadge user={user} />
                  </td>

                  {/* PRÉSTAMOS ACTIVOS */}
                  <td className="users-td-center">
                    {user.activeLoans === 0 ? (
                      <span className="users-loans-dash">—</span>
                    ) : (
                      <span
                        className={`users-loan-badge ${
                          user.hasOverdueLoan
                            ? 'users-loan-badge--overdue'
                            : 'users-loan-badge--active'
                        }`}
                        title={`${user.activeLoans} préstamo(s) activo(s)${
                          user.hasOverdueLoan ? ' (con atraso)' : ''
                        }`}
                      >
                        {user.activeLoans}
                      </span>
                    )}
                  </td>

                  {/* ACCIONES */}
                  <td className="users-td-center">
                    <div className="users-actions-group">
                      <button
                        type="button"
                        onClick={() => onViewUser(user)}
                        className="users-action-btn"
                        aria-label={`Ver detalles de ${user.fullName}`}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditUser(user)}
                        className="users-action-btn"
                        aria-label={`Editar usuario ${user.fullName}`}
                        title="Editar usuario"
                      >
                        <SquarePen size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleUserStatus(user)}
                        className={`users-action-btn ${
                          user.status === 'ACTIVE'
                            ? 'users-action-btn--danger'
                            : 'users-action-btn--success'
                        }`}
                        aria-label={
                          user.status === 'ACTIVE'
                            ? `Desactivar a ${user.fullName}`
                            : `Activar a ${user.fullName}`
                        }
                        title={
                          user.status === 'ACTIVE'
                            ? `Desactivar a ${user.fullName}`
                            : `Activar a ${user.fullName}`
                        }
                      >
                        {user.status === 'ACTIVE' ? (
                          <Ban size={16} />
                        ) : (
                          <CheckCircle2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

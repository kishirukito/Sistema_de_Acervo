import React from 'react';
import { Eye, SquarePen, Ban, CheckCircle2, KeyRound } from 'lucide-react';
import { UserTypeBadge } from './UserTypeBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { extractGeneration } from '../users.generation';
import type { ManagedUser } from '../users.types';

interface UsersTableProps {
  users: ManagedUser[];
  onViewUser: (user: ManagedUser) => void;
  onEditUser: (user: ManagedUser) => void;
  onToggleUserStatus: (user: ManagedUser) => void;
  onResetPassword: (user: ManagedUser) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onViewUser,
  onEditUser,
  onToggleUserStatus,
  onResetPassword,
}) => {
  return (
    <div className="users-table-card">
      <div className="users-table-wrapper">
        <table className="users-table" aria-label="Tabla de usuarios del sistema">
          <thead>
            <tr>
              <th scope="col" className="users-th-user">USUARIO</th>
              <th scope="col" className="users-th-code">MATRÍCULA / FOLIO</th>
              <th scope="col" className="users-th-role">TIPO DE USUARIO</th>
              <th scope="col" className="users-th-gen">GENERACIÓN</th>
              <th scope="col" className="users-th-status">ESTADO</th>
              <th scope="col" className="users-th-loans users-th-center">PRÉSTAMOS ACTIVOS</th>
              <th scope="col" className="users-th-actions users-th-center">ACCIONES</th>
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

              // Derivación segura de la generación y periodo de ingreso
              const generationInfo = extractGeneration(user.matricula || user.borrowerCode);

              return (
                <tr key={user.id} className="users-table-row" title={`Folio: ${user.borrowerCode}`}>
                  {/* USUARIO: Avatar + Nombre + Correo */}
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
                        <span className="users-user-email">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* MATRÍCULA O IDENTIFICADOR */}
                  <td className="users-td-code">
                    <span className="users-matricula-text" title={user.borrowerCode}>
                      {user.borrowerCode}
                    </span>
                  </td>

                  {/* TIPO DE USUARIO */}
                  <td className="users-td-role">
                    <UserTypeBadge user={user} />
                  </td>

                  {/* GENERACIÓN DERIVADA */}
                  <td className="users-td-gen">
                    {generationInfo ? (
                      <div className="users-gen-cell">
                        <span className="users-gen-year">
                          {generationInfo.year}
                        </span>
                        <span className="users-gen-period">
                          Periodo {generationInfo.period}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="users-gen-na"
                        title="La matrícula no contiene formato de generación estudiantil"
                      >
                        No disponible
                      </span>
                    )}
                  </td>

                  {/* ESTADO */}
                  <td className="users-td-status">
                    <UserStatusBadge user={user} />
                  </td>

                  {/* PRÉSTAMOS ACTIVOS */}
                  <td className="users-td-loans users-td-center">
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
                  <td className="users-td-actions users-td-center">
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
                        onClick={() => onResetPassword(user)}
                        className="users-action-btn"
                        aria-label={`Restablecer contraseña de ${user.fullName}`}
                        title="Restablecer contraseña"
                      >
                        <KeyRound size={16} />
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

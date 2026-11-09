import React from 'react';
import type { ManagedUser } from '../users.types';

interface UserStatusBadgeProps {
  user: ManagedUser;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ user }) => {
  if (user.hasOverdueLoan) {
    return <span className="users-badge users-badge--danger">Préstamo vencido</span>;
  }

  switch (user.status) {
    case 'ACTIVE':
      return <span className="users-badge users-badge--success">Activo</span>;
    case 'INACTIVE':
      return <span className="users-badge users-badge--inactive">Inactivo</span>;
    case 'SUSPENDED':
      return <span className="users-badge users-badge--danger">Suspendido</span>;
    default:
      return <span className="users-badge users-badge--inactive">{user.status}</span>;
  }
};

import React from 'react';
import type { ManagedUser } from '../users.types';

interface UserTypeBadgeProps {
  user: ManagedUser;
}

export const UserTypeBadge: React.FC<UserTypeBadgeProps> = ({ user }) => {
  if (user.kind === 'ADMINISTRATIVE') {
    if (user.role === 'ADMIN') {
      return <span className="users-badge users-badge--admin">Administrador</span>;
    }
    return <span className="users-badge users-badge--librarian">Bibliotecario</span>;
  }

  // Normal users
  switch (user.category) {
    case 'STUDENT':
      return <span className="users-badge users-badge--reader">Lector</span>;
    case 'TEACHER':
      return <span className="users-badge users-badge--teacher">Docente</span>;
    case 'EXTERNAL':
      return <span className="users-badge users-badge--external">Persona externa</span>;
    case 'ROOM':
      return <span className="users-badge users-badge--room">Sala</span>;
    case 'GRADUATE':
      return <span className="users-badge users-badge--graduate">Egresado</span>;
    default:
      return <span className="users-badge users-badge--neutral">Usuario</span>;
  }
};

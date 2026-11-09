import React from 'react';
import type { ResourceStatus } from '../catalog.types';

interface ResourceStatusBadgeProps {
  status: ResourceStatus;
}

export const ResourceStatusBadge: React.FC<ResourceStatusBadgeProps> = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: 'Disponible',
          className: 'resource-status-badge resource-status-badge--available',
        };
      case 'LOW_STOCK':
        return {
          label: 'Pocos ejemplares',
          className: 'resource-status-badge resource-status-badge--low_stock',
        };
      case 'LOANED':
        return {
          label: 'Prestado',
          className: 'resource-status-badge resource-status-badge--loaned',
        };
      case 'UNAVAILABLE':
        return {
          label: 'No disponible',
          className: 'resource-status-badge resource-status-badge--unavailable',
        };
      default:
        return {
          label: 'Disponible',
          className: 'resource-status-badge resource-status-badge--available',
        };
    }
  };

  const config = getBadgeConfig();

  return <span className={config.className}>{config.label}</span>;
};

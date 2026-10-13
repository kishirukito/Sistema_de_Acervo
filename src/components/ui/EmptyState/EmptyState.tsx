import React from 'react';
import { FileQuestion } from 'lucide-react';
import clsx from 'clsx';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FileQuestion size={28} />,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={clsx('ui-empty-state', className)}>
      <div className="ui-empty-icon-wrap" aria-hidden="true">
        {icon}
      </div>
      <h4 className="ui-empty-title">{title}</h4>
      {description && <p className="ui-empty-description">{description}</p>}
      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
};

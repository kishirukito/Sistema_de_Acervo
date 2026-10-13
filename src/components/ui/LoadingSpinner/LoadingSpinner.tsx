import React from 'react';
import clsx from 'clsx';
import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  center?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  center = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        'ui-spinner-container',
        center && 'ui-spinner-container--center',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className={clsx('ui-spinner', `ui-spinner--${size}`)} />
      {text && <span className="ui-spinner-text">{text}</span>}
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Cargando...
      </span>
    </div>
  );
};

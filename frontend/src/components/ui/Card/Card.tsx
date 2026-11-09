import React, { type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  compact?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverable = false, compact = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'ui-card',
          hoverable && 'ui-card--hoverable',
          compact && 'ui-card--compact',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('ui-card-header', className)} {...props}>
      {(title || subtitle) ? (
        <div className="ui-card-title-group">
          {title && <h3 className="ui-card-title">{title}</h3>}
          {subtitle && <p className="ui-card-subtitle">{subtitle}</p>}
        </div>
      ) : null}
      {action && <div>{action}</div>}
      {children}
    </div>
  );
};

export const CardBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('ui-card-body', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('ui-card-footer', className)} {...props}>
      {children}
    </div>
  );
};

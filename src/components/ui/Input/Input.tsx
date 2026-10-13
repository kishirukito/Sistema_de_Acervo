import React, { type InputHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={clsx('ui-input-group', className)}>
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label}
          </label>
        )}
        <div
          className={clsx(
            'ui-input-wrapper',
            error && 'ui-input-wrapper--error',
            disabled && 'ui-input-wrapper--disabled'
          )}
        >
          {leftIcon && (
            <span className="ui-input-icon ui-input-icon--left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={clsx(
              'ui-input-field',
              leftIcon && 'ui-input-field--has-left',
              rightIcon && 'ui-input-field--has-right'
            )}
            {...props}
          />
          {rightIcon && (
            <span className="ui-input-icon ui-input-icon--right">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <span id={errorId} className="ui-input-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="ui-input-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

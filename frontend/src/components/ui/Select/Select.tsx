import { type SelectHTMLAttributes, forwardRef, useId, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { CustomSelect } from '../CustomSelect';
import './Select.css';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder,
      id,
      className,
      value: controlledValue,
      defaultValue,
      children,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const innerSelectRef = useRef<HTMLSelectElement | null>(null);

    const [selectedValue, setSelectedValue] = useState<string>(() => {
      if (controlledValue !== undefined) return String(controlledValue);
      if (defaultValue !== undefined) return String(defaultValue);
      if (options && options.length > 0) return String(options[0].value);
      return '';
    });

    useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedValue(String(controlledValue));
      }
    }, [controlledValue]);

    // If options are provided, render the accessible CustomSelect listbox
    if (options && options.length > 0) {
      const formattedOptions = options.map((opt) => ({
        value: String(opt.value),
        label: opt.label,
        disabled: opt.disabled,
      }));

      const handleCustomChange = (val: string) => {
        setSelectedValue(val);
        if (innerSelectRef.current) {
          innerSelectRef.current.value = val;
          const evt = new Event('change', { bubbles: true });
          innerSelectRef.current.dispatchEvent(evt);
        }
      };

      return (
        <div className={clsx('ui-select-group', className)}>
          <CustomSelect
            id={selectId}
            label={label}
            value={selectedValue}
            onChange={handleCustomChange}
            options={formattedOptions}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            disabled={props.disabled}
          />
          {/* Hidden native select for react-hook-form refs and form validation */}
          <select
            ref={(node) => {
              innerSelectRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
              }
            }}
            id={`${selectId}-hidden-native`}
            name={props.name}
            value={selectedValue}
            onChange={onChange}
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              border: 0,
              opacity: 0,
              pointerEvents: 'none',
            }}
            tabIndex={-1}
            aria-hidden="true"
            {...props}
          >
            {formattedOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // Fallback if raw children were provided
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className={clsx('ui-select-group', className)}>
        {label && (
          <label htmlFor={selectId} className="ui-select-label">
            {label}
          </label>
        )}
        <div className="ui-select-wrapper">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={clsx(
              'ui-select-field',
              error && 'ui-select-field--error'
            )}
            value={controlledValue}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
        </div>
        {error && (
          <span id={errorId} className="ui-select-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="ui-select-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

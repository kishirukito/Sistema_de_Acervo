import React, {
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  forwardRef,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';
import './CustomSelect.css';

export interface CustomSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomSelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  options: CustomSelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  variant?: 'default' | 'inline' | 'scope';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  align?: 'left' | 'right' | 'auto';
  defaultOpen?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  (
    {
      id,
      name,
      value: controlledValue,
      defaultValue,
      options = [],
      onChange,
      placeholder = 'Selecciona una opción',
      label,
      error,
      helperText,
      disabled = false,
      className,
      triggerClassName,
      menuClassName,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      align = 'auto',
      defaultOpen = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const labelId = `${selectId}-label`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    // Internal value state if uncontrolled
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue ?? options[0]?.value ?? ''
    );
    const currentValue = isControlled ? controlledValue : internalValue;

    // Dropdown open/close & focused item for keyboard navigation
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [alignRight, setAlignRight] = useState(align === 'right');

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

    // Find the currently selected option
    const selectedOption = options.find((opt) => opt.value === currentValue);
    const selectedIndex = options.findIndex((opt) => opt.value === currentValue);

    // Sync focusedIndex when opening
    useEffect(() => {
      if (isOpen) {
        const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
        setFocusedIndex(initialIndex);

        // Auto alignment check: if trigger is near right screen edge
        if (align === 'auto' && triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          // If right side of trigger is within 250px of window right, align right
          if (windowWidth - rect.left < 300) {
            setAlignRight(true);
          } else {
            setAlignRight(false);
          }
        }
      }
    }, [isOpen, selectedIndex, align]);

    // Outside click & window blur
    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
      };
    }, [isOpen]);

    // Ensure focused item is scrolled into view in long lists
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
        optionRefs.current[focusedIndex]?.scrollIntoView({
          block: 'nearest',
        });
      }
    }, [isOpen, focusedIndex]);

    const handleSelect = useCallback(
      (opt: CustomSelectOption) => {
        if (opt.disabled) return;
        if (!isControlled) {
          setInternalValue(opt.value);
        }
        onChange?.(opt.value);
        setIsOpen(false);
        triggerRef.current?.focus();
      },
      [isControlled, onChange]
    );

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => {
              let next = prev + 1;
              while (next < options.length && options[next]?.disabled) {
                next++;
              }
              return next < options.length ? next : prev;
            });
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && options[next]?.disabled) {
                next--;
              }
              return next >= 0 ? next : prev;
            });
          }
          break;
        }
        case 'Home': {
          if (isOpen) {
            e.preventDefault();
            const firstEnabled = options.findIndex((opt) => !opt.disabled);
            if (firstEnabled >= 0) setFocusedIndex(firstEnabled);
          }
          break;
        }
        case 'End': {
          if (isOpen) {
            e.preventDefault();
            for (let i = options.length - 1; i >= 0; i--) {
              if (!options[i].disabled) {
                setFocusedIndex(i);
                break;
              }
            }
          }
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && options[focusedIndex]) {
            handleSelect(options[focusedIndex]);
          }
          break;
        }
        case 'Escape': {
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
          }
          break;
        }
        case 'Tab': {
          if (isOpen) {
            setIsOpen(false);
          }
          break;
        }
        default: {
          // Type-ahead jumping to option starting with typed character
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const char = e.key.toLowerCase();
            const matchIndex = options.findIndex(
              (opt, idx) =>
                !opt.disabled &&
                idx > focusedIndex &&
                opt.label.toLowerCase().startsWith(char)
            );
            if (matchIndex >= 0) {
              setFocusedIndex(matchIndex);
            } else {
              const wrapIndex = options.findIndex(
                (opt) => !opt.disabled && opt.label.toLowerCase().startsWith(char)
              );
              if (wrapIndex >= 0) setFocusedIndex(wrapIndex);
            }
          }
          break;
        }
      }
    };

    return (
      <div
        ref={containerRef}
        className={clsx(
          'custom-select-container',
          fullWidth && 'custom-select-container--full-width',
          className
        )}
      >
        {label && (
          <label id={labelId} htmlFor={selectId} className="custom-select-label">
            {label}
          </label>
        )}

        <div className="custom-select-wrapper">
          <button
            ref={(node) => {
              (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
              }
            }}
            id={selectId}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-labelledby={label ? labelId : ariaLabelledby}
            aria-label={!label && !ariaLabelledby ? ariaLabel : undefined}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            role="combobox"
            className={clsx(
              'custom-select-trigger',
              `custom-select-trigger--${size}`,
              variant !== 'default' && `custom-select-trigger--${variant}`,
              isOpen && 'custom-select-trigger--open',
              error && 'custom-select-trigger--error',
              triggerClassName
            )}
            onClick={() => {
              if (!disabled) setIsOpen(!isOpen);
            }}
            onKeyDown={handleKeyDown}
          >
            <span
              className={clsx(
                'custom-select-value',
                !selectedOption && 'custom-select-placeholder'
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              size={variant === 'inline' ? 14 : size === 'sm' ? 14 : 16}
              className="custom-select-chevron"
              aria-hidden="true"
            />
          </button>

          {/* Hidden input for HTML form submissions */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={currentValue}
              disabled={disabled}
            />
          )}

          {/* The Custom Dropdown Panel (The Opened List) */}
          {isOpen && (
            <ul
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={label ? labelId : ariaLabelledby}
              aria-label={!label && !ariaLabelledby ? ariaLabel : undefined}
              aria-activedescendant={
                focusedIndex >= 0 ? `${listboxId}-opt-${focusedIndex}` : undefined
              }
              className={clsx(
                'custom-select-dropdown',
                alignRight && 'custom-select-dropdown--align-right',
                menuClassName
              )}
            >
              {options.length === 0 ? (
                <li className="custom-select-empty">No hay opciones disponibles</li>
              ) : (
                options.map((opt, idx) => {
                  const isSelected = opt.value === currentValue;
                  const isFocused = idx === focusedIndex;

                  return (
                    <li
                      key={opt.value}
                      ref={(el) => {
                        optionRefs.current[idx] = el;
                      }}
                      id={`${listboxId}-opt-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled}
                      title={opt.label}
                      className={clsx(
                        'custom-select-option',
                        isSelected && 'custom-select-option--selected',
                        isFocused && 'custom-select-option--focused',
                        opt.disabled && 'custom-select-option--disabled'
                      )}
                      onClick={() => handleSelect(opt)}
                      onMouseEnter={() => {
                        if (!opt.disabled) setFocusedIndex(idx);
                      }}
                    >
                      <span className="custom-select-option-text">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <Check
                          size={15}
                          className="custom-select-option-check"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>

        {error && (
          <span id={errorId} className="custom-select-error-msg" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="custom-select-helper-msg">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

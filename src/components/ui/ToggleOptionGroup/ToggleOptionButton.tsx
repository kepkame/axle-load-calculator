import { useId } from 'react';
import clsx from 'clsx';
import type { ToggleOptionButtonProps } from './ToggleOptionButton.types';
import styles from './ToggleOptionButton.module.scss';

/**
 * Toggleable button used within a ToggleOptionGroup.
 *
 * Supports keyboard accessibility, ARIA state, and optional disable behavior.
 */
export const ToggleOptionButton: React.FC<ToggleOptionButtonProps> = ({
  axleId,
  label,
  selected,
  onToggle,
  ariaLabelledby,
  disabled = false,
  ...restProps
}) => {
  const computedId = axleId || useId();

  return (
    <button
      id={computedId}
      type="button"
      aria-pressed={selected}
      aria-labelledby={ariaLabelledby}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={onToggle}
      onKeyDown={(e) => {
        // Enables toggle via keyboard (Enter or Space)
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className={clsx(styles.toggleButton, { [styles.toggleButtonSelected]: selected })}
      {...restProps}
    >
      {label}
    </button>
  );
};

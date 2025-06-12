import { useId } from 'react';
import { Tooltip } from '@components/feedback/Tooltip/Tooltip';
import { ToggleOptionButton } from './ToggleOptionButton';
import type { ToggleOptionGroupProps } from './ToggleOptionGroup.types';
import styles from './ToggleOptionGroup.module.scss';

/**
 * Renders a labeled group of toggleable buttons (e.g. for lifted axles).
 *
 * Visually similar to radio buttons, but allows manual toggle behavior.
 */
export const ToggleOptionGroup: React.FC<ToggleOptionGroupProps> = ({
  label,
  tooltip,
  options,
  axleId,
  error,
}) => {
  const groupId = axleId || useId();

  return (
    <fieldset
      role="group"
      aria-labelledby={groupId}
      aria-describedby={error ? `${groupId}-error` : undefined}
      className={styles.group}
    >
      <legend id={groupId} className={styles.legend}>
        <span className={styles.title}>{label}</span>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </legend>

      <div className={styles.wrapper}>
        {options.map((option) => (
          <ToggleOptionButton
            key={option.axleId}
            id={option.axleId}
            label={option.label}
            selected={option.selected}
            onToggle={option.onToggle}
            disabled={option.disabled}
            ariaLabelledby={option.ariaLabelledby}
          />
        ))}
      </div>

      {error && (
        <p id={`${groupId}-error`} className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
};

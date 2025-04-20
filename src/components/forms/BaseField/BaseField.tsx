import React, { useId, cloneElement } from 'react';
import clsx from 'clsx';
import { IBaseFieldProps } from './BaseField.types';
import { Tooltip } from '@components/feedback/Tooltip/Tooltip';
import styles from './BaseField.module.scss';

/**
 * Wrapper component for form fields that renders a label, optional tooltip,
 * units suffix, and error message. Injects `id` and `isUnits` into the child input.
 */
export const BaseField: React.FC<IBaseFieldProps> = ({
  label,
  className,
  htmlFor,
  error,
  units,
  tooltip,
  children,
}) => {
  // Use the passed id or create a new one
  const fieldId = htmlFor || useId();

  return (
    <div className={clsx(styles.baseField, { [styles.error]: error }, className)}>
      <div className={styles.label}>
        <label htmlFor={fieldId}>{label}</label>
        {tooltip && <Tooltip className={styles.tooltipLabel}>{tooltip}</Tooltip>}
      </div>

      <div className={styles.field}>
        {cloneElement(children, { id: fieldId, isUnits: units !== undefined })}
        {units && <span className={styles.units}>{units}</span>}
      </div>

      {error && (
        <p className="field-error" id={`${fieldId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

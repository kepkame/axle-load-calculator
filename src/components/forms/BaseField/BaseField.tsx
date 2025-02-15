import React, { useId, cloneElement } from 'react';
import clsx from 'clsx';
import styles from './BaseField.module.scss';

interface IBaseFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  /** Units of Measurement */
  units?: string;
  children: React.ReactElement;
}

export const BaseField: React.FC<IBaseFieldProps> = ({
  label,
  htmlFor,
  error,
  units,
  children,
}) => {
  const fieldId = htmlFor || useId(); // Use the passed id or create a new one

  return (
    <div className={clsx(styles.baseField, { [styles.error]: error })}>
      <label htmlFor={fieldId}>{label}</label>

      <div className={styles.root}>
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

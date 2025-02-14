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

// import React, { useId } from 'react';
// import { Tooltip } from '@components/feedback/Tooltip';
// import styles from './BaseField.module.scss';

// interface IBaseFieldProps {
//   label: string;
//   id?: string;
//   error?: string;
//   tooltip?: React.ReactNode;
//   /** Units of Measurement */
//   units?: string;
//   children: React.ReactElement<{ id?: string }>;
// }

// export const BaseField: React.FC<IBaseFieldProps> = ({
//   label,
//   id,
//   error,
//   tooltip,
//   units,
//   children,
// }) => {
//   // Generate a unique ID if not passed
//   const fieldId: string = id || useId();

//   return (
//     <div className={styles.baseField}>
//       <div className={styles.labelWrapper}>
//         <label htmlFor={fieldId} className={styles.label}>
//           {label}
//         </label>
//         {tooltip && Boolean(tooltip) && <Tooltip>{tooltip}</Tooltip>}
//       </div>

//       <div className={styles.inputWrapper}>
//         {React.isValidElement(children) ? (
//           React.cloneElement(children, { id: fieldId })
//         ) : (
//           <div>Нет поля</div>
//         )}
//         {units && <span className={styles.units}>{units}</span>}
//       </div>

//       {error?.trim() && <div className={styles.error}>{error}</div>}
//     </div>
//   );
// };

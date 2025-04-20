import clsx from 'clsx';
import { useController } from 'react-hook-form';
import { ControlledNumberInput } from '@components/forms/fields/NumberField/ControlledNumberInput/ControlledNumberInput';
import { AxleLoadTableDataProps } from './AxleLoadTableData.types';
import styles from './AxleLoadTableData.module.scss';

/**
 * A table cell that renders a labeled numeric input
 * for axle load values, integrated with react-hook-form.
 *
 * Supports optional read-only mode, error highlighting, and unit suffix display.
 */
export const AxleLoadTableData: React.FC<AxleLoadTableDataProps> = ({
  icon,
  label,
  fieldName,
  control,
  min,
  max,
  maxLength = 5,
  decimalPlaces = 2,
  inputMode = 'decimal',
  isErrors = false,
  readOnly = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name: fieldName,
    control,
  });

  return (
    <td className={styles.data}>
      <div className={clsx(styles.wrapper, { [styles.wrapperError]: isErrors })}>
        {icon}

        {/* Responsive label: full for mobile, short for desktop */}
        <span className={styles.name}>
          {label === 'Максимальная нагрузка' ? (
            <>
              <span className={styles.mobileOnly}>Максимальная нагрузка</span>
              <span className={styles.desktopOnly}>Макс. нагрузка</span>
            </>
          ) : (
            label
          )}
        </span>

        {readOnly ? (
          // Render static text when read-only
          <span className={styles.textValue}>{Number(value)?.toFixed(decimalPlaces)} т.</span>
        ) : (
          <>
            {/* Controlled numeric input with formatting and validation */}
            <ControlledNumberInput
              value={Number(value)}
              onChange={onChange}
              min={min}
              max={max}
              maxLength={maxLength}
              decimalPlaces={decimalPlaces}
              inputMode={inputMode}
              isUnits={true}
              className={styles.input}
            />
            <span className={styles.units}>т.</span>
          </>
        )}
      </div>
    </td>
  );
};

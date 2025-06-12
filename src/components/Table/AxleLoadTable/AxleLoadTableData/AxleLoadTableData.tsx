import clsx from 'clsx';
import { useController } from 'react-hook-form';
import { ControlledNumberInput } from '@components/forms/fields/NumberField/ControlledNumberInput/ControlledNumberInput';
import { AxleLoadTableDataProps } from './AxleLoadTableData.types';
import styles from './AxleLoadTableData.module.scss';

/**
 * Cell component for editing or displaying a single axle load value.
 *
 * Renders either a numeric input or static value with unit suffix,
 * depending on readOnly mode. Includes icon and responsive label handling.
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
      <label className={clsx(styles.wrapper, { [styles.wrapperError]: isErrors })}>
        {icon}

        <span className={styles.name}>
          {/* Responsive label: full for mobile, short for desktop */}
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
          // Render static text when read-only. Shows formatted value with unit
          <span className={styles.textValue}>{Number(value)?.toFixed(decimalPlaces)} т.</span>
        ) : (
          <>
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
      </label>
    </td>
  );
};

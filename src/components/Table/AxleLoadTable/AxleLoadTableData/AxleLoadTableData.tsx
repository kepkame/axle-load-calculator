import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { IAxleLoadTableDataProps } from './AxleLoadTableData.types';
import styles from './AxleLoadTableData.module.scss';
import clsx from 'clsx';

export const AxleLoadTableData: React.FC<IAxleLoadTableDataProps> = ({
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
}) => {
  return (
    <td className={styles.data}>
      <div className={clsx(styles.wrapper, { [styles.wrapperError]: isErrors })}>
        {icon}

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

        <NumberField
          className={styles.input}
          name={fieldName}
          control={control}
          min={min}
          max={max}
          maxLength={maxLength}
          decimalPlaces={decimalPlaces}
          inputMode={inputMode}
        />
        <span className={styles.units}>т.</span>
      </div>
    </td>
  );
};

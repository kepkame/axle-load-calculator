import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { RangeField } from '@components/forms/fields/RangeField/RangeField';
import { normalizeDecimalPlaces } from '@utils/numberUtils/validationUtils';
import {
  handleNumberInputChange,
  handleNumberInputBlur,
} from '@utils/inputUtils/numberFieldHandlers';
import { handleNumberInputKeyDown } from '@utils/inputUtils/handleNumberInputKeyDown';
import { NumberFieldProps } from './NumberField.types';
import styles from './NumberField.module.scss';

/**
 * Controlled numeric input field with optional range slider and unit styling.
 *
 * Handles formatting, clamping, and validation using react-hook-form + custom handlers.
 */
export const NumberField: React.FC<NumberFieldProps> = ({
  id,
  min = 0,
  max = Infinity,
  decimalPlaces = 0,
  isUnits = false,
  showRange = false,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    ...props,
    defaultValue: props.defaultValue ?? 0,
  });

  // Remove "control" from the props so it doesn't go into "<input>"
  const { control, ...rest } = props;

  // Normalize the number of decimal places and generate RegExp
  const normalizedDecimalPlaces = normalizeDecimalPlaces(decimalPlaces);

  return (
    <>
      <input
        id={id}
        type="text"
        {...field}
        {...rest}
        autoFocus={rest.autoFocus ?? false}
        onChange={(e) =>
          handleNumberInputChange({
            e,
            decimalPlaces: normalizedDecimalPlaces,
            onChange: field.onChange,
          })
        }
        onBlur={(e) =>
          handleNumberInputBlur({
            e,
            min,
            max,
            decimalPlaces: normalizedDecimalPlaces,
            onChange: field.onChange,
            onBlur: field.onBlur,
          })
        }
        onKeyDown={(e) => handleNumberInputKeyDown({ e, field, min, max, normalizedDecimalPlaces })}
        aria-describedby={error ? `${field.name}-error` : undefined}
        className={clsx(
          styles.numberField,
          { [styles.numberFieldRange]: showRange },
          { [styles.numberFieldUnits]: isUnits },
        )}
      />

      {/* Optional range slider for visual value adjustment (UX) */}
      {showRange && (
        <RangeField
          value={Number(field.value)}
          onChange={(val) => {
            field.onChange(val);
            field.onBlur();
          }}
          min={min}
          max={max}
          decimalPlaces={decimalPlaces}
        />
      )}
    </>
  );
};

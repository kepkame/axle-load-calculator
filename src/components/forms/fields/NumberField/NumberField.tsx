import React from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { RangeField } from '@components/forms/fields/RangeField/RangeField';
import { normalizeDecimalPlaces } from '@utils/numberUtils/validationUtils';
import {
  handleNumberInputChange,
  handleNumberInputBlur,
} from '@utils/inputUtils/numberFieldHandlers';
import { handleNumberInputKeyDown } from '@utils/inputUtils/handleNumberInputKeyDown';
import { INumberFieldProps } from './NumberField.types';
import styles from './NumberField.module.scss';

export const NumberField: React.FC<INumberFieldProps> = ({
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
        className={clsx(styles.numberField, { [styles.numberFieldUnits]: isUnits })}
      />

      {showRange && (
        <RangeField
          value={Number(field.value)}
          onChange={(val) => field.onChange(val)}
          min={min}
          max={max}
          decimalPlaces={decimalPlaces}
        />
      )}
    </>
  );
};

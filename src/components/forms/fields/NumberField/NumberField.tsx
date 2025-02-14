import React from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { INumberFieldProps } from './NumberField.types';
import { RangeField } from '@components/forms/fields/RangeField/RangeField';
import { formSchema } from '@components/forms/Form/Form';
import { getZodMinMax } from '@utils/zodUtils';
import { defaultFormatter } from '@utils/numberUtils/formatUtils';
import { normalizeDecimalPlaces } from '@utils/numberUtils/validationUtils';
import {
  handleNumberInputChange,
  handleNumberInputBlur,
} from '@utils/inputUtils/numberFieldHandlers';
import { handleNumberInputKeyDown } from '@utils/inputUtils/handleNumberInputKeyDown';
import styles from './NumberField.module.scss';

export const NumberField: React.FC<INumberFieldProps> = ({
  id,
  decimalPlaces = 0,
  isUnits = false,
  showRange = false,
  formatter = defaultFormatter,
  ...props
}) => {
  // Remove "control" from the props so it doesn't go into "<input>"
  const { control, ...rest } = props;

  // Controller for controlling the state of the form
  const {
    field,
    fieldState: { error },
  } = useController({
    ...props,
    defaultValue: props.defaultValue ?? 0,
  });

  // Set name to a form key
  const fieldName = props.name as keyof typeof formSchema.shape;

  // Get min and max from the Zod diagram or used: -Infinity and Infinity
  const { min, max } = getZodMinMax(formSchema.shape[fieldName]);

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
            decimalPlaces,
            onChange: field.onChange,
          })
        }
        onBlur={(e) =>
          handleNumberInputBlur({
            e,
            min,
            max,
            decimalPlaces,
            formatter,
            onChange: field.onChange,
            onBlur: field.onBlur,
          })
        }
        onKeyDown={(e) =>
          handleNumberInputKeyDown({ e, field, min, max, formatter, normalizedDecimalPlaces })
        }
        aria-describedby={error ? `${field.name}-error` : undefined}
        className={clsx(styles.numberField, { [styles.numberFieldUnits]: isUnits })}
      />

      {showRange && (
        <RangeField
          value={Number(field.value)}
          onChange={(val) => field.onChange(val)}
          min={min ?? 0}
          max={max ?? 10000}
          decimalPlaces={decimalPlaces}
        />
      )}
    </>
  );
};

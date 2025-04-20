import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { normalizeDecimalPlaces } from '@utils/numberUtils/validationUtils';
import {
  handleNumberInputChange,
  handleNumberInputBlur,
} from '@utils/inputUtils/numberFieldHandlers';
import { handleNumberInputKeyDown } from '@utils/inputUtils/handleNumberInputKeyDown';

import { IControlledNumberInputProps } from './ControlledNumberInput.types';
import styles from '../NumberField.module.scss';

/** Controlled numeric input that defers value updates until blur */
export const ControlledNumberInput: React.FC<IControlledNumberInputProps> = ({
  id,
  value,
  onChange,
  min = 0,
  max = Infinity,
  decimalPlaces = 0,
  autoFocus = false,
  isUnits = false,
  inputMode = 'decimal',
  className,
  ...props
}) => {
  // Internal string state for formatting user input (e.g., "2." or "2.0")
  const [internalValue, setInternalValue] = useState<string>(String(value));

  const normalizedDecimalPlaces = normalizeDecimalPlaces(decimalPlaces);

  // Sync internal value when external value changes (e.g. form reset)
  useEffect(() => {
    setInternalValue(String(value));
  }, [value]);

  return (
    <input
      id={id}
      type="text"
      inputMode={inputMode}
      {...props}
      value={internalValue}
      onChange={(e) => {
        handleNumberInputChange({
          e,
          decimalPlaces: normalizedDecimalPlaces,
          onChange: (val) => setInternalValue(val),
        });
      }}
      onBlur={(e) => {
        handleNumberInputBlur({
          e,
          min,
          max,
          decimalPlaces: normalizedDecimalPlaces,
          onChange: (val) => {
            setInternalValue(val);
            const num = Number(val);
            if (!isNaN(num)) onChange(num);
          },
          onBlur: () => {},
        });
      }}
      onKeyDown={(e) =>
        handleNumberInputKeyDown({
          e,
          field: {
            value: internalValue,
            onChange: (val: string) => setInternalValue(val),
            onBlur: () => {},
          },
          min,
          max,
          normalizedDecimalPlaces,
        })
      }
      className={clsx(styles.numberField, className, {
        [styles.numberFieldUnits]: isUnits,
      })}
      autoFocus={autoFocus}
    />
  );
};

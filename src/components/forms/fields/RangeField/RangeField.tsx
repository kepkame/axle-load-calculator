import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import debounce from 'lodash-es/debounce';

import { calculateStep, roundToNearestStep } from '@utils/numberUtils/mathUtils';
import { formatNumberToDecimals } from '@utils/numberUtils/formatUtils';
import { RangeFieldProps } from './RangeField.types';
import styles from './RangeField.module.scss';

/**
 * Slider input for adjusting numeric values with controlled precision.
 *
 * Used alongside NumberField to give users a more intuitive way to fine-tune values.
 */
export const RangeField: React.FC<RangeFieldProps> = ({
  value,
  onChange,
  min,
  max,
  decimalPlaces = 0,
}) => {
  // const [step, setStep] = useState(1);
  const [step, setStep] = useState(() => calculateStep(value, decimalPlaces));
  const [localValue, setLocalValue] = useState<number>(value);

  // Recalculate slider step when value or precision changes.
  // Prevents jumpy behavior for small decimal ranges.
  useEffect(() => {
    setStep(calculateStep(localValue, decimalPlaces));
  }, [localValue, decimalPlaces]);

  useEffect(() => {
    if (value !== localValue) setLocalValue(value);
  }, [value]);

  const debouncedChange = useMemo(() => {
    return debounce((v: string) => {
      onChange(v);
    }, 5);
  }, [onChange]);

  useEffect(() => {
    return () => debouncedChange.cancel();
  }, [debouncedChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number(event.target.value);
    setLocalValue(rawValue);

    const roundedValue = roundToNearestStep(rawValue, step, max, decimalPlaces);
    const formattedValue = formatNumberToDecimals(roundedValue, decimalPlaces);

    debouncedChange(formattedValue);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value || 0}
      onChange={handleChange}
      step={step}
      tabIndex={-1}
      className={clsx(styles.rangeField)}
    />
  );
};

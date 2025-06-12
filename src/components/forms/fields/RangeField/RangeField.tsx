import { useState, useEffect } from 'react';
import clsx from 'clsx';
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
  const [step, setStep] = useState(1);

  // Recalculate slider step when value or precision changes.
  // Prevents jumpy behavior for small decimal ranges.
  useEffect(() => {
    setStep(calculateStep(value, decimalPlaces));
  }, [value, decimalPlaces]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    // Ensure value lands on a valid step
    const roundedValue = roundToNearestStep(newValue, step, max, decimalPlaces);

    // Format the number before sending it to onChange
    const formattedValue = formatNumberToDecimals(roundedValue, decimalPlaces);

    // Propagate change to parent (usually a NumberField)
    onChange(formattedValue);
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

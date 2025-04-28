import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { calculateStep, roundToNearestStep } from '@utils/numberUtils/mathUtils';
import { formatNumberToDecimals } from '@utils/numberUtils/formatUtils';
import { RangeFieldProps } from './RangeField.types';
import styles from './RangeField.module.scss';

export const RangeField: React.FC<RangeFieldProps> = ({
  value,
  onChange,
  min,
  max,
  decimalPlaces = 0,
}) => {
  const [step, setStep] = useState(1);

  // Observe the change in `value` and recalculate `step`
  useEffect(() => {
    setStep(calculateStep(value, decimalPlaces));
  }, [value, decimalPlaces]);

  /**
   * Handler for changing the value of the slider.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    // Rounding before setting
    const roundedValue = roundToNearestStep(newValue, step, max, decimalPlaces);

    // Format the number before sending it to onChange
    const formattedValue = formatNumberToDecimals(roundedValue, decimalPlaces);

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

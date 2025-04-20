import { useId } from 'react';
import { useController } from 'react-hook-form';
import { RadioButton } from './RadioButton';
import { Option, RadioGroupProps } from './RadioGroup.types';
import { Tooltip } from '@components/feedback/Tooltip/Tooltip';
import styles from './RadioGroup.module.scss';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  control,
  label,
  tooltip,
  error,
  disabled = false,
  id,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    defaultValue: undefined,
  });

  const groupId = id || useId();
  const errorMessage = fieldError?.message || error;

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      {...(errorMessage ? { 'aria-invalid': 'true' } : {})} // Add dynamically to avoid errors from DevTools.
      aria-describedby={errorMessage ? `${groupId}-error` : undefined}
      className={styles.radioGroup}
    >
      <div className={styles.radioHeader}>
        <span className={styles.radioTitle}>{label}</span>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>

      <div className={styles.radioWrapper}>
        {options.map(({ value: optionValue, option }: Option) => (
          <RadioButton
            key={optionValue}
            name={name}
            value={optionValue}
            label={option}
            checked={value === optionValue}
            onChange={() => onChange(optionValue)}
            disabled={disabled}
          />
        ))}
      </div>

      {errorMessage && (
        <p id={`${groupId}-error`} className="field-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

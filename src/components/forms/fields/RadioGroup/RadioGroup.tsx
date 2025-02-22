import { useId } from 'react';
import { useController } from 'react-hook-form';
import { RadioButton } from './RadioButton';
import { IOption, IRadioGroupProps } from './RadioGroup.types';
import styles from './RadioGroup.module.scss';

export const RadioGroup: React.FC<IRadioGroupProps> = ({
  name,
  options,
  control,
  label,
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
  console.log('fieldError: ', fieldError);
  console.log('errorMessage: ', errorMessage);

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      {...(errorMessage ? { 'aria-invalid': 'true' } : {})} // Add dynamically to avoid errors from DevTools.
      aria-describedby={errorMessage ? `${groupId}-error` : undefined}
      className={styles.radioGroup}
    >
      <div className={styles.radioHeader}>
        <p className={styles.radioTitle}>{label}</p>
      </div>

      <div className={styles.radioWrapper}>
        {options.map(({ value: optionValue, option }: IOption) => (
          <RadioButton
            key={optionValue}
            name="numberAxle"
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

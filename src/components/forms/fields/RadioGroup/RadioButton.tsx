import { memo, useId, useRef } from 'react';
import { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.scss';

export const RadioButton: React.FC<RadioButtonProps> = memo(
  ({
    name,
    value,
    label,
    id,
    ariaLabelledby,
    checked,
    onChange,
    disabled = false,
    ...restProps
  }) => {
    const computedId = id || useId();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <label
        htmlFor={computedId}
        className={styles.radioLabel}
        tabIndex={checked ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          id={computedId}
          ref={inputRef}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          aria-labelledby={ariaLabelledby || computedId}
          className={styles.radioInput}
          tabIndex={-1}
          {...restProps}
        />
        <span className={styles.radioText}>{label}</span>
      </label>
    );
  },
  (prevProps: RadioButtonProps, nextProps: RadioButtonProps) =>
    prevProps.checked === nextProps.checked &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.label === nextProps.label,
);

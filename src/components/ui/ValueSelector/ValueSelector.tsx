import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { IOptionSelector, IValueSelectorProps } from './ValueSelector.types';

export const ValueSelector: React.FC<IValueSelectorProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const [value, setValue] = useState<IOptionSelector | null>(null);

  const handleOnChange = (newValue: SingleValue<IOptionSelector>) => {
    if (newValue && newValue.value !== '') {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Select
      classNamePrefix="custom-select"
      value={value || null}
      onChange={handleOnChange}
      options={options}
      isSearchable={false}
      placeholder={placeholder ?? 'Выберите значение'}
    />
  );
};

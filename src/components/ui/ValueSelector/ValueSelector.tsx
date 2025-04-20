import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { OptionSelector, ValueSelectorProps } from './ValueSelector.types';

export const ValueSelector: React.FC<ValueSelectorProps> = ({ options, placeholder, onChange }) => {
  const [value, setValue] = useState<OptionSelector | null>(null);

  const handleOnChange = (newValue: SingleValue<OptionSelector>) => {
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

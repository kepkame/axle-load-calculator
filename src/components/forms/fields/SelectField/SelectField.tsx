// import { useState } from 'react';
import { useController } from 'react-hook-form';
import Select, { SingleValue, components } from 'react-select';
import { Option, SelectProps } from './SelectField.types';

export const SelectField: React.FC<SelectProps> = ({ options, name, control, placeholder }) => {
  // const [currentModel, setCurrentModel] = useState<IOption | null>(null);

  const {
    field: { onChange, value, ref },
  } = useController({ name, control, defaultValue: '' });

  // const selectedOption = options.find((option) => option.value === value) || null;
  const selectedOption = options.find((option) => option.value === value) || null;

  console.log('selectedOption: ', selectedOption);
  // const handleOnChange = (newValue: SingleValue<IOption>) => {
  //   if (newValue && newValue.value !== '') {
  //     setCurrentModel(newValue);
  //   }
  // };

  return (
    <Select
      classNamePrefix="custom-select"
      value={selectedOption}
      options={options}
      // onChange={handleOnChange}
      placeholder={placeholder ?? 'Выберите значение'}
      isSearchable={false}
      onChange={(option: SingleValue<Option>) => {
        // When a new option is selected, we update the value in the form
        onChange(option ? option.value : null);
      }}
      components={{
        Input: (props) => <components.Input {...props} innerRef={ref} />,
      }}
    />
  );
};

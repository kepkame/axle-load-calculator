import { useController } from 'react-hook-form';
import Select, { SingleValue, components } from 'react-select';
import { Option, SelectProps } from './SelectField.types';

export const SelectField: React.FC<SelectProps> = ({ options, name, control, placeholder }) => {
  const {
    field: { onChange, value, ref },
  } = useController({ name, control, defaultValue: '' });

  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <Select
      classNamePrefix="custom-select"
      value={selectedOption}
      options={options}
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

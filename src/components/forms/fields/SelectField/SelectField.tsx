import { useController } from 'react-hook-form';
import Select, { SingleValue, components } from 'react-select';
import { Option, SelectProps } from './SelectField.types';

/**
 * Controlled single-select dropdown integrated with react-hook-form.
 */
export const SelectField: React.FC<SelectProps> = ({ options, name, control, placeholder }) => {
  const {
    field: { onChange, value, ref },
  } = useController({ name, control, defaultValue: '' });

  // Map current raw value (string) to the matching option object for react-select
  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <Select
      classNamePrefix="custom-select"
      value={selectedOption}
      options={options}
      placeholder={placeholder ?? 'Выберите значение'}
      isSearchable={false}
      // Update form state with raw value when selection changes
      onChange={(option: SingleValue<Option>) => {
        onChange(option ? option.value : null);
      }}
      components={{
        // Forward react-hook-form's ref to internal input for accessibility and form integration
        Input: (props) => <components.Input {...props} innerRef={ref} />,
      }}
    />
  );
};

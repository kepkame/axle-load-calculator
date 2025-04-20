export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: string;
  id?: string;
  ariaLabelledby?: string;
}

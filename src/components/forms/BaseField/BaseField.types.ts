export interface IBaseFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  /** Units of Measurement */
  units?: string;
  tooltip?: string | React.ReactElement;
  children: React.ReactElement;
}

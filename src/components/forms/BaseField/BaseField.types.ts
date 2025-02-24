export interface IBaseFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  /** Units of Measurement */
  units?: string;
  children: React.ReactElement;
}

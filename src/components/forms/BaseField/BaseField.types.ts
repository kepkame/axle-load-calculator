export interface BaseFieldProps {
  label: string;
  className?: string | undefined;
  htmlFor?: string;
  error?: string;
  /** Units of Measurement */
  units?: string;
  tooltip?: string | React.ReactElement;
  children: React.ReactElement;
}

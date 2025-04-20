export interface RangeFieldProps {
  value: number;
  onChange: (value: string) => void;
  min: number;
  max: number;
  /**
   * Number of decimal places to calculate the step.
   * If not specified, the value is assumed to be an integer by default.
   */
  decimalPlaces?: number;
}

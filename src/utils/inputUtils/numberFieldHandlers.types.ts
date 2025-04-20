export interface HandleNumberInputChangeArgs {
  e: React.ChangeEvent<HTMLInputElement>;
  decimalPlaces: number;
  onChange: (value: string) => void;
}

export interface HandleNumberInputBlurArgs {
  e: React.FocusEvent<HTMLInputElement>;
  min: number;
  max: number;
  decimalPlaces: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export interface HandleNumberInputKeyDownArgs {
  e: React.KeyboardEvent<HTMLInputElement>;
  field: any;
  min: number;
  max: number;
  normalizedDecimalPlaces: number;
}

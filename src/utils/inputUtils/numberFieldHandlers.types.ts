import React from 'react';

export interface IHandleNumberInputChangeArgs {
  e: React.ChangeEvent<HTMLInputElement>;
  decimalPlaces: number;
  onChange: (value: string) => void;
}

export interface IHandleNumberInputBlurArgs {
  e: React.FocusEvent<HTMLInputElement>;
  min: number;
  max: number;
  decimalPlaces: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export interface IHandleNumberInputKeyDownArgs {
  e: React.KeyboardEvent<HTMLInputElement>;
  field: any;
  min: number;
  max: number;
  normalizedDecimalPlaces: number;
}

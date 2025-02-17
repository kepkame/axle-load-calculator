import React from 'react';
import { UseControllerProps } from 'react-hook-form';

export interface INumberFieldProps
  extends Omit<UseControllerProps<any>, 'defaultValue'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id?: string;
  min?: number;
  max?: number;
  decimalPlaces?: number;
  isUnits?: boolean;
  showRange?: boolean;
  /** Function to format the value when focus is lost. */
  formatter?: (value: number, decimalPlaces: number) => string;
  ref?: React.Ref<HTMLInputElement>;
}

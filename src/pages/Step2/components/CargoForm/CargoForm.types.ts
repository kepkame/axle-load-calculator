import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldPath,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { FormSchemaType } from '@entities/step2Form/types';

/**
 * Defines minimum and maximum values for cargo field validations (weight and quantity).
 *
 * Used to dynamically enforce form constraints based on the platform length or other business rules.
 */
export interface CargoFormConstraints {
  weight: { min: number; max: number };
  quantity: { min: number; max: number };
}

/**
 * Props for the CargoForm component.
 *
 * Provides control over cargo groups, validation errors, constraint values,
 * and platform-specific context needed for dynamic validation.
 */
export interface CargoFormProps {
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  fields: FieldArrayWithId<FormSchemaType, 'cargoGroup', 'id'>[];
  remove: UseFieldArrayRemove;
  constraints: CargoFormConstraints;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  deckLengthMM: number;
}

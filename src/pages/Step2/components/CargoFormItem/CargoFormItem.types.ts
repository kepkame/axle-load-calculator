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

export interface CargoFormItemProps {
  index: number;
  field: FieldArrayWithId<FormSchemaType, 'cargoGroup', 'id'>;
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  constraints: CargoFormConstraints;
  remove: UseFieldArrayRemove;
  trigger: (name?: FieldPath<FormSchemaType> | FieldPath<FormSchemaType>[]) => Promise<boolean>;
  deckLengthMM: number;
  showHeader: boolean;
}

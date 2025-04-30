import type { Control, FieldErrors, UseFormTrigger } from 'react-hook-form';
import type { FormSchemaType } from '@entities/step2Form/types';
import { getCargoFormConstraints } from '../../utils/getCargoFormConstraints';

export interface Step2FormContentProps {
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  trigger: UseFormTrigger<FormSchemaType>;
  deckLengthMM: number;
  cargoConstraints: ReturnType<typeof getCargoFormConstraints>;
}

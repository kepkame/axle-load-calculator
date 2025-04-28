import { useMemo } from 'react';
import { formCargoSchema } from '../schema';
import type { FormSchemaType } from '../types';
import type { ZodSchema } from 'zod';

export function useFormCargoSchema(deckLengthMM: number): ZodSchema<FormSchemaType> {
  // Memoizes the schema to avoid unnecessary recalculations on rerenders
  return useMemo(() => formCargoSchema(deckLengthMM), [deckLengthMM]);
}

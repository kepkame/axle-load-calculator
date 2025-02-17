import { ZodObject, ZodRawShape } from 'zod';
import { getZodMinMax } from '@utils/zodUtils';

/** Extract min and max values from the schematic. */
export const getConstraintsFromSchema = <T extends ZodRawShape>(schema: ZodObject<T>) => {
  const constraints: Record<string, { min: number; max: number }> = {};

  for (const key in schema.shape) {
    const field = schema.shape[key];
    const { min, max } = getZodMinMax(field);

    constraints[key] = { min, max };
  }

  return constraints;
};

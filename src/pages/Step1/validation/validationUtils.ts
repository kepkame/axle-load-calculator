import { z, ZodArray, ZodObject, ZodRawShape, ZodTypeAny } from 'zod';
import { getZodMinMax } from '@utils/zodUtils';

type Constraints = Record<string, unknown>;

/**
 * Extracts validation constraints from a Zod schema.
 * Supports nested objects and arrays, applying min/max constraints where applicable.
 *
 * @param schema - The Zod schema object to extract constraints from.
 * @returns An object containing validation constraints for each field.
 */
export const getConstraintsFromSchema = <T extends ZodRawShape>(
  schema: ZodObject<T>,
): Constraints => {
  return Object.entries(schema.shape).reduce<
    Partial<Record<keyof z.infer<typeof schema>, unknown>>
  >((acc, [key, field]) => {
    if (field instanceof ZodArray) {
      // If the field is an array, extract constraints from its element type
      const elementType = field.element;
      acc[key as keyof z.infer<typeof schema>] =
        elementType instanceof ZodObject
          ? getConstraintsFromSchema(elementType) // Recursively extract constraints for nested objects
          : getZodMinMax(elementType); // Apply min/max constraints for primitive types
    } else if (field instanceof ZodObject) {
      // If the field is a nested object, recurse into it
      acc[key as keyof z.infer<typeof schema>] = getConstraintsFromSchema(field);
    } else {
      // For primitive fields, apply min/max constraints
      acc[key as keyof z.infer<typeof schema>] = getZodMinMax(field as ZodTypeAny);
    }
    return acc;
  }, {});
};

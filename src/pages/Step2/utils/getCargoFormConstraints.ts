import { cargoGroupSchema } from '@entities/step2Form/schema';
import { getZodMinMax } from '@utils/zodUtils';

export interface CargoFormConstraints {
  weight: { min: number; max: number };
  quantity: { min: number; max: number };
}

/**
 * Safely extracts minimum and maximum validation constraints
 * for weight and quantity fields from the cargo group schema.
 *
 * Provides static constraint values used across the cargo form components
 * to maintain consistent validation behavior.
 */
export const getCargoFormConstraints = (): CargoFormConstraints => {
  // Accesses the shape of the cargo group schema to retrieve field definitions
  const groupShape = cargoGroupSchema.shape;

  return {
    weight: getZodMinMax(groupShape.weight),
    quantity: getZodMinMax(groupShape.quantity),
  };
};

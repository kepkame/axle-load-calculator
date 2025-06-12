import { AxleFieldArrayItem } from './../types';

/**
 * Resolving lifted axle selection state.
 *
 * Used by toggle logic to:
 * - Get the actual index positions of eligible axles,
 * - Determine which axle (if any) is currently marked as lifted.
 */
export const getActualIndices = (
  fields: (AxleFieldArrayItem & { id: string })[],
  axleType: 'truck' | 'trailer',
  axleCount: number,
): number[] => {
  return fields
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.axleType === axleType)
    .map(({ idx }) => idx)
    .slice(0, axleCount);
};

/**
 * Returns the relative index (within the current axle group) of the selected lifted axle.
 *
 * If no axle is lifted, returns -1. Used to track toggle state in the UI.
 */
export const getSelectedRelative = (
  actualIndices: number[],
  fields: (AxleFieldArrayItem & { id: string })[],
): number => {
  return actualIndices.findIndex((idx) => fields[idx].lifted);
};

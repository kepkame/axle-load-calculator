/**
 * Generates unique string keys for each wheelbase segment between adjacent axles.
 *
 * Format:
 * - `truck-0-1`, `truck-1-2`, etc. for truck axles
 * - `trailer-0-1`, `trailer-1-2`, etc. for trailer axles
 */
export const generateWheelbaseKeys = (truckAxles: number, trailerAxles: number): string[] => {
  const createPairKeys = (count: number, prefix: 'truck' | 'trailer'): string[] => {
    const pairs = Math.max(0, Math.floor(count) - 1);
    const keys: string[] = [];
    for (let i = 0; i < pairs; i++) {
      keys.push(`${prefix}-${i}-${i + 1}`);
    }
    return keys;
  };

  return [...createPairKeys(truckAxles, 'truck'), ...createPairKeys(trailerAxles, 'trailer')];
};

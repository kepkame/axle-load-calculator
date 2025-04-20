export interface AxleKeyConfig {
  truckAxles: number;
  trailerAxles: number;
}

/**
 * Generates a consistent list of axle keys used to identify axle fields in the form.
 *
 * - Truck axles are prefixed with "truck-" and optionally suffixed with "-lifted".
 * - Trailer axles are prefixed with "trailer-".
 * - Special logic handles lifted axles by inserting "truck-1-lifted" in the correct order.
 */
export const generateAxleKeys = ({ truckAxles, trailerAxles }: AxleKeyConfig): string[] => {
  const keys: string[] = [];
  const hasLifted = truckAxles % 1 !== 0;

  // Calculate the actual number of truck axle keys to generate
  const truckCount = hasLifted ? Math.floor(truckAxles) + 1 : truckAxles;

  // Generate keys for truck axles
  for (let i = 0; i < truckCount; i++) {
    if (hasLifted) {
      if (i === 0) {
        keys.push('truck-0'); // First leading axle
      } else if (i === 1) {
        keys.push('truck-1-lifted'); // Insert lifted axle in second position
      } else {
        keys.push(`truck-${i - 1}`); // Subsequent standard axles
      }
    } else {
      keys.push(`truck-${i}`); // Standard naming when no lifted axle
    }
  }

  // Generate keys for trailer axles
  for (let i = 0; i < trailerAxles; i++) {
    keys.push(`trailer-${i}`);
  }

  return keys;
};

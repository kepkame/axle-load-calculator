interface AxleKeyConfig {
  truckAxles: number;
  trailerAxles: number;
}

const generateKeys = (prefix: string, count: number): string[] => {
  const keys: string[] = [];

  for (let i = 0; i < count; i++) {
    const key = `${prefix}-${i}`;
    keys.push(key);
  }

  return keys;
};

/**
 * Generates a stable list of string keys used to identify individual axle inputs in the form.
 *
 * Prefixing keys with axle type ensures uniqueness.
 * - Truck axles use the "truck-{index}" pattern
 * - Trailer axles use the "trailer-{index}" pattern
 */
export const generateAxleKeys = ({ truckAxles, trailerAxles }: AxleKeyConfig): string[] => [
  ...generateKeys('truck', truckAxles),
  ...generateKeys('trailer', trailerAxles),
];

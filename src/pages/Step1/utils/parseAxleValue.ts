export interface ParseAxleValueOptions<T extends number> {
  raw: unknown;
  allowed: readonly T[];
  fallback: T;
}

/**
 * Converts a string from the form to a valid axle numerical value.
 * Returns fallback if parsing fails or the value is outside the allowed list.
 */
export const parseAxleValue = <T extends number>({
  raw,
  allowed,
  fallback,
}: ParseAxleValueOptions<T>): T => {
  if (typeof raw !== 'string') return fallback;

  const parsed = parseFloat(raw);
  return !Number.isNaN(parsed) && allowed.includes(parsed as T) ? (parsed as T) : fallback;
};

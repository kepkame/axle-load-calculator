export interface ParseAxleValueOptions {
  raw: unknown;
  allowed: readonly string[];
  fallback: string;
}

/**
 * Converts a string from the form to a valid axle numerical value.
 *
 * Used only before Zod validation.
 * Returns fallback if parsing fails or the value is outside the allowed list.
 */
export const parseAxleValue = ({ raw, allowed, fallback }: ParseAxleValueOptions): number => {
  const rawStr = typeof raw === 'string' ? raw : '';
  const parsed = parseFloat(rawStr);

  if (!Number.isNaN(parsed) && allowed.includes(rawStr)) {
    return parsed;
  }

  const fallbackParsed = parseFloat(fallback);
  return Number.isNaN(fallbackParsed) ? 0 : fallbackParsed;
};

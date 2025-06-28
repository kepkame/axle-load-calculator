/**
 * Checking differences between two arrays (by length or value)
 */
export const arraysDiffer = (a: readonly number[] = [], b: readonly number[] = []): boolean =>
  a.length !== b.length || a.some((val, i) => val !== b[i]);

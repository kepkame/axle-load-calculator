/**
 * Generates a wheelbase array pre-filled with a default value.
 */
export function prepareWheelbaseDefaults(count: number, min: number): number[] {
  return Array(count).fill(min);
}

import { TRACTOR_FRONT_AXLE_OFFSET_FROM_FRONT_M } from '../data/constants';

type TruckAxleCount = '2' | '3';

/**
 * Calculates Y-coordinates (in meters) for each truck axle, starting from cab front.
 * Returns array of positions: [front, (middle), rear].
 *
 * @throws {Error} If wheelbase data does not match axle count requirements.
 */
export const getTruckAxleCoords = (axleCount: TruckAxleCount, wheelbase: number[]): number[] => {
  const frontAxlePos = TRACTOR_FRONT_AXLE_OFFSET_FROM_FRONT_M;
  const parsed = wheelbase.map(Number);

  if (parsed.some((v) => !Number.isFinite(v))) {
    throw new Error(
      `[getTruckAxleCoords] Invalid numeric values in wheelbase: ${JSON.stringify(wheelbase)}`,
    );
  }

  if (axleCount === '2') {
    const [dFrontToRear] = parsed;
    const rear = frontAxlePos + dFrontToRear;
    return [frontAxlePos, rear];
  }

  if (axleCount === '3') {
    const [dFrontToMiddle, dMiddleToRear] = parsed;
    const middle = frontAxlePos + dFrontToMiddle;
    const rear = middle + dMiddleToRear;
    return [frontAxlePos, middle, rear];
  }

  // Enforce exhaustiveness
  throw new Error(
    `[getTruckAxleCoords] Unsupported axleCount: ${axleCount}. Only '2' or '3' allowed.`,
  );
};

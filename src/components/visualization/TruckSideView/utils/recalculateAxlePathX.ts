import { DEFAULT_AXLE_PATH_D } from '../config/axleConfigs';

interface IRecalculateAxlePathXParams {
  newLeftX: number;
  originalD?: string;
}

/**
 * Parses the "d" attribute string and returns an array of tokens.
 * @param d - the "d" attribute string
 * @returns an array of tokens
 * @throws Error if parsing fails
 */
const parseDAttribute = (d: string): string[] => {
  const tokens = d.match(/[a-zA-Z]|-?\d+(\.\d+)?/g);
  if (!tokens) {
    throw new Error(`Unable to parse the "d" attribute: ${d}`);
  }

  return tokens;
};

/**
 * Extracts only X-coordinates from the token array.
 * The first numeric value in each (X, Y) pair is considered an X-coordinate.
 * @param tokens - an array of tokens
 * @returns an array of X-coordinates
 */
const extractXCoordinates = (tokens: string[]): number[] => {
  let expectingX = true;

  return tokens.reduce<number[]>((acc, token) => {
    if (!isNaN(parseFloat(token))) {
      if (expectingX) {
        acc.push(parseFloat(token));
      }
      expectingX = !expectingX;
    } else {
      expectingX = true;
    }
    return acc;
  }, []);
};

/**
 * Recalculates coordinates by adjusting only the X values.
 * @param tokens - the original token array
 * @param shiftX - the shift value along the X-axis
 * @returns a new token array with updated coordinates
 */
const recalcCoordinates = (tokens: string[], shiftX: number): string[] => {
  let expectingX = true;

  return tokens.map((token) => {
    if (!isNaN(parseFloat(token))) {
      const num = parseFloat(token);
      const newNum = expectingX ? num + shiftX : num;
      expectingX = !expectingX;

      return parseFloat(newNum.toFixed(3)).toString();
    } else {
      expectingX = true;
      return token;
    }
  });
};

/**
 * Recalculates the "d" attribute value by adjusting the X-coordinates.
 * This function is pure, declarative, and strictly typed.
 * @param params.newLeftX - the new minimum X value
 * @param params.originalD - the original "d" attribute value (defaults to a predefined value if not provided)
 * @returns the updated "d" attribute with recalculated coordinates
 */
const recalculateAxlePathX = ({ newLeftX, originalD }: IRecalculateAxlePathXParams): string => {
  try {
    const baseD = originalD ?? DEFAULT_AXLE_PATH_D;
    const tokens = parseDAttribute(baseD);
    const xCoordinates = extractXCoordinates(tokens);

    if (xCoordinates.length === 0) {
      throw new Error('No valid x coordinates found in the "d" attribute.');
    }

    const currentLeftX = Math.min(...xCoordinates);
    const shiftX = newLeftX - currentLeftX;
    const newTokens = recalcCoordinates(tokens, shiftX);

    return newTokens.join(' ');
  } catch (error) {
    throw new Error(
      `recalculateAxlePathX failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export default recalculateAxlePathX;

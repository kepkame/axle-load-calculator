interface GenerateAxlePathDParams {
  targetLeftX: number;
  originalD: string;
}

/**
 * Parses the "d" attribute string of an SVG path and splits it into tokens.
 * Example: "M31 124C..." → ['M', '31', '124', 'C', ...]
 */
const parseDAttribute = (d: string): string[] => {
  const tokens = d.match(/[a-zA-Z]|-?\d+(\.\d+)?/g);
  if (!tokens) {
    throw new Error(`the line “d” could not be parsed: ${d}`);
  }

  return tokens;
};

/**
 * Extracts X-coordinates from a sequence of path tokens.
 * X-coordinates are assumed to be the first value in each (X, Y) pair.
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

/** Applies an X-axis offset (delta) to all X-coordinates while preserving Y values. */
const recalculateCoordinates = (tokens: string[], shiftX: number): string[] => {
  let expectingX = true;

  return tokens.map((token) => {
    if (!isNaN(parseFloat(token))) {
      const num = parseFloat(token);
      const shifted = expectingX ? num + shiftX : num;
      expectingX = !expectingX;
      return parseFloat(shifted.toFixed(3)).toString(); // round to 3 decimal places
    } else {
      expectingX = true;
      return token;
    }
  });
};

/** Generates a new SVG path string with its leftmost X point aligned to `targetLeftX` */
export function generateAxlePathD({ targetLeftX, originalD }: GenerateAxlePathDParams): string {
  try {
    const tokens = parseDAttribute(originalD);
    const xCoordinates = extractXCoordinates(tokens);

    if (xCoordinates.length === 0) {
      throw new Error('No X-coordinates in the transmitted path');
    }

    const currentLeftX = Math.min(...xCoordinates);
    const shiftX = targetLeftX - currentLeftX;
    const newTokens = recalculateCoordinates(tokens, shiftX);

    return newTokens.join(' ');
  } catch (error) {
    throw new Error(
      `generateAxlePathD: coordinate conversion error — ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

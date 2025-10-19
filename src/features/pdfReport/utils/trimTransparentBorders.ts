/**
 * Trims transparent margins around the canvas to remove empty areas.
 * If the entire image is transparent — returns the original canvas unchanged.
 * Works based on the alpha channel (A in RGBA).
 */
export const trimTransparentBorders = (src: HTMLCanvasElement): HTMLCanvasElement => {
  const ctx = src.getContext('2d', { willReadFrequently: true });
  if (!ctx) return src;

  const { width, height } = src;

  // Extract all RGBA pixels from the canvas (4 values per pixel: R, G, B, A)
  const { data } = ctx.getImageData(0, 0, width, height);

  // Initialize the boundaries of the minimum visible rectangle
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  // Iterate through each pixel, analyzing only the alpha channel (A)
  for (let y = 0; y < height; y++) {
    const row = y * width * 4; // offset of the row start in the RGBA array
    for (let x = 0; x < width; x++) {
      // Index of the alpha channel component for the current pixel
      const i = row + x * 4 + 3;
      const alpha = data[i];

      // If the pixel is even slightly opaque (alpha > 0),
      // update the boundaries of the minimal visible rectangle
      if (alpha !== 0) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // If the boundaries haven’t changed, it means the entire image is fully transparent
  if (maxX < 0 || maxY < 0) return src;

  const cropW = Math.max(1, maxX - minX + 1);
  const cropH = Math.max(1, maxY - minY + 1);

  const dst = document.createElement('canvas');
  dst.width = cropW;
  dst.height = cropH;

  // Copy only the visible part from the source canvas, excluding transparent edges
  const dstx = dst.getContext('2d');
  dstx?.drawImage(src, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  return dst;
};

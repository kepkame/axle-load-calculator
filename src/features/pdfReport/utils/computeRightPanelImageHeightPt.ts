/**
 * Calculates the final image height
 */
export const computeRightPanelImageHeightPt = (canvas: HTMLCanvasElement): number => {
  // Basic A4 page metrics
  const A4_WIDTH_PT = 595.28;
  const A4_HEIGHT_PT = 841.89;
  const PAGE_PADDING_PT = 18;
  const HEADER_HEIGHT_PT = 48;
  const HEADER_MARGIN_BOTTOM_PT = 12;
  const RIGHT_COL_PERCENT = 0.35;

  // Calculate the available page area for content
  const pageInnerHeight =
    A4_HEIGHT_PT - 2 * PAGE_PADDING_PT - HEADER_HEIGHT_PT - HEADER_MARGIN_BOTTOM_PT;

  const rightColWidthPt = A4_WIDTH_PT * RIGHT_COL_PERCENT;

  const { width, height } = canvas;
  if (width <= 0 || height <= 0) return pageInnerHeight;

  // Recalculate the image height while preserving proportions
  const imageHeightPt = rightColWidthPt * (height / width);

  return Math.max(1, Math.min(imageHeightPt, pageInnerHeight));
};

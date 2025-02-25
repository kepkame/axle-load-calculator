import { offset, flip, shift, arrow } from '@floating-ui/react';

/**
 * Creates a set of middleware functions for positioning a tooltip using Floating UI.
 *
 * @param {React.RefObject<SVGSVGElement | null>} arrowRef - Ref to the tooltip's arrow element.
 * @returns {Array} - An array of middleware functions for use in Floating UI's `useFloating()`.
 */
export const createTooltipMiddleware = (arrowRef: React.RefObject<SVGSVGElement | null>) => [
  // Offset the tooltip from the element
  offset(({ placement }) => (placement.startsWith('bottom') ? 0 : 12)),
  // Automatically flip if there is not enough space
  flip({ fallbackPlacements: ['bottom', 'top'] }),
  // Shift tooltip when it overflows boundaries
  shift({ padding: 16 }),
  // Apply tooltip arrow
  arrow({ element: arrowRef }),
];

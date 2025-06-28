import { useState, useEffect } from 'react';

/**
 * Returns the content width of an element excluding left/right borders.
 *
 * Returns 0 if ref is not attached yet.
 * Updates on resize, border changes, etc (via ResizeObserver).
 */
export const useContentWidthWithoutBorder = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // ResizeObserver triggers on both content and border changes
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const fullWidth = entry.contentRect.width;

      const computed = getComputedStyle(node);
      const borderLeft = parseFloat(computed.borderLeftWidth || '0');
      const borderRight = parseFloat(computed.borderRightWidth || '0');
      // Subtract borders to get pure content width
      const innerWidth = fullWidth - borderLeft - borderRight;

      setWidth(Math.round(innerWidth));
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return width;
};

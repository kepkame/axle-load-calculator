import { useEffect } from 'react';
import { autoUpdate, ReferenceType } from '@floating-ui/react';

interface IUseFloatingAutoUpdateProps {
  open: boolean;
  reference: React.MutableRefObject<ReferenceType | null>;
  floating: React.MutableRefObject<HTMLElement | null>;
  update: () => void;
}

/**
 * Custom hook to automatically update the tooltip position when its reference
 * or floating element changes in size or position.
 *
 * Uses `@floating-ui/react`'s `autoUpdate` function to dynamically adjust the tooltip's
 * placement while it is open.
 *
 * @param {boolean} open - Whether the tooltip is currently open.
 * @param {React.MutableRefObject<ReferenceType | null>} reference - Ref to the reference (anchor) element.
 * @param {React.MutableRefObject<HTMLElement | null>} floating - Ref to the floating (tooltip) element.
 * @param {() => void} update - Function to manually trigger a position update.
 *
 * @returns {void} - No return value; the effect manages the cleanup automatically.
 */
export const useFloatingAutoUpdate = ({
  open,
  reference,
  floating,
  update,
}: IUseFloatingAutoUpdateProps) => {
  useEffect(() => {
    // Ensure the tooltip is open and both reference and floating elements exist
    if (!open || !reference.current || !floating.current) {
      return;
    }

    // Start auto-updating the tooltip's position when size or position changes
    const cleanup = autoUpdate(reference.current, floating.current, update);

    // Cleanup function to stop auto-updating when dependencies change or the component unmounts
    return () => cleanup();
  }, [open, reference, floating, update]);
};

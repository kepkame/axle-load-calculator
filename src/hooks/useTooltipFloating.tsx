import { useState, useEffect, useRef } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useClick,
  useFocus,
  useDismiss,
  useInteractions,
  autoUpdate,
} from '@floating-ui/react';

interface IUseTooltipFloatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useTooltipFloating = ({ open, setOpen }: IUseTooltipFloatingProps) => {
  // Ref to store a reference to the tooltip arrow element
  const arrowRef = useRef<SVGSVGElement | null>(null);

  // State to store the current tooltip placement
  const [placement, setPlacement] = useState<string>('bottom');

  // Initializing tooltip positioning using Floating UI
  const {
    x,
    y,
    refs,
    strategy,
    middlewareData,
    context,
    update,
    placement: floatingPlacement,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    middleware: [
      offset(({ placement }) => (placement.startsWith('bottom') ? 0 : 12)), // Offset the tooltip from the element
      flip({ fallbackPlacements: ['bottom', 'top'] }), // Automatically flip if there is not enough space
      shift({ padding: 16 }), // Shift tooltip when it overflows boundaries
      arrow({ element: arrowRef }), // Apply tooltip arrow
    ],
  });

  const { reference, floating } = refs;

  // Configurations for different tooltip interaction events
  const click = useClick(context);
  const hover = useHover(context, { delay: { close: 300 }, mouseOnly: true });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);

  // Combining event interaction handlers
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, focus, dismiss]);

  useEffect(() => {
    // Updates `placement` when `floatingPlacement` changes,
    // ensuring the arrow in `Arrow` stays correctly positioned.
    setPlacement(floatingPlacement);
  }, [floatingPlacement]);

  useEffect(() => {
    // Automatically update tooltip position on changes
    if (!reference.current || !floating.current) return;

    const cleanup = autoUpdate(reference.current, floating.current, update);

    return () => cleanup();
  }, [open, reference, floating, update]);

  return {
    x,
    y,
    reference,
    floating,
    strategy,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
    middlewareData,
    context,
    placement,
  };
};

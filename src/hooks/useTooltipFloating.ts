import { useState, useEffect, useRef } from 'react';
import { useFloating } from '@floating-ui/react';
import { createTooltipMiddleware } from '@utils/floatingTooltipMiddleware';
import { useTooltipHandlers } from '@components/feedback/Tooltip/Tooltip.handlers';
import { useFloatingAutoUpdate } from './useFloatingAutoUpdate';

interface IUseTooltipFloatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useTooltipFloating = ({ open, setOpen }: IUseTooltipFloatingProps) => {
  // Ref for the tooltip arrow element
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
    middleware: createTooltipMiddleware(arrowRef), // Apply middleware for positioning
  });

  // Combining event interaction handlers
  const { getReferenceProps, getFloatingProps } = useTooltipHandlers(context);

  // Automatically update tooltip position on changes
  useFloatingAutoUpdate({
    open,
    reference: refs.reference,
    floating: refs.floating,
    update,
  });

  useEffect(() => {
    // Updates `placement` when `floatingPlacement` changes,
    // ensuring the arrow in `Arrow` stays correctly positioned.
    setPlacement(floatingPlacement);
  }, [floatingPlacement]);

  return {
    x,
    y,
    reference: refs.reference, // Ref for the reference element
    floating: refs.floating, // Ref for the floating tooltip element
    strategy,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
    middlewareData,
    context,
    placement,
  };
};

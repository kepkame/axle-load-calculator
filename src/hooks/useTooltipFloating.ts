import { useState, useEffect, useRef } from 'react';
import { useFloating } from '@floating-ui/react';
import { createTooltipMiddleware } from '@utils/floatingTooltipMiddleware';
import { useTooltipHandlers } from '@components/feedback/Tooltip/Tooltip.handlers';
import { useFloatingAutoUpdate } from './useFloatingAutoUpdate';

interface UseTooltipFloatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/**
 * Hook to manage tooltip positioning, interaction, and dynamic updates
 */
export const useTooltipFloating = ({ open, setOpen }: UseTooltipFloatingProps) => {
  const arrowRef = useRef<SVGSVGElement | null>(null); // Ref for tooltip arrow element
  const [placement, setPlacement] = useState<string>('bottom'); // Stores actual placement used

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
    // Syncs internal placement state for arrow alignment
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

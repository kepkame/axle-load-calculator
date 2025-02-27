import {
  useClick,
  useHover,
  useFocus,
  useDismiss,
  useInteractions,
  FloatingContext,
} from '@floating-ui/react';
import { ITooltipHandlerParams } from './Tooltip.types';

/**
 * Opening the tooltip (resetting the close timer, if there was one).
 *
 * @param setOpen - State setter function for controlling the tooltip's visibility.
 * @param timeoutRef - Reference to a timeout ID used for delaying actions.
 */
export const handleOpen = ({ setOpen, timeoutRef, delay = 0 }: ITooltipHandlerParams) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  if (delay > 0) {
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delay);
  } else {
    setOpen(true);
  }
};

/**
 * Tultiple closing with a delay
 *
 * @param setOpen - State setter function for controlling the tooltip's visibility.
 * @param timeoutRef - Reference to a timeout ID used for delaying actions.
 * @param delay - Delay in milliseconds before closing the tooltip (default: 300ms).
 */
export const handleClose = ({ setOpen, timeoutRef, delay = 200 }: ITooltipHandlerParams) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    setOpen(false);
  }, delay);
};

/**
 * Hook that manages tooltip interactions by providing event handlers for different user actions.
 *
 * Uses `@floating-ui/react` to handle events like click, hover, focus, and dismiss,
 * ensuring smooth tooltip behavior based on user interactions.
 *
 * @param {FloatingContext<any>} context - Context object from `useFloating`, required for handling interactions.
 *
 * @returns {object} An object with props for reference and floating elements:
 *  - `{Function} getReferenceProps` - Props to attach to the reference (trigger) element.
 *  - `{Function} getFloatingProps` - Props to attach to the floating (tooltip) element.
 */
export const useTooltipHandlers = (context: FloatingContext<any>) => {
  const click = useClick(context);
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, focus, dismiss]);

  return { getReferenceProps, getFloatingProps };
};

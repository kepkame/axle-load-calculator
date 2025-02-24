import { ITooltipHandlerParams, ITooltipHandleCloseParams } from './Tooltip.types';

/**
 * Opening the tooltip (resetting the close timer, if there was one).
 *
 * @param setOpen - State setter function for controlling the tooltip's visibility.
 * @param timeoutRef - Reference to a timeout ID used for delaying actions.
 */
export const handleOpen = ({ setOpen, timeoutRef }: ITooltipHandlerParams) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  setOpen(true);
};

/**
 * Tultiple closing with a delay
 *
 * @param setOpen - State setter function for controlling the tooltip's visibility.
 * @param timeoutRef - Reference to a timeout ID used for delaying actions.
 * @param delay - Delay in milliseconds before closing the tooltip (default: 300ms).
 */
export const handleClose = ({ setOpen, timeoutRef, delay = 300 }: ITooltipHandleCloseParams) => {
  timeoutRef.current = setTimeout(() => {
    setOpen(false);
  }, delay);
};

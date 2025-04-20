import { MutableRefObject } from 'react';

export interface TooltipProps {
  className?: string;
  children: string | React.ReactElement;
}

export interface TooltipHandlerParams {
  setOpen: (open: boolean) => void;
  timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  delay?: number;
}

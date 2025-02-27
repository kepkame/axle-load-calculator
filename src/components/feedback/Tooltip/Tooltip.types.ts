import { MutableRefObject } from 'react';

export interface ITooltipProps {
  className?: string;
  children: string | React.ReactElement;
}

export interface ITooltipHandlerParams {
  setOpen: (open: boolean) => void;
  timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  delay?: number;
}

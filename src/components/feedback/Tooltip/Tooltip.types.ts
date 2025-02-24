import { MutableRefObject } from 'react';

export interface ITooltipProps {
  className?: string;
  children: React.ReactNode;
}

export interface ITooltipHandlerParams {
  setOpen: (open: boolean) => void;
  timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

export interface ITooltipHandleCloseParams extends ITooltipHandlerParams {
  delay?: number;
}

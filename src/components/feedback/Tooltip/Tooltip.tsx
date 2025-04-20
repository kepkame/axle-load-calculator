import { useState, useId, useRef, memo } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { useTooltipFloating } from '@hooks/useTooltipFloating';
import SVGIcon from '@assets/icons/question.svg?react';
import { Arrow } from './Arrow';
import { handleOpen, handleClose } from './Tooltip.handlers';
import { TooltipProps } from './Tooltip.types';
import styles from './Tooltip.module.scss';

export const Tooltip: React.FC<TooltipProps> = memo(({ className, children }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = window.matchMedia('(hover: none)').matches;

  // Unique ID to link the button with the tooltip via aria-describedby
  const tooltipId = useId();

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
    middlewareData,
    placement,
  } = useTooltipFloating({ open, setOpen });

  return (
    <div className={clsx(className, styles.tooltip)}>
      {/* Button trigger for displaying the tooltip */}
      <button
        {...getReferenceProps({
          ref: reference as unknown as React.LegacyRef<HTMLButtonElement>,
          className: styles.tooltipButton,
          'aria-describedby': open ? tooltipId : undefined,
          'aria-label': 'Tooltip',
          type: 'button',
          onPointerEnter: () => !isMobile && handleOpen({ setOpen, timeoutRef, delay: 150 }), // Open on hover
          onPointerLeave: () => !isMobile && handleClose({ setOpen, timeoutRef, delay: 300 }), // Close when cursor leaves
          onClick: () => handleOpen({ setOpen, timeoutRef }),
        })}
      >
        <SVGIcon className={styles.icon} />
      </button>

      {/* Separate portal for the tooltip, rendered outside the main DOM tree */}
      <FloatingPortal>
        {open && (
          <div
            {...getFloatingProps({
              ref: floating,
              id: tooltipId,
              role: 'tooltip',
              className: styles.tooltipWindow,
              style: {
                position: strategy, // Absolute positioning for the tooltip
                top: y ?? 0,
                left: x ?? 0,
              },
              onMouseEnter: () => !isMobile && handleOpen({ setOpen, timeoutRef, delay: 150 }),
              onMouseLeave: () => !isMobile && handleClose({ setOpen, timeoutRef, delay: 300 }),
              onClick: (e) => e.stopPropagation(),
            })}
          >
            <Arrow ref={arrowRef} context={{ middlewareData, placement }} />
            {children}
          </div>
        )}
      </FloatingPortal>
    </div>
  );
});

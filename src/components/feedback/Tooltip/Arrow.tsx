import React from 'react';

export interface IArrowProps extends React.SVGAttributes<SVGSVGElement> {
  context: {
    middlewareData: {
      arrow?: {
        x?: number | null;
      };
    };
    placement?: string;
  };
}

export const Arrow = React.forwardRef<SVGSVGElement, IArrowProps>(
  ({ context, style, ...props }, ref) => {
    // Destructuring positioning data
    const { middlewareData, placement = 'bottom' } = context;
    const arrowData = middlewareData.arrow || {};
    const arrowX = arrowData.x ?? 0;

    // Initial style for the arrow
    let arrowStyle: React.CSSProperties = { ...style, position: 'absolute' };

    // Determining the arrow position based on tooltip placement
    switch (placement.split('-')[0]) {
      case 'top':
        arrowStyle = {
          ...arrowStyle,
          bottom: '-7px',
          left: arrowX ? `${arrowX}px` : '50%',
          transform: 'translateX(calc(-50% + 7px)) rotate(180deg)',
        };
        break;
      case 'bottom':
        arrowStyle = {
          ...arrowStyle,
          top: '-7px',
          left: arrowX ? `${arrowX}px` : '50%',
          transform: 'translateX(calc(-50% + 7px))',
        };
        break;
      default:
        arrowStyle = {
          ...arrowStyle,
          top: '-7px',
          left: '50%',
          transform: 'translateX(calc(-50% + 7px))',
        };
        break;
    }

    return (
      <svg ref={ref} style={arrowStyle} width="14" height="7" viewBox="0 0 14 7" {...props}>
        <path d="M0 7 L7 0 L14 7 Z" fill="#f4f5f5" />
      </svg>
    );
  },
);

Arrow.displayName = 'Arrow';

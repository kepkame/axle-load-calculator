import React from 'react';

export interface IIconBase {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
  className?: string;
}

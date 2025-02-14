export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isOutline?: boolean;
  isSmall?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconPositionRight?: boolean;
  status?: 'success' | 'warning' | 'danger' | 'remove';
  className?: string;
  children?: React.ReactNode;
  [x: string]: any; // Additional props
}

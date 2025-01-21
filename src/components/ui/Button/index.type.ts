export interface IButtonProps {
  isOutline?: boolean;
  isSmall?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconPositionRight?: boolean;
  children?: React.ReactNode;
  status?: 'success' | 'warning' | 'danger';
  onClick: () => void;
  className?: string;
  [x: string]: any; // Дополнительные пропсы
}

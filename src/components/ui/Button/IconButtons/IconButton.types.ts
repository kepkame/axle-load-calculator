import { IconBaseProps } from './IconBase.type';

export interface IconButtonProps extends IconBaseProps {
  onClick: () => void;
  isRemove?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

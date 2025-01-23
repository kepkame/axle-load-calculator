import { IIconBase } from './IconBase.type';

export interface IIconButton extends IIconBase {
  onClick: () => void;
  isRemove?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

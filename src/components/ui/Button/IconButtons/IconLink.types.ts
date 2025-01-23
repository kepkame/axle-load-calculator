import { IIconBase } from './IconBase.type';

export interface IIconLink extends IIconBase {
  url: string;
  target?: boolean;
}

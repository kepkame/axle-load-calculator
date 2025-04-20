import { IconBaseProps } from './IconBase.type';

export interface IconLinkProps extends IconBaseProps {
  url: string;
  openInNewTab?: boolean;
}

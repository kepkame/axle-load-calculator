export interface PageHeaderProps {
  title: string;
  id?: string;
  tooltip?: string;
  renderDescription?: () => React.ReactNode;
}

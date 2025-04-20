export type StepStatus = 'current' | 'success' | 'visited' | 'danger' | undefined;

export interface StepButtonProps {
  index: number;
  name: string;
  step?: number;
  onClick?: () => void;
}

export type StepStatus = 'current' | 'success' | 'visited' | 'danger' | undefined;

export interface IStepButtonProps {
  index: number;
  name: string;
  step?: number;
  onClick?: () => void;
}

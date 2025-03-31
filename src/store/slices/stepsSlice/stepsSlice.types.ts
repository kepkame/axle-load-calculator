export type StepStatus = 'current' | 'success' | 'visited' | 'danger' | undefined;

export interface Step {
  name: string;
  status?: StepStatus;
  isValidated?: boolean;
}

export interface StepsState {
  steps: Step[];
  currentStepIndex: number;
}

export interface ToggleOptionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  selected: boolean;
  onToggle: () => void;
  axleId?: string;
  ariaLabelledby?: string;
  disabled?: boolean;
}

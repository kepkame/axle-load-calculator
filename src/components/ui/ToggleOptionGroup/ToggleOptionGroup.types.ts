export interface ToggleOption {
  /** Unique ID (used in the key and the button's id) */
  axleId: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  ariaLabelledby?: string;
}

export interface ToggleOptionGroupProps {
  label: string;
  tooltip?: string | React.ReactElement;
  error?: string;
  axleId?: string;
  options: ToggleOption[];
}

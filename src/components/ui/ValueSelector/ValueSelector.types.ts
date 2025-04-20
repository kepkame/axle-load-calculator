export interface OptionSelector {
  value: string;
  label: string;
}

export interface ValueSelectorProps {
  options: OptionSelector[];
  onChange: (value: OptionSelector) => void;
  placeholder?: string;
}

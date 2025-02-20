export interface IOptionSelector {
  value: string;
  label: string;
}

export interface IValueSelectorProps {
  options: IOptionSelector[];
  onChange: (value: IOptionSelector) => void;
  placeholder?: string;
}

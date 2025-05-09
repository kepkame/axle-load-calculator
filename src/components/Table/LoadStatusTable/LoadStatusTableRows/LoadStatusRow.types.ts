export interface LoadStatusRow {
  axleKey: string;
  axleType: 'truck' | 'trailer';
  index: number;
  actualLoad: number;
  maxLoad: number;
  lifted?: boolean;
}

export interface LoadStatusRowProps {
  row: Omit<LoadStatusRow, 'axleKey'>;
}

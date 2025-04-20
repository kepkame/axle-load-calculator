interface GenerateAxleIdParams {
  axleType: 'truck' | 'trailer';
  index: number;
  lifted?: boolean;
}

export const generateAxleId = ({ axleType, index, lifted }: GenerateAxleIdParams): string => {
  return `${axleType}-${index}${lifted ? '-lifted' : ''}`;
};

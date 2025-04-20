interface IGenerateAxleIdParams {
  axleType: 'truck' | 'trailer';
  index: number;
  lifted?: boolean;
}

export const generateAxleId = ({ axleType, index, lifted }: IGenerateAxleIdParams): string => {
  return `${axleType}-${index}${lifted ? '-lifted' : ''}`;
};

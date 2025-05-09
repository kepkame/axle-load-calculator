import { Control } from 'react-hook-form';
import { TruckAxleVisualizer } from '@components/visualization/TruckAxleVisualizer/TruckAxleVisualizer';
import { FormSchemaType } from '@entities/step1Form/types';

interface TruckAxleSectionProps {
  control: Control<FormSchemaType>;
  className?: string;
}

export const TruckAxleSection: React.FC<TruckAxleSectionProps> = ({ control, className }) => {
  return (
    <div className={className}>
      <h3>Нагрузка на оси</h3>
      <TruckAxleVisualizer control={control} />
    </div>
  );
};

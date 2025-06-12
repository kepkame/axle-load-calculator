import { useWatch } from 'react-hook-form';
import { AxleLoadTable } from '@components/Table/AxleLoadTable/AxleLoadTable';
import { AxleLoadSkeleton } from '@components/Table/AxleLoadTable/AxleLoadTableSkeleton/AxleLoadSkeleton';
import { TruckAxleVisualizer } from '@components/visualization/TruckAxleVisualizer/TruckAxleVisualizer';
import { formSchema } from '@entities/step1Form/schema';

import { getConstraintsFromSchema } from '../../validation/validationUtils';
import { TruckFormSection } from './TruckFormSection';
import { TrailerFormSection } from './TrailerFormSection';
import { TransportFormEmptyMessage } from './TransportFormEmptyMessage';

import type { TransportFormProps } from './TransportForm.types';
import styles from './TransportForm.module.scss';

// Extract min/max validation constraints from Zod schema for field-level validation
const constraints = getConstraintsFromSchema(formSchema);
const axleLoadConstraints = constraints.axleLoadData as {
  axleLoadEmpty: { min: number; max: number };
  axleLoadLimit: { min: number; max: number };
};

/**
 * Renders the full transport configuration UI (truck, trailer, axles).
 *
 * Includes conditional logic to handle intermediate states:
 * shows skeletons when axle data isn't ready and renders fallback
 * when no axle config is yet possible (e.g., 0 axles selected).
 */
export const TransportForm: React.FC<TransportFormProps> = ({
  control,
  errors,
  trigger,
  fields,
  update,
  truckAxles,
  trailerAxles,
}) => {
  const [truckAxlesRaw, trailerAxlesRaw] = useWatch({
    control,
    name: ['truckAxles', 'trailerAxles'],
  });

  const truckCount = Number(truckAxlesRaw) || 0;
  const trailerCount = Number(trailerAxlesRaw) || 0;
  const totalExpected = truckCount + trailerCount;
  const isAxleDataReady = fields.length === totalExpected;

  const axleDataCanExist = truckCount > 0 && trailerCount > 0;

  const truckWheelbaseValues = useWatch({ control, name: 'truckWheelbase' }) ?? [];
  const trailerWheelbaseValues = useWatch({ control, name: 'trailerWheelbase' }) ?? [];

  return (
    <>
      <TruckFormSection
        control={control}
        errors={errors}
        constraints={constraints}
        wheelbaseValues={truckWheelbaseValues}
        fields={fields}
        update={update}
        axleCount={truckAxles}
      />

      <TrailerFormSection
        control={control}
        errors={errors}
        constraints={constraints}
        wheelbaseValues={trailerWheelbaseValues}
        fields={fields}
        update={update}
        axleCount={trailerAxles}
      />

      <div className={styles.axleLoadVisualization}>
        <h3>Нагрузка на оси</h3>
        <TruckAxleVisualizer control={control} />
      </div>

      {isAxleDataReady ? (
        <AxleLoadTable
          fields={fields}
          control={control}
          name="axleLoadData"
          trigger={trigger}
          constraints={axleLoadConstraints}
          errors={Array.isArray(errors.axleLoadData) ? errors.axleLoadData : []}
        />
      ) : axleDataCanExist ? (
        // Show skeleton if both truck & trailer axle counts are present but data hasn't synced yet
        <AxleLoadSkeleton />
      ) : (
        <TransportFormEmptyMessage className={styles.emptyMessage} />
      )}
    </>
  );
};

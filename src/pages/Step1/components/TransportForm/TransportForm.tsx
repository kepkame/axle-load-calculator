import { AxleLoadTable } from '@components/Table/AxleLoadTable/AxleLoadTable';
import { AxleLoadSkeletonMobile } from '@components/Table/AxleLoadTable/AxleLoadTableSkeleton/AxleLoadSkeletonMobile';
import { formSchema } from '@entities/step1Form/schema';
import { getConstraintsFromSchema } from '../../validation/validationUtils';
import { TruckFormSection } from './TruckFormSection';
import { TrailerFormSection } from './TrailerFormSection';
import { TruckAxleSection } from './TruckAxleSection';
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
 * TransportForm - visual component responsible for displaying the form
 * of transport parameters and axle load distribution table.
 */
export const TransportForm: React.FC<TransportFormProps> = ({
  control,
  errors,
  trigger,
  fields,
  truckAxles,
  trailerAxles,
}) => {
  // A fractional truck axle count (e.g., 2.5) indicates presence of a lifted axle
  const hasLiftedAxle = truckAxles % 1 !== 0;

  const totalExpected = Math.floor(truckAxles) + (hasLiftedAxle ? 1 : 0) + trailerAxles;

  const isAxleDataReady = fields.length === totalExpected;
  const axleDataCanExist = truckAxles > 0 && trailerAxles > 0;

  return (
    <>
      <TruckFormSection control={control} errors={errors} constraints={constraints} />

      <TrailerFormSection control={control} errors={errors} constraints={constraints} />

      <TruckAxleSection control={control} className={styles.axleLoadVisualization} />

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
        <AxleLoadSkeletonMobile />
      ) : (
        <TransportFormEmptyMessage className={styles.emptyMessage} />
      )}
    </>
  );
};

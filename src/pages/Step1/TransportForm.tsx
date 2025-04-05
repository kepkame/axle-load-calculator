import { useEffect } from 'react';
import { FieldErrorsImpl, useFieldArray } from 'react-hook-form';
import { TruckFormSection } from './TruckFormSection';
import { TruckSideView } from '@components/visualization/TruckSideView/TruckSideView';
import { AxleLoadTable } from '@components/Table/AxleLoadTable/AxleLoadTable';
import { formSchema } from './validation/validation';
import { getConstraintsFromSchema } from './validation/validationUtils';
import { useAxleFieldValues } from './hooks/useAxleFieldValues';
import { syncAxleFields } from './utils/axleFieldSync';
import type { AxleLoadDataItem, ITransportFormProps } from './TransportForm.types';
import { TrailerFormSection } from './TrailerFormSection';

// Extracting constraints from the validation schema
const constraints = getConstraintsFromSchema(formSchema);
const axleLoadConstraints = constraints.axleLoadData as {
  axleLoadEmpty: { min: number; max: number };
  axleLoadLimit: { min: number; max: number };
};

export const TransportForm: React.FC<ITransportFormProps> = ({ control, errors, trigger }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'axleLoadData' });
  const { truckAxlesRaw, trailerAxlesRaw } = useAxleFieldValues(control);

  useEffect(() => {
    syncAxleFields({
      truckAxlesRaw,
      trailerAxlesRaw,
      currentFieldsLength: fields.length,
      append,
      remove,
    });
  }, [truckAxlesRaw, trailerAxlesRaw, fields.length, append, remove]);

  return (
    <>
      <TruckFormSection control={control} errors={errors} constraints={constraints} />

      <TrailerFormSection control={control} errors={errors} constraints={constraints} />

      <TruckSideView TractorAxleCount={2} TrailerAxleCount={3} />

      <AxleLoadTable
        fields={fields}
        control={control}
        trigger={trigger}
        errors={
          Array.isArray(errors.axleLoadData)
            ? (errors.axleLoadData as FieldErrorsImpl<AxleLoadDataItem>[])
            : []
        }
        constraints={axleLoadConstraints}
      />
    </>
  );
};

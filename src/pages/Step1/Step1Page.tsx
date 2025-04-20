import React, { useMemo, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useWatch } from 'react-hook-form';

import { validateStep, resetStepsAfter } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import { saveFormData, markFormFilled } from '@store/slices/step1FormSlice/step1FormSlice';

import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { ValueSelector } from '@components/ui/ValueSelector/ValueSelector';
import { Option } from '@components/forms/fields/SelectField/SelectField.types';
import { OptionSelector } from '@components/ui/ValueSelector/ValueSelector.types';
import { FormSchemaType } from '@entities/step1Form/types';
import { formSchema } from '@entities/step1Form/schema';
import { useDefaultStep1Data } from '@hooks/useDefaultStep1Data';
import { useStepSync } from '@hooks/useStepSync';

import { TransportForm } from './components/TransportForm/TransportForm';
import { SkeletonStep1Form } from './components/SkeletonStep1Form';
import { ALLOWED_TRUCK_AXLES, ALLOWED_TRAILER_AXLES } from './constants/axleOptions';
import { useAxleArraySync, AxleCache } from './hooks/useAxleArraySync';
import { usePresetTruckValues } from './hooks/usePresetTruckValues';
import { storeTruckFormPreset } from './utils/formUtils';
import { parseAxleValue } from './utils/parseAxleValue';
import { generateAxleKeys } from './utils/generateAxleKeys';

import styles from './Step1Page.module.scss';

const truckModels: Option[] = [
  { value: 'kamaz_65115', label: 'KAMAZ 65115' },
  { value: 'maz_6516', label: 'MAZ 6516' },
  { value: 'scania_r420', label: 'Scania R 420' },
  { value: 'mercedes_actros', label: 'Mercedes-Benz Actros' },
  { value: 'man_tgs_18440', label: 'MAN TGS 18.440' },
  { value: 'volvo_fh16', label: 'Volvo FH 16' },
];

/**
 * Step1Page - React component for the first step of the axle load calculator.
 *
 * It initializes default form values, handles syncing of axle fields
 * based on user input (number of axles), and manages form submission.
 * Also provides UI for selecting preset truck models and renders the main transport form.
 */
const Step1Page: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applyPresetTruckValues } = usePresetTruckValues();

  // Sync current step with the global step tracker
  useStepSync(0);

  const { defaultValues, isLoading, hasData } = useDefaultStep1Data();

  const memoizedDefaultValues = useMemo(
    () => defaultValues,
    [defaultValues.truckAxles, defaultValues.trailerAxles],
  );

  // Caches axle data keyed by axle identifiers (to preserve user input on config changes)
  const axleCacheRef = useRef<AxleCache>({});

  return (
    <>
      <h2>Данные транспорта</h2>
      {truckModels.length > 0 && (
        <BaseField label="Сохраненные модели фур" className={styles.savedTruckModels}>
          <ValueSelector
            options={truckModels}
            onChange={(option: OptionSelector) => applyPresetTruckValues(option)}
            placeholder="Выберите модель фуры"
          />
        </BaseField>
      )}

      {isLoading ? (
        <SkeletonStep1Form />
      ) : (
        <Form
          schema={formSchema}
          defaultValues={memoizedDefaultValues}
          onSubmitSuccess={(formData) => {
            // Dispatch form data to Redux
            dispatch(saveFormData(formData));
            dispatch(markFormFilled());

            // Mark current step as complete and reset subsequent steps
            dispatch(validateStep(0));
            dispatch(resetStepsAfter(0));

            // Navigate to Step 2
            navigate(stepsRoutes[1].path);
          }}
        >
          {(methods) => {
            const {
              control,
              formState: { errors },
              trigger,
              watch,
            } = methods;
            const { fields, replace } = useFieldArray<FormSchemaType, 'axleLoadData', 'id'>({
              control,
              name: 'axleLoadData',
            });

            const truckAxlesRaw = watch('truckAxles');
            const trailerAxlesRaw = watch('trailerAxles');

            // Parse valid numeric axle values with fallback and allowed checks
            const parsedTruckAxles = parseAxleValue({
              raw: truckAxlesRaw,
              allowed: ALLOWED_TRUCK_AXLES,
              fallback: 2,
            });

            const parsedTrailerAxles = parseAxleValue({
              raw: trailerAxlesRaw,
              allowed: ALLOWED_TRAILER_AXLES,
              fallback: 3,
            });

            // Automatically adjusts field array length to match current axle config
            useAxleArraySync(
              fields,
              parsedTruckAxles,
              parsedTrailerAxles,
              replace,
              axleCacheRef,
              hasData,
              Number(defaultValues.truckAxles),
              Number(defaultValues.trailerAxles),
            );

            // Syncs current axleLoadData into cache so user values are preserved
            const axleData = useWatch({ control, name: 'axleLoadData' });
            useEffect(() => {
              const currentKeys = generateAxleKeys({
                truckAxles: parsedTruckAxles,
                trailerAxles: parsedTrailerAxles,
              });
              axleData.forEach((item, index) => {
                const key = currentKeys[index];
                const axleType = item.axleType;

                if (key && (axleType === 'truck' || axleType === 'trailer')) {
                  axleCacheRef.current[key] = {
                    axleType,
                    axleLoadEmpty: item.axleLoadEmpty,
                    axleLoadLimit: item.axleLoadLimit,
                    lifted: item.lifted,
                  };
                }
              });
            }, [axleData, parsedTruckAxles, parsedTrailerAxles]);

            return (
              <>
                <TransportForm
                  control={control}
                  errors={errors}
                  trigger={trigger}
                  fields={fields}
                  truckAxles={parsedTruckAxles}
                  trailerAxles={parsedTrailerAxles}
                />
                <FormActions onSave={storeTruckFormPreset} showSave />
              </>
            );
          }}
        </Form>
      )}
    </>
  );
};

export default Step1Page;

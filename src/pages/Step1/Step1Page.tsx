import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validateStep, resetStepsAfter } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import { saveFormData, markFormFilled } from '@store/slices/step1FormSlice/step1FormSlice';
import {
  selectStep1FormData,
  selectStep1FormFilled,
  selectStep1FormInitialized,
} from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { formSchema } from '@entities/step1Form/schema';
import type { FormSchemaType } from '@entities/step1Form/types';
import { useStepSync } from '@hooks/useStepSync';
import { SkeletonStep1Form } from './components/SkeletonStep1Form';
import { TransportForm } from './components/TransportForm/TransportForm';
import { useStep1Form } from './hooks/useStep1Form';
import { getNormalizedStep1FormSnapshot } from './utils/getNormalizedStep1FormSnapshot';
import { storeTruckFormPreset } from './utils/storeTruckFormPreset';

/**
 * Page for the first step of the axle load calculation wizard.
 *
 * Responsible for initializing the form, syncing axles/base with Redux,
 * and moving to the next step after validation.
 */
const Step1Page: React.FC = () => {
  // Sync current step with the global step tracker
  useStepSync(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialized = useSelector(selectStep1FormInitialized);
  const defaultValues = useSelector(selectStep1FormData);
  const isFilled = useSelector(selectStep1FormFilled);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    // Automatically reset the form if it's initialized but not filled -
    // otherwise the data may become inconsistent
    if (initialized && !isFilled) {
      methods.reset(defaultValues);
    }
  }, [initialized, defaultValues, isFilled, methods]);

  const { fields, update, truckAxles, trailerAxles } = useStep1Form({
    methods,
    isFilled,
  });

  const handleSubmitSuccess = () => {
    // Collect current form values, including stable "axleIds" from FieldArray
    const data = getNormalizedStep1FormSnapshot(methods, fields);

    dispatch(saveFormData(data));
    dispatch(markFormFilled());
    dispatch(validateStep(0));
    dispatch(resetStepsAfter(0));

    navigate(stepsRoutes[1].path);
  };

  return (
    <>
      <h2>Данные транспорта</h2>

      {/* Show skeleton only before initialization */}
      {!initialized ? (
        <SkeletonStep1Form />
      ) : (
        <Form
          schema={formSchema}
          defaultValues={defaultValues}
          onSubmitSuccess={handleSubmitSuccess}
        >
          {() => (
            <>
              <TransportForm
                control={methods.control}
                errors={methods.formState.errors}
                trigger={methods.trigger}
                fields={fields}
                update={update}
                truckAxles={truckAxles}
                trailerAxles={trailerAxles}
              />
              <FormActions onSave={() => storeTruckFormPreset()} showSave />
            </>
          )}
        </Form>
      )}
    </>
  );
};

export default Step1Page;

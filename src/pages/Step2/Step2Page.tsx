import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveFormData, markFormFilled } from '@store/slices/step2FormSlice/step2FormSlice';
import { resetStepsAfter, validateStep } from '@store/slices/stepsSlice/stepsSlice';
import {
  selectStep1FormData,
  selectStep1FormFilled,
} from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import { selectStep2FormData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';

import { Form } from '@components/forms/Form/Form';
import Step2FormContent from './components/Step2FormContent/Step2FormContent';

import { useFormCargoSchema } from '@entities/step2Form/hooks/useFormCargoSchema';
import { FormSchemaType } from '@entities/step2Form/types';
import { useStepGuard } from '@hooks/useStepGuard';
import { useStepSync } from '@hooks/useStepSync';
import { getCargoFormConstraints } from './utils/getCargoFormConstraints';

import styles from './Step2Page.module.scss';

/**
 * Step2Page - React component for the second step of the cargo distribution wizard.
 *
 * Initializes form schema based on platform length,
 * manages cargo group array, and handles form submission to Redux store.
 */
const Step2Page: React.FC = () => {
  // Redirects to fallback if step 1 has not been filled
  useStepGuard({
    selector: selectStep1FormFilled,
    fallbackPath: '/',
  });

  // Syncs the stepper to highlight current step
  useStepSync(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const step1Data = useSelector(selectStep1FormData);
  const step2FormData = useSelector(selectStep2FormData);

  const deckLengthMM = step1Data.deckLength * 1000;
  const formSchema = useFormCargoSchema(deckLengthMM);
  const cargoConstraints = getCargoFormConstraints();

  const handleSuccess = (formData: FormSchemaType) => {
    dispatch(saveFormData(formData));
    dispatch(markFormFilled());

    // Marks current step as validated and resets subsequent steps
    dispatch(validateStep(1));
    dispatch(resetStepsAfter(1));

    navigate(stepsRoutes[2].path);
  };

  return (
    <>
      <h2 className={styles.stepTitle}>Добавление груза</h2>

      <Form
        schema={formSchema}
        defaultValues={step2FormData}
        resolverContext={{ deckLength: deckLengthMM }}
        onSubmitSuccess={handleSuccess}
      >
        {(methods) => (
          <Step2FormContent
            control={methods.control}
            errors={methods.formState.errors}
            trigger={methods.trigger}
            deckLengthMM={deckLengthMM}
            cargoConstraints={cargoConstraints}
          />
        )}
      </Form>
    </>
  );
};

export default Step2Page;

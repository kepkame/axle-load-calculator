import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveFormData, markFormFilled } from '@store/slices/step2FormSlice/step2FormSlice';
import { resetStepsAfter, validateStep } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';

import Step2FormContent from './components/Step2FormContent/Step2FormContent';
import { Form } from '@components/forms/Form/Form';
import { FormSchemaType } from '@entities/step2Form/types';
import { useStepsGuard } from '@hooks/useStepsGuard';
import { useStepSync } from '@hooks/useStepSync';

import { useStep2FormConfig } from './hooks/useStep2FormConfig';
import styles from './Step2Page.module.scss';

/**
 * Step2Page - component for the second step of the cargo distribution wizard.
 *
 * Initializes form schema, handles submission, and advances to the next step.
 * Accessible only after steps 1 is completed.
 */
const Step2Page: React.FC = () => {
  // Syncs the stepper to highlight current step
  useStepSync(1);

  // Redirects to fallback if step 1 has not been filled
  const isAllowed = useStepsGuard({ requireStep1: true });
  if (!isAllowed) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { schema, deckLengthMM, constraints, defaultValues } = useStep2FormConfig();

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
        schema={schema}
        defaultValues={defaultValues}
        resolverContext={{ deckLength: deckLengthMM }}
        onSubmitSuccess={handleSuccess}
      >
        {(methods) => (
          <Step2FormContent
            control={methods.control}
            errors={methods.formState.errors}
            trigger={methods.trigger}
            deckLengthMM={deckLengthMM}
            cargoConstraints={constraints}
          />
        )}
      </Form>
    </>
  );
};

export default Step2Page;

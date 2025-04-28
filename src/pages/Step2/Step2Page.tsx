import { useSelector, useDispatch } from 'react-redux';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { saveFormData, markFormFilled } from '@store/slices/step2FormSlice/step2FormSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import {
  selectStep1FormData,
  selectStep1FormFilled,
} from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { resetStepsAfter, validateStep } from '@store/slices/stepsSlice/stepsSlice';
import { selectStep2FormData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';

import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { FormSchemaType } from '@entities/step2Form/types';
import { useFormCargoSchema } from '@entities/step2Form/hooks/useFormCargoSchema';
import { useStepGuard } from '@hooks/useStepGuard';
import { useStepSync } from '@hooks/useStepSync';

import { CargoForm } from './components/CargoForm/CargoForm';
import { ButtonAddGroup } from './components/ButtonAddGroup/ButtonAddGroup';
import { getCargoFormConstraints } from './utils/getCargoFormConstraints';
import { useCanAddNewGroup } from './utils/useCanAddNewGroup';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const step1Data = useSelector(selectStep1FormData);
  const step2FormData = useSelector(selectStep2FormData);

  // Converts platform length from meters to millimeters
  const deckLengthMM = step1Data.deckLength * 1000;

  // Dynamically generates validation schema based on deck length
  const formSchema = useFormCargoSchema(deckLengthMM);

  // Prepares static validation constraints for cargo fields
  const cargoConstraints = getCargoFormConstraints();

  // Syncs the stepper to highlight current step
  useStepSync(1);

  return (
    <>
      <h2 className={styles.stepTitle}>Добавление груза</h2>

      <Form
        schema={formSchema}
        defaultValues={step2FormData}
        resolverContext={{ deckLength: deckLengthMM }}
        onSubmitSuccess={(formData) => {
          dispatch(saveFormData(formData));
          dispatch(markFormFilled());

          // Marks current step as validated and resets subsequent steps
          dispatch(validateStep(1));
          dispatch(resetStepsAfter(1));

          navigate(stepsRoutes[2].path);
        }}
      >
        {(methods) => {
          const {
            control,
            formState: { errors },
            trigger,
          } = methods;

          // Determines whether a new cargo group can be added based on remaining deck space
          const canAdd = useCanAddNewGroup({ control, deckLengthMM });

          const { fields, append, remove } = useFieldArray<FormSchemaType, 'cargoGroup', 'id'>({
            control,
            name: 'cargoGroup',
          });

          return (
            <>
              <CargoForm
                control={control}
                errors={errors}
                fields={fields}
                remove={remove}
                constraints={cargoConstraints}
                trigger={trigger}
                deckLengthMM={deckLengthMM}
              />

              <ButtonAddGroup append={append} canAdd={canAdd} />

              {!canAdd && (
                <p className={styles.actionLimitHint}>
                  Все паллеты уже заняли длину платформы. Чтобы добавить новую группу, уменьшите
                  количество паллет либо удалите одну из текущих групп.
                </p>
              )}

              <FormActions />
            </>
          );
        }}
      </Form>
    </>
  );
};

export default Step2Page;

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateStep, resetStepsAfter } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
// import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { saveFormData, markFormFilled } from '@store/slices/step1FormSlice/step1FormSlice';
import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { ValueSelector } from '@components/ui/ValueSelector/ValueSelector';
import { IOption } from '@components/forms/fields/SelectField/SelectField.types';
import { IOptionSelector } from '@components/ui/ValueSelector/ValueSelector.types';
import { formSchema } from '@entities/step1Form/schema';
import { useDefaultStep1Data } from '@hooks/useDefaultStep1Data';
import { useStepSync } from '@hooks/useStepSync';
import { TransportForm } from './components/TransportForm/TransportForm';
import { usePresetTruckValues } from './hooks/usePresetTruckValues';
import { storeTruckFormPreset } from './utils/formUtils';
import styles from './Step1Page.module.scss';
import SkeletonStep1Form from './components/SkeletonStep1Form';
// import { useSelector } from 'react-redux';

const truckModels: IOption[] = [
  // TODO: Take options from the slice
  { value: 'kamaz_65115', label: 'KAMAZ 65115' },
  { value: 'maz_6516', label: 'MAZ 6516' },
  { value: 'scania_r420', label: 'Scania R 420' },
  { value: 'mercedes_actros', label: 'Mercedes-Benz Actros' },
  { value: 'man_tgs_18440', label: 'MAN TGS 18.440' },
  { value: 'volvo_fh16', label: 'Volvo FH 16' },
];

const Step1Page: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applyPresetTruckValues } = usePresetTruckValues();

  // Step synchronization through a custom hook
  useStepSync(0);

  const { defaultValues, isLoading } = useDefaultStep1Data();

  return (
    <div>
      <h2>Данные транспорта</h2>
      <div>
        {truckModels.length > 0 && (
          <BaseField label="Сохраненные модели фур" className={styles.savedTruckModels}>
            <ValueSelector
              options={truckModels}
              onChange={(option: IOptionSelector) => applyPresetTruckValues(option)}
              placeholder="Выберите модель фуры"
            />
          </BaseField>
        )}

        {isLoading ? (
          <SkeletonStep1Form />
        ) : (
          <Form
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmitSuccess={(formData) => {
              dispatch(saveFormData(formData));
              dispatch(markFormFilled());

              dispatch(validateStep(0));
              dispatch(resetStepsAfter(0));

              navigate(stepsRoutes[1].path);
            }}
          >
            {({ control, formState: { errors }, trigger }) => (
              <>
                {console.log(
                  '1. Step1Page.tsx – полный объект errors перед передачей в TransportForm:',
                  errors,
                )}
                <TransportForm control={control} errors={errors} trigger={trigger} />
                <FormActions onSave={storeTruckFormPreset} showSave />
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  );
};

export default Step1Page;

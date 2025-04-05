import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateStep, resetStepsAfter } from '@store/slices/stepsSlice/stepsSlice';
import { stepsRoutes } from '@store/slices/stepsSlice/stepsConfig';
import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { ValueSelector } from '@components/ui/ValueSelector/ValueSelector';
import { IOption } from '@components/forms/fields/SelectField/SelectField.types';
import { IOptionSelector } from '@components/ui/ValueSelector/ValueSelector.types';
import { useStepSync } from '@hooks/useStepSync';
import { TransportForm } from './TransportForm';
import { formSchema } from './validation/validation';
import { usePresetTruckValues } from './hooks/usePresetTruckValues';
import { storeTruckFormPreset } from './utils/formUtils';
import styles from './Step1Page.module.scss';

const truckModels: IOption[] = [
  // TODO: Take options from the slice
  { value: 'kamaz_65115', label: 'KAMAZ 65115' },
  { value: 'maz_6516', label: 'MAZ 6516' },
  { value: 'scania_r420', label: 'Scania R 420' },
  { value: 'mercedes_actros', label: 'Mercedes-Benz Actros' },
  { value: 'man_tgs_18440', label: 'MAN TGS 18.440' },
  { value: 'volvo_fh16', label: 'Volvo FH 16' },
];

const defaultValues = {
  truckWeight: 8200,
  truckAxles: '2.5',
  truckWheelbase: 3.6,
  trailerWeight: 7000,
  trailerAxles: '3',
  couplingLength: '1.35',
  trailerWheelbase: 1.32,
  deckLength: 13.6,
  axleLoadData: [
    { axleType: 'truck', axleLoadEmpty: 29.99, axleLoadLimit: 40.0 },
    { axleType: 'truck', axleLoadEmpty: 29.99, axleLoadLimit: 40.0, lifted: true },
    { axleType: 'truck', axleLoadEmpty: 29.99, axleLoadLimit: 40.0 },
    { axleType: 'trailer', axleLoadEmpty: 13, axleLoadLimit: 17 },
    { axleType: 'trailer', axleLoadEmpty: 13, axleLoadLimit: 17 },
    { axleType: 'trailer', axleLoadEmpty: 13, axleLoadLimit: 17 },
  ],
};

const Step1Page: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applyPresetTruckValues } = usePresetTruckValues();

  // Step synchronization through a custom hook
  useStepSync(0);

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

        <Form
          schema={formSchema}
          defaultValues={defaultValues}
          onSubmitSuccess={() => {
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
      </div>
    </div>
  );
};

export default Step1Page;

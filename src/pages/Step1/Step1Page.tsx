import { Form } from '@components/forms/Form/Form';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { ValueSelector } from '@components/ui/ValueSelector/ValueSelector';
import { IOption } from '@components/forms/fields/SelectField/SelectField.types';
import { IOptionSelector } from '@components/ui/ValueSelector/ValueSelector.types';
import { TransportForm } from './TransportForm';
import { formSchema } from './validation/validation';
import { usePresetTruckValues } from './hooks/usePresetTruckValues';
import { storeTruckFormPreset } from './utils/formUtils';

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
  const defaultValues = {
    truckModel: '' as string,
    truckWeight: 8200,
    truckWheelbase: 3.6,
    trailerWeight: 7000,
    trailerWheelbase: 1.32,
  };

  const { applyPresetTruckValues } = usePresetTruckValues();

  return (
    <div>
      <h2>Данные транспорта</h2>

      <div>
        {truckModels.length > 0 && (
          <div>
            <BaseField label="Сохраненные модели фур">
              <ValueSelector
                options={truckModels}
                onChange={(option: IOptionSelector) => applyPresetTruckValues(option)}
              />
            </BaseField>
          </div>
        )}

        <Form schema={formSchema} defaultValues={defaultValues}>
          {({ control, formState: { errors } }) => (
            <>
              <TransportForm control={control} errors={errors} />
              <FormActions onSave={storeTruckFormPreset} showSave />
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Step1Page;

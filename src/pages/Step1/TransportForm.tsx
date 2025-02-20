import { Control, FieldErrors } from 'react-hook-form';
import { BaseField } from '@components/forms/BaseField/BaseField';
import { NumberField } from '@components/forms/fields/NumberField/NumberField';
import { formSchema } from './validation/validation';
import { getConstraintsFromSchema } from './validation/validationUtils';

interface ITransportFormProps {
  control: Control<typeof formSchema._type>;
  errors: FieldErrors<typeof formSchema._type>;
}

const constraints = getConstraintsFromSchema(formSchema);

export const TransportForm: React.FC<ITransportFormProps> = ({ control, errors }) => {
  return (
    <>
      <fieldset>
        <legend>Данные о тягаче</legend>
        <BaseField label="Собственный вес тягача" error={errors.truckWeight?.message} units="кг">
          <NumberField
            name="truckWeight"
            control={control}
            min={constraints.truckWeight.min}
            max={constraints.truckWeight.max}
            maxLength={5}
            showRange={true}
            inputMode="numeric"
            autoFocus={true}
          />
        </BaseField>

        <BaseField
          label="Межосевое расстояние осей тягача"
          error={errors.truckWheelbase?.message}
          units="метров"
        >
          <NumberField
            name="truckWheelbase"
            control={control}
            min={constraints.truckWheelbase.min}
            max={constraints.truckWheelbase.max}
            maxLength={5}
            decimalPlaces={1}
            showRange={true}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>

      <fieldset>
        <legend>Данные полуприцепа</legend>
        <BaseField
          label="Собственный вес полуприцепа"
          error={errors.trailerWeight?.message}
          units="кг"
        >
          <NumberField
            name="trailerWeight"
            control={control}
            min={constraints.trailerWeight.min}
            max={constraints.trailerWeight.max}
            maxLength={5}
            showRange={true}
            inputMode="numeric"
          />
        </BaseField>

        <BaseField
          label="Межосевое расстояние осей полуприцепа"
          error={errors.trailerWheelbase?.message}
          units="метров"
        >
          <NumberField
            name="trailerWheelbase"
            control={control}
            min={constraints.trailerWheelbase.min}
            max={constraints.trailerWheelbase.max}
            maxLength={5}
            decimalPlaces={2}
            showRange={true}
            inputMode="decimal"
          />
        </BaseField>
      </fieldset>
    </>
  );
};

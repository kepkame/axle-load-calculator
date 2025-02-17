import React from 'react';
import { Form } from '@components/forms/Form/Form';
import { TransportForm } from './TransportForm';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { formSchema } from './validation';

const Step1Page: React.FC = () => {
  const defaultValues = {
    truckWeight: 8200,
    truckWheelbase: 3.6,
    trailerWeight: 7000,
    trailerWheelbase: 1.32,
  };

  const handleSave = () => {
    // TODO: Save the field values to Local Storage
    console.log('Save to Local Storage');
  };

  return (
    <div>
      <h2>Данные транспорта</h2>
      <div>
        <Form schema={formSchema} defaultValues={defaultValues}>
          {({ control, formState: { errors } }) => (
            <>
              <TransportForm control={control} errors={errors} />
              <FormActions onSave={handleSave} showSave />
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Step1Page;

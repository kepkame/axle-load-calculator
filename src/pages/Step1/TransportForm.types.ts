// import { z } from 'zod';
// import { formSchema } from '@pages/Step1/validation/validation';
// import { Control, FieldErrors } from 'react-hook-form';

// export type FormSchemaType = z.infer<typeof formSchema>;

// export interface ITransportFormProps {
//   control: Control<FormSchemaType>;
//   errors: FieldErrors<FormSchemaType>;
// }

import { z } from 'zod';
import { formSchema } from '@pages/Step1/validation/validation';
import { Control, FieldError, FieldErrors } from 'react-hook-form';

export type FormSchemaType = z.infer<typeof formSchema>;

// Тип для одного элемента массива axleLoadData
export type AxleLoadDataItem = FormSchemaType['axleLoadData'][number];

// Тип для ошибок одного элемента массива
export type AxleLoadDataItemErrors = {
  axleLoadEmpty?: FieldError;
  axleLoadLimit?: FieldError;
};

// Тип для всего массива ошибок axleLoadData
export type AxleLoadDataErrors = FieldErrors<AxleLoadDataItem>[] | undefined;

export interface ITransportFormProps {
  control: Control<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
}

import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { FormSchemaType } from '../components/TransportForm/TransportForm.types';

export interface syncAxleFieldsParams {
  currentFieldsLength: number;
  truckAxlesRaw: number;
  trailerAxlesRaw: number;
  append: UseFieldArrayAppend<FormSchemaType, 'axleLoadData'>;
  remove: UseFieldArrayRemove;
}

import { FormSchemaType } from './types';

export function getEmptyFormData(): FormSchemaType {
  return {
    truckWeight: 0,
    truckAxles: '',
    truckWheelbase: 0,
    trailerWeight: 0,
    trailerAxles: '',
    couplingLength: '',
    trailerWheelbase: 0,
    deckLength: 0,
    axleLoadData: [],
  };
}

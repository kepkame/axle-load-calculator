import type { Step1Data } from '@shared-types/step1Data';

/**
 * Provides the default initial values for Step1 form.
 *
 * Used during first-time initialization or form reset.
 */
export const getEmptyFormData = (): Step1Data => {
  return {
    truckWeight: 8200,
    truckAxles: '3',
    truckWheelbase: [3.3, 1.44],
    trailerWeight: 7000,
    trailerAxles: '3',
    couplingLength: 1.35,
    trailerWheelbase: [1.41, 1.31],
    deckLength: 13.6,
    axleLoadData: [
      {
        axleId: 'truck-0',
        axleType: 'truck',
        axleLoadEmpty: 3.28,
        axleLoadLimit: 7.5,
        lifted: false,
      },
      {
        axleId: 'truck-1',
        axleType: 'truck',
        axleLoadEmpty: 3.28,
        axleLoadLimit: 7.5,
        lifted: true,
      },
      {
        axleId: 'truck-2',
        axleType: 'truck',
        axleLoadEmpty: 4.92,
        axleLoadLimit: 9,
        lifted: false,
      },
      {
        axleId: 'trailer-0',
        axleType: 'trailer',
        axleLoadEmpty: 2.33,
        axleLoadLimit: 8,
        lifted: false,
      },
      {
        axleId: 'trailer-1',
        axleType: 'trailer',
        axleLoadEmpty: 2.33,
        axleLoadLimit: 8,
        lifted: false,
      },
      {
        axleId: 'trailer-2',
        axleType: 'trailer',
        axleLoadEmpty: 2.33,
        axleLoadLimit: 8,
        lifted: false,
      },
    ],
  };
};

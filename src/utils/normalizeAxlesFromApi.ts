import { FormSchemaType } from '@entities/step1Form/types';

/**
 * Normalizes raw axleLoadData from the API into `truckAxles` and `trailerAxles` string values
 * that reflect the true count of axles, including lifted axles as `.5` for trucks.
 *
 * This is typically used when loading saved form data to infer and restore axle configuration.
 */
export const normalizeAxlesFromApi = (data: FormSchemaType): FormSchemaType => {
  const truckAxles = data.axleLoadData.filter((a) => a.axleType === 'truck');
  const trailerAxles = data.axleLoadData.filter((a) => a.axleType === 'trailer');

  const liftedCount = truckAxles.filter((a) => a.lifted).length;
  const baseTruckAxles = truckAxles.length - liftedCount;

  // If any lifted axles exist, represent as a fractional count (e.g., 2.5)
  const normalizedTruckAxles = liftedCount > 0 ? `${baseTruckAxles}.5` : `${baseTruckAxles}`;

  // Trailer axle count is always an integer
  const normalizedTrailerAxles = `${trailerAxles.length}`;

  return {
    ...data,
    truckAxles: normalizedTruckAxles,
    trailerAxles: normalizedTrailerAxles,
  };
};

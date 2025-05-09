import api from './client';
import { FormSchemaType } from '@entities/step1Form/types';

/**
 * Fetches the default values of the Step1 form from the Mokky API
 */
export async function fetchDefaultStep1(): Promise<FormSchemaType> {
  try {
    const response = await api.get<FormSchemaType[]>('/defaultValuesStep1');
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('API response is empty or in an invalid format');
    }

    return data[0];
  } catch (error) {
    throw new Error('Failed to load default form data');
  }
}

import { FormSchemaType } from '@entities/step1Form/types';

/**
 * Получает дефолтные значения формы Step1 с API Mokky.
 */
export async function fetchDefaultStep1(): Promise<FormSchemaType> {
  const response = await fetch('https://1a1607d9514f4230.mokky.dev/defaultValuesStep1');

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Ответ от API пустой или в неверном формате');
  }

  return data[0];
}

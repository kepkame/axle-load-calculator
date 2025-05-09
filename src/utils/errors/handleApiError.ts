import axios, { AxiosError } from 'axios';
import { extractMessageFromBody } from './extractMessageFromBody';

/**
 * Унифицированный обработчик ошибок при запросах к API через axios.
 * Возвращает строку с человекочитаемым описанием ошибки.
 *
 * @param error — ошибка из блока try/catch
 */
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    const data = axiosError.response?.data;
    const extracted = extractMessageFromBody(data);
    if (extracted) return extracted;

    if (axiosError.response) {
      return `Ошибка ${axiosError.response.status}: ${axiosError.response.statusText}`;
    }

    if (axiosError.request) {
      return 'Нет ответа от сервера. Проверьте соединение.';
    }

    return `Ошибка: ${axiosError.message}`;
  }

  return 'Произошла неизвестная ошибка';
}

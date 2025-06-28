import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Transforms a raw error into a user-friendly UI message.
 *
 * Handles various edge cases:
 * - null / undefined → fallback message
 * - string → returns directly
 * - RTK Query `FetchBaseQueryError` → parses `status` and `data`
 * - If data contains `.message`, it is shown to the user
 * - Falls back to JSON.stringify for unknown objects
 */
export const getUiErrorMessage = (error: unknown): string => {
  if (!error) return 'Неизвестная ошибка';
  if (typeof error === 'string') return error;

  if (typeof error === 'object' && error !== null) {
    const maybeQueryError = error as FetchBaseQueryError;

    if (typeof maybeQueryError.status === 'string') {
      // These status values are specific to RTK Query internals
      switch (maybeQueryError.status) {
        case 'FETCH_ERROR':
          return 'Проверьте интернет-соединение.';
        case 'PARSING_ERROR':
          return 'Ошибка чтения ответа от сервера. Попробуйте обновить страницу.';
        default:
          return 'Неизвестная ошибка запроса.';
      }
    }

    if (typeof maybeQueryError.status === 'number') {
      const payload = maybeQueryError.data;

      // Server returned a plain string response (e.g., from 4xx)
      if (typeof payload === 'string') return payload;

      // Server returned structured error
      if (typeof payload === 'object' && payload !== null) {
        if ('message' in payload && typeof payload.message === 'string') {
          return payload.message;
        }

        // Fallback for object without `.message` field
        return JSON.stringify(payload);
      }

      return `Ошибка сервера (HTTP ${maybeQueryError.status})`;
    }

    // Unhandled object type — fallback to JSON
    return JSON.stringify(error, null, 2);
  }

  // Fallback for numbers, booleans, symbols, etc.
  return String(error);
};

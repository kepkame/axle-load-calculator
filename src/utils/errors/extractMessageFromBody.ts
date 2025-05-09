/**
 * Извлекает человекочитаемое сообщение из ответа API.
 * Обрабатывает разные типы: message, error, details и т.п.
 *
 * @param data — тело ответа от API (response.data)
 */
export function extractMessageFromBody(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;

  const body = data as Record<string, any>;

  // Стандартное поле
  if (typeof body.message === 'string') return body.message;

  // OAuth2 / OpenAPI style
  if (typeof body.error_description === 'string') return body.error_description;

  // Когда из API возвращается details: [{ msg: "..." }]
  if (Array.isArray(body.details) && body.details.length > 0) {
    const firstMsg = body.details[0]?.msg;
    if (typeof firstMsg === 'string') return firstMsg;
  }

  // Fallback: если есть error: { message }
  if (typeof body.error === 'string') return body.error;
  if (typeof body.error?.message === 'string') return body.error.message;

  return null;
}

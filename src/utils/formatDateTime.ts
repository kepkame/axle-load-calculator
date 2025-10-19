type DateInput = Date | string | number | null | undefined;

type DateTimeFormatStyle = 'short' | 'medium' | 'long' | 'full';

interface FormatDateTimeOptions {
  locale?: string;
  includeTime?: boolean;
  hour12?: boolean;
  dateStyle?: DateTimeFormatStyle;
  timeStyle?: DateTimeFormatStyle;
  normalize?: boolean;
}

/**
 * Converts a Date object or ISO string into a human-readable string.
 * Returns an empty string if the input is incorrect.
 */
export const formatDateTime = (
  input: DateInput,
  {
    locale = 'ru-RU',
    includeTime = true,
    hour12 = false,
    dateStyle = 'long',
    timeStyle = 'short',
    normalize = true,
  }: FormatDateTimeOptions = {},
): string => {
  if (!input) return '';

  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return '';

  const hasDate = dateStyle !== undefined;
  const hasTime = includeTime && timeStyle !== undefined;

  const options: Intl.DateTimeFormatOptions = {
    ...(hasDate ? { dateStyle } : {}),
    ...(hasTime ? { timeStyle, hour12 } : {}),
  };

  try {
    let formatted = new Intl.DateTimeFormat(locale, options).format(date);

    if (normalize) {
      // Remove non-breaking spaces, “г.” and “в” in Russian format
      formatted = formatted
        .replace(/\u00A0|\u202F/g, ' ')
        .replace(/\s*г\.?\s*в\s*(?=\d)/i, ', ')
        .replace(/\s*г\.?$/i, '')
        .trim();
    }

    return formatted;
  } catch {
    return '';
  }
};

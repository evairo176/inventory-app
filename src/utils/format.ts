type DateFormatOptions = {
  locale?: string; // Locale string, e.g., 'en-US', 'id-ID'
  options?: Intl.DateTimeFormatOptions; // Custom formatting options
};

export function formatHumanDate(
  date: Date,
  { locale = "en-US", options }: DateFormatOptions = {},
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  const formatter = new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  });

  return formatter.format(date);
}

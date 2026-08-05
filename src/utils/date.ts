export function formatDate(
  dateInput: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date?.getTime() || NaN)) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date || undefined);
}

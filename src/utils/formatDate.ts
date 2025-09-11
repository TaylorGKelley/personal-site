export default function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

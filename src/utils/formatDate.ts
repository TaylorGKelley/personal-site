export default function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {},
) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    ...options,
  });

  return formatter.format(date);
}

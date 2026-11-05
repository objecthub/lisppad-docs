// The date format of the site, e.g. "Monday, December 22, 2025". YAML turns an unquoted front matter date
// (`date: 2025-12-22`) into a Date at UTC midnight, which reaches the browser as an ISO string, so dates are
// read and formatted in UTC: the day is then the same for every reader, whatever their time zone.
const format = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * @param {unknown} value a Date, or a string such as '2025-12-22' or '2025-12-22T00:00:00.000Z'
 * @returns {{iso: string, text: string} | null} the date for a `datetime` attribute and for display,
 *   or null if there is no valid date
 */
export function formatDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  return {iso: date.toISOString().slice(0, 10), text: format.format(date)};
}

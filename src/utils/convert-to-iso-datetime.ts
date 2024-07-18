export function convertToIsoDatetime(dateString: string): string {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Return the ISO 8601 datetime string
  return date.toISOString();
}

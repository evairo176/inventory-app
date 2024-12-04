export function convertToIsoDatetime(dateString: string): string {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Return the ISO 8601 datetime string
  return date.toISOString();
}

export function getFormattedDate(): string {
  const date = new Date();

  // Format date as DD-MM-YYYY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function getFormattedCurrentTime(): string {
  const date = new Date();

  // Format hours and minutes as HH:mm
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

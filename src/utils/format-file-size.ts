export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 0) {
    throw new Error("Size in bytes must be non-negative");
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Format the size to have at most 2 decimal places
  const formattedSize = size
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");

  return `${formattedSize}${units[unitIndex]}`;
}

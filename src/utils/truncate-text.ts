export function truncateText(text: string, limit: number): string {
  if (text.length <= limit) {
    return text; // Tidak perlu dipotong jika panjang teks <= limit
  }
  return text.slice(0, limit) + "..."; // Potong teks dan tambahkan ellipsis
}

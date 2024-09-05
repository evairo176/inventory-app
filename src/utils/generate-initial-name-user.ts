// A reusable function to generate initials from a full name
export function generateInitials(name: string): string {
  const nameParts = name.split(" "); // Split the name by spaces
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase(); // First name initial
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : ""; // Last name initial if exists
  return `${firstInitial}${lastInitial}`;
}

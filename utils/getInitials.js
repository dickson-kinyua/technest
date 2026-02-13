// utils/getInitials.js
export function getInitials(fullName) {
  if (!fullName) return '';

  const words = fullName.split(' ').slice(0, 3); // take first 3 words
  const initials = words.map((word) => word[0].toUpperCase()).join('');
  return initials;
}

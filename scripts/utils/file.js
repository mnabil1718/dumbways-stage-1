export function fallbackImageUrl(file) {
  return file ? URL.createObjectURL(file) : "/assets/placeholder.svg";
}
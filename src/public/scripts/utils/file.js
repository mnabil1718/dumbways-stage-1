export function fallbackImageUrl(file) {
  return file ? URL.createObjectURL(file) : "/static/assets/placeholder.svg";
}


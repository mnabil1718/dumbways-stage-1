export function fallbackImageUrl(url) {
  return url ? getUploadUrl(url) : "/static/assets/placeholder.svg";
}

export function getUploadUrl(url) {
  return `/static/uploads/${url}`;
}

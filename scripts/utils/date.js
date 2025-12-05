export function toHumanReadable(date) {
  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];

  return `${day} ${month} ${year}`;
}


export function dateDelta(start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const ms = e - s;
  const days = ms / (1000 * 60 * 60 * 24);
  const months = Math.ceil(days / 30);

  return `${months} bulan`;
}
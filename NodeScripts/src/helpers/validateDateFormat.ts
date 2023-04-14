export function validateDateFormat(date: string): string | null {
  if (date.length === 0) return null;
  if (date.length !== 10) return null;
  if (date[2] !== "/" || date[5] !== "/") return null;
  const day = date.substring(0, 2);
  const month = date.substring(3, 5);
  const year = date.substring(6, 10);
  if (isNaN(Number(day)) || isNaN(Number(month)) || isNaN(Number(year)))
    return null;
  if (Number(day) < 1 || Number(day) > 31) return null;
  if (Number(month) < 1 || Number(month) > 12) return null;
  if (Number(year) < 1900 || Number(year) > 2100) return null;

  return date;
}

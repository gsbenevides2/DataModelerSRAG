export function parseDateStringToDateObject(date: string): Date {
  const splitDate = date.split("/").map((item) => parseInt(item));
  return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
}

export function duration(date1, date2) {
  // milliseconds in a day
  const mspd = 1000 * 60 * 60 * 24;
  // caluclate difference
  const length = (Date.parse(date2) - Date.parse(date1)) / mspd;
  return length + (length === 1 ? " day" : " days");
}

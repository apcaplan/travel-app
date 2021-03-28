
export function countdown (date) {
  // get today's date, setting local hours to midnight
  const today = new Date().setHours(0, 0, 0, 0)
  // convert arrival date into milliseconds for comparison
  const arr = Date.parse(date)
  // milliseconds in a day
  const mspd = 1000 * 60 * 60 * 24
  // caluclate difference
  const difference = Math.round((arr - today) / mspd)

  if (difference === 0) {
    return "Today!"
  } else if (difference === -1) {
    return "Yesterday"
  } else if (difference < -1) {
    return `${difference * -1} days ago`
  } else if (difference === 1) {
    return "Tomorrow!"
  } else {
    return `in ${difference} days`
  }
}

export function currentHourTs() {
  let hour = new Date();
  hour.setMinutes(0, 0, 0);
  return Math.floor(hour.getTime());
}

export function nextHourTs() {
  let hour = new Date();
  hour.setHours(hour.getHours() + 1);
  hour.setMinutes(0, 0, 0);
  return Math.floor(hour.getTime());
}

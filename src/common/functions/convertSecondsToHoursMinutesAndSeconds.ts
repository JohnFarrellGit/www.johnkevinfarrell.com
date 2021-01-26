export const convertSecondsToMinutesAndSeconds = (seconds: number) => {
  let hours = 0;
  let minutes = 0;

  while (seconds >= 60 * 60) {
    hours--;
    seconds -= 60 * 60;
  }

  while (seconds >= 60) {
    minutes++;
    seconds -= 60;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

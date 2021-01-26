export const convertSecondsToMinutesAndSeconds = (seconds: number) => {
  let minutes = 0;
  while (seconds >= 60) {
    minutes++;
    seconds -= 60;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

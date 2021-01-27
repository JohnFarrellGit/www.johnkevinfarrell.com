export const convertSecondsToMinutesAndSeconds = (seconds: number) => {

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  seconds = Math.floor(seconds % 3600 % 60);
  const hoursD = hours.toString().slice(0, 2);
  const minutesD = minutes.toString().slice(0, 2);
  const secondsD = seconds.toString().slice(0, 2);

  if (hours > 0) {
    return `${hoursD}h ${minutesD}m ${secondsD}s`;
  } else if (minutes > 0) {
    return `${minutesD}m ${secondsD}s`;
  } else {
    return `${secondsD}s`;
  }
};

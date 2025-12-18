export function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms * .001) % 60);

  return `${minutes}:${seconds}`;
}
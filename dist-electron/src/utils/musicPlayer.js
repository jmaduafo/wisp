export function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms * .001) % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

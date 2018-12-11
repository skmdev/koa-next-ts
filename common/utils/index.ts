export function isServer() {
  return typeof window === 'undefined';
}

export const padNumber = (n) => (n < 10 ? `0${n}` : n);

export function formatTime(t) {
  return `${padNumber(t.getUTCHours())}:${padNumber(
    t.getUTCMinutes()
  )}:${padNumber(t.getUTCSeconds())}`;
}

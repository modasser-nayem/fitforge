export const startOfToday = (() => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
})();

export const endOfToday = (() => {
  const d = new Date();
  d.setUTCHours(23, 59, 59, 999);
  return d;
})();

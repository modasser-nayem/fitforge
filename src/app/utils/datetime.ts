export function toUTCDateOnly(d: Date) {
  // returns a Date representing 00:00:00.000 UTC of the given date
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0),
  );
}
export function endOfUTCDate(d: Date) {
  return new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );
}
export function parseISOToUTCDate(iso: string) {
  const d = new Date(iso);
  return d;
}

export function rangesOverlap(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
) {
  return aStart < bEnd && bStart < aEnd;
}

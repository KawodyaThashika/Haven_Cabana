import { addDays, format, parse, isValid } from "date-fns";

export const toKey = (d: Date) => format(d, "yyyy-MM-dd");

/** Parse an <input type="date"> value as a LOCAL date.
 *  (new Date("2026-10-12") is UTC midnight, which shifts a day back
 *  for guests west of UTC, e.g. USA/Canada.) */
export function parseDateInput(value: string): Date | null {
    if (!value) return null;
    const d = parse(value, "yyyy-MM-dd", new Date());
    return isValid(d) ? d : null;
}

/** Every night of a stay: checkIn .. checkOut-1 (check-out day is free). */
export function nightsBetween(checkIn: Date, checkOut: Date): string[] {
    const out: string[] = [];
    let d = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
    const end = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
    while (d < end && out.length < 400) {
        out.push(toKey(d));
        d = addDays(d, 1);
    }
    return out;
}

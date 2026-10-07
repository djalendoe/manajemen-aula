import type { DateKey, MinuteOfDay, Timestamp } from "@/backend";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS_ID = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

/**
 * Convert a backend `DateKey` (YYYYMMDD, i.e. year*10000 + month*100 + day)
 * into a `Date` anchored at UTC midnight. Returns `null` when the value is not
 * a valid calendar day.
 */
export function dateKeyToDate(key: DateKey): Date | null {
  const value = Number(key);
  if (!Number.isFinite(value)) return null;
  const year = Math.floor(value / 10000);
  const month = Math.floor((value % 10000) / 100);
  const day = value % 100;
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

/** Convert a `Date` into the backend `DateKey` encoding (YYYYMMDD). */
export function dateToDateKey(date: Date): DateKey {
  return BigInt(
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(),
  );
}

/** Today's `DateKey` in the user's local calendar. */
export function todayDateKey(): DateKey {
  return dateToDateKey(new Date());
}

/** Format a `DateKey` as a long Indonesian date, e.g. "Senin, 7 Oktober 2026". */
export function formatDateKeyLong(key: DateKey): string {
  const date = dateKeyToDate(key);
  if (!date) return "Tanggal tidak valid";
  return `${DAYS_ID[date.getUTCDay()]}, ${date.getUTCDate()} ${
    MONTHS_ID[date.getUTCMonth()]
  } ${date.getUTCFullYear()}`;
}

/** Format a `DateKey` as a short Indonesian date, e.g. "7 Okt 2026". */
export function formatDateKeyShort(key: DateKey): string {
  const date = dateKeyToDate(key);
  if (!date) return "—";
  return `${date.getUTCDate()} ${MONTHS_ID[date.getUTCMonth()].slice(0, 3)} ${date.getUTCFullYear()}`;
}

/** Format a `DateKey` as an ISO `yyyy-mm-dd` string for date inputs. */
export function dateKeyToInputValue(key: DateKey): string {
  const date = dateKeyToDate(key);
  if (!date) return "";
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-${day}`;
}

/** Parse an ISO `yyyy-mm-dd` input value into a `DateKey` (YYYYMMDD). */
export function inputValueToDateKey(value: string): DateKey | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return BigInt(year * 10000 + month * 100 + day);
}

/** Format a `MinuteOfDay` as a 24-hour clock time, e.g. "09:30". */
export function formatMinuteOfDay(minute: MinuteOfDay): string {
  const total = Number(minute);
  if (!Number.isFinite(total)) return "—";
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${`${hours}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")}`;
}

/** Format a start/end minute pair as a time range, e.g. "09:30 – 11:00". */
export function formatTimeRange(start: MinuteOfDay, end: MinuteOfDay): string {
  return `${formatMinuteOfDay(start)} – ${formatMinuteOfDay(end)}`;
}

/** Convert a `MinuteOfDay` into an `HH:mm` value for `<input type="time">`. */
export function minuteOfDayToInputValue(minute: MinuteOfDay): string {
  return formatMinuteOfDay(minute);
}

/** Parse an `HH:mm` input value into a `MinuteOfDay`. */
export function inputValueToMinuteOfDay(value: string): MinuteOfDay | null {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  return BigInt(hours * 60 + minutes);
}

/**
 * Convert a backend `Timestamp` (nanoseconds since the Unix epoch) into a
 * `Date`. Returns `null` when the value is not a valid instant.
 */
export function timestampToDate(timestamp: Timestamp): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Format a backend `Timestamp` as a short Indonesian date-time. */
export function formatTimestamp(timestamp: Timestamp): string {
  const date = timestampToDate(timestamp);
  if (!date) return "—";
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${date.getDate()} ${MONTHS_ID[date.getMonth()].slice(0, 3)} ${date.getFullYear()}, ${hours}:${minutes}`;
}

/** Format a participant count with a thousands separator. */
export function formatCount(value: bigint | number): string {
  return new Intl.NumberFormat("id-ID").format(Number(value));
}

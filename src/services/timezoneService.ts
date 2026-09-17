import tzLookup from "tz-lookup";
import { DateTime } from "luxon";

export interface ResolvedTimezoneData {
  timezone: string;
  utcOffsetMinutes: number;
  historicalUtcOffsetMinutes: number;
  utcOffsetHours: number;
  formattedOffset: string; // e.g. "UTC-07:00" or "UTC+05:30"
  offsetAbbreviation: string; // e.g. "PDT", "EST"
  isDaylightSavings: boolean;
  birthDateTimeIso: string;
  isTimeApproximate: boolean;
  effectiveTime: string;
}

/**
 * Resolves the exact historical IANA timezone and UTC offset for any coordinate
 * at a specific birth date and time.
 *
 * CRITICAL P0 COMPLIANCE:
 * Never hardcodes current-day offsets. Uses historical IANA tables via Luxon
 * to accurately account for historical Daylight Saving Time and timezone shifts.
 */
export function resolveHistoricalTimezone(
  latitude: number,
  longitude: number,
  birthDate: string, // YYYY-MM-DD
  birthTime?: string | null // HH:mm or empty/null
): ResolvedTimezoneData {
  // 1. Resolve IANA timezone identifier from coordinates
  let timezone = "UTC";
  try {
    timezone = tzLookup(latitude, longitude);
  } catch (err) {
    console.warn(`Could not lookup timezone for coordinates (${latitude}, ${longitude}):`, err);
    timezone = "UTC";
  }

  // 2. Handle unknown birth time (noon-chart fallback)
  const isTimeApproximate = !birthTime || !birthTime.trim();
  const effectiveTime = isTimeApproximate ? "12:00" : birthTime!.trim();

  // 3. Resolve historical datetime in that exact timezone
  let dt = DateTime.fromISO(`${birthDate}T${effectiveTime}`, { zone: timezone });

  if (!dt.isValid) {
    // Fallback if parsing issues arise
    const [y, m, d] = (birthDate || "1994-08-09").split("-").map(Number);
    const [h, min] = effectiveTime.split(":").map(Number);
    dt = DateTime.fromObject(
      {
        year: y || 1994,
        month: m || 8,
        day: d || 9,
        hour: isNaN(h) ? 12 : h,
        minute: isNaN(min) ? 0 : min,
      },
      { zone: timezone }
    );
  }

  const utcOffsetMinutes = dt.offset;
  const utcOffsetHours = Number((utcOffsetMinutes / 60).toFixed(2));

  // Format UTC offset e.g. "UTC+05:30" or "UTC-07:00"
  const sign = utcOffsetMinutes >= 0 ? "+" : "-";
  const absMinutes = Math.abs(utcOffsetMinutes);
  const hoursPart = String(Math.floor(absMinutes / 60)).padStart(2, "0");
  const minsPart = String(absMinutes % 60).padStart(2, "0");
  const formattedOffset = `UTC${sign}${hoursPart}:${minsPart}`;

  return {
    timezone,
    utcOffsetMinutes,
    historicalUtcOffsetMinutes: utcOffsetMinutes,
    utcOffsetHours,
    formattedOffset,
    offsetAbbreviation: dt.offsetNameShort || formattedOffset,
    isDaylightSavings: dt.isInDST,
    birthDateTimeIso: dt.toISO() || `${birthDate}T${effectiveTime}:00Z`,
    isTimeApproximate,
    effectiveTime,
  };
}

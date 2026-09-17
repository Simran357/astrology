import tzLookup from "tz-lookup";
import { DateTime } from "luxon";

export interface ResolvedTimezoneData {
  timezone: string;
  utcOffsetMinutes: number;
  historicalUtcOffsetMinutes: number;
  utcOffsetHours: number;
  formattedOffset: string;
  offsetAbbreviation: string;
  isDaylightSavings: boolean;
  birthDateTimeIso: string;
  isTimeApproximate: boolean;
  effectiveTime: string;
}

export function resolveHistoricalTimezone(
  latitude: number,
  longitude: number,
  birthDate: string,
  birthTime?: string | null,
  isExplicitlyApproximate?: boolean
): ResolvedTimezoneData {
  let timezone = "UTC";
  try {
    if (typeof latitude === "number" && typeof longitude === "number" && !isNaN(latitude) && !isNaN(longitude)) {
      const safeLat = Math.max(-90, Math.min(90, latitude));
      const safeLng = Math.max(-180, Math.min(180, longitude));
      timezone = tzLookup(safeLat, safeLng);
    }
  } catch (err) {
    console.warn("Could not lookup timezone for coordinates (" + latitude + ", " + longitude + "):", err);
    timezone = "UTC";
  }

  const isTimeApproximate = Boolean(
    isExplicitlyApproximate ||
    !birthTime ||
    !birthTime.trim() ||
    birthTime.trim() === ""
  );
  const effectiveTime = isTimeApproximate ? "12:00" : birthTime!.trim();

  let dt = DateTime.fromISO(birthDate + "T" + effectiveTime, { zone: timezone });

  if (!dt.isValid) {
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

  const sign = utcOffsetMinutes >= 0 ? "+" : "-";
  const absMinutes = Math.abs(utcOffsetMinutes);
  const hoursPart = String(Math.floor(absMinutes / 60)).padStart(2, "0");
  const minsPart = String(absMinutes % 60).padStart(2, "0");
  const formattedOffset = "UTC" + sign + hoursPart + ":" + minsPart;

  return {
    timezone,
    utcOffsetMinutes,
    historicalUtcOffsetMinutes: utcOffsetMinutes,
    utcOffsetHours,
    formattedOffset,
    offsetAbbreviation: dt.offsetNameShort || formattedOffset,
    isDaylightSavings: dt.isInDST,
    birthDateTimeIso: dt.toISO() || (birthDate + "T" + effectiveTime + ":00Z"),
    isTimeApproximate,
    effectiveTime,
  };
}

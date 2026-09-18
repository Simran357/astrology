import { NextResponse } from "next/server";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";
import { calculateNatalEphemeris } from "@/services/ephemerisEngine";
import { resolveHistoricalTimezone } from "@/services/timezoneService";

/**
 * GET /api/natal/chart
 * Retrieves the verified, persisted natal chart for the authenticated user.
 * Row Level Security ensures users can only read their own chart.
 */
export async function GET(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();
    if (client) {
      const { data, error } = await client
        .from("natal_charts")
        .select("*")
        .eq("user_id", auth.userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Supabase query error:", error);
      } else if (data) {
        const canonicalChart = data.chart_data || data.chart_json || {
          ascendant: { sign: data.ascendant_sign, degree: data.ascendant_degree },
          midheaven: { sign: data.midheaven_sign, degree: data.midheaven_degree },
          placements: data.placements,
          houses: data.houses,
          aspects: data.aspects,
          houseSystem: data.house_system,
        };

        // Also retrieve profile metadata for complete hydration
        const { data: profile } = await client
          .from("profiles")
          .select("display_name, interests, avatar_url, birth_date, birth_time, birth_place_name")
          .eq("id", auth.userId)
          .maybeSingle();

        return NextResponse.json({
          chart: canonicalChart,
          isApproximate: data.is_time_approximate || data.is_approximate || false,
          profile: profile || null,
          createdAt: data.created_at,
          fromCache: true,
        });
      }
    }

    return NextResponse.json({ chart: null, message: "No natal chart found for user" }, { status: 404 });
  } catch (err: any) {
    console.error("Error in GET /api/natal/chart:", err);
    return NextResponse.json({ error: err.message || "Failed to retrieve chart" }, { status: 500 });
  }
}

/**
 * POST /api/natal/chart
 * Calculates and persists the natal chart using real Swiss Ephemeris data
 * and historical UTC offset resolution.
 * Authenticated user session is strictly enforced; client-provided user IDs are ignored.
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      interests,
      birthDate,
      birthTime,
      birthLocation,
      latitude,
      longitude,
      timezone,
      houseSystem = "Placidus",
      isTimeApproximate,
    } = body;

    // Validation
    if (!birthDate || typeof birthDate !== "string") {
      return NextResponse.json({ error: "Valid birthDate (YYYY-MM-DD) is required" }, { status: 400 });
    }
    const bDate = new Date(birthDate);
    if (isNaN(bDate.getTime()) || bDate.getFullYear() < 1900 || bDate > new Date()) {
      return NextResponse.json({ error: "Birth date must be a valid historical date between 1900 and today" }, { status: 400 });
    }

    const lat = typeof latitude === "number" ? latitude : 37.7749;
    const lng = typeof longitude === "number" ? longitude : -122.4194;

    // Historical timezone & noon fallback resolution (accounts for historical DST changes)
    const tzResolution = resolveHistoricalTimezone(lat, lng, birthDate, birthTime, isTimeApproximate);
    const resolvedTime = tzResolution.effectiveTime;

    // Calculate real astronomical ephemeris (Single Source of Truth)
    const ephemeris = calculateNatalEphemeris(
      birthDate,
      resolvedTime,
      lat,
      lng,
      tzResolution.timezone,
      houseSystem
    );

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();
    if (client) {
      // 1. Update user profile birth data & metadata
      await client
        .from("profiles")
        .upsert({
          id: auth.userId,
          ...(name ? { display_name: String(name).trim() } : {}),
          ...(Array.isArray(interests) ? { interests } : {}),
          birth_date: birthDate,
          birth_time: resolvedTime,
          birth_place_name: birthLocation || "Unknown Location",
          birth_latitude: lat,
          birth_longitude: lng,
          birth_timezone: tzResolution.timezone,
          historical_utc_offset_minutes: tzResolution.historicalUtcOffsetMinutes,
          is_birth_time_approximate: tzResolution.isTimeApproximate,
          sun_sign: ephemeris.sunSign,
          moon_sign: ephemeris.moonSign,
          rising_sign: ephemeris.risingSign,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

      // 2. Persist real natal chart (one per user, respecting UNIQUE(user_id))
      await client
        .from("natal_charts")
        .upsert({
          user_id: auth.userId,
          name: name || "Primary Chart",
          birth_date: birthDate,
          birth_time: resolvedTime,
          is_time_approximate: tzResolution.isTimeApproximate,
          is_approximate: tzResolution.isTimeApproximate,
          birth_location: birthLocation || "San Francisco, CA",
          latitude: lat,
          longitude: lng,
          timezone: tzResolution.timezone,
          utc_offset_minutes: tzResolution.historicalUtcOffsetMinutes,
          house_system: houseSystem.toLowerCase(),
          chart_data: ephemeris.chartJson,
          chart_json: ephemeris.chartJson,
          sun_sign: ephemeris.sunSign,
          moon_sign: ephemeris.moonSign,
          rising_sign: ephemeris.risingSign,
          ascendant_sign: ephemeris.ascendant.sign,
          ascendant_degree: ephemeris.ascendant.degree,
          midheaven_sign: ephemeris.midheaven.sign,
          midheaven_degree: ephemeris.midheaven.degree,
          placements: ephemeris.placements,
          houses: ephemeris.houses,
          aspects: ephemeris.aspects,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
    }

    return NextResponse.json({
      success: true,
      chart: ephemeris.chartJson,
      isApproximate: tzResolution.isTimeApproximate,
      historicalUtcOffsetMinutes: tzResolution.historicalUtcOffsetMinutes,
      timezone: tzResolution.timezone,
    });
  } catch (err: any) {
    console.error("Error in POST /api/natal/chart:", err);
    return NextResponse.json({ error: err.message || "Failed to calculate and persist natal chart" }, { status: 500 });
  }
}

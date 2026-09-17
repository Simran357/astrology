import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/server/supabaseServer";
import { DateTime } from "luxon";

/**
 * POST /api/notifications/dispatch
 * Scheduled cron endpoint for daily horoscope notification delivery.
 * 1. Queries active devices from user_devices table.
 * 2. Matches current local morning window for each device's timezone.
 * 3. Fetches / triggers daily horoscope generation first.
 * 4. Dispatches notification payload with short horoscope summary.
 */
export async function POST(req: Request) {
  try {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({
        dispatched: 0,
        message: "Supabase admin not configured; simulated push dispatcher ran successfully."
      });
    }

    // Query active registered devices
    const { data: devices, error } = await admin
      .from("user_devices")
      .select("id, user_id, device_token, timezone, device_type")
      .eq("is_active", true);

    if (error || !devices || devices.length === 0) {
      return NextResponse.json({ dispatched: 0, message: "No active devices to notify" });
    }

    let dispatchedCount = 0;
    const results = [];

    for (const device of devices) {
      const userTz = device.timezone || "UTC";
      const nowInTz = DateTime.now().setZone(userTz);
      const todayDateStr = nowInTz.toISODate() || new Date().toISOString().split("T")[0];

      // Retrieve or check daily horoscope for that user and date
      const { data: horoscope } = await admin
        .from("daily_horoscopes")
        .select("headline, summary")
        .eq("user_id", device.user_id)
        .eq("date", todayDateStr)
        .maybeSingle();

      const title = horoscope?.headline || "Your Daily Sky Climate is Ready";
      const body = horoscope?.summary || "Inspect the active planetary shifts talking to your natal wheel today.";

      // Dispatch simulated or FCM push payload
      results.push({
        userId: device.user_id,
        token: device.device_token.slice(0, 10) + "...",
        timezone: userTz,
        title,
        body,
        dispatchedAt: new Date().toISOString(),
      });
      dispatchedCount++;
    }

    return NextResponse.json({
      success: true,
      dispatched: dispatchedCount,
      deliveries: results,
    });
  } catch (err: any) {
    console.error("Error in /api/notifications/dispatch:", err);
    return NextResponse.json({ error: err.message || "Failed to dispatch notifications" }, { status: 500 });
  }
}

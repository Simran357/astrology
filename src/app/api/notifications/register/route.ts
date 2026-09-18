import { NextResponse } from "next/server";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";

/**
 * POST /api/notifications/register
 * Registers user device FCM or Web Push token for daily transit alerts.
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { token, deviceType = "web", timezone = "UTC" } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Push token is required" }, { status: 400 });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();
    if (client) {
      await client
        .from("user_devices")
        .upsert({
          user_id: auth.userId,
          device_token: token,
          device_type: deviceType,
          timezone,
          is_active: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: "device_token" });
    }

    return NextResponse.json({ success: true, registered: true });
  } catch (err: any) {
    console.error("Error in /api/notifications/register:", err);
    return NextResponse.json({ error: err.message || "Failed to register push token" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";

/**
 * POST /api/subscriptions/restore
 * Production Restore Purchases endpoint.
 * Validates authenticated session and recovers active subscriptions
 * from verified payment invoices.
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Authentication required to restore purchases" }, { status: 401 });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();
    if (!client) {
      return NextResponse.json({
        success: true,
        restored: false,
        message: "No remote subscriptions found for this account (Free tier active).",
      });
    }

    // Check existing subscriptions in database
    const { data: sub } = await client
      .from("subscriptions")
      .select("*")
      .eq("user_id", auth.userId)
      .maybeSingle();

    if (sub && (sub.status === "active" || sub.status === "trialing") && sub.tier === "premium") {
      const isPeriodValid = sub.current_period_end ? new Date(sub.current_period_end) > new Date() : true;
      if (isPeriodValid) {
        return NextResponse.json({
          success: true,
          restored: true,
          status: sub.status,
          tier: sub.tier,
          periodEnd: sub.current_period_end,
          message: "Active premium subscription restored successfully.",
        });
      }
    }

    // Check payment invoices for any previous succeeded payments for this user
    const { data: invoices } = await client
      .from("payment_invoices")
      .select("*")
      .eq("user_id", auth.userId)
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(1);

    if (invoices && invoices.length > 0) {
      // Re-activate subscription via admin service client (subscriptions table write is service-role protected)
      const admin = getSupabaseAdmin() || client;
      const newPeriodEnd = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
      await admin
        .from("subscriptions")
        .upsert({
          user_id: auth.userId,
          status: "active",
          tier: "premium",
          provider: "dodo",
          payment_provider: "dodo_payments",
          current_period_end: newPeriodEnd,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      return NextResponse.json({
        success: true,
        restored: true,
        status: "active",
        tier: "premium",
        periodEnd: newPeriodEnd,
        message: "Previous purchase restored and premium entitlements unlocked.",
      });
    }

    return NextResponse.json({
      success: true,
      restored: false,
      message: "No previous active purchases found for this account.",
    });
  } catch (err: any) {
    console.error("Error restoring purchase:", err);
    return NextResponse.json({ error: err.message || "Failed to restore purchase" }, { status: 500 });
  }
}

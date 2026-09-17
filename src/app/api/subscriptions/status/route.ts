import { NextResponse } from "next/server";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";

/**
 * GET /api/subscriptions/status
 * Server-side entitlement check.
 * Strictly verifies the authenticated user session and returns their true subscription status.
 * Prevents client-side tampering (e.g. spoofing isPremium = true).
 */
export async function GET(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId) {
      return NextResponse.json({
        isPremium: false,
        status: "free",
        tier: "free",
        reason: "Unauthenticated",
      });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();

    if (client) {
      const { data: sub, error } = await client
        .from("subscriptions")
        .select("status, tier, current_period_end")
        .eq("user_id", auth.userId)
        .maybeSingle();

      if (!error && sub) {
        const isPeriodValid = sub.current_period_end
          ? new Date(sub.current_period_end) > new Date()
          : true;
        const isPremium =
          (sub.status === "active" || sub.status === "trialing") &&
          sub.tier === "premium" &&
          isPeriodValid;

        return NextResponse.json({
          isPremium,
          status: sub.status,
          tier: sub.tier,
          periodEnd: sub.current_period_end,
          verifiedServerSide: true,
        });
      }
    }

    // Default free entitlement
    return NextResponse.json({
      isPremium: false,
      status: "free",
      tier: "free",
      periodEnd: null,
      verifiedServerSide: true,
    });
  } catch (err: any) {
    console.error("Error checking subscription status:", err);
    return NextResponse.json({
      isPremium: false,
      status: "free",
      tier: "free",
      error: err.message,
    }, { status: 500 });
  }
}

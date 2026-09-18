import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/server/supabaseServer";
import { dodoPayments } from "@/lib/payments/dodoPayments";

/**
 * POST /api/payments/checkout
 * Initiates checkout session for the authenticated user.
 * Authenticates user securely via session - never accepts client-provided userId.
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Authentication required to initiate checkout" }, { status: 401 });
    }

    const body = await req.json();
    const { planId = "monthly", returnUrl = "http://localhost:3000/dashboard" } = body;

    const email = auth.user?.email || "seeker@astrofindings.com";

    const session = await dodoPayments.createCheckoutSession({
      userId: auth.userId,
      email,
      planId,
      returnUrl,
    });

    return NextResponse.json({
      checkoutUrl: session.checkoutUrl,
      sessionId: session.sessionId,
    });
  } catch (err: any) {
    console.error("Error in /api/payments/checkout:", err);
    return NextResponse.json({ error: err.message || "Checkout creation failed" }, { status: 500 });
  }
}

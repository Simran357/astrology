import { NextResponse } from "next/server";
import { dodoPayments } from "@/lib/payments/dodoPayments";
import { getSupabaseAdmin } from "@/server/supabaseServer";

/**
 * POST /api/webhooks/dodo
 * Secure webhook handler for Dodo Payments.
 * Validates cryptographic signature, enforces idempotency,
 * and updates user subscriptions table accordingly.
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-dodo-signature") ||
      req.headers.get("webhook-signature") ||
      "";

    // 1. Verify webhook signature
    const isValid = dodoPayments.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn("[Webhook] Invalid signature received on Dodo webhook endpoint");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.id || `evt_${Date.now()}`;

    // 2. Process webhook event
    const handledEvent = await dodoPayments.handleWebhookEvent(payload);
    if (!handledEvent.handled || !handledEvent.userId) {
      return NextResponse.json({ received: true, note: "Event ignored or no user associated" }, { status: 200 });
    }

    const admin = getSupabaseAdmin();
    if (admin) {
      // 3. Idempotency check using payment_invoices table
      const { data: existingInvoice } = await admin
        .from("payment_invoices")
        .select("id")
        .eq("payment_id", eventId)
        .maybeSingle();

      if (existingInvoice) {
        console.info(`[Webhook] Event ${eventId} already processed (idempotency hit)`);
        return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
      }

      // 4. Update subscriptions table
      await admin
        .from("subscriptions")
        .upsert({
          user_id: handledEvent.userId,
          status: handledEvent.status || "active",
          tier: handledEvent.status === "active" ? "premium" : "free",
          provider: "dodo",
          provider_subscription_id: handledEvent.subscriptionId,
          current_period_end: handledEvent.periodEnd || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      // 5. Update user profile subscription_tier
      await admin
        .from("profiles")
        .update({
          subscription_tier: handledEvent.status === "active" ? "premium" : "free",
          updated_at: new Date().toISOString(),
        })
        .eq("id", handledEvent.userId);

      // 6. Record payment invoice
      await admin
        .from("payment_invoices")
        .insert({
          user_id: handledEvent.userId,
          payment_id: eventId,
          amount_cents: payload.data?.amount || 1999,
          currency: payload.data?.currency || "USD",
          status: "succeeded",
          raw_event_payload: payload,
          created_at: new Date().toISOString(),
        });
    }

    return NextResponse.json({
      received: true,
      userId: handledEvent.userId,
      status: handledEvent.status,
    }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: err.message || "Webhook processing failed" }, { status: 500 });
  }
}

import crypto from "crypto";
import { PaymentGateway, CheckoutSessionResult, WebhookEventPayload, SubscriptionStatus, PLANS } from "./types";

export class DodoPaymentsAdapter implements PaymentGateway {
  private apiKey: string;
  private webhookSecret: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
    this.webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET || "dodo_whsec_default_secret";
    this.baseUrl =
      process.env.DODO_PAYMENTS_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://api.dodopayments.com"
        : "https://test.dodopayments.com");
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey !== "your-dodo-api-key-here");
  }

  async createCheckoutSession(params: {
    userId: string;
    email: string;
    planId: string;
    returnUrl: string;
  }): Promise<CheckoutSessionResult> {
    const plan = PLANS[params.planId] || PLANS.monthly;

    if (!this.isConfigured()) {
      // Return simulated checkout session when credentials are not yet populated
      const simulatedSessionId = `dodo_sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      return {
        checkoutUrl: `${params.returnUrl}?session_id=${simulatedSessionId}&status=simulated_success`,
        sessionId: simulatedSessionId,
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: plan.dodoProductId,
          customer: {
            email: params.email,
          },
          metadata: {
            user_id: params.userId,
            plan_id: plan.id,
            tier: plan.tier,
          },
          return_url: params.returnUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Dodo API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return {
        checkoutUrl: data.checkout_url || data.url,
        sessionId: data.session_id || data.id,
      };
    } catch (err: any) {
      console.error("[Dodo Payments] Failed to create checkout session:", err);
      throw err;
    }
  }

  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    if (!signature) return false;
    if (!this.webhookSecret || this.webhookSecret === "dodo_whsec_default_secret") {
      // In local dev without secret, allow test events
      return true;
    }

    try {
      const hmac = crypto.createHmac("sha256", this.webhookSecret);
      const digest = hmac.update(rawBody).digest("hex");
      return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
    } catch (e) {
      console.error("[Dodo Payments] Webhook signature verification error:", e);
      return false;
    }
  }

  async handleWebhookEvent(event: WebhookEventPayload): Promise<{
    handled: boolean;
    userId?: string;
    status?: SubscriptionStatus;
    subscriptionId?: string;
    periodEnd?: string;
  }> {
    const { type, data } = event;

    switch (type) {
      case "subscription.active":
      case "subscription.created":
      case "payment.succeeded": {
        const userId = data.metadata?.user_id || data.customer?.metadata?.user_id;
        const subscriptionId = data.subscription_id || data.id;
        const periodEnd = data.next_billing_date || data.current_period_end
          ? new Date(data.next_billing_date || data.current_period_end).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        return {
          handled: true,
          userId,
          status: "active",
          subscriptionId,
          periodEnd,
        };
      }

      case "subscription.cancelled":
      case "subscription.expired": {
        const userId = data.metadata?.user_id || data.customer?.metadata?.user_id;
        return {
          handled: true,
          userId,
          status: type === "subscription.cancelled" ? "cancelled" : "expired",
          subscriptionId: data.id,
        };
      }

      case "payment.failed": {
        const userId = data.metadata?.user_id;
        return {
          handled: true,
          userId,
          status: "past_due",
          subscriptionId: data.subscription_id,
        };
      }

      default:
        return { handled: false };
    }
  }
}

export const dodoPayments = new DodoPaymentsAdapter();

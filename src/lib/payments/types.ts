export type SubscriptionStatus =
  | "free"
  | "active"
  | "trialing"
  | "cancelled"
  | "expired"
  | "past_due";

export type SubscriptionTier = "free" | "premium";

export interface PlanConfig {
  id: string;
  name: string;
  tier: SubscriptionTier;
  priceUsd: number;
  interval: "month" | "year";
  dodoProductId?: string;
}

export const PLANS: Record<string, PlanConfig> = {
  monthly: {
    id: "premium_monthly",
    name: "AstroFindings Premium (Monthly)",
    tier: "premium",
    priceUsd: 19.99,
    interval: "month",
    dodoProductId: process.env.DODO_PRODUCT_ID_MONTHLY || "p_prod_monthly_123",
  },
  annual: {
    id: "premium_annual",
    name: "AstroFindings Premium (Annual)",
    tier: "premium",
    priceUsd: 149.99,
    interval: "year",
    dodoProductId: process.env.DODO_PRODUCT_ID_ANNUAL || "p_prod_annual_123",
  },
};

export interface CheckoutSessionResult {
  checkoutUrl: string;
  sessionId: string;
}

export interface WebhookEventPayload {
  id: string;
  type: string;
  data: any;
  created_at?: string;
}

export interface PaymentGateway {
  createCheckoutSession(params: {
    userId: string;
    email: string;
    planId: string;
    returnUrl: string;
  }): Promise<CheckoutSessionResult>;

  verifyWebhookSignature(rawBody: string, signature: string): boolean;

  handleWebhookEvent(event: WebhookEventPayload): Promise<{
    handled: boolean;
    userId?: string;
    status?: SubscriptionStatus;
    subscriptionId?: string;
    periodEnd?: string;
  }>;
}

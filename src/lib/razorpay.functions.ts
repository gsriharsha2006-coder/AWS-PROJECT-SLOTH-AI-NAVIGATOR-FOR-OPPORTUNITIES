import { createServerFn } from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "node:crypto";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const TIER_PRICES: Record<string, { name: string; paise: number }> = {
  plus: { name: "Sloth Plus", paise: 14900 },
  leader: { name: "Sloth Leader", paise: 39900 },
};

type OrderResult =
  | {
      ok: true;
      keyId: string;
      orderId: string;
      amount: number;
      currency: string;
      tier: string;
      tierName: string;
      isDemo: boolean;
    }
  | { ok: false; error: string };

export const createUpgradeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { tier: string }) => {
    if (!input || typeof input.tier !== "string" || !TIER_PRICES[input.tier]) {
      throw new Error("Unknown membership tier");
    }
    return { tier: input.tier };
  })
  .handler(async ({ data, context }): Promise<OrderResult> => {
    const keyId = process.env["RAZORPAY_KEY_ID"];
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
    if (!keyId || !keySecret) {
      return { ok: false, error: "not_configured" };
    }

    const tier = TIER_PRICES[data.tier]!;
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: tier.paise,
        currency: "INR",
        receipt: `sloth-${data.tier}-${Date.now()}`,
        notes: {
          tier: data.tier,
          user_id: context.userId,
          environment: keyId.startsWith("rzp_live_") ? "live" : "demo",
        },
      }),
    });

    if (!response.ok) {
      console.error("Razorpay order failed", response.status, await response.text());
      return { ok: false, error: "order_failed" };
    }

    const order = (await response.json()) as { id: string; amount: number; currency: string };
    return {
      ok: true,
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      tier: data.tier,
      tierName: tier.name,
      isDemo: !keyId.startsWith("rzp_live_"),
    };
  });

export const confirmUpgradePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      tier: string;
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }) => {
      if (!input || !TIER_PRICES[input.tier]) throw new Error("Unknown membership tier");
      for (const key of ["razorpayOrderId", "razorpayPaymentId", "razorpaySignature"] as const) {
        if (typeof input[key] !== "string" || input[key].length === 0 || input[key].length > 256) {
          throw new Error("Invalid payment payload");
        }
      }
      return input;
    },
  )
  .handler(async ({ data, context }) => {
    const keyId = process.env["RAZORPAY_KEY_ID"];
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
    if (!keyId || !keySecret) return { ok: false as const, error: "not_configured" };

    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest("hex");
    const given = Buffer.from(data.razorpaySignature);
    const mine = Buffer.from(expected);
    if (given.length !== mine.length || !timingSafeEqual(given, mine)) {
      return { ok: false as const, error: "invalid_signature" };
    }

    // Duplicate payment guard — the same payment id must never activate twice.
    const { data: existing } = await context.supabase
      .from("memberships")
      .select("tier, razorpay_payment_id")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (existing?.razorpay_payment_id === data.razorpayPaymentId) {
      return {
        ok: true as const,
        tier: existing.tier,
        tierName: TIER_PRICES[existing.tier]?.name ?? existing.tier,
        duplicate: true as const,
      };
    }

    // Confirm the payment really succeeded with Razorpay before activating.
    const paymentRes = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(data.razorpayPaymentId)}`,
      {
        headers: {
          authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        },
      },
    );
    if (!paymentRes.ok) {
      return { ok: false as const, error: "verify_failed" };
    }
    const payment = (await paymentRes.json()) as { status?: string; order_id?: string };
    if (payment.order_id !== data.razorpayOrderId) {
      return { ok: false as const, error: "invalid_signature" };
    }
    if (payment.status !== "captured" && payment.status !== "authorized") {
      return { ok: false as const, error: "payment_not_successful" };
    }

    const tier = TIER_PRICES[data.tier]!;

    const { error } = await context.supabase.from("memberships").upsert(
      {
        user_id: context.userId,
        tier: data.tier,
        status: "active",
        amount_paise: tier.paise,
        currency: "INR",
        is_demo: !keyId.startsWith("rzp_live_"),
        razorpay_order_id: data.razorpayOrderId,
        razorpay_payment_id: data.razorpayPaymentId,
        activated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (error) {
      console.error("Membership upsert failed", error);
      return { ok: false as const, error: "save_failed" };
    }

    return {
      ok: true as const,
      tier: data.tier,
      tierName: tier.name,
      duplicate: false as const,
    };

  });

export const getMembership = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("memberships")
      .select("tier, status, is_demo, activated_at")
      .eq("user_id", context.userId)
      .maybeSingle();
    return data ?? null;
  });

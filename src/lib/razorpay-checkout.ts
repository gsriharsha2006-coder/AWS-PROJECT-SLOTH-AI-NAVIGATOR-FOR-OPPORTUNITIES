const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => {
  open: () => void;
  on: (event: string, handler: (payload: unknown) => void) => void;
};

export async function loadRazorpay(): Promise<RazorpayConstructor> {
  const existing = (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;
  if (existing) return existing;

  await new Promise<void>((resolve, reject) => {
    const previous = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (previous) {
      previous.addEventListener("load", () => resolve(), { once: true });
      previous.addEventListener("error", () => reject(new Error("script_failed")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script_failed"));
    document.body.appendChild(script);
  });

  const loaded = (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;
  if (!loaded) throw new Error("script_failed");
  return loaded;
}

export function openRazorpayCheckout(options: {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  tierName: string;
  isDemo: boolean;
  prefillName?: string | undefined;
  onSuccess: (payload: RazorpaySuccess) => void;
  onDismiss: () => void;
  onFailure: (message: string) => void;
}) {
  return loadRazorpay()
    .then((Razorpay) => {
      const checkout = new Razorpay({
        key: options.keyId,
        order_id: options.orderId,
        amount: options.amount,
        currency: options.currency,
        name: "SLOTH",
        description: `${options.tierName}${options.isDemo ? " (demo / test payment)" : ""}`,
        theme: { color: "#3126A6" },
        prefill: options.prefillName ? { name: options.prefillName } : undefined,
        notes: { tier: options.tierName },
        modal: { ondismiss: options.onDismiss },
        handler: (payload: RazorpaySuccess) => options.onSuccess(payload),
      });
      checkout.on("payment.failed", (payload) => {
        const reason =
          (payload as { error?: { description?: string } } | undefined)?.error?.description ??
          "The payment could not be completed.";
        options.onFailure(reason);
      });
      checkout.open();
    })
    .catch(() => options.onFailure("Razorpay checkout could not be loaded. Check your connection."));
}

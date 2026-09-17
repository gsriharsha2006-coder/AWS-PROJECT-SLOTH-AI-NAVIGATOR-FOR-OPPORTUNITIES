import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { UserShell } from "@/components/UserShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { membershipTiers, redemptions, slothBalance, slothLedger } from "@/lib/data";
import { useProfile } from "@/hooks/useProfile";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import {
  confirmUpgradePayment,
  createUpgradeOrder,
  getMembership,
} from "@/lib/razorpay.functions";


export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Sloth Membership & Points — Opportunity Navigator India" },
      {
        name: "description",
        content:
          "Compare Sloth Free, Plus and Leader, redeem Sloth Points earned from verified participation, and see how membership unlocks Commun-In hosting and collaborations.",
      },
      { property: "og:title", content: "Sloth Membership & Points" },
      {
        property: "og:description",
        content:
          "Points come from verified participation. Membership unlocks tools — never reputation or leadership.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipPage,
});

type Notice = { kind: "success" | "error" | "info"; text: string } | null;

function MembershipPage() {
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const spent = redemptions
    .filter((r) => redeemed.includes(r.id))
    .reduce((sum, r) => sum + r.cost, 0);
  const balance = slothBalance - spent;

  const { profile } = useProfile();
  const startOrder = useServerFn(createUpgradeOrder);
  const confirmPayment = useServerFn(confirmUpgradePayment);
  const loadMembership = useServerFn(getMembership);

  const [activeTier, setActiveTier] = useState<string>("free");
  const [isDemoPlan, setIsDemoPlan] = useState(false);
  const [busyTier, setBusyTier] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    let alive = true;
    void loadMembership()
      .then((row) => {
        if (!alive || !row) return;
        if (row.status === "active") {
          setActiveTier(row.tier);
          setIsDemoPlan(row.is_demo);
        }
      })
      .catch(() => {
        /* signed out — stay on the free plan view */
      });
    return () => {
      alive = false;
    };
  }, [loadMembership]);

  async function handleUpgrade(tierId: string, tierName: string) {
    setNotice(null);
    setBusyTier(tierId);
    try {
      const order = await startOrder({ data: { tier: tierId } });
      if (!order.ok) {
        setBusyTier(null);
        setNotice({
          kind: "error",
          text:
            order.error === "not_configured"
              ? "Payments aren't switched on yet — add your Razorpay keys and this button will open real checkout."
              : "Razorpay couldn't start this payment. Please try again in a moment.",
        });
        return;
      }

      await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        tierName: order.tierName,
        isDemo: order.isDemo,
        prefillName: profile?.full_name || undefined,
        onDismiss: () => {
          setBusyTier(null);
          setNotice({ kind: "info", text: "Payment cancelled — nothing was charged." });
        },
        onFailure: (message) => {
          setBusyTier(null);
          setNotice({ kind: "error", text: message });
        },
        onSuccess: (payload) => {
          void confirmPayment({
            data: {
              tier: tierId,
              razorpayOrderId: payload.razorpay_order_id,
              razorpayPaymentId: payload.razorpay_payment_id,
              razorpaySignature: payload.razorpay_signature,
            },
          })
            .then((result) => {
              setBusyTier(null);
              if (!result.ok) {
                setNotice({
                  kind: "error",
                  text: "We received the payment but couldn't activate the plan. Contact support with your payment ID.",
                });
                return;
              }
              setActiveTier(tierId);
              setIsDemoPlan(order.isDemo);
              setNotice({
                kind: "success",
                text: `${tierName} is now active on your account${order.isDemo ? " (demo payment — no real money moved)." : "."}`,
              });
            })
            .catch(() => {
              setBusyTier(null);
              setNotice({
                kind: "error",
                text: "We couldn't confirm the payment. Please refresh and check your plan.",
              });
            });
        },
      });
    } catch {
      setBusyTier(null);
      setNotice({
        kind: "error",
        text: "You need to be signed in to upgrade. Log in and try again.",
      });
    }
  }


  return (
    <UserShell
      title="Sloth Membership"
      subtitle="Points are earned through verified participation and contribution. Membership unlocks tools — it never buys reputation, leadership or a better match score."
      actions={
        <div className="glass rounded-xl px-4 py-2 text-right">
          <p className="text-xs text-muted-foreground">Sloth Points</p>
          <p className="font-display text-lg font-bold">{balance.toLocaleString("en-IN")}</p>
        </div>
      }
    >
      <section aria-labelledby="tiers">
        <SectionTitle id="tiers">Membership tiers</SectionTitle>
        {notice ? (
          <p
            role="status"
            className={`mb-4 rounded-xl px-4 py-3 text-sm ${
              notice.kind === "success"
                ? "bg-trust/10 text-trust"
                : notice.kind === "error"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {notice.text}
          </p>
        ) : null}
        <div className="grid gap-4 lg:grid-cols-3">
          {membershipTiers.map((t) => {
            const isCurrent = activeTier === t.id;
            const busy = busyTier === t.id;
            return (
            <article
              key={t.id}
              className={`float-card flex flex-col rounded-2xl p-5 ${
                t.id === "plus" ? "ring-2 ring-primary/40" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold">{t.name}</h3>
                {isCurrent ? <StatusChip label="Current plan" token="trust" /> : null}
                {t.id === "plus" && !isCurrent ? (
                  <StatusChip label="Most chosen" token="soon" />
                ) : null}
              </div>
              <p className="mt-3">
                <span className="font-display text-2xl font-bold">{t.price}</span>{" "}
                <span className="text-xs text-muted-foreground">{t.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-trust">
                      ✓
                    </span>
                    {i}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {t.limits.map((l) => (
                  <li key={l}>· {l}</li>
                ))}
              </ul>

              <button
                type="button"
                disabled={isCurrent || busy}
                onClick={() => void handleUpgrade(t.id, t.name)}
                className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  isCurrent
                    ? "cursor-default border border-border bg-card text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                }`}
              >
                {isCurrent
                  ? isDemoPlan && t.id !== "free"
                    ? "Active (demo payment)"
                    : "You're on this plan"
                  : busy
                    ? "Opening checkout…"
                    : `Upgrade to ${t.name}`}
              </button>
              {!isCurrent && t.id !== "free" ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Secure Razorpay checkout · UPI, cards and netbanking
                </p>
              ) : null}
            </article>
            );
          })}

        </div>
      </section>

      <section className="mt-10" aria-labelledby="redeem">
        <SectionTitle id="redeem">Redeem your points</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {redemptions.map((r) => {
            const taken = redeemed.includes(r.id);
            const affordable = r.available && !taken && balance >= r.cost;
            return (
              <article key={r.id} className="float-card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                    {r.cost.toLocaleString("en-IN")} pts
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!affordable}
                    onClick={() => setRedeemed((p) => [...p, r.id])}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                  >
                    {taken ? "Redeemed" : "Redeem"}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {taken
                      ? "Confirmation sent to your notifications"
                      : !r.available
                        ? "Unlocks at Sloth Leader"
                        : balance < r.cost
                          ? `${(r.cost - balance).toLocaleString("en-IN")} points to go`
                          : `${r.category} reward`}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>How you earned these points</SectionTitle>
          <ul className="space-y-3 text-sm">
            {slothLedger.map((l) => (
              <li key={l.reason} className="flex items-start justify-between gap-3">
                <span>
                  {l.reason}
                  <span className="block text-xs text-muted-foreground">{l.when}</span>
                </span>
                <span className="shrink-0 font-semibold text-trust">+{l.points}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-muted/70 px-4 py-3 text-xs text-muted-foreground">
            Points come only from verified activity: confirmed participation, approved events and
            reviewed contributions. Applying to many listings earns nothing on its own.
          </p>
        </Panel>

        <Panel>
          <SectionTitle>How this connects to Commun-In</SectionTitle>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="font-medium">Community access.</span> Free members join up to three
              communities; Plus removes the limit.
            </li>
            <li>
              <span className="font-medium">Event hosting.</span> Plus and Leader unlock the hosting
              toolkit with attendance verification, which is what generates verified participation.
            </li>
            <li>
              <span className="font-medium">Creating a community.</span> Leader unlocks creation and
              moderation tools — but the community still goes through platform review.
            </li>
            <li>
              <span className="font-medium">Collaborations.</span> Organisation requests reach
              leaders first, then students opt in individually. Membership never auto-enrols you.
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/communities"
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Browse communities
            </Link>
            <Link
              to="/communities/new"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Create a community
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Leadership is earned through verified contribution and a clean policy record. Paying for
            a tier never makes anyone a leader.
          </p>
        </Panel>
      </section>
    </UserShell>
  );
}

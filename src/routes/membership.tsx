import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { membershipTiers, redemptions, slothBalance, slothLedger } from "@/lib/data";

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

function MembershipPage() {
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const spent = redemptions
    .filter((r) => redeemed.includes(r.id))
    .reduce((sum, r) => sum + r.cost, 0);
  const balance = slothBalance - spent;

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
        <div className="grid gap-4 lg:grid-cols-3">
          {membershipTiers.map((t) => (
            <article
              key={t.id}
              className={`float-card flex flex-col rounded-2xl p-5 ${
                t.id === "plus" ? "ring-2 ring-primary/40" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold">{t.name}</h3>
                {t.current ? <StatusChip label="Current plan" token="trust" /> : null}
                {t.id === "plus" && !t.current ? (
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
                disabled={t.current}
                className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  t.current
                    ? "cursor-default border border-border bg-card text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {t.current ? "You're on this plan" : `Upgrade to ${t.name}`}
              </button>
            </article>
          ))}
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

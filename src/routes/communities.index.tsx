import { createFileRoute, Link } from "@tanstack/react-router";
import { UserShell } from "@/components/UserShell";
import { Panel, SectionTitle } from "@/components/status";
import { communities } from "@/lib/data";

export const Route = createFileRoute("/communities/")({
  head: () => ({
    meta: [
      { title: "Commun-In — purpose-built student communities" },
      {
        name: "description",
        content:
          "Find teams, attend approved events and take part in verified collaborations. Communities built around opportunities, not a newsfeed.",
      },
      { property: "og:title", content: "Commun-In — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Find teams, join approved events, take part in verified collaborations.",
      },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  return (
    <UserShell
      title="Commun-In"
      subtitle="Communities exist to help you participate: find a team, prepare together, attend approved events and join verified collaborations."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {communities.map((c) => (
          <article key={c.id} className="float-card rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.focus}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                {c.members.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{c.leader}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.activity}</p>
            <div className="mt-4 flex gap-2">
              <Link
                to="/communities/$communityId"
                params={{ communityId: c.id }}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Open
              </Link>
              <button
                type="button"
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Join
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Becoming a community leader</SectionTitle>
          <p className="text-sm text-muted-foreground">
            Leadership is earned through verified participation, meaningful contribution and a clean
            policy record — never through membership payment or application count alone.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ Profile complete and verified</li>
            <li>✓ Verified participation in at least three opportunities</li>
            <li>✓ Sustained, useful community contribution</li>
            <li>✓ No policy violations</li>
          </ul>
        </Panel>
        <Panel>
          <SectionTitle>Sloth Membership</SectionTitle>
          <p className="text-sm text-muted-foreground">
            Membership unlocks tools: event hosting utilities, collaboration capabilities, extra
            profile surface and enhanced visibility.
          </p>
          <p className="mt-4 rounded-xl bg-muted/70 px-4 py-3 text-sm">
            Payment does not create leadership. Reputation and leadership come from verified
            contribution and community trust.
          </p>
        </Panel>
      </section>
    </UserShell>
  );
}

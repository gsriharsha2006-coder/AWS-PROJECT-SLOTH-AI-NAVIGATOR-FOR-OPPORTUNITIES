import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EmptyState, Panel, StatusChip } from "@/components/status";
import { communities, opportunities } from "@/lib/data";

export const Route = createFileRoute("/communities/$communityId")({
  loader: ({ params }) => {
    const community = communities.find((c) => c.id === params.communityId);
    if (!community) throw notFound();
    return { community };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Community unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { community } = loaderData;
    return {
      meta: [
        { title: `${community.name} — Commun-In` },
        { name: "description", content: community.about },
        { property: "og:title", content: `${community.name} — Commun-In` },
        { property: "og:description", content: community.about },
      ],
    };
  },
  component: CommunityDetail,
});

const tabs = ["Overview", "Events", "Opportunities", "Members", "Collaborations", "About"] as const;

function CommunityDetail() {
  const { community } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const opps = opportunities.filter((o) => community.opportunities.includes(o.id));

  return (
    <UserShell title={community.name} subtitle={community.focus}>
      <Link to="/communities" className="mb-5 inline-flex text-xs font-medium text-muted-foreground">
        ← All communities
      </Link>

      <Panel className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm">{community.leader}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {community.members.toLocaleString("en-IN")} members · {community.activity}
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Join community
          </button>
        </div>
      </Panel>

      <div className="rail mb-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
              tab === t ? "bg-ink text-background" : "border border-border bg-card"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <p className="text-sm font-semibold">Next events</p>
            <ul className="mt-3 space-y-3">
              {community.events.map((e) => (
                <li key={e.name} className="rounded-xl bg-card px-3 py-2.5">
                  <p className="text-sm font-medium">{e.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {e.when} · {e.mode}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Why this community helps</p>
            <p className="mt-2 text-sm text-muted-foreground">{community.about}</p>
          </Panel>
        </div>
      ) : null}

      {tab === "Events" ? (
        <div className="grid gap-3">
          {community.events.map((e) => (
            <div key={e.name} className="float-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5">
              <div>
                <p className="text-sm font-semibold">{e.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {e.when} · {e.mode} · Approved event
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Attend
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Opportunities" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {opps.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      ) : null}

      {tab === "Members" ? (
        <Panel>
          <p className="text-sm font-semibold">Members</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {["Ananya R.", "Vikram S.", "Imran H.", "Divya S.", "Rohit K.", "Sneha P."].map((m) => (
              <li key={m} className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
                  {m.slice(0, 1)}
                </span>
                <span className="text-sm">{m}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      {tab === "Collaborations" ? (
        community.collaborations.length === 0 ? (
          <EmptyState
            title="No collaboration requests yet"
            body="Verified organisations can request beta testing, research participation, workshops or ambassadors. Requests appear here once your leader approves them."
          />
        ) : (
          <div className="grid gap-3">
            {community.collaborations.map((c) => (
              <div key={c.org} className="float-card rounded-2xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{c.org}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.ask}</p>
                  </div>
                  <StatusChip
                    label={c.status}
                    token={c.status.includes("verification") ? "soon" : "trust"}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    disabled={c.status.includes("verification")}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Opt in
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Read scope
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Participation is opt-in. Outcomes are verified before reputation is awarded.
                </p>
              </div>
            ))}
          </div>
        )
      ) : null}

      {tab === "About" ? (
        <Panel>
          <p className="text-sm text-muted-foreground">{community.about}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Moderation state: Safe · Leader verified · Community reviewed monthly
          </p>
        </Panel>
      ) : null}
    </UserShell>
  );
}

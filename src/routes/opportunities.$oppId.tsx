import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import {
  DeadlinePill,
  EligibilityPill,
  MatchBadge,
  Panel,
  SectionTitle,
  StatusChip,
  TrustPill,
} from "@/components/status";
import { communities, opportunities } from "@/lib/data";

export const Route = createFileRoute("/opportunities/$oppId")({
  loader: ({ params }) => {
    const opp = opportunities.find((o) => o.id === params.oppId);
    if (!opp) throw notFound();
    return { opp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Opportunity unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { opp } = loaderData;
    const desc = `${opp.org} · ${opp.benefit} · ${opp.mode}, ${opp.location}. Eligibility and deadline detail on Opportunity Navigator.`;
    return {
      meta: [
        { title: `${opp.title} — ${opp.org}` },
        { name: "description", content: desc },
        { property: "og:title", content: `${opp.title} — ${opp.org}` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: OpportunityDetail,
});

function OpportunityDetail() {
  const { opp } = Route.useLoaderData();
  const [saved, setSaved] = useState(false);
  const [reminder, setReminder] = useState(false);
  const community = communities.find((c) => c.id === opp.community);
  const related = opportunities.filter((o) => o.id !== opp.id && o.category === opp.category).slice(0, 2);
  const closed = opp.status === "closed";

  return (
    <UserShell title={opp.title} subtitle={`${opp.org} · ${opp.category}`}>
      <Link to="/opportunities" className="mb-5 inline-flex text-xs font-medium text-muted-foreground">
        ← Back to opportunities
      </Link>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-5">
          <Panel>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent font-display text-base font-bold text-accent-foreground">
                  {opp.org.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{opp.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{opp.org}</p>
                </div>
              </div>
              <MatchBadge value={opp.match} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <DeadlinePill opp={opp} />
              <EligibilityPill value={opp.eligibility} />
              <TrustPill official={opp.official} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{opp.overview}</p>
          </Panel>

          <section className="float-card rounded-2xl p-5">
            <SectionTitle>Why this matches you</SectionTitle>
            <ul className="space-y-2 text-sm">
              {opp.why.map((w) => (
                <li key={w} className="flex gap-2">
                  <span aria-hidden className="text-trust">
                    ✓
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            {opp.verifyNotes.length > 0 ? (
              <div className="mt-5 rounded-xl border border-soon/40 bg-soon/8 p-4">
                <p className="text-sm font-semibold">Needs verification</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {opp.verifyNotes.map((v) => (
                    <li key={v} className="flex gap-2">
                      <span aria-hidden className="text-soon">
                        !
                      </span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Eligibility is an assessment, not a guarantee. Confirm on the official source before
                  applying.
                </p>
              </div>
            ) : null}
          </section>

          <div className="grid gap-5 sm:grid-cols-2">
            <section className="float-card rounded-2xl p-5">
              <h3 className="text-base font-semibold">Required documents</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {opp.documents.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            </section>
            <section className="float-card rounded-2xl p-5">
              <h3 className="text-base font-semibold">Application process</h3>
              <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {opp.process.map((p, i) => (
                  <li key={p}>
                    {i + 1}. {p}
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {related.length > 0 ? (
            <section>
              <SectionTitle>Related opportunities</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <OpportunityCard key={r.id} opp={r} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="grid content-start gap-5 lg:sticky lg:top-8">
          <Panel>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Deadline</p>
            <p className="mt-1 text-sm font-semibold">{opp.deadline}</p>
            <div className="mt-4 grid gap-2">
              <a
                href="#"
                aria-disabled={closed}
                className="rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Apply on official site
              </a>
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {saved ? "Saved to your list" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setReminder((r) => !r)}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {reminder ? "Reminder set for 1 day before" : "Set reminder"}
              </button>
              <button
                type="button"
                className="rounded-xl px-4 py-2 text-xs font-medium text-muted-foreground hover:text-ink"
              >
                Share · Report a problem
              </button>
            </div>
            {saved || reminder ? (
              <p className="mt-3 rounded-xl bg-trust/10 px-3 py-2 text-xs text-trust">
                {saved ? "Added to Saved. " : ""}
                {reminder ? "We'll remind you a day before the deadline." : ""}
              </p>
            ) : null}
          </Panel>

          <Panel>
            <p className="text-sm font-semibold">Trust and freshness</p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Source</dt>
                <dd>{opp.official ? "Official organisation page" : "Submitted by poster"}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Verification</dt>
                <dd>
                  <StatusChip
                    label={opp.official ? "Approved" : "In review"}
                    token={opp.official ? "trust" : "soon"}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Last verified</dt>
                <dd>{opp.lastVerified}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Listing state</dt>
                <dd className="capitalize">{opp.status.replace("-", " ")}</dd>
              </div>
            </dl>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold">Benefit</p>
            <p className="mt-1 text-sm">{opp.benefit}</p>
            <p className="mt-4 text-sm font-semibold">Where</p>
            <p className="mt-1 text-sm">
              {opp.mode} · {opp.location}
            </p>
          </Panel>

          {community ? (
            <Panel>
              <p className="text-sm font-semibold">Related community</p>
              <p className="mt-1 text-sm text-muted-foreground">{community.name}</p>
              <Link
                to="/communities/$communityId"
                params={{ communityId: community.id }}
                className="mt-3 inline-flex text-xs font-medium text-primary"
              >
                Open community →
              </Link>
            </Panel>
          ) : null}
        </aside>
      </div>
    </UserShell>
  );
}

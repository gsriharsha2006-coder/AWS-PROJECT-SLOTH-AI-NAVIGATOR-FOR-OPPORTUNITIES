import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { DeadlinePill, EmptyState, Panel } from "@/components/status";
import { applications, opportunities, type ApplicationState } from "@/lib/data";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "My Applications — every one has a next step" },
      {
        name: "description",
        content:
          "Track saved, started, submitted, shortlisted and accepted applications, each with a clear next action and deadline.",
      },
      { property: "og:title", content: "My Applications — Opportunity Navigator" },
      { property: "og:description", content: "Every application shows its next step." },
    ],
  }),
  component: Applications,
});

const stateTokens: Record<ApplicationState, string> = {
  Saved: "text-muted-foreground",
  "Planning to apply": "text-upcoming",
  Started: "text-soon",
  Submitted: "text-primary",
  "Under review": "text-primary",
  Shortlisted: "text-trust",
  Interview: "text-trust",
  Accepted: "text-trust",
  Rejected: "text-muted-foreground",
};

const groups: ApplicationState[][] = [
  ["Saved", "Planning to apply"],
  ["Started", "Submitted", "Under review"],
  ["Shortlisted", "Interview", "Accepted"],
];
const groupTitles = ["Not started yet", "In progress", "Progressed"];

function Applications() {
  const [filter, setFilter] = useState<string>("All");
  const visible =
    filter === "All" ? applications : applications.filter((a) => a.state === filter);

  return (
    <UserShell
      title="My Applications"
      subtitle="5 tracked applications. Two need action this week."
      actions={
        <label className="text-sm">
          <span className="sr-only">Filter by state</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm"
          >
            {["All", ...new Set(applications.map((a) => a.state))].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      }
    >
      {visible.length === 0 ? (
        <EmptyState
          title="Nothing in this state yet"
          body="When an application reaches this stage it will appear here with its next step."
          action={
            <Link
              to="/opportunities"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Explore opportunities
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5">
          {groups.map((g, gi) => {
            const items = visible.filter((a) => g.includes(a.state));
            if (items.length === 0) return null;
            return (
              <section key={groupTitles[gi]}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {groupTitles[gi]} · {items.length}
                </h2>
                <div className="grid gap-3">
                  {items.map((a) => {
                    const o = opportunities.find((x) => x.id === a.oppId)!;
                    return (
                      <article key={a.id} className="float-card rounded-2xl p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className={`text-xs font-semibold ${stateTokens[a.state]}`}>{a.state}</p>
                            <h3 className="mt-1 text-base font-semibold">{o.title}</h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">{o.org}</p>
                          </div>
                          <DeadlinePill opp={o} />
                        </div>
                        <div className="mt-4 rounded-xl bg-muted/70 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Next step
                          </p>
                          <p className="mt-1 text-sm">{a.nextAction}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground">{a.lastActivity}</p>
                          <div className="flex gap-2">
                            <Link
                              to="/opportunities/$oppId"
                              params={{ oppId: o.id }}
                              className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium hover:bg-muted"
                            >
                              Open opportunity
                            </Link>
                            <button
                              type="button"
                              className="rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                            >
                              Update status
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Panel className="mt-8">
        <p className="text-sm font-semibold">Application states used here</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Saved · Planning to apply · Started · Submitted · Under review · Shortlisted · Interview ·
          Accepted · Rejected · Withdrawn · Closed. States you set yourself are separated from states
          set by the organisation.
        </p>
      </Panel>
    </UserShell>
  );
}

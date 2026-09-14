import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PosterShell } from "@/components/PosterShell";
import { EmptyState, Panel, StatusChip } from "@/components/status";
import { posterApplications } from "@/lib/data";

export const Route = createFileRoute("/poster/applications")({
  head: () => ({
    meta: [
      { title: "Applications — participation management" },
      {
        name: "description",
        content:
          "Review, filter and move applications through review, shortlist and acceptance for each opportunity you publish.",
      },
      { property: "og:title", content: "Applications — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Move participants through review, shortlist and acceptance.",
      },
    ],
  }),
  component: PosterApplications,
});

const stages = ["All", "New", "Under review", "Shortlisted", "Accepted", "Rejected"] as const;

const stats = [
  { label: "Total", value: 510 },
  { label: "New", value: 34 },
  { label: "Under review", value: 128 },
  { label: "Shortlisted", value: 42 },
  { label: "Accepted", value: 11 },
  { label: "Rejected", value: 96 },
];

function PosterApplications() {
  const [stage, setStage] = useState<(typeof stages)[number]>("All");
  const [query, setQuery] = useState("");

  const list = posterApplications.filter(
    (a) =>
      (stage === "All" || a.stage === stage) &&
      (query.trim() === "" ||
        `${a.name} ${a.opp}`.toLowerCase().includes(query.trim().toLowerCase())),
  );

  return (
    <PosterShell
      title="Applications"
      subtitle="Participation across your live listings, with match quality alongside each applicant."
      actions={
        <button
          type="button"
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Export
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <Panel key={s.label}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1.5 font-display text-2xl font-bold">{s.value}</p>
          </Panel>
        ))}
      </div>

      <Panel className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
            <span aria-hidden>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search applicant or opportunity"
              aria-label="Search applications"
              className="w-full bg-transparent outline-none"
            />
          </label>
          <div className="rail flex gap-2 overflow-x-auto">
            {stages.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={stage === s}
                onClick={() => setStage(s)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  stage === s ? "bg-primary text-primary-foreground" : "border border-border bg-card"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              title="No applications in this stage"
              body="Applications appear here as students submit. Move them through review, shortlist and acceptance."
            />
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {list.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-xs font-bold text-accent-foreground">
                    {a.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.opp} · {a.when}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-muted px-2 py-1 text-xs font-semibold">
                    {a.match}% match
                  </span>
                  <StatusChip
                    label={a.stage}
                    token={
                      a.stage === "Accepted" || a.stage === "Shortlisted"
                        ? "trust"
                        : a.stage === "New"
                          ? "upcoming"
                          : a.stage === "Rejected"
                            ? "calm"
                            : "soon"
                    }
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted"
                  >
                    Open
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </PosterShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PosterShell } from "@/components/PosterShell";
import { Panel, StatusChip } from "@/components/status";
import { posterListings } from "@/lib/data";

export const Route = createFileRoute("/poster/opportunities")({
  head: () => ({
    meta: [
      { title: "My Opportunities — manage listings and verification" },
      {
        name: "description",
        content:
          "Every listing with its status, publish date, deadline, applications, views, match quality and verification state.",
      },
      { property: "og:title", content: "My Opportunities — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Manage listings, verification states and schedules in one table.",
      },
    ],
  }),
  component: PosterOpportunities,
});

const token = (s: string) =>
  s === "Closing soon"
    ? "urgent"
    : s === "Live"
      ? "trust"
      : s === "Scheduled"
        ? "upcoming"
        : s === "Needs verification" || s === "Under review"
          ? "soon"
          : "calm";

function PosterOpportunities() {
  const [compact, setCompact] = useState(true);

  return (
    <PosterShell
      title="My Opportunities"
      subtitle="Five listings across drafts, review, scheduled and live."
      actions={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCompact((c) => !c)}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
          >
            {compact ? "Expanded view" : "Compact view"}
          </button>
          <Link
            to="/poster/new"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Post opportunity
          </Link>
        </div>
      }
    >
      <Panel className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 font-medium">Opportunity</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Publish</th>
              <th className="pb-3 font-medium">Deadline</th>
              <th className="pb-3 font-medium">Applications</th>
              <th className="pb-3 font-medium">Views</th>
              {!compact ? <th className="pb-3 font-medium">Match quality</th> : null}
              <th className="pb-3 font-medium">Verification</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posterListings.map((l) => (
              <tr key={l.id}>
                <td className="py-3.5 pr-4 font-medium">{l.title}</td>
                <td className="py-3.5 pr-4">
                  <StatusChip label={l.status} token={token(l.status) as "trust"} />
                </td>
                <td className="py-3.5 pr-4 text-muted-foreground">{l.publish}</td>
                <td className="py-3.5 pr-4 text-muted-foreground">{l.deadline}</td>
                <td className="py-3.5 pr-4">{l.applications}</td>
                <td className="py-3.5 pr-4">{l.views.toLocaleString("en-IN")}</td>
                {!compact ? (
                  <td className="py-3.5 pr-4 text-muted-foreground">{l.matchQuality}</td>
                ) : null}
                <td className="py-3.5 pr-4">
                  <StatusChip
                    label={l.verification}
                    token={
                      l.verification === "Approved"
                        ? "trust"
                        : l.verification === "In review"
                          ? "soon"
                          : "calm"
                    }
                  />
                </td>
                <td className="py-3.5">
                  <div className="flex flex-wrap gap-1.5">
                    {["Edit", "Schedule", "Analytics"].map((a) => (
                      <button
                        key={a}
                        type="button"
                        className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs hover:bg-muted"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel className="mt-5">
        <p className="text-sm font-semibold">Listing lifecycle</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Draft → Needs verification → Under review → Approved → Scheduled → Live → Closing soon →
          Closed. Rejected and suspended listings are never shown to students as open.
        </p>
      </Panel>
    </PosterShell>
  );
}

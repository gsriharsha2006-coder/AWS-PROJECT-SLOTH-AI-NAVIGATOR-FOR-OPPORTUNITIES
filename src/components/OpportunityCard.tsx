import { Link } from "@tanstack/react-router";
import type { Opportunity } from "@/lib/data";
import { urgencyOf } from "@/lib/data";
import { DeadlinePill, EligibilityPill, MatchBadge, TrustPill } from "./status";

const ring: Record<string, string> = {
  urgent: "ring-1 ring-urgent/45 shadow-[0_0_0_4px_oklch(0.58_0.21_25_/_8%)]",
  soon: "ring-1 ring-soon/40",
  watch: "ring-1 ring-watch/45",
  upcoming: "ring-1 ring-upcoming/35",
  calm: "",
};

export function OpportunityCard({ opp, saved = false }: { opp: Opportunity; saved?: boolean }) {
  const u = urgencyOf(opp);
  return (
    <article className={`float-card rounded-2xl p-5 ${ring[u]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {opp.category}
          </p>
          <h3 className="mt-1 truncate text-base font-semibold">{opp.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{opp.org}</p>
        </div>
        <MatchBadge value={opp.match} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <DeadlinePill opp={opp} />
        <EligibilityPill value={opp.eligibility} />
        <TrustPill official={opp.official} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Benefit</dt>
          <dd className="font-medium">{opp.benefit}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Where</dt>
          <dd className="font-medium">
            {opp.mode} · {opp.location}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">Last verified {opp.lastVerified}</p>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to="/opportunities/$oppId"
          params={{ oppId: opp.id }}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}

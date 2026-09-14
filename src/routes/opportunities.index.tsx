import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EmptyState, Panel } from "@/components/status";
import { CATEGORIES, opportunities, urgencyOf } from "@/lib/data";

export const Route = createFileRoute("/opportunities/")({
  head: () => ({
    meta: [
      { title: "Opportunities — filtered discovery for Indian students" },
      {
        name: "description",
        content:
          "Search and filter scholarships, internships, hackathons, fellowships, research and government programmes with eligibility and deadline context.",
      },
      { property: "og:title", content: "Opportunities — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Filter by eligibility, deadline, benefit and verification — not endless scrolling.",
      },
    ],
  }),
  component: Opportunities,
});

const sorts = ["Best match", "Deadline soon", "Newly added", "Highest benefit"] as const;
const quickFilters = ["For You", "Closing soon", "Upcoming", "Verified only", "Government"] as const;

function Opportunities() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [quick, setQuick] = useState<string>("For You");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Best match");

  const results = useMemo(() => {
    let list = opportunities.filter((o) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [o.title, o.org, o.category, o.location, o.benefit].join(" ").toLowerCase().includes(q);
      const matchesCategory = !category || o.category === category;
      const matchesQuick =
        quick === "For You"
          ? o.match >= 65
          : quick === "Closing soon"
            ? o.daysLeft !== null && o.daysLeft <= 10
            : quick === "Upcoming"
              ? o.status === "upcoming"
              : quick === "Verified only"
                ? o.official
                : o.category === "Government";
      return matchesQuery && matchesCategory && matchesQuick;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Deadline soon") return (a.daysLeft ?? 999) - (b.daysLeft ?? 999);
      if (sort === "Highest benefit") return b.match - a.match;
      if (sort === "Newly added") return a.title.localeCompare(b.title);
      return b.match - a.match;
    });
    return list;
  }, [query, category, quick, sort]);

  return (
    <UserShell
      title="Opportunities"
      subtitle="Filter to what you can actually act on. Every card states why it matches, why now and what next."
    >
      <Panel className="mb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
            <span aria-hidden>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              placeholder="Title, organisation, skill or location"
              aria-label="Search opportunities"
            />
          </label>
          <label className="text-sm">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={quick === f}
              onClick={() => setQuick(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                quick === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="rail mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
              category === null ? "bg-ink text-background" : "border border-border bg-card"
            }`}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
                category === c ? "bg-ink text-background" : "border border-border bg-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Panel>

      <p className="mb-4 text-sm text-muted-foreground">
        {results.length} opportunities worth your time ·{" "}
        {results.filter((o) => urgencyOf(o) === "urgent" || urgencyOf(o) === "soon").length} closing
        within four days
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No opportunities match these filters"
          body="Widen the category or switch the quick filter to All to see more of what is currently open."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(null);
                setQuick("For You");
              }}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Reset filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      )}
    </UserShell>
  );
}

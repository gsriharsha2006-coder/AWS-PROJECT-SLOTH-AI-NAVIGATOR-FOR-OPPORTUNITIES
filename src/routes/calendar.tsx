import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { DeadlinePill, Panel, SectionTitle, StatusChip } from "@/components/status";
import { applications, opportunities, urgencyOf } from "@/lib/data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Slot Calendar — deadline intelligence" },
      {
        name: "description",
        content:
          "See what is open now, closing today, closing this week and opening next — with your own saved and applied deadlines alongside.",
      },
      { property: "og:title", content: "Slot Calendar — Opportunity Navigator" },
      {
        property: "og:description",
        content: "What is ending soon, what is ongoing and what opens next.",
      },
    ],
  }),
  component: Calendar,
});

const views = ["Month", "Timeline", "List"] as const;
const filters = ["For You", "All", "Scholarships", "Internships", "Hackathons", "Research", "Government"] as const;

const monthCells = Array.from({ length: 35 }, (_, i) => i - 1);

function Calendar() {
  const [view, setView] = useState<(typeof views)[number]>("Month");
  const [filter, setFilter] = useState<(typeof filters)[number]>("For You");

  const list = opportunities.filter((o) =>
    filter === "All" || filter === "For You" ? true : o.category === filter,
  );

  const byDay = new Map<number, typeof opportunities>();
  list.forEach((o) => {
    const day = o.status === "upcoming" ? 12 : 14 + (o.daysLeft ?? 0);
    if (day > 0 && day <= 30) byDay.set(day, [...(byDay.get(day) ?? []), o]);
  });

  return (
    <UserShell
      title="Slot Calendar"
      subtitle="What is happening now, what ends soon, and what opens next — for the opportunities that fit you."
      actions={
        <div className="glass flex rounded-xl p-1">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                view === v ? "bg-card shadow-float text-ink" : "text-muted-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      }
    >
      <div className="rail mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border bg-card"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel>
          <SectionTitle>September 2026</SectionTitle>

          {view === "Month" ? (
            <div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {monthCells.map((day, idx) => {
                  const items = byDay.get(day) ?? [];
                  const isToday = day === 14;
                  return (
                    <div
                      key={idx}
                      className={`min-h-20 rounded-xl border p-1.5 text-left ${
                        day < 1 || day > 30
                          ? "border-transparent"
                          : isToday
                            ? "border-primary/50 bg-card"
                            : "border-border bg-card/70"
                      }`}
                    >
                      {day >= 1 && day <= 30 ? (
                        <>
                          <span className="text-[11px] font-semibold text-muted-foreground">{day}</span>
                          <div className="mt-1 space-y-1">
                            {items.slice(0, 2).map((o) => (
                              <Link
                                key={o.id}
                                to="/opportunities/$oppId"
                                params={{ oppId: o.id }}
                                className={`block truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                                  urgencyOf(o) === "urgent"
                                    ? "bg-urgent/12 text-urgent"
                                    : urgencyOf(o) === "soon"
                                      ? "bg-soon/12 text-soon"
                                      : urgencyOf(o) === "watch"
                                        ? "bg-watch/16 text-watch"
                                        : urgencyOf(o) === "upcoming"
                                          ? "bg-upcoming/12 text-upcoming"
                                          : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {o.title}
                              </Link>
                            ))}
                            {items.length > 2 ? (
                              <span className="px-1.5 text-[10px] text-muted-foreground">
                                +{items.length - 2} more
                              </span>
                            ) : null}
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : view === "Timeline" ? (
            <ol className="relative space-y-4 border-l border-border pl-5">
              {list.map((o) => (
                <li key={o.id}>
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-primary" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      to="/opportunities/$oppId"
                      params={{ oppId: o.id }}
                      className="text-sm font-semibold"
                    >
                      {o.title}
                    </Link>
                    <DeadlinePill opp={o} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {o.org} · {o.deadline}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="divide-y divide-border">
              {list.map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <Link
                      to="/opportunities/$oppId"
                      params={{ oppId: o.id }}
                      className="truncate text-sm font-semibold"
                    >
                      {o.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {o.category} · {o.org}
                    </p>
                  </div>
                  <DeadlinePill opp={o} />
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4 text-xs">
            <StatusChip label="Closing today or tomorrow" token="urgent" />
            <StatusChip label="2–4 days" token="soon" />
            <StatusChip label="5–10 days" token="watch" />
            <StatusChip label="Opens later" token="upcoming" />
            <StatusChip label="More than 10 days" token="calm" />
          </div>
        </Panel>

        <aside className="grid content-start gap-5">
          <Panel>
            <p className="text-sm font-semibold">My deadlines</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your own saved, planned and submitted items — shown separately from listing deadlines.
            </p>
            <ul className="mt-4 space-y-3">
              {applications.map((a) => {
                const o = opportunities.find((x) => x.id === a.oppId)!;
                return (
                  <li key={a.id} className="rounded-xl bg-card px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{o.title}</p>
                      <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                        {a.state}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{a.nextAction}</p>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Closing this week</p>
            <p className="mt-2 font-display text-3xl font-bold">3</p>
            <p className="mt-1 text-xs text-muted-foreground">
              One of them is a strong match you have already started.
            </p>
          </Panel>
        </aside>
      </div>
    </UserShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PosterShell } from "@/components/PosterShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { densityLevel, publishingDensity } from "@/lib/data";

export const Route = createFileRoute("/poster/calendar")({
  head: () => ({
    meta: [
      { title: "Publishing calendar — traffic and listing density" },
      {
        name: "description",
        content:
          "See listing density by date, spot congested publication days and pick a slot with lower competition for student attention.",
      },
      { property: "og:title", content: "Publishing calendar — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Listing density by date, so you can choose a less congested publication slot.",
      },
    ],
  }),
  component: PosterCalendar,
});

function PosterCalendar() {
  const [selected, setSelected] = useState(publishingDensity[0]!.date);
  const day = publishingDensity.find((d) => d.date === selected)!;
  const level = densityLevel(day.listings);
  const alternative = [...publishingDensity].sort((a, b) => a.listings - b.listings)[0]!;

  return (
    <PosterShell
      title="Slot Calendar"
      subtitle="This calendar answers one question: which date should this opportunity publish on?"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel>
          <SectionTitle>Listing density · September 2026</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {publishingDensity.map((d) => {
              const l = densityLevel(d.listings);
              const isSel = d.date === selected;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelected(d.date)}
                  aria-pressed={isSel}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    isSel ? "border-primary/60 bg-card shadow-float" : "border-border bg-card/70 hover:bg-card"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">{d.date}</p>
                    <p className="text-xs text-muted-foreground">{d.day}</p>
                  </div>
                  <p className="mt-2 text-2xl font-bold">{d.listings}</p>
                  <p className="text-[11px] text-muted-foreground">comparable listings</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${
                        l.token === "urgent" ? "bg-urgent" : l.token === "soon" ? "bg-soon" : "bg-trust"
                      }`}
                      style={{ width: `${Math.min(100, (d.listings / 18) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2">
                    <StatusChip label={l.label} token={l.token as "urgent"} />
                  </p>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
            <StatusChip label="High competition · 12+" token="urgent" />
            <StatusChip label="Medium · 6–11" token="soon" />
            <StatusChip label="Low · under 6" token="trust" />
          </div>
        </Panel>

        <aside className="grid content-start gap-5">
          <Panel>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Selected date</p>
            <p className="mt-1 text-lg font-semibold">{day.date}</p>
            <p className="mt-3">
              <StatusChip label={level.label} token={level.token as "urgent"} />
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {day.listings} similar listings publish that day across your categories.
            </p>
            {level.token !== "trust" ? (
              <div className="mt-4 rounded-xl border border-trust/40 bg-trust/8 px-4 py-3">
                <p className="text-sm font-semibold">Recommended: {alternative.date}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Only {alternative.listings} comparable listings — likely lower competition and
                  potentially higher visibility. You stay in control of the final date.
                </p>
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-trust/40 bg-trust/8 px-4 py-3 text-xs">
                This is already a low-traffic slot. Recommended for publication.
              </p>
            )}
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Schedule for {day.date}
            </button>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Why density matters</p>
            <p className="mt-2 text-xs text-muted-foreground">
              The goal is not to hide listings. Spreading publication improves discoverability, gives
              smaller organisations fair exposure and reduces deadline pile-ups for students.
            </p>
          </Panel>
        </aside>
      </div>
    </PosterShell>
  );
}

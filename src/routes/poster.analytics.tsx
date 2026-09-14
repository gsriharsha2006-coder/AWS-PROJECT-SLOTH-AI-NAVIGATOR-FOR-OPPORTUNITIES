import { createFileRoute } from "@tanstack/react-router";
import { PosterShell } from "@/components/PosterShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { densityLevel, publishingDensity } from "@/lib/data";

export const Route = createFileRoute("/poster/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — views, conversion and timing" },
      {
        name: "description",
        content:
          "Views, saves, applications, conversion, audience match and publication timing, each shown with an interpretation.",
      },
      { property: "og:title", content: "Analytics — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Metrics with interpretation, not a wall of charts.",
      },
    ],
  }),
  component: PosterAnalytics,
});

const metrics = [
  { label: "Views", value: "8,050", note: "Peak on publication day and two days before the deadline." },
  { label: "Saves", value: "1,204", note: "15% of viewers saved — strong early intent." },
  { label: "Applications", value: "510", note: "34 arrived in the last 24 hours." },
  { label: "Application conversion", value: "6.8%", note: "Strong interest, moderate completion." },
  { label: "Unique visitors", value: "6,110", note: "Mostly first-time visitors from search and home." },
  { label: "Audience match", value: "68% strong", note: "Eligibility rules are aligned with who applies." },
];

const funnel = [
  { label: "Views", value: 8050 },
  { label: "Detail opens", value: 3120 },
  { label: "Saves", value: 1204 },
  { label: "Started", value: 780 },
  { label: "Submitted", value: 510 },
];

const traffic = [
  { label: "Home matches", value: 41 },
  { label: "Opportunities search", value: 27 },
  { label: "Slot Calendar", value: 16 },
  { label: "Communities", value: 11 },
  { label: "Direct link", value: 5 },
];

function PosterAnalytics() {
  return (
    <PosterShell
      title="Analytics"
      subtitle="AI Innovation Challenge 2026 · published 1 Sep · closing 15 Sep"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((m) => (
          <Panel key={m.label}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{m.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{m.note}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel>
          <SectionTitle>Participation funnel</SectionTitle>
          <ul className="space-y-3">
            {funnel.map((f) => (
              <li key={f.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span>{f.label}</span>
                  <span className="font-semibold">{f.value.toLocaleString("en-IN")}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(f.value / funnel[0]!.value) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Biggest drop is between saves and started applications — the document list may be heavy.
          </p>
        </Panel>

        <Panel>
          <SectionTitle>Where applications came from</SectionTitle>
          <ul className="space-y-3">
            {traffic.map((t) => (
              <li key={t.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span>{t.label}</span>
                  <span className="font-semibold">{t.value}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-trust" style={{ width: `${t.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Most participation came from personalised matches, not from browsing.
          </p>
        </Panel>
      </div>

      <Panel className="mt-5">
        <SectionTitle>Category competition when you published</SectionTitle>
        <div className="rail flex items-end gap-2 overflow-x-auto pb-2">
          {publishingDensity.map((d) => {
            const l = densityLevel(d.listings);
            return (
              <div key={d.date} className="w-14 shrink-0 text-center">
                <div className="mx-auto flex h-28 items-end">
                  <div
                    className={`w-full rounded-lg ${
                      l.token === "urgent" ? "bg-urgent/70" : l.token === "soon" ? "bg-soon/70" : "bg-trust/70"
                    }`}
                    style={{ height: `${Math.max(10, (d.listings / 18) * 112)}px` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-semibold">{d.listings}</p>
                <p className="text-[10px] text-muted-foreground">{d.date.split(" ")[0]}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          <StatusChip label="High competition" token="urgent" />
          <StatusChip label="Medium" token="soon" />
          <StatusChip label="Low" token="trust" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          You published into a high-density day. A lower-density slot is likely to give the next edition
          more room.
        </p>
      </Panel>
    </PosterShell>
  );
}

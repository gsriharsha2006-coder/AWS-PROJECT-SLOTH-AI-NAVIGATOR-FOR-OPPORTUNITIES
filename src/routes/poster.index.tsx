import { createFileRoute, Link } from "@tanstack/react-router";
import { PosterShell } from "@/components/PosterShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { densityLevel, posterListings, publishingDensity } from "@/lib/data";

export const Route = createFileRoute("/poster/")({
  head: () => ({
    meta: [
      { title: "Poster dashboard — what to publish and when" },
      {
        name: "description",
        content:
          "Publishing load, listing performance and recommended publication dates for organisations posting student opportunities.",
      },
      { property: "og:title", content: "Poster dashboard — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Distribution intelligence for organisations posting opportunities.",
      },
    ],
  }),
  component: PosterDashboard,
});

const stats = [
  { label: "Live", value: "2", note: "1 closing within 24 hours" },
  { label: "Scheduled", value: "1", note: "Publishes 20 Sep, low competition" },
  { label: "Drafts", value: "1", note: "Missing eligibility details" },
  { label: "Applications", value: "510", note: "+34 in the last 24 hours" },
];

function PosterDashboard() {
  const today = publishingDensity[0]!;
  const level = densityLevel(today.listings);
  const best = [...publishingDensity].sort((a, b) => a.listings - b.listings)[0]!;

  return (
    <PosterShell
      title="Bharat Innovation Foundation"
      subtitle="Two listings live, one scheduled, 510 applications received. Today is congested — a later slot is likely to travel further."
      actions={
        <Link
          to="/poster/new"
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Post opportunity
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Panel key={s.label}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle
            action={
              <Link to="/poster/calendar" className="text-xs font-medium text-primary">
                Open publishing calendar
              </Link>
            }
          >
            Today's publishing load
          </SectionTitle>
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="font-display text-4xl font-bold">{today.listings}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                comparable listings publishing {today.date}
              </p>
            </div>
            <StatusChip label={level.label} token={level.token as "urgent"} />
          </div>
          <div className="mt-5 grid grid-cols-7 gap-1.5">
            {publishingDensity.slice(0, 7).map((d) => {
              const l = densityLevel(d.listings);
              return (
                <div key={d.date} className="rounded-xl bg-card px-2 py-2 text-center">
                  <p className="text-[10px] text-muted-foreground">{d.day}</p>
                  <div className="mx-auto mt-2 flex h-16 items-end">
                    <div
                      className={`w-6 rounded-md ${
                        l.token === "urgent" ? "bg-urgent/70" : l.token === "soon" ? "bg-soon/70" : "bg-trust/70"
                      }`}
                      style={{ height: `${Math.max(12, (d.listings / 18) * 64)}px` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-semibold">{d.listings}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl border border-trust/40 bg-trust/8 px-4 py-3">
            <p className="text-sm font-semibold">Suggested publication: {best.date}, 11:00 AM</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {best.listings} comparable listings that day — likely lower competition for student
              attention. This is a distribution estimate, not a guarantee of more applications.
            </p>
          </div>
        </Panel>

        <div className="grid content-start gap-5">
          <Panel>
            <p className="text-sm font-semibold">Needs your attention</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="rounded-xl bg-card px-3 py-2.5">
                <p className="font-medium">AI Innovation Challenge closes tomorrow</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  412 applications · decide on extension or close
                </p>
              </li>
              <li className="rounded-xl bg-card px-3 py-2.5">
                <p className="font-medium">Verification pending</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Embedded Systems Internship — source document requested
                </p>
              </li>
              <li className="rounded-xl bg-card px-3 py-2.5">
                <p className="font-medium">Draft incomplete</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Winter Research Assistantship — eligibility step unfinished
                </p>
              </li>
            </ul>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Performance snapshot</p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Views</dt>
                <dd className="font-semibold">8,050</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Saves</dt>
                <dd className="font-semibold">1,204</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Application conversion</dt>
                <dd className="font-semibold">6.8%</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Interpretation: strong interest, moderate completion.
            </p>
          </Panel>
        </div>
      </div>

      <section className="mt-8">
        <SectionTitle
          action={
            <Link to="/poster/opportunities" className="text-xs font-medium text-primary">
              Manage all
            </Link>
          }
        >
          Recent listings
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {posterListings.slice(0, 4).map((l) => (
            <div key={l.id} className="float-card rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{l.title}</p>
                <StatusChip
                  label={l.status}
                  token={
                    l.status === "Closing soon"
                      ? "urgent"
                      : l.status === "Live"
                        ? "trust"
                        : l.status === "Scheduled"
                          ? "upcoming"
                          : "calm"
                  }
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Publish {l.publish} · Deadline {l.deadline} · {l.applications} applications ·{" "}
                {l.views.toLocaleString("en-IN")} views
              </p>
            </div>
          ))}
        </div>
      </section>
    </PosterShell>
  );
}

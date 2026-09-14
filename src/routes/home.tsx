import { createFileRoute, Link } from "@tanstack/react-router";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { applications, communities, opportunities } from "@/lib/data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Your next actions — Opportunity Navigator" },
      {
        name: "description",
        content:
          "A personalised home that shows your strong matches, closing deadlines and the next action on every application.",
      },
      { property: "og:title", content: "Your next actions — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Strong matches, closing deadlines and the next action on every application.",
      },
    ],
  }),
  component: Home,
});

const quickActions = [
  { to: "/opportunities", label: "Explore opportunities" },
  { to: "/calendar", label: "Open my calendar" },
  { to: "/applications", label: "Track applications" },
  { to: "/communities", label: "Find communities" },
] as const;

function Home() {
  const strong = opportunities.filter((o) => o.match >= 85);
  const closing = opportunities.filter((o) => o.daysLeft !== null && o.daysLeft <= 8);
  const upcoming = opportunities.filter((o) => o.status === "upcoming");

  return (
    <UserShell
      title="Good afternoon, Harsha"
      subtitle="3 strong matches, 2 deadlines this week, and one application waiting on you."
      actions={
        <label className="glass hidden items-center gap-2 rounded-xl px-3 py-2 text-sm md:flex">
          <span aria-hidden>⌕</span>
          <input
            className="w-56 bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder="Search opportunities, orgs, skills"
            aria-label="Search opportunities"
          />
        </label>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle>What to do next</SectionTitle>
          <ul className="space-y-3">
            {applications.slice(0, 3).map((a) => {
              const opp = opportunities.find((o) => o.id === a.oppId)!;
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{opp.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.nextAction}</p>
                  </div>
                  <Link
                    to="/opportunities/$oppId"
                    params={{ oppId: opp.id }}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    Continue
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {quickActions.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium transition-colors hover:bg-muted"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel>
            <p className="text-sm font-semibold">Profile completeness</p>
            <p className="mt-3 font-display text-3xl font-bold">82%</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Next: add your skills to sharpen match quality.
            </p>
            <Link
              to="/profile"
              className="mt-4 inline-flex rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-muted"
            >
              Complete profile
            </Link>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">My deadlines</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">Smart India Hackathon</span>
                <StatusChip label="Tomorrow" token="urgent" />
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">IISc Summer Research</span>
                <StatusChip label="3 days" token="soon" />
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">IIT Bombay Internship</span>
                <StatusChip label="6 days" token="watch" />
              </li>
            </ul>
            <Link to="/calendar" className="mt-4 inline-flex text-xs font-medium text-primary">
              Open Slot Calendar →
            </Link>
          </Panel>
        </div>
      </div>

      <section className="mt-10">
        <SectionTitle
          action={
            <Link to="/opportunities" className="text-xs font-medium text-primary">
              See all
            </Link>
          }
        >
          {strong.length} strong matches
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {strong.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>Closing soon</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {closing.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle>Upcoming windows</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((o) => (
              <OpportunityCard key={o.id} opp={o} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Recommended communities</SectionTitle>
          <div className="grid gap-3">
            {communities.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                to="/communities/$communityId"
                params={{ communityId: c.id }}
                className="float-card rounded-2xl p-4"
              >
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.focus}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {c.members.toLocaleString("en-IN")} members
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </UserShell>
  );
}

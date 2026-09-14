import { createFileRoute } from "@tanstack/react-router";
import { UserShell } from "@/components/UserShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { slothLedger } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — the input that decides relevance" },
      {
        name: "description",
        content:
          "Education, discipline, skills, preferences, participation history and Sloth Points — the profile that powers opportunity relevance.",
      },
      { property: "og:title", content: "Your profile — Opportunity Navigator" },
      { property: "og:description", content: "One profile decides which opportunities reach you." },
    ],
  }),
  component: Profile,
});

const details = [
  ["Education", "B.Tech, Electronics & Communication"],
  ["Institution", "SRKR Engineering College, Bhimavaram"],
  ["Year", "3rd year"],
  ["Location", "Andhra Pradesh · open to pan-India"],
  ["Interests", "Applied AI, embedded systems, research"],
  ["Preferences", "Online and hybrid, stipend-bearing, research-led"],
];

const skills = ["Python", "Embedded C", "PCB design", "Signal processing", "PyTorch"];

function Profile() {
  const total = slothLedger.reduce((s, l) => s + l.points, 0);

  return (
    <UserShell
      title="Harsha Vardhan"
      subtitle="This profile decides which opportunities reach you and how eligibility is assessed."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-5">
          <Panel>
            <SectionTitle
              action={
                <button
                  type="button"
                  className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  Edit
                </button>
              }
            >
              Profile details
            </SectionTitle>
            <dl className="grid gap-3 sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="rounded-xl bg-card px-4 py-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm font-semibold">Skills</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs">
                  {s}
                </span>
              ))}
              <button
                type="button"
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
              >
                + Add skill
              </button>
            </div>
          </Panel>

          <Panel>
            <SectionTitle>Sloth Points ledger</SectionTitle>
            <p className="text-xs text-muted-foreground">
              Points come from verified activity only. Duplicate or unverified actions earn nothing.
            </p>
            <ul className="mt-4 divide-y divide-border">
              {slothLedger.map((l) => (
                <li key={l.reason} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{l.reason}</p>
                    <p className="text-xs text-muted-foreground">{l.when}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-trust">+{l.points}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <SectionTitle>Participation history</SectionTitle>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between gap-2">
                <span>National Student Hackathon 2025 — regional finalist</span>
                <StatusChip label="Verified" token="trust" />
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Semicon design workshop</span>
                <StatusChip label="Verified" token="trust" />
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Campus climate sprint</span>
                <StatusChip label="Awaiting organiser confirmation" token="soon" />
              </li>
            </ul>
          </Panel>
        </div>

        <aside className="grid content-start gap-5">
          <Panel>
            <div className="grid size-14 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground">
              HV
            </div>
            <p className="mt-4 text-sm font-semibold">Profile completion</p>
            <p className="mt-2 font-display text-3xl font-bold">82%</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Next: add your skills.</p>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Reputation</p>
            <p className="mt-2 font-display text-3xl font-bold">{total}</p>
            <p className="text-xs text-muted-foreground">Sloth Points · Level 3 contributor</p>
            <p className="mt-4 rounded-xl bg-muted/70 px-3 py-2.5 text-xs text-muted-foreground">
              Reputation is separate from membership. Membership unlocks tools; reputation reflects
              verified contribution.
            </p>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Communities</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>AI Builders</li>
              <li>ECE Researchers</li>
            </ul>
          </Panel>
        </aside>
      </div>
    </UserShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PosterShell } from "@/components/PosterShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";

export const Route = createFileRoute("/poster/organization")({
  head: () => ({
    meta: [
      { title: "Organization profile and verification" },
      {
        name: "description",
        content:
          "Organisation identity, verification state, moderation status and collaboration requests for posting organisations.",
      },
      { property: "og:title", content: "Organization profile — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Identity, verification and collaboration requests in one place.",
      },
    ],
  }),
  component: OrganizationProfile,
});

const details = [
  ["Legal name", "Bharat Innovation Foundation"],
  ["Type", "Non-profit innovation programme"],
  ["Headquarters", "Hyderabad, Telangana"],
  ["Contact", "programs@bharatinnovation.in"],
  ["Official website", "bharatinnovation.in"],
  ["Posting since", "March 2024"],
];

const collabs = [
  {
    community: "AI Builders",
    ask: "Beta testers for a vision SDK",
    status: "Leader approved · student opt-in open",
    token: "trust",
  },
  {
    community: "ECE Researchers",
    ask: "Workshop hosts across four states",
    status: "Under platform verification",
    token: "soon",
  },
  {
    community: "Startup Builders",
    ask: "Campus awareness drive",
    status: "Awaiting leader decision",
    token: "upcoming",
  },
];

function OrganizationProfile() {
  return (
    <PosterShell
      title="Organization profile"
      subtitle="Your identity and verification state decide how your listings appear to students."
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
              Identity
            </SectionTitle>
            <dl className="grid gap-3 sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="rounded-xl bg-card px-4 py-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel>
            <SectionTitle>Collaboration requests</SectionTitle>
            <p className="mb-4 text-xs text-muted-foreground">
              Requests reach students only after platform verification, leader approval and student
              opt-in.
            </p>
            <ul className="grid gap-3">
              {collabs.map((c) => (
                <li key={c.community} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{c.community}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.ask}</p>
                    </div>
                    <StatusChip label={c.status} token={c.token as "trust"} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <aside className="grid content-start gap-5">
          <Panel>
            <p className="text-sm font-semibold">Verification</p>
            <p className="mt-3">
              <StatusChip label="Organisation approved" token="trust" />
            </p>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li>Identity documents verified · Mar 2024</li>
              <li>Domain ownership confirmed</li>
              <li>Last review: 2 weeks ago</li>
            </ul>
            <p className="mt-4 rounded-xl bg-muted/70 px-3 py-2.5 text-xs text-muted-foreground">
              Individual listings are verified separately. Organisation approval does not mark a listing
              as verified.
            </p>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Moderation state</p>
            <p className="mt-3">
              <StatusChip label="Safe" token="trust" />
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              No open reports. Two listings were edited after review requests in the last year.
            </p>
          </Panel>
        </aside>
      </div>
    </PosterShell>
  );
}

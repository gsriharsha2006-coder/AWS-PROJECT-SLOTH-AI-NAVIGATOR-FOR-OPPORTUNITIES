import { createFileRoute, Link } from "@tanstack/react-router";
import { UserShell } from "@/components/UserShell";
import { EmptyState, Panel, SectionTitle, Skeleton, StatusChip } from "@/components/status";

export const Route = createFileRoute("/states")({
  head: () => ({
    meta: [
      { title: "Screen states — empty, loading, error and success" },
      {
        name: "description",
        content:
          "Every state a student or organisation can land in: nothing yet, still loading, something broke, deadline passed, and confirmed success.",
      },
      { property: "og:title", content: "Screen states reference" },
      {
        property: "og:description",
        content: "Empty, loading, error, expired and success states with the exact wording used.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatesPage,
});

const empties = [
  {
    title: "No opportunities match these filters",
    body: "Your filters are narrower than the current listings. Widening location or mode usually brings back the most results.",
    action: "Clear filters",
  },
  {
    title: "You haven't saved anything yet",
    body: "Saving keeps a listing in one place and adds its deadline to your Slot Calendar.",
    action: "Browse opportunities",
  },
  {
    title: "No applications in progress",
    body: "When you start an application, its next action and stage will appear here.",
    action: "Find something to apply to",
  },
  {
    title: "This community has no events scheduled",
    body: "Leaders schedule events ahead of deadlines. You'll be notified when the next one is announced.",
    action: "See community opportunities",
  },
];

function StatesPage() {
  return (
    <UserShell
      title="Screen states"
      subtitle="What the product says when there is nothing to show, something is still loading, something failed, or something succeeded. Plain words, one clear next step."
    >
      <section aria-labelledby="empty">
        <SectionTitle id="empty">Empty states</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {empties.map((e) => (
            <div key={e.title} className="float-card rounded-2xl p-2">
              <EmptyState title={e.title} body={e.body} action={e.action} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="loading">
        <SectionTitle id="loading">Loading</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          <Panel>
            <p className="mb-3 text-xs text-muted-foreground">
              Matches loading — layout is held so nothing jumps
            </p>
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-border/70 p-4">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-1/3" />
                  <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <p className="mb-3 text-xs text-muted-foreground">Slow response — we say so at 5 seconds</p>
            <div className="rounded-xl bg-muted/70 px-4 py-6 text-center">
              <p className="text-sm font-medium">Still checking the source pages</p>
              <p className="mt-1 text-xs text-muted-foreground">
                This is taking longer than usual. Results appear as soon as verification data comes
                back — nothing shown will be unverified.
              </p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Freshness matters more than speed: a listing is never shown as open if we can't confirm
              it.
            </p>
          </Panel>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="error">
        <SectionTitle id="error">Errors and edge cases</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          <Panel>
            <StatusChip label="Connection lost" token="urgent" />
            <h3 className="mt-3 text-base font-semibold">We couldn't load your matches</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your saved items and drafts are safe. This is a connection problem on our side, not
              something you did.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Try again
              </button>
              <Link
                to="/saved"
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Open saved items
              </Link>
            </div>
          </Panel>

          <Panel>
            <StatusChip label="Deadline passed" token="urgent" />
            <h3 className="mt-3 text-base font-semibold">This closed 2 days ago</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Applications are no longer accepted. This programme usually reopens in March — we can
              remind you when the next window is confirmed.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Remind me when it reopens
              </button>
              <Link
                to="/opportunities"
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                See similar open ones
              </Link>
            </div>
          </Panel>

          <Panel>
            <StatusChip label="Needs verification" token="soon" />
            <h3 className="mt-3 text-base font-semibold">Details are being re-checked</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The deadline on the notice differs from the portal. We show both and mark the listing
              unverified rather than pick one for you.
            </p>
            <p className="mt-3 rounded-xl bg-muted/70 px-3.5 py-2.5 text-xs text-muted-foreground">
              Last checked 6 hours ago · source page updated since
            </p>
          </Panel>

          <Panel>
            <StatusChip label="Duplicate detected" token="soon" />
            <h3 className="mt-3 text-base font-semibold">This looks like a listing you've seen</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Two organisations posted the same programme. We keep the official source and link the
              other rather than hiding it silently.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Original: AICTE · Duplicate submitted by a partner college
            </p>
          </Panel>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="success">
        <SectionTitle id="success">Success</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              t: "Application submitted",
              b: "Smart India Hackathon received your submission. You'll be notified when the stage changes.",
              a: "Track this application",
            },
            {
              t: "Participation verified",
              b: "Your attendance was confirmed by the host. +120 Sloth Points added.",
              a: "See your points",
            },
            {
              t: "Listing published",
              b: "Your opportunity is live and matching students in 14 disciplines.",
              a: "Open listing analytics",
            },
          ].map((s) => (
            <Panel key={s.t}>
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-2xl bg-trust/15 text-lg text-trust"
              >
                ✓
              </span>
              <h3 className="mt-3 text-base font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
              <button
                type="button"
                className="mt-4 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                {s.a}
              </button>
            </Panel>
          ))}
        </div>
      </section>
    </UserShell>
  );
}

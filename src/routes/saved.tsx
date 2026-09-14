import { createFileRoute, Link } from "@tanstack/react-router";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EmptyState } from "@/components/status";
import { opportunities, savedIds } from "@/lib/data";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved opportunities — Opportunity Navigator" },
      {
        name: "description",
        content: "The opportunities you kept for later, with live deadline and verification state.",
      },
      { property: "og:title", content: "Saved opportunities" },
      {
        property: "og:description",
        content: "Your shortlist, kept fresh with deadline and verification updates.",
      },
    ],
  }),
  component: Saved,
});

function Saved() {
  const saved = opportunities.filter((o) => savedIds.includes(o.id));
  return (
    <UserShell
      title="Saved"
      subtitle="Your shortlist stays current — deadlines and verification states update here too."
    >
      {saved.length === 0 ? (
        <EmptyState
          title="No saved opportunities yet."
          body="Save anything you want to decide on later. We will keep the deadline and verification state up to date."
          action={
            <Link
              to="/opportunities"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Explore opportunities
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saved.map((o) => (
            <OpportunityCard key={o.id} opp={o} saved />
          ))}
        </div>
      )}
    </UserShell>
  );
}

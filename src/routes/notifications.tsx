import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { EmptyState, Panel } from "@/components/status";
import { notifications } from "@/lib/data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — deadlines, applications, communities" },
      {
        name: "description",
        content:
          "One place for deadline changes, application status updates, community activity and verification updates.",
      },
      { property: "og:title", content: "Notifications — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Deadline, application, opportunity and community updates in one place.",
      },
    ],
  }),
  component: Notifications,
});

const categories = ["All", "Deadline", "Application", "Opportunity", "Community"] as const;

function Notifications() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [read, setRead] = useState(false);
  const list = notifications.filter((n) => cat === "All" || n.category === cat);

  return (
    <UserShell
      title="Notifications"
      subtitle="Only what changes your decisions: deadlines, statuses, verification and community activity."
      actions={
        <button
          type="button"
          onClick={() => setRead(true)}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Mark all read
        </button>
      }
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-card"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          body="Updates about deadlines, application statuses and community activity will appear in this category."
        />
      ) : (
        <div className="grid gap-3">
          {list.map((n) => {
            const unread = n.unread && !read;
            return (
              <Panel key={n.id} className={unread ? "ring-1 ring-primary/30" : ""}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {n.category}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{n.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">{n.when}</p>
                    {unread ? (
                      <span className="mt-2 inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                        New
                      </span>
                    ) : null}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </UserShell>
  );
}

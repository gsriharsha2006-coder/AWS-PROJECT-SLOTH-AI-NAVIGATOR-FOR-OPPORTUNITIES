import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  head: () => ({
    meta: [
      { title: "Create your account — Opportunity Navigator India" },
      {
        name: "description",
        content:
          "Choose how you join: as a student or professional looking for opportunities, or as an organisation posting them.",
      },
      { property: "og:title", content: "Create your account — Opportunity Navigator" },
      {
        property: "og:description",
        content: "Two ways in: find opportunities, or post them as a verified organisation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoleSelection,
});

const roles = [
  {
    to: "/signup/student" as const,
    tag: "For students, learners and young professionals",
    title: "I'm looking for opportunities",
    body: "Get matches explained in plain words, eligibility clarity and deadlines you can trust.",
    points: [
      "Personalised discovery from one profile",
      "Eligibility reasons, gaps and open questions",
      "Slot Calendar and deadline reminders",
      "Commun-In communities for teams and preparation",
    ],
    cta: "Set up my profile",
  },
  {
    to: "/signup/poster" as const,
    tag: "For institutions, companies and government bodies",
    title: "I'm posting opportunities",
    body: "Reach the right applicants after a verification review, not a paid boost.",
    points: [
      "Organisation verification before listings go live",
      "Match quality signals instead of raw view counts",
      "Publishing density guidance to avoid crowded dates",
      "Application pipeline with clear stages",
    ],
    cta: "Start verification",
  },
];

function RoleSelection() {
  return (
    <div className="aurora min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <Link to="/" className="font-display text-sm font-bold">
          Opportunity Navigator
        </Link>
        <Link to="/home" className="text-sm text-muted-foreground hover:text-ink">
          Browse without an account →
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        <div className="glass mb-8 rounded-2xl px-5 py-4 text-xs text-muted-foreground">
          Step 1 of 3 · Choose your role · You can add the other role later from settings
        </div>

        <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          How will you use the Navigator?
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Each role has its own workspace, its own verification rules and its own privacy defaults.
          Nothing you enter here is shared with the other side without your action.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <article key={r.title} className="float-card flex flex-col rounded-2xl p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {r.tag}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{r.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden className="text-trust">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to={r.to}
                className="mt-6 inline-flex justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {r.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/home" className="font-medium text-primary">
            Go to your workspace
          </Link>
        </p>
      </main>
    </div>
  );
}

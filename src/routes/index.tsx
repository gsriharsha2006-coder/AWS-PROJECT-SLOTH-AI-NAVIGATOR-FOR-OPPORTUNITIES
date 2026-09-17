import { createFileRoute, Link } from "@tanstack/react-router";
import { opportunities } from "@/lib/data";
import { OpportunityCard } from "@/components/OpportunityCard";
import { BrandMark } from "@/components/BrandMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Opportunity Navigator for India — Know which opportunities matter" },
      {
        name: "description",
        content:
          "A trusted opportunity navigation layer for students, learners, founders and young professionals in India. Personalised discovery, eligibility clarity and deadline intelligence.",
      },
      { property: "og:title", content: "AI Opportunity Navigator for India" },
      {
        property: "og:description",
        content:
          "Don't search through thousands of opportunities. Know which ones matter to you.",
      },
    ],
  }),
  component: Landing,
});

const differentiators = [
  {
    title: "Personalised discovery",
    body: "One profile decides what surfaces. Three strong matches beat 327 listings.",
  },
  {
    title: "Eligibility intelligence",
    body: "Every listing states why you match, what is missing and what still needs checking.",
  },
  {
    title: "Deadline intelligence",
    body: "Urgency shown in days and words, never colour alone. Closed listings never pose as open.",
  },
  {
    title: "Trusted sources",
    body: "Official source, last verified date and review state on every opportunity.",
  },
  {
    title: "Commun-In",
    body: "Purpose-built communities for teams, events and preparation — not a newsfeed.",
  },
  {
    title: "Collaboration",
    body: "Verified organisations reach students through leaders and opt-in, never spam.",
  },
];

function Landing() {
  return (
    <div className="aurora min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <BrandMark context="Opportunity Navigator · India" />
        <nav className="flex items-center gap-2 text-sm">
          <Link
            to="/home"
            className="hidden rounded-xl px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-ink sm:block"
          >
            Explore
          </Link>
          <Link
            to="/auth/signup"
            search={{ role: "poster" as const }}
            className="rounded-xl border border-border bg-card px-4 py-2 font-medium transition-colors hover:bg-muted"
          >
            Post an Opportunity
          </Link>
          <Link
            to="/auth/login"
            className="hidden rounded-xl px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-ink sm:block"
          >
            Log in
          </Link>
          <Link
            to="/auth/role"
            className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Create account
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 pt-10 text-center sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Opportunity navigation layer · India
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.08] sm:text-6xl">
          Don't search through thousands of opportunities. Know which ones matter to you.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A trusted opportunity navigation layer for students, learners, founders and young
          professionals in India.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/auth/role"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started — it's free
          </Link>
          <Link
            to="/home"
            className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Explore Opportunities
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Three minutes to set up · Organisations verify before their listings go live
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <h2 className="text-2xl font-bold">Built for better decisions, not more listings</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <div key={d.title} className="glass rounded-2xl p-5">
              <h3 className="text-base font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-20 max-w-6xl px-5 pb-14 text-sm text-muted-foreground">
        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
          <p>Prototype interface with sample data. Verification states are illustrative.</p>
          <div className="flex gap-4">
            <Link to="/home" className="hover:text-ink">
              Student workspace
            </Link>
            <Link to="/poster" className="hover:text-ink">
              Poster workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

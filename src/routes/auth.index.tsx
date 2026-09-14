import { createFileRoute, Link } from "@tanstack/react-router";

import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/auth/")({
  head: () => ({
    meta: [
      { title: "Sign in or join — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Sign in or create an account to discover Indian internships, fellowships, scholarships and hackathons that actually match you.",
      },
      { property: "og:title", content: "Sign in or join — AI Opportunity Navigator" },
      {
        property: "og:description",
        content: "Know which opportunities matter to you, and what to do next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthLanding,
});

function AuthLanding() {
  return (
    <AuthShell eyebrow="Welcome">
      <h1 className="font-display text-2xl font-bold tracking-tight">Welcome</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        One account for opportunity discovery and opportunity publishing. Choose how you want to
        continue.
      </p>

      <div className="mt-6 space-y-3">
        <Link
          to="/auth/role"
          className="block rounded-2xl bg-primary px-5 py-4 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <span className="text-sm font-semibold">Create an account</span>
          <span className="mt-0.5 block text-xs text-primary-foreground/80">
            Takes a few minutes. Free to start.
          </span>
        </Link>
        <Link
          to="/auth/login"
          className="block rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:bg-muted"
        >
          <span className="text-sm font-semibold">Log in</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            Continue where you left off.
          </span>
        </Link>
        <Link
          to="/auth/poster-login"
          className="block rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:bg-muted"
        >
          <span className="text-sm font-semibold">Log in as a poster</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            Manage listings, schedule and applications.
          </span>
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-5 text-[11px] text-muted-foreground">
        <span>🔒 Secure account</span>
        <span>Verified sources only</span>
        <Link to="/opportunities" className="underline underline-offset-2 hover:text-ink">
          Browse without an account
        </Link>
      </div>
    </AuthShell>
  );
}

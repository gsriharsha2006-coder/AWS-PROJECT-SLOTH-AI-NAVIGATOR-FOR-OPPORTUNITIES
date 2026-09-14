import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { to: "/poster", label: "Dashboard", icon: "◉", exact: true },
  { to: "/poster/new", label: "Post Opportunity", icon: "＋" },
  { to: "/poster/calendar", label: "Slot Calendar", icon: "▦" },
  { to: "/poster/opportunities", label: "My Opportunities", icon: "▤" },
  { to: "/poster/applications", label: "Applications", icon: "▣" },
  { to: "/poster/analytics", label: "Analytics", icon: "◫" },
  { to: "/poster/organization", label: "Organization Profile", icon: "◑" },
] as const;

const soon = ["Campaigns", "Community Collaborations", "Startup Partnerships"];

export function PosterShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="aurora min-h-screen">
      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-1 border-r border-border/70 px-4 py-6 lg:flex">
          <BrandMark context="Poster workspace" className="mb-6 px-2" />
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: "exact" in n ? n.exact : false }}
              activeProps={{ className: "bg-card shadow-float text-ink" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-card/60" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <span aria-hidden className="text-base leading-none">
                {n.icon}
              </span>
              {n.label}
            </Link>
          ))}
          <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Coming soon
          </p>
          {soon.map((s) => (
            <span
              key={s}
              aria-disabled="true"
              className="cursor-not-allowed rounded-xl px-3 py-2 text-sm text-muted-foreground/60"
            >
              {s}
            </span>
          ))}
          <Link
            to="/home"
            className="mt-auto rounded-xl px-3 py-2.5 text-xs text-muted-foreground hover:bg-card/60"
          >
            ← Switch to student workspace
          </Link>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-28 pt-5 sm:px-6 lg:pb-12 lg:pt-8">
          <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold sm:text-[28px]">{title}</h1>
              {subtitle ? (
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">{actions}</div>
          </header>
          {children}
        </main>
      </div>

      <nav className="glass fixed inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-2xl px-2 py-2 lg:hidden">
        {nav.slice(0, 5).map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: "exact" in n ? n.exact : false }}
            activeProps={{ className: "text-ink bg-card" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium"
          >
            <span aria-hidden className="text-base leading-none">
              {n.icon}
            </span>
            <span className="truncate">{n.label.replace("My ", "").replace(" Opportunity", "")}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

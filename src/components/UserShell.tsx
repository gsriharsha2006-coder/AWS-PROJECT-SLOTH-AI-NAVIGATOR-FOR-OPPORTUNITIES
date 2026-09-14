import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/home", label: "Home", icon: "◉" },
  { to: "/opportunities", label: "Opportunities", icon: "◇" },
  { to: "/calendar", label: "Slot Calendar", icon: "▤" },
  { to: "/communities", label: "Commun-In", icon: "◍" },
  { to: "/applications", label: "My Applications", icon: "▣" },
  { to: "/saved", label: "Saved", icon: "♢" },
  { to: "/membership", label: "Sloth Membership", icon: "◈" },
  { to: "/profile", label: "Profile", icon: "◑" },
] as const;


export function UserShell({
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
          <Link to="/" className="mb-6 block px-2">
            <p className="font-display text-sm font-bold tracking-tight">Opportunity Navigator</p>
            <p className="text-xs text-muted-foreground">India · Student workspace</p>
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "bg-card shadow-float text-ink" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-card/60" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <span aria-hidden className="text-base leading-none">
                {n.icon}
              </span>
              {n.label}
              {n.label === "My Applications" ? (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  2
                </span>
              ) : null}
            </Link>
          ))}
          <Link
            to="/navigator"
            className="glass mt-4 rounded-2xl px-3 py-3 text-sm"
            activeProps={{ className: "ring-1 ring-primary/40" }}
          >
            <p className="font-semibold">AI Opportunity Navigator</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Ask what to apply to next</p>
          </Link>
          <Link
            to="/poster"
            className="mt-auto rounded-xl px-3 py-2.5 text-xs text-muted-foreground hover:bg-card/60"
          >
            Switch to poster workspace →
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
            <div className="flex items-center gap-2">
              {actions}
              <Link
                to="/notifications"
                aria-label="Notifications, 2 unread"
                className="glass relative grid size-10 place-items-center rounded-xl text-sm"
              >
                <span aria-hidden>◔</span>
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-urgent ring-2 ring-background" />
              </Link>
              <Link
                to="/profile"
                className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground"
                aria-label="Your profile"
              >
                HV
              </Link>
            </div>
          </header>
          {children}
        </main>
      </div>

      <nav className="glass fixed inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-2xl px-2 py-2 lg:hidden">
        {nav.slice(0, 5).map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeProps={{ className: "text-ink bg-card" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium"
          >
            <span aria-hidden className="text-base leading-none">
              {n.icon}
            </span>
            <span className="truncate">{n.label.replace("My ", "")}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

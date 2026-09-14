import type { Eligibility, Opportunity } from "@/lib/data";
import { deadlineLabel, urgencyOf } from "@/lib/data";

const tokenText: Record<string, string> = {
  urgent: "text-urgent",
  soon: "text-soon",
  watch: "text-watch",
  upcoming: "text-upcoming",
  calm: "text-calm",
  trust: "text-trust",
};

const tokenDot: Record<string, string> = {
  urgent: "bg-urgent",
  soon: "bg-soon",
  watch: "bg-watch",
  upcoming: "bg-upcoming",
  calm: "bg-calm",
  trust: "bg-trust",
};

export function Pill({
  token = "calm",
  children,
  icon,
}: {
  token?: keyof typeof tokenText;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/70 px-2.5 py-1 text-xs font-medium ${tokenText[token]}`}
    >
      {icon ?? <span className={`size-1.5 rounded-full ${tokenDot[token]}`} aria-hidden />}
      {children}
    </span>
  );
}

export function DeadlinePill({ opp }: { opp: Opportunity }) {
  const u = urgencyOf(opp);
  return <Pill token={u}>{deadlineLabel(opp)}</Pill>;
}

const eligibilityCopy: Record<Eligibility, { label: string; token: keyof typeof tokenText; mark: string }> = {
  likely: { label: "Likely eligible", token: "trust", mark: "✓" },
  potential: { label: "Potentially eligible", token: "watch", mark: "~" },
  verify: { label: "Needs verification", token: "soon", mark: "!" },
  not: { label: "Not eligible", token: "urgent", mark: "×" },
};

export function EligibilityPill({ value }: { value: Eligibility }) {
  const e = eligibilityCopy[value];
  return (
    <Pill token={e.token} icon={<span aria-hidden className="text-[11px] font-bold">{e.mark}</span>}>
      {e.label}
    </Pill>
  );
}

export function TrustPill({ official }: { official: boolean }) {
  return official ? (
    <Pill token="trust" icon={<span aria-hidden>🛡</span>}>
      Official source
    </Pill>
  ) : (
    <Pill token="soon" icon={<span aria-hidden>◌</span>}>
      Verification in review
    </Pill>
  );
}

export function MatchBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-baseline gap-1 rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
      {value}%<span className="font-medium opacity-80">match</span>
    </span>
  );
}

export function StatusChip({ label, token = "calm" }: { label: string; token?: keyof typeof tokenText }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${tokenText[token]}`}>
      <span className={`size-1.5 rounded-full ${tokenDot[token]}`} aria-hidden />
      {label}
    </span>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-lg font-semibold">{children}</h2>
      {action}
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-2xl p-5 ${className}`}>{children}</div>;
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="glass-muted rounded-2xl px-6 py-12 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

export const baseInput =
  "w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus-visible:ring-2";

export function TextField({
  label,
  hint,
  error,
  success,
  ...props
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  success?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${baseInput} mt-2 ${
          error
            ? "border-urgent/60 ring-urgent/25 focus-visible:ring-urgent/40"
            : success
              ? "border-trust/60 focus-visible:ring-trust/40"
              : "border-border focus-visible:ring-primary/45"
        } ${props.disabled ? "opacity-60" : ""}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex gap-1.5 text-xs font-medium text-urgent">
          <span aria-hidden>!</span>
          {error}
        </p>
      ) : success ? (
        <p className="mt-1.5 flex gap-1.5 text-xs font-medium text-trust">
          <span aria-hidden>✓</span>
          {success}
        </p>
      ) : null}
    </div>
  );
}

export const passwordRules = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "Number", test: (v: string) => /\d/.test(v) },
];

export function passwordScore(v: string) {
  return passwordRules.filter((r) => r.test(v)).length;
}

export function PasswordField({
  label,
  value,
  onChange,
  error,
  showRules = false,
  autoComplete = "current-password",
  placeholder = "Enter your password",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  showRules?: boolean | undefined;
  autoComplete?: string | undefined;
  placeholder?: string | undefined;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const score = passwordScore(value);
  const strength = ["Too weak", "Weak", "Fair", "Good", "Strong"][score] ?? "Too weak";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-xs font-medium text-muted-foreground hover:text-ink"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className={`${baseInput} mt-2 ${
          error
            ? "border-urgent/60 focus-visible:ring-urgent/40"
            : "border-border focus-visible:ring-primary/45"
        }`}
      />
      {showRules ? (
        <div className="mt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-1.5 flex-1 gap-1" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-full flex-1 rounded-full ${
                    i < score ? (score >= 4 ? "bg-trust" : score >= 2 ? "bg-soon" : "bg-urgent") : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">{strength}</span>
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
            {passwordRules.map((r) => {
              const ok = r.test(value);
              return (
                <li key={r.label} className={ok ? "text-trust" : "text-muted-foreground"}>
                  {ok ? "✓" : "○"} {r.label}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {error ? (
        <p className="mt-1.5 flex gap-1.5 text-xs font-medium text-urgent">
          <span aria-hidden>!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormAlert({
  tone = "error",
  title,
  children,
  action,
}: {
  tone?: "error" | "info" | "success" | undefined;
  title: string;
  children?: ReactNode | undefined;
  action?: ReactNode | undefined;
}) {
  const styles =
    tone === "error"
      ? "border-urgent/40 bg-urgent/8"
      : tone === "success"
        ? "border-trust/40 bg-trust/8"
        : "border-soon/40 bg-soon/8";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 ${styles}`}>
      <p className="text-sm font-semibold">{title}</p>
      {children ? <div className="mt-1 text-xs text-muted-foreground">{children}</div> : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

export function PrimaryButton({
  children,
  loading,
  ...props
}: { loading?: boolean | undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${props.className ?? ""}`}
    >
      {loading ? (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}

export function GoogleButton({
  onClick,
  label = "Continue with Google",
  disabled,
}: {
  onClick: () => void;
  label?: string | undefined;
  disabled?: boolean | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
    >
      <svg aria-hidden viewBox="0 0 18 18" className="size-4">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.88 2.68-6.62Z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H1v2.34A9 9 0 0 0 9 18Z"
        />
        <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H1a9 9 0 0 0 0 8.12l2.97-2.34Z" />
        <path
          fill="#EA4335"
          d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 1 4.94l2.97 2.34C4.68 5.16 6.66 3.58 9 3.58Z"
        />
      </svg>
      {label}
    </button>
  );
}

export function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o)}
            className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
              on ? "bg-ink text-background" : "border border-border bg-card hover:bg-muted"
            }`}
          >
            {on ? "✓ " : ""}
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function StepProgress({ label, step, total }: { label: string; step: number; total: number }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label} — {step} of {total}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < step - 1 ? "bg-trust" : i === step - 1 ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormAlert, PrimaryButton, StepProgress } from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { destinationAfterLogin } from "@/lib/session";

type Role = "user" | "poster";

export const Route = createFileRoute("/auth/verify")({
  validateSearch: (search: Record<string, unknown>): { email: string; role: Role } => ({
    email: typeof search["email"] === "string" ? search["email"] : "",
    role: search["role"] === "poster" ? "poster" : "user",
  }),
  head: () => ({
    meta: [
      { title: "Verify your account — AI Opportunity Navigator" },
      {
        name: "description",
        content: "Enter the 6-digit code we emailed you to confirm your account and continue setup.",
      },
      { property: "og:title", content: "Verify your account" },
      { property: "og:description", content: "One code, and your account is confirmed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyPage,
});

const RESEND_SECONDS = 45;

function VerifyPage() {
  const { email, role } = Route.useSearch();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [state, setState] = useState<
    "idle" | "checking" | "wrong" | "expired" | "locked" | "verified"
  >("idle");
  const [attempts, setAttempts] = useState(0);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const code = digits.join("");

  function setDigit(i: number, v: string) {
    const clean = v.replace(/\D/g, "");
    if (!clean) {
      setDigits((d) => d.map((x, j) => (j === i ? "" : x)));
      return;
    }
    setDigits((d) => {
      const next = [...d];
      clean.split("").forEach((ch, k) => {
        if (i + k < 6) next[i + k] = ch;
      });
      return next;
    });
    const jump = Math.min(i + clean.length, 5);
    inputs.current[jump]?.focus();
  }

  async function verify() {
    if (code.length < 6) return;
    setState("checking");
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (error) {
      const lower = error.message.toLowerCase();
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 5) setState("locked");
      else if (lower.includes("expired")) setState("expired");
      else setState("wrong");
      setDigits(Array(6).fill(""));
      inputs.current[0]?.focus();
      return;
    }
    setState("verified");
    const to = await destinationAfterLogin();
    setTimeout(() => navigate({ to }), 900);
  }

  async function resend() {
    setResent(false);
    await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: window.location.origin + "/auth/callback" },
    });
    setResent(true);
    setSeconds(RESEND_SECONDS);
    setState("idle");
  }

  const boxTone =
    state === "verified"
      ? "border-trust bg-trust/8"
      : state === "wrong" || state === "expired" || state === "locked"
        ? "border-urgent/60"
        : "border-border";

  return (
    <AuthShell eyebrow="Step 3 of 3" variant={role === "poster" ? "poster" : "user"}>
      <StepProgress label="Account setup" step={3} total={3} />
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Verify your account</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We sent a verification code to <span className="font-semibold text-ink">{email || "your email"}</span>. The
        email also has a link you can tap instead.
      </p>

      <div className="mt-6 flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={d}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
            }}
            disabled={state === "verified" || state === "locked"}
            className={`h-14 w-full max-w-12 rounded-xl border bg-card text-center font-display text-xl font-semibold outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary/45 disabled:opacity-70 ${boxTone}`}
          />
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {state === "wrong" ? (
          <FormAlert title="That code doesn't match.">
            Check the latest email — older codes stop working. {5 - attempts} attempts left.
          </FormAlert>
        ) : null}
        {state === "expired" ? (
          <FormAlert title="That code has expired.">
            Codes last a few minutes for security. Send a new one below.
          </FormAlert>
        ) : null}
        {state === "locked" ? (
          <FormAlert tone="info" title="Too many attempts.">
            We've paused verification on this account for a few minutes. Request a fresh code after
            that, or contact support if you're stuck.
          </FormAlert>
        ) : null}
        {state === "verified" ? (
          <FormAlert tone="success" title="Account verified.">
            Taking you to your setup…
          </FormAlert>
        ) : null}
        {resent ? (
          <FormAlert tone="success" title="New code sent.">
            It can take a minute to arrive. Check spam if you don't see it.
          </FormAlert>
        ) : null}

        <PrimaryButton
          onClick={verify}
          loading={state === "checking"}
          disabled={code.length < 6 || state === "verified" || state === "locked"}
        >
          Verify
        </PrimaryButton>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={resend}
            disabled={seconds > 0}
            className="font-medium underline underline-offset-2 disabled:text-muted-foreground disabled:no-underline"
          >
            {seconds > 0 ? `Resend code in ${seconds}s` : "Resend code"}
          </button>
          <Link
            to="/auth/signup"
            search={{ role }}
            className="text-muted-foreground underline underline-offset-2 hover:text-ink"
          >
            Change email or number
          </Link>
        </div>
      </div>

      <p className="mt-6 border-t border-border/70 pt-5 text-[11px] leading-relaxed text-muted-foreground">
        🔒 We verify accounts to keep listings, communities and applications trustworthy for
        everyone.
      </p>
    </AuthShell>
  );
}

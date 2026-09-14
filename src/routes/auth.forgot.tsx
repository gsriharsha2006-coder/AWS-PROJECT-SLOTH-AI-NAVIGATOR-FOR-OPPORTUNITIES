import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormAlert, PrimaryButton, TextField } from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { describeAuthError, emailPattern } from "@/lib/auth-errors";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "Forgot your password? — AI Opportunity Navigator" },
      {
        name: "description",
        content: "Send yourself a reset link and get back into your account in a minute.",
      },
      { property: "og:title", content: "Forgot your password?" },
      { property: "og:description", content: "We'll email you instructions to reset it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState<string>();

  async function send() {
    if (!emailPattern.test(email.trim())) {
      setError("Enter the email address on your account.");
      return;
    }
    setError(undefined);
    setProblem(undefined);
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + "/reset-password",
    });
    setLoading(false);
    if (err) {
      setProblem(describeAuthError(err).title);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthShell eyebrow="Password reset">
        <h1 className="font-display text-2xl font-bold tracking-tight">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We sent instructions to reset your password to{" "}
          <span className="font-semibold text-ink">{email.trim()}</span>.
        </p>
        <div className="mt-6 space-y-3">
          <PrimaryButton onClick={send} loading={loading}>
            Resend
          </PrimaryButton>
          <Link
            to="/auth/login"
            className="block rounded-xl border border-border bg-card px-5 py-3 text-center text-sm font-medium transition-colors hover:bg-muted"
          >
            Back to Login
          </Link>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Nothing yet? Check spam, and make sure you used the same address you signed up with.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="Password reset">
      <h1 className="font-display text-2xl font-bold tracking-tight">Forgot your password?</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter the email on your account and we'll send a reset link.
      </p>
      {problem ? (
        <div className="mt-5">
          <FormAlert title={problem} />
        </div>
      ) : null}
      <div className="mt-5 space-y-4">
        <TextField
          label="Email / Mobile"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          hint="Reset links are sent by email, even if you signed up with a mobile number."
        />
        <PrimaryButton onClick={send} loading={loading}>
          Send Reset Link
        </PrimaryButton>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="font-semibold text-ink underline underline-offset-2">
          Back to Login
        </Link>
      </p>
    </AuthShell>
  );
}

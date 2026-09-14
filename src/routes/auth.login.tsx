import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import {
  FormAlert,
  GoogleButton,
  PasswordField,
  PrimaryButton,
  TextField,
} from "@/components/auth/fields";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { describeAuthError, emailPattern, phonePattern, type AuthProblem } from "@/lib/auth-errors";
import { destinationAfterLogin } from "@/lib/session";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Log in — AI Opportunity Navigator" },
      {
        name: "description",
        content: "Log in to keep discovering opportunities that match your profile and deadlines.",
      },
      { property: "og:title", content: "Log in — AI Opportunity Navigator" },
      {
        property: "og:description",
        content: "Continue discovering opportunities that matter to you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; password?: string }>({});
  const [problem, setProblem] = useState<AuthProblem | null>(null);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors: typeof fieldErrors = {};
    const value = identifier.trim();
    if (!value) errors.identifier = "Enter the email or mobile number on your account.";
    else if (!emailPattern.test(value) && !phonePattern.test(value))
      errors.identifier = "That doesn't look like an email address or a 10-digit mobile number.";
    if (!password) errors.password = "Enter your password.";
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    if (!emailPattern.test(value)) {
      setProblem({
        kind: "generic",
        title: "Mobile sign-in isn't available yet.",
        detail: "Use the email address on your account. Your mobile number stays on your profile.",
      });
      return;
    }

    setProblem(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: value, password });
    if (error) {
      setLoading(false);
      setProblem(describeAuthError(error));
      return;
    }
    const to = await destinationAfterLogin();
    setLoading(false);
    navigate({ to });
  }

  async function resendVerification() {
    await supabase.auth.resend({
      type: "signup",
      email: identifier.trim(),
      options: { emailRedirectTo: window.location.origin + "/auth/login" },
    });
    setResent(true);
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth/callback",
    });
    if (result.error) {
      setProblem(describeAuthError(result.error));
      return;
    }
    if (result.redirected) return;
    navigate({ to: await destinationAfterLogin() });
  }

  return (
    <AuthShell eyebrow="Log in">
      <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Continue discovering opportunities that matter to you.
      </p>

      {problem ? (
        <div className="mt-5">
          <FormAlert
            tone={problem.kind === "throttled" ? "info" : "error"}
            title={problem.title}
            action={
              problem.kind === "unverified" ? (
                resent ? (
                  <span className="text-xs font-medium text-trust">
                    ✓ Verification email sent again.
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={resendVerification}
                    className="text-xs font-semibold underline underline-offset-2"
                  >
                    Send verification again
                  </button>
                )
              ) : problem.kind === "suspended" ? (
                <a
                  href="mailto:support@opportunitynavigator.in"
                  className="text-xs font-semibold underline underline-offset-2"
                >
                  Contact support
                </a>
              ) : problem.kind === "network" ? (
                <button
                  type="button"
                  onClick={() => setProblem(null)}
                  className="text-xs font-semibold underline underline-offset-2"
                >
                  Try again
                </button>
              ) : null
            }
          >
            {problem.detail}
          </FormAlert>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <TextField
          label="Email / Phone"
          placeholder="Enter your email or mobile number"
          autoComplete="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={fieldErrors.identifier}
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
        />
        <div className="flex justify-end">
          <Link
            to="/auth/forgot"
            className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-ink"
          >
            Forgot password?
          </Link>
        </div>
        <PrimaryButton type="submit" loading={loading}>
          Log In
        </PrimaryButton>
      </form>

      <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton onClick={google} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/role" className="font-semibold text-ink underline underline-offset-2">
          Sign up
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Posting opportunities?{" "}
        <Link to="/auth/poster-login" className="underline underline-offset-2 hover:text-ink">
          Poster login
        </Link>
      </p>
    </AuthShell>
  );
}

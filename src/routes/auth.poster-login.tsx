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
import { describeAuthError, emailPattern, type AuthProblem } from "@/lib/auth-errors";
import { destinationAfterLogin } from "@/lib/session";

export const Route = createFileRoute("/auth/poster-login")({
  head: () => ({
    meta: [
      { title: "Poster login — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Log in to your organisation account to manage listings, publishing schedule, applications and performance.",
      },
      { property: "og:title", content: "Poster login — AI Opportunity Navigator" },
      {
        property: "og:description",
        content: "Manage your opportunities, publishing schedule, applications and performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosterLogin,
});

function PosterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [problem, setProblem] = useState<AuthProblem | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!emailPattern.test(email.trim()))
      next.email = "Use the organisation email address on your account.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setProblem(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      setLoading(false);
      setProblem(describeAuthError(error));
      return;
    }
    const to = await destinationAfterLogin();
    setLoading(false);
    navigate({ to });
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
    <AuthShell eyebrow="Poster login" variant="poster">
      <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back, Poster</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage your opportunities, publishing schedule, applications, and performance.
      </p>

      {problem ? (
        <div className="mt-5">
          <FormAlert tone={problem.kind === "throttled" ? "info" : "error"} title={problem.title}>
            {problem.detail}
          </FormAlert>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <TextField
          label="Organization email"
          placeholder="you@organisation.in"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          hint="Use your official domain email — it speeds up verification."
        />
        <PasswordField label="Password" value={password} onChange={setPassword} error={errors.password} />
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
        <Link
          to="/auth/signup"
          search={{ role: "poster" }}
          className="font-semibold text-ink underline underline-offset-2"
        >
          Create a poster account
        </Link>
      </p>
    </AuthShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormAlert, PasswordField, PrimaryButton, passwordScore } from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { describeAuthError } from "@/lib/auth-errors";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Create a new password — AI Opportunity Navigator" },
      { name: "description", content: "Set a new password for your account and log back in." },
      { property: "og:title", content: "Create a new password" },
      { property: "og:description", content: "Set a new password and log back in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [problem, setProblem] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (passwordScore(password) < 4) next.password = "Meet all four requirements below.";
    if (confirm !== password) next.confirm = "Both passwords must match exactly.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setProblem(undefined);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setProblem(describeAuthError(error).title);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <AuthShell eyebrow="Password reset">
        <div className="text-center">
          <span
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-full bg-trust/15 text-xl text-trust"
          >
            ✓
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
            Password updated successfully
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your new password the next time you sign in.
          </p>
        </div>
        <Link
          to="/auth/login"
          className="mt-6 block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Log In
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="Password reset">
      <h1 className="font-display text-2xl font-bold tracking-tight">Create a new password</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose something you haven't used on this account before.
      </p>
      {problem ? (
        <div className="mt-5">
          <FormAlert title={problem}>
            Reset links expire. Request a fresh one from the login page if needed.
          </FormAlert>
        </div>
      ) : null}
      <form onSubmit={submit} className="mt-5 space-y-4">
        <PasswordField
          label="New password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          showRules
          autoComplete="new-password"
          placeholder="Enter a new password"
        />
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
          placeholder="Re-enter the new password"
        />
        <PrimaryButton type="submit" loading={loading}>
          Reset Password
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

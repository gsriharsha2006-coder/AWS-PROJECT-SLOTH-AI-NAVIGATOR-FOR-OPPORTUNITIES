import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import {
  FormAlert,
  PasswordField,
  PrimaryButton,
  StepProgress,
  TextField,
  passwordScore,
} from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { describeAuthError, emailPattern, phonePattern, type AuthProblem } from "@/lib/auth-errors";

type Role = "user" | "poster";

export const Route = createFileRoute("/auth/signup")({
  validateSearch: (search: Record<string, unknown>): { role: Role } => ({
    role: search["role"] === "poster" ? "poster" : "user",
  }),
  head: () => ({
    meta: [
      { title: "Create your account — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Create a free account to get opportunity matches, eligibility explanations and deadline reminders built around your profile.",
      },
      { property: "og:title", content: "Create your account — AI Opportunity Navigator" },
      {
        property: "og:description",
        content: "Sign up, build your profile, get matches, act before the deadline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { role } = Route.useSearch();
  const navigate = useNavigate();
  const poster = role === "poster";

  const [form, setForm] = useState({
    fullName: "",
    orgName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [problem, setProblem] = useState<AuthProblem | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.fullName.trim())
      next.fullName = poster ? "Enter the contact person's name." : "Enter your full name.";
    if (poster && !form.orgName.trim()) next.orgName = "Enter your organisation's name.";
    if (!form.email.trim()) next.email = "Enter an email address.";
    else if (!emailPattern.test(form.email.trim()))
      next.email = "That doesn't look like a valid email address — check for typos.";
    if (!form.phone.trim()) next.phone = "Enter a mobile number so we can send deadline alerts.";
    else if (!phonePattern.test(form.phone.trim()))
      next.phone = "Enter a 10-digit Indian mobile number, optionally with +91.";
    if (passwordScore(form.password) < 4)
      next.password = "Your password needs to meet all four requirements below.";
    if (form.confirm !== form.password) next.confirm = "Both passwords must match exactly.";
    if (!agreed) next.agreed = "Please accept the Terms of Service and Privacy Policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setProblem(null);
    setLoading(true);
    const email = form.email.trim();
    const { error } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin + "/auth/callback",
        data: {
          full_name: form.fullName.trim(),
          phone: form.phone.trim(),
          role,
          organization_name: poster ? form.orgName.trim() : undefined,
        },
      },
    });
    setLoading(false);
    if (error) {
      setProblem(describeAuthError(error));
      return;
    }
    navigate({ to: "/auth/verify", search: { email, role } });
  }

  return (
    <AuthShell eyebrow="Step 2 of 3" variant={poster ? "poster" : "user"}>
      <StepProgress label="Account setup" step={2} total={3} />
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
        {poster ? "Create your organization account" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {poster
          ? "You'll verify your organisation next. Nothing publishes before that."
          : "Just the basics now. Your profile comes next, one short step at a time."}
      </p>

      {problem ? (
        <div className="mt-5">
          <FormAlert
            title={problem.title}
            action={
              problem.kind === "exists" ? (
                <Link
                  to={poster ? "/auth/poster-login" : "/auth/login"}
                  className="text-xs font-semibold underline underline-offset-2"
                >
                  Log in instead
                </Link>
              ) : null
            }
          >
            {problem.detail}
          </FormAlert>
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-5 space-y-4">
        <TextField
          label={poster ? "Contact name" : "Full name"}
          placeholder={poster ? "Who we should speak to" : "Your name as on documents"}
          value={form.fullName}
          onChange={(e) => set("fullName")(e.target.value)}
          error={errors.fullName}
        />
        {poster ? (
          <TextField
            label="Organization name"
            placeholder="Registered or commonly used name"
            value={form.orgName}
            onChange={(e) => set("orgName")(e.target.value)}
            error={errors.orgName}
          />
        ) : null}
        <TextField
          label={poster ? "Work email" : "Email"}
          type="email"
          autoComplete="email"
          placeholder={poster ? "you@organisation.in" : "you@example.com"}
          value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          error={errors.email}
          hint={poster ? "An official domain email is checked faster than a personal one." : undefined}
        />
        <TextField
          label="Mobile number"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
          error={errors.phone}
        />
        <PasswordField
          label="Password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          showRules
          autoComplete="new-password"
          placeholder="Create a password"
        />
        <PasswordField
          label="Confirm password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
          placeholder="Re-enter your password"
        />

        <div>
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 rounded border-border"
            />
            <span>
              I agree to the{" "}
              <Link to="/legal/terms" className="underline underline-offset-2 hover:text-ink">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/legal/privacy" className="underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agreed ? (
            <p className="mt-1.5 text-xs font-medium text-urgent">! {errors.agreed}</p>
          ) : null}
        </div>

        <PrimaryButton type="submit" loading={loading}>
          {poster ? "Create Poster Account" : "Create Account"}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to={poster ? "/auth/poster-login" : "/auth/login"}
          className="font-semibold text-ink underline underline-offset-2"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}

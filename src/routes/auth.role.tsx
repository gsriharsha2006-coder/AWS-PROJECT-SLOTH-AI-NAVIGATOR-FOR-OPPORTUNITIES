import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { PrimaryButton, StepProgress } from "@/components/auth/fields";

export const Route = createFileRoute("/auth/role")({
  head: () => ({
    meta: [
      { title: "Choose your account type — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Continue as a user looking for opportunities, or as a poster publishing internships, fellowships and programs.",
      },
      { property: "og:title", content: "Choose your account type" },
      {
        property: "og:description",
        content: "User accounts discover opportunities. Poster accounts publish them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoleSelection,
});

const roles = [
  {
    id: "user" as const,
    title: "User",
    line: "I'm looking for opportunities",
    who: ["Students", "Learners", "Young professionals", "Job seekers", "Founders", "Innovators"],
    cta: "Continue as User",
    accent: "from-primary/12",
  },
  {
    id: "poster" as const,
    title: "Poster",
    line: "I want to post opportunities",
    who: [
      "Startups & companies",
      "Colleges & universities",
      "Incubators",
      "NGOs & foundations",
      "Government bodies",
      "Research institutions",
    ],
    cta: "Continue as Poster",
    accent: "from-trust/12",
  },
];

function RoleSelection() {
  const [role, setRole] = useState<"user" | "poster" | null>(null);
  const navigate = useNavigate();

  return (
    <AuthShell eyebrow="Step 1 of 3">
      <StepProgress label="Account setup" step={1} total={3} />
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
        What are you here to do?
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This decides your whole workspace, so pick the one that fits today.
      </p>

      <div className="mt-6 space-y-3">
        {roles.map((r) => {
          const selected = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setRole(r.id)}
              className={`w-full rounded-2xl border bg-gradient-to-br to-transparent p-5 text-left transition-all ${r.accent} ${
                selected
                  ? "border-primary ring-2 ring-primary/35"
                  : "border-border hover:border-ink/25"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{r.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{r.line}</p>
                </div>
                <span
                  aria-hidden
                  className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border text-[11px] ${
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {selected ? "✓" : ""}
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                {r.who.join(" · ")}
              </p>
            </button>
          );
        })}
      </div>

      <PrimaryButton
        className="mt-6"
        disabled={!role}
        onClick={() => role && navigate({ to: "/auth/signup", search: { role } })}
      >
        {role ? (roles.find((r) => r.id === role)?.cta ?? "Continue") : "Select an account type"}
      </PrimaryButton>

      <p className="mt-4 text-xs text-muted-foreground">
        You can change your role later only where supported by account policy.
      </p>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-ink underline underline-offset-2">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}

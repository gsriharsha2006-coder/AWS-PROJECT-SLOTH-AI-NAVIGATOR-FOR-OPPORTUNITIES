import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import {
  FormAlert,
  PrimaryButton,
  StepProgress,
  TextField,
  baseInput,
} from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/poster-onboarding")({
  head: () => ({
    meta: [
      { title: "Organization setup — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Set up and verify your organisation so the opportunities you publish carry a trusted source.",
      },
      { property: "og:title", content: "Organization setup" },
      { property: "og:description", content: "Set up, verify, then publish with a trusted badge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosterOnboarding;
});

const ORG_TYPES = [
  "Startup",
  "Company",
  "College",
  "University",
  "Incubator",
  "NGO",
  "Government",
  "Research Institution",
  "Event Organizer",
  "Community",
  "Foundation",
  "Educational Organization",
  "Innovation Program",
];

const SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

const METHODS = [
  {
    id: "Organization email",
    detail: "We send a confirmation to your official domain email. Fastest route.",
  },
  { id: "Official website", detail: "We check that your website lists this organisation and contact." },
  { id: "Registration details", detail: "CIN, society, trust or AICTE/UGC registration number." },
  { id: "Supporting document", detail: "Letterhead, registration certificate or approval letter." },
  { id: "Authorized contact", detail: "A named person we can reach on an official line." },
];

const STAGES = ["Submitted", "Document check", "Contact confirmation", "Approved"];

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseInput} mt-2 border-border focus-visible:ring-primary/45`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function PosterOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState<string>();
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [form, setForm] = useState({
    name: "",
    org_type: "",
    website: "",
    org_email: "",
    phone: "",
    location: "",
    description: "",
    industry: "",
    org_size: "",
    founded_year: "",
    verification_method: "",
    registration_number: "",
    document: "",
    contact_name: "",
    policyAccepted: false,
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canContinue =
    step === 1
      ? Boolean(form.name.trim() && form.org_type && form.org_email.trim())
      : step === 2
        ? Boolean(form.location.trim() && form.description.trim().length > 20)
        : step === 3
          ? Boolean(form.verification_method && form.contact_name.trim() && form.policyAccepted)
          : true;

  async function submitForReview() {
    setProblem(undefined);
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setSaving(false);
      setProblem("Your session expired. Log in again to submit for verification.");
      return;
    }
    const now = new Date();
    const { error } = await supabase.from("organizations").insert({
      owner_id: auth.user.id,
      name: form.name.trim(),
      org_type: form.org_type,
      website: form.website.trim(),
      org_email: form.org_email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      industry: form.industry.trim(),
      org_size: form.org_size,
      founded_year: form.founded_year,
      contact_name: form.contact_name.trim(),
      verification_method: form.verification_method,
      registration_number: form.registration_number.trim(),
      verification_status: "under_review" as const,
      submitted_at: now.toISOString(),
    });
    if (!error) {
      await supabase
        .from("profiles")
        .update({ role: "poster" as const, onboarding_complete: true })
        .eq("id", auth.user.id);
    }
    setSaving(false);
    if (error) {
      setProblem("We couldn't submit your organisation just now. Try again in a moment.");
      return;
    }
    setSubmittedAt(now);
    setStep(4);
  }

  return (
    <AuthShell eyebrow={`Organization setup ${Math.min(step, 3)} of 3`} variant="poster">
      {step < 4 ? <StepProgress label="Organization setup" step={step} total={3} /> : null}

      {problem ? (
        <div className="mt-4">
          <FormAlert title={problem} />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-5 space-y-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">Your organization</h1>
          <TextField
            label="Organization name"
            placeholder="Registered or commonly used name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <Select
            label="Organization type"
            value={form.org_type}
            onChange={(v) => set("org_type", v)}
            options={ORG_TYPES}
            placeholder="Select a type"
          />
          <TextField
            label="Website"
            placeholder="https://"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            hint="A live page mentioning your organisation speeds up verification."
          />
          <TextField
            label="Organization email"
            type="email"
            placeholder="programs@organisation.in"
            value={form.org_email}
            onChange={(e) => set("org_email", e.target.value)}
          />
          <TextField
            label="Phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-5 space-y-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">Organization details</h1>
          <TextField
            label="Location"
            placeholder="City, State"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
          <div>
            <label className="text-sm font-medium">Description</label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              What you do and who you serve. This appears on your organisation profile.
            </p>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="We run a deep-tech incubator supporting student founders across Tamil Nadu…"
              className={`${baseInput} mt-2 border-border focus-visible:ring-primary/45`}
            />
          </div>
          <TextField
            label="Industry / focus"
            placeholder="e.g. Deep tech, education, climate"
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Organization size"
              value={form.org_size}
              onChange={(v) => set("org_size", v)}
              options={SIZES}
              placeholder="Select"
            />
            <TextField
              label="Founded year"
              placeholder="e.g. 2016"
              value={form.founded_year}
              onChange={(e) => set("founded_year", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Organization logo</label>
            <div className="mt-2 rounded-xl border border-dashed border-border bg-card px-4 py-4 text-xs text-muted-foreground">
              Optional now. You can upload it from your organisation profile once verified.
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-5 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Verify your organization
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose how we should confirm you. Nothing publishes and no badge appears until review
              is complete.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Verification status
            </p>
            <p className="mt-2 text-sm font-semibold">Not started</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Moves to Under review the moment you submit.
            </p>
          </div>

          <div className="space-y-2.5">
            {METHODS.map((m) => {
              const on = form.verification_method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("verification_method", m.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    on ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-ink/25"
                  }`}
                >
                  <p className="text-sm font-semibold">{m.id}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.detail}</p>
                </button>
              );
            })}
          </div>

          {form.verification_method === "Registration details" ? (
            <TextField
              label="Registration number"
              placeholder="CIN / Society / Trust / AICTE code"
              value={form.registration_number}
              onChange={(e) => set("registration_number", e.target.value)}
            />
          ) : null}

          {form.verification_method === "Supporting document" ? (
            <div>
              <label className="text-sm font-medium">Supporting document</label>
              <div className="mt-2 rounded-xl border border-dashed border-border bg-card px-4 py-4 text-xs text-muted-foreground">
                Attach a letterhead or certificate. Our reviewer sees this; other accounts never do.
              </div>
            </div>
          ) : null}

          <TextField
            label="Authorized contact name"
            placeholder="Who can confirm this on record"
            value={form.contact_name}
            onChange={(e) => set("contact_name", e.target.value)}
          />

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              checked={form.policyAccepted}
              onChange={(e) => set("policyAccepted", e.target.checked)}
              className="mt-0.5 size-4 rounded border-border"
            />
            <span>
              I confirm I'm authorised to post on behalf of this organisation, that listings will link
              to an official source page, and that deadlines and eligibility will be accurate.
            </span>
          </label>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="mt-2 space-y-5">
          <div>
            <span className="inline-flex rounded-full bg-soon/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-soon">
              Under review
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight">
              Verification in progress
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our team is reviewing your organization information. You'll get an email as soon as the
              status changes. You can prepare listings meanwhile — publishing unlocks after approval.
            </p>
          </div>

          <div className="glass-muted rounded-2xl p-4">
            <p className="text-sm font-semibold">{form.name}</p>
            <dl className="mt-3 space-y-2 text-xs">
              {[
                { k: "Type", v: form.org_type },
                { k: "Official email", v: form.org_email },
                { k: "Verification method", v: form.verification_method },
                { k: "Authorised contact", v: form.contact_name },
                {
                  k: "Submitted",
                  v: submittedAt
                    ? submittedAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Just now",
                },
              ].map((r) => (
                <div key={r.k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{r.k}</dt>
                  <dd className="text-right font-medium">{r.v || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="space-y-3">
            {STAGES.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                    i === 0
                      ? "bg-trust text-background"
                      : i === 1
                        ? "bg-soon text-background"
                        : "border border-border text-muted-foreground"
                  }`}
                >
                  {i === 0 ? "✓" : i + 1}
                </span>
                <span className={`text-sm ${i <= 1 ? "font-medium" : "text-muted-foreground"}`}>
                  {s}
                  {i === 1 ? " — in progress" : ""}
                </span>
              </li>
            ))}
          </ol>

          <p className="text-xs text-muted-foreground">
            Reviews are done by a person, so timing varies with the documents provided.
          </p>

          <PrimaryButton onClick={() => navigate({ to: "/poster" })}>
            Continue to Dashboard
          </PrimaryButton>
          <Link
            to="/poster/organization"
            className="block text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-ink"
          >
            View organisation profile
          </Link>
        </div>
      ) : null}

      {step < 4 ? (
        <div className="mt-6 flex gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Back
            </button>
          ) : null}
          {step < 3 ? (
            <PrimaryButton disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              Continue
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled={!canContinue} loading={saving} onClick={submitForReview}>
              Submit for verification
            </PrimaryButton>
          )}
        </div>
      ) : null}
    </AuthShell>
  );
}

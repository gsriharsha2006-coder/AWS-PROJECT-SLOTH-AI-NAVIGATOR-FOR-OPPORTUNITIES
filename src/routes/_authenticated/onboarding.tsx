import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import {
  ChipGroup,
  FormAlert,
  PrimaryButton,
  StepProgress,
  TextField,
  baseInput,
} from "@/components/auth/fields";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Profile setup — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "Tell us about your education, interests and preferences so your opportunity feed is built around you.",
      },
      { property: "og:title", content: "Profile setup" },
      { property: "og:description", content: "Five short steps to a personalised feed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});

const INTERESTS = [
  "AI",
  "Software",
  "Electronics",
  "ECE",
  "VLSI",
  "Robotics",
  "Research",
  "Startups",
  "Entrepreneurship",
  "Finance",
  "Design",
  "Marketing",
  "Cybersecurity",
  "Data Science",
  "Climate",
  "Social Impact",
  "Innovation",
] as const;

const OPP_TYPES = [
  "Internships",
  "Scholarships",
  "Hackathons",
  "Competitions",
  "Fellowships",
  "Research",
  "Government programs",
  "Startup opportunities",
  "Events",
  "Innovation programs",
  "Campus opportunities",
  "Volunteering",
] as const;

const LOCATIONS = ["India", "My state", "My city", "Remote", "International"] as const;
const MODES = ["Online", "Offline", "Hybrid"] as const;
const LEVELS = ["School", "Diploma", "Undergraduate", "Postgraduate", "PhD", "Working professional"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduated"];
const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const TOTAL = 5;

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

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState<string>();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    city: "",
    state: "",
    institution: "",
    education_level: "",
    degree: "",
    discipline: "",
    current_year: "",
    graduation_year: "",
    interests: [] as string[],
    skills: [] as string[],
    skillDraft: "",
    opportunity_types: [] as string[],
    location_preference: "",
    mode_preference: "",
  });

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.user.id)
        .maybeSingle();
      if (profile) {
        setForm((f) => ({
          ...f,
          full_name: profile.full_name || (auth.user.user_metadata?.["full_name"] as string) || "",
          city: profile.city ?? "",
          state: profile.state ?? "",
          institution: profile.institution ?? "",
          education_level: profile.education_level ?? "",
          degree: profile.degree ?? "",
          discipline: profile.discipline ?? "",
          current_year: profile.current_year ?? "",
          graduation_year: profile.graduation_year ?? "",
          interests: profile.interests ?? [],
          skills: profile.skills ?? [],
          opportunity_types: profile.opportunity_types ?? [],
          location_preference: profile.location_preference ?? "",
          mode_preference: profile.mode_preference ?? "",
        }));
      }
    })();
  }, []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k: "interests" | "skills" | "opportunity_types") => (v: string) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  const canContinue =
    step === 1
      ? form.full_name.trim().length > 1 && form.city.trim() && form.state
      : step === 2
        ? Boolean(form.institution.trim() && form.education_level)
        : step === 3
          ? form.interests.length > 0
          : step === 4
            ? form.opportunity_types.length > 0 && Boolean(form.location_preference && form.mode_preference)
            : true;

  async function finish() {
    setProblem(undefined);
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setSaving(false);
      setProblem("Your session expired. Log in again to save your profile.");
      return;
    }
    const { error } = await supabase.from("profiles").upsert({
      id: auth.user.id,
      role: "user" as const,
      full_name: form.full_name.trim(),
      city: form.city.trim(),
      state: form.state,
      institution: form.institution.trim(),
      education_level: form.education_level,
      degree: form.degree.trim(),
      discipline: form.discipline.trim(),
      current_year: form.current_year,
      graduation_year: form.graduation_year,
      interests: form.interests,
      skills: form.skills,
      opportunity_types: form.opportunity_types,
      location_preference: form.location_preference,
      mode_preference: form.mode_preference,
      onboarding_complete: true,
    });
    setSaving(false);
    if (error) {
      setProblem("We couldn't save your profile just now. Try again in a moment.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <AuthShell eyebrow="Setup complete">
        <div className="text-center">
          <span
            aria-hidden
            className="mx-auto grid size-14 place-items-center rounded-full bg-trust/15 text-2xl text-trust"
            style={{ animation: "authPop 500ms ease-out" }}
          >
            ✓
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
            You're ready to discover opportunities.
          </h1>
          <div className="mt-5 glass-muted rounded-2xl p-4 text-left">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Profile completed</span>
              <span className="text-trust">100%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted" aria-hidden>
              <div className="h-full w-full rounded-full bg-trust" />
            </div>
            <p className="mt-3 text-sm font-semibold">3 strong matches are waiting for you.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Based on {form.interests.slice(0, 3).join(", ") || "your interests"} and your{" "}
              {form.location_preference.toLowerCase() || "location"} preference.
            </p>
          </div>
        </div>
        <Link
          to="/opportunities"
          className="mt-6 block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore My Opportunities
        </Link>
        <Link
          to="/home"
          className="mt-3 block rounded-xl border border-border bg-card px-5 py-3 text-center text-sm font-medium transition-colors hover:bg-muted"
        >
          Go to Home
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow={`Profile setup ${step} of ${TOTAL}`}>
      <StepProgress label="Profile setup" step={step} total={TOTAL} />

      {problem ? (
        <div className="mt-4">
          <FormAlert title={problem} />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-5 space-y-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">About you</h1>
          <TextField
            label="Full name"
            placeholder="Your name as on documents"
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
          />
          <div>
            <label className="text-sm font-medium">Profile photo</label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-border bg-card px-4 py-3">
              <span aria-hidden className="grid size-10 place-items-center rounded-full bg-muted text-sm">
                {form.full_name.trim().charAt(0).toUpperCase() || "🙂"}
              </span>
              <div className="text-xs text-muted-foreground">
                Optional. You can add one later from your profile.
              </div>
            </div>
          </div>
          <TextField
            label="City"
            placeholder="e.g. Coimbatore"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <Select
            label="State"
            value={form.state}
            onChange={(v) => set("state", v)}
            options={STATES}
            placeholder="Select your state"
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-5 space-y-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">Education</h1>
          <p className="text-xs text-muted-foreground">
            Example: B.Tech · ECE · 2nd Year · Graduation 2028
          </p>
          <TextField
            label="College / University"
            placeholder="Start typing your institution"
            list="institutions"
            value={form.institution}
            onChange={(e) => set("institution", e.target.value)}
          />
          <datalist id="institutions">
            {[
              "IIT Bombay",
              "IIT Madras",
              "IISc Bangalore",
              "NIT Trichy",
              "VIT Vellore",
              "Anna University",
              "Delhi University",
              "BITS Pilani",
            ].map((i) => (
              <option key={i} value={i} />
            ))}
          </datalist>
          <Select
            label="Education level"
            value={form.education_level}
            onChange={(v) => set("education_level", v)}
            options={LEVELS}
            placeholder="Select level"
          />
          <TextField
            label="Degree"
            placeholder="e.g. B.Tech"
            value={form.degree}
            onChange={(e) => set("degree", e.target.value)}
          />
          <TextField
            label="Discipline"
            placeholder="e.g. ECE"
            value={form.discipline}
            onChange={(e) => set("discipline", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Current year"
              value={form.current_year}
              onChange={(v) => set("current_year", v)}
              options={YEARS}
              placeholder="Select"
            />
            <Select
              label="Graduation year"
              value={form.graduation_year}
              onChange={(v) => set("graduation_year", v)}
              options={["2026", "2027", "2028", "2029", "2030", "2031"]}
              placeholder="Select"
            />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-5 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              What opportunities are you interested in?
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">Pick as many as apply.</p>
          </div>
          <ChipGroup options={INTERESTS} selected={form.interests} onToggle={toggle("interests")} />
          <div>
            <label className="text-sm font-medium">Your skills</label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Add one at a time — press Enter to save it.
            </p>
            <input
              value={form.skillDraft}
              placeholder="e.g. Python, Verilog, pitch decks"
              onChange={(e) => set("skillDraft", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && form.skillDraft.trim()) {
                  e.preventDefault();
                  const v = form.skillDraft.trim();
                  setForm((f) => ({
                    ...f,
                    skills: f.skills.includes(v) ? f.skills : [...f.skills, v],
                    skillDraft: "",
                  }));
                }
              }}
              className={`${baseInput} mt-2 border-border focus-visible:ring-primary/45`}
            />
            {form.skills.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.skills.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle("skills")(s)}
                    className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-background"
                  >
                    {s} ✕
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="mt-5 space-y-5">
          <h1 className="font-display text-2xl font-bold tracking-tight">What are you looking for?</h1>
          <ChipGroup
            options={OPP_TYPES}
            selected={form.opportunity_types}
            onToggle={toggle("opportunity_types")}
          />
          <Select
            label="Preferred location"
            value={form.location_preference}
            onChange={(v) => set("location_preference", v)}
            options={[...LOCATIONS]}
            placeholder="Select a preference"
          />
          <Select
            label="Preferred mode"
            value={form.mode_preference}
            onChange={(v) => set("mode_preference", v)}
            options={[...MODES]}
            placeholder="Select a mode"
          />
          <p className="text-xs text-muted-foreground">
            Categories we track: {CATEGORIES.slice(0, 6).join(", ")} and more.
          </p>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="mt-5 space-y-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Let's personalize your opportunity feed
          </h1>
          <div className="glass-muted rounded-2xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Your profile
            </p>
            <dl className="mt-3 space-y-2.5 text-sm">
              {[
                {
                  k: "Education",
                  v: [form.degree, form.discipline, form.current_year, form.institution]
                    .filter(Boolean)
                    .join(" · "),
                },
                { k: "Skills", v: form.skills.join(", ") },
                { k: "Interests", v: form.interests.join(", ") },
                { k: "Opportunity types", v: form.opportunity_types.join(", ") },
                {
                  k: "Location preferences",
                  v: [form.location_preference, form.mode_preference, form.city, form.state]
                    .filter(Boolean)
                    .join(" · "),
                },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="text-xs text-muted-foreground">{row.k}</dt>
                  <dd className="font-medium">{row.v || "Not added"}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-sm text-muted-foreground">
            Your first recommendations are being prepared.
          </p>
        </div>
      ) : null}

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
        {step < TOTAL ? (
          <PrimaryButton disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
            Continue
          </PrimaryButton>
        ) : (
          <PrimaryButton loading={saving} onClick={finish}>
            Go to My Dashboard
          </PrimaryButton>
        )}
      </div>
    </AuthShell>
  );
}

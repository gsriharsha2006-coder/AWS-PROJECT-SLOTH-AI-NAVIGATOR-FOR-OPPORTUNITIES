import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/signup/student")({
  head: () => ({
    meta: [
      { title: "Set up your student profile — Opportunity Navigator India" },
      {
        name: "description",
        content:
          "One profile decides what surfaces: education, location, interests and skills. Takes about three minutes and can be edited any time.",
      },
      { property: "og:title", content: "Set up your student profile" },
      {
        property: "og:description",
        content: "Education, location, interests and skills — the profile that drives your matches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentSetup,
});

const steps = ["Account", "Education", "Location", "Interests", "Skills & documents", "Review"];

const levels = [
  "Class 11–12",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "PhD",
  "Working professional",
];

const disciplines = [
  "Electronics & Communication",
  "Computer Science",
  "Mechanical",
  "Civil",
  "Basic Sciences",
  "Commerce & Management",
  "Design",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const skills = [
  "Embedded C",
  "PCB design",
  "Python",
  "Machine learning",
  "Data analysis",
  "UI design",
  "Public speaking",
  "Technical writing",
];

const docs = [
  "College ID card",
  "Consolidated marksheets",
  "Income certificate",
  "Resume",
  "Aadhaar",
  "Caste / category certificate",
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
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
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
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

function StudentSetup() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState("Undergraduate");
  const [interests, setInterests] = useState<string[]>(["Hackathons", "Research"]);
  const [chosenSkills, setChosenSkills] = useState<string[]>(["Embedded C"]);
  const [chosenDocs, setChosenDocs] = useState<string[]>(["College ID card"]);
  const [done, setDone] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void) => (v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const completeness = Math.min(
    100,
    40 + interests.length * 6 + chosenSkills.length * 5 + chosenDocs.length * 4,
  );

  if (done) {
    return (
      <div className="aurora grid min-h-screen place-items-center px-5">
        <div className="glass w-full max-w-lg rounded-2xl p-8 text-center">
          <span
            aria-hidden
            className="mx-auto grid size-14 place-items-center rounded-2xl bg-trust/15 text-2xl text-trust"
          >
            ✓
          </span>
          <h1 className="mt-5 text-2xl font-bold">Your profile is live</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Profile strength {completeness}%. Matches are ready, and eligibility on each listing is
            explained against what you just entered.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              to="/home"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Go to my home
            </Link>
            <Link
              to="/opportunities"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              See my matches
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            You can edit every field later from Profile. Documents stay private until you attach them
            to an application.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="aurora min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6">
        <Link to="/signup" className="text-sm text-muted-foreground hover:text-ink">
          ← Change role
        </Link>
        <p className="text-xs text-muted-foreground">
          Step {step + 1} of {steps.length} · {steps[step]}
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20">
        <div className="mb-6 flex gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold">{steps[step]}</h1>

          {step === 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                <input className={inputClass} placeholder="Harsha Vardhan" autoComplete="name" />
              </Field>
              <Field label="Email">
                <input className={inputClass} type="email" placeholder="you@college.ac.in" />
              </Field>
              <Field label="Mobile number" hint="Used only for deadline reminders you switch on.">
                <input className={inputClass} inputMode="tel" placeholder="+91 " />
              </Field>
              <Field label="Password" hint="At least 8 characters.">
                <input className={inputClass} type="password" placeholder="••••••••" />
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="mt-6 grid gap-5">
              <Field label="Current level">
                <div className="flex flex-wrap gap-2">
                  {levels.map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={level === l}
                      onClick={() => setLevel(l)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                        level === l ? "bg-ink text-background" : "border border-border bg-card"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Institution">
                  <input className={inputClass} placeholder="Name of your college or school" />
                </Field>
                <Field label="Discipline">
                  <select className={inputClass} defaultValue="Electronics & Communication">
                    {disciplines.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Year of study">
                  <select className={inputClass} defaultValue="3rd year">
                    {["1st year", "2nd year", "3rd year", "4th year", "Graduated"].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="CGPA or percentage" hint="Optional, but improves eligibility accuracy.">
                  <input className={inputClass} placeholder="8.4 / 10" />
                </Field>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="State">
                <select className={inputClass} defaultValue="Andhra Pradesh">
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="City or district">
                <input className={inputClass} placeholder="Visakhapatnam" />
              </Field>
              <Field
                label="Willing to travel"
                hint="Affects which in-person programmes are shown as practical."
              >
                <select className={inputClass} defaultValue="Within my state">
                  {["My city only", "Within my state", "Anywhere in India"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Household income band" hint="Only used for need-based scholarships.">
                <select className={inputClass} defaultValue="₹2–8 lakh">
                  {["Below ₹2 lakh", "₹2–8 lakh", "₹8–15 lakh", "Above ₹15 lakh", "Prefer not to say"].map(
                    (b) => (
                      <option key={b}>{b}</option>
                    ),
                  )}
                </select>
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-6 grid gap-5">
              <Field
                label="What kinds of opportunities matter to you?"
                hint="Pick at least two. This is the biggest driver of your matches."
              >
                <Chips
                  options={CATEGORIES}
                  selected={interests}
                  onToggle={toggle(interests, setInterests)}
                />
              </Field>
              <Field label="Anything you want to avoid?" hint="Optional.">
                <input className={inputClass} placeholder="Paid competitions, unpaid internships…" />
              </Field>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mt-6 grid gap-6">
              <Field label="Skills" hint="Skills are matched against listing requirements.">
                <Chips
                  options={skills}
                  selected={chosenSkills}
                  onToggle={toggle(chosenSkills, setChosenSkills)}
                />
              </Field>
              <Field
                label="Documents you already have"
                hint="Nothing is uploaded now. We use this to warn you when a deadline needs a document you don't have yet."
              >
                <Chips
                  options={docs}
                  selected={chosenDocs}
                  onToggle={toggle(chosenDocs, setChosenDocs)}
                />
              </Field>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="mt-6 grid gap-4">
              <div className="rounded-xl bg-muted/70 px-4 py-3 text-sm">
                <p className="font-semibold">Profile strength {completeness}%</p>
                <p className="mt-1 text-muted-foreground">
                  {level} · {interests.length} interest areas · {chosenSkills.length} skills ·{" "}
                  {chosenDocs.length} documents ready
                </p>
              </div>
              <ul className="grid gap-2 text-sm">
                <li>✓ Matches will be ranked with reasons you can read</li>
                <li>✓ Deadlines appear in your Slot Calendar automatically</li>
                <li>✓ Eligibility gaps are shown before you start an application</li>
              </ul>
              <p className="text-xs text-muted-foreground">
                By creating an account you agree to our community and safety rules. Verification
                states shown on listings reflect what the source page confirms — never a guess.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => (step === steps.length - 1 ? setDone(true) : setStep((s) => s + 1))}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {step === steps.length - 1 ? "Create my profile" : "Continue"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

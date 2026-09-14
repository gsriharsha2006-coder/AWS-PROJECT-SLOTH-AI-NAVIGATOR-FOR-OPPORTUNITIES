import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup/poster")({
  head: () => ({
    meta: [
      { title: "Organisation verification — Post opportunities in India" },
      {
        name: "description",
        content:
          "Register your institution, company or government body and complete verification before your first listing goes live.",
      },
      { property: "og:title", content: "Organisation verification" },
      {
        property: "og:description",
        content: "Verification before visibility: registration proof, official contact and a review.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosterSignup,
});

const steps = ["Organisation", "Proof of identity", "Official contact", "Policy", "Submitted"];

const orgTypes = [
  "Educational institution",
  "Company or startup",
  "Government body",
  "Non-profit or trust",
  "Community organisation",
];

const inputClass =
  "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Upload({ label, hint }: { label: string; hint: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/60 px-4 py-4">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setName("document.pdf")}
          className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium hover:bg-muted"
        >
          Choose file
        </button>
        <span className="text-xs text-muted-foreground">
          {name ? `${name} · attached` : "PDF or image, up to 10 MB"}
        </span>
      </div>
    </div>
  );
}

function PosterSignup() {
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState(false);

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

        {step < 4 ? (
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl font-bold">{steps[step]}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Verification happens before visibility. Nothing you post reaches students until this
              review is approved.
            </p>

            {step === 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Organisation name">
                  <input className={inputClass} placeholder="Indian Institute of Science" />
                </Field>
                <Field label="Organisation type">
                  <select className={inputClass} defaultValue="Educational institution">
                    {orgTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Website">
                  <input className={inputClass} placeholder="https://" />
                </Field>
                <Field label="City and state">
                  <input className={inputClass} placeholder="Bengaluru, Karnataka" />
                </Field>
                <div className="sm:col-span-2">
                  <Field
                    label="What will you post?"
                    hint="Helps us route your review to the right verification team."
                  >
                    <textarea
                      className={`${inputClass} min-h-24`}
                      placeholder="Research internships, fellowships and campus workshops."
                    />
                  </Field>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-6 grid gap-4">
                <Field label="Registration or recognition number">
                  <input className={inputClass} placeholder="CIN / AICTE code / society reg. no." />
                </Field>
                <Upload
                  label="Registration proof"
                  hint="Certificate of incorporation, AICTE/UGC recognition, society or trust deed."
                />
                <Upload
                  label="Authorisation letter"
                  hint="On official letterhead, naming you as the person allowed to post."
                />
                <p className="rounded-xl bg-muted/70 px-4 py-3 text-xs text-muted-foreground">
                  Documents are used for verification only, are never shown to students, and are
                  deleted if your application is withdrawn.
                </p>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input className={inputClass} placeholder="Full name" />
                </Field>
                <Field label="Role in the organisation">
                  <input className={inputClass} placeholder="Programme coordinator" />
                </Field>
                <Field
                  label="Official email"
                  hint="Must be on your organisation's domain. Free email addresses are rejected."
                >
                  <input className={inputClass} type="email" placeholder="you@iisc.ac.in" />
                </Field>
                <Field label="Phone number">
                  <input className={inputClass} inputMode="tel" placeholder="+91 " />
                </Field>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mt-6 grid gap-4">
                <ul className="grid gap-3 text-sm">
                  {[
                    "Every listing states real eligibility, real deadlines and real benefits.",
                    "No application fee is charged to students unless it is disclosed on the listing.",
                    "Applicant data is used only to assess that application.",
                    "Closed listings are marked closed — they are never left looking open.",
                    "Collaboration requests to communities go through leaders and student opt-in.",
                  ].map((p) => (
                    <li key={p} className="flex gap-2 rounded-xl bg-card px-3.5 py-3">
                      <span aria-hidden className="text-trust">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 size-4"
                  />
                  I confirm I am authorised to represent this organisation and accept these rules.
                </label>
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
                disabled={step === 3 && !agreed}
                onClick={() => setStep((s) => s + 1)}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === 3 ? "Submit for verification" : "Continue"}
              </button>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-8">
            <span
              aria-hidden
              className="grid size-14 place-items-center rounded-2xl bg-soon/15 text-2xl text-soon"
            >
              ◌
            </span>
            <h1 className="mt-5 text-2xl font-bold">Verification in review</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Reviews usually finish within two working days. You can prepare listings now and save
              them as drafts — publishing unlocks once verification is approved.
            </p>

            <ol className="mt-6 grid gap-3 text-sm">
              {[
                { s: "Submitted", d: "Documents received just now", state: "done" },
                { s: "Document check", d: "Registration and authorisation letter", state: "active" },
                { s: "Contact confirmation", d: "Email sent to your official domain", state: "todo" },
                { s: "Approved", d: "Listings can be published", state: "todo" },
              ].map((r) => (
                <li key={r.s} className="flex items-start gap-3 rounded-xl bg-card px-4 py-3">
                  <span
                    aria-hidden
                    className={`mt-1 size-2 shrink-0 rounded-full ${
                      r.state === "done" ? "bg-trust" : r.state === "active" ? "bg-soon" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>
                    <span className="font-medium">{r.s}</span>
                    <span className="block text-xs text-muted-foreground">{r.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                to="/poster/new"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Draft a listing
              </Link>
              <Link
                to="/poster"
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                Go to poster workspace
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

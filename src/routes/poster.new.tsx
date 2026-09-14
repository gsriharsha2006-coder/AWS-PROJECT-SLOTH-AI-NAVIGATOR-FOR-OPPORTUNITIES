import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PosterShell } from "@/components/PosterShell";
import { Panel, SectionTitle, StatusChip } from "@/components/status";
import { densityLevel, publishingDensity } from "@/lib/data";

export const Route = createFileRoute("/poster/new")({
  head: () => ({
    meta: [
      { title: "Post an opportunity — guided seven-step flow" },
      {
        name: "description",
        content:
          "Basic details, eligibility, timing, benefits, application, verification and publication — with a live preview and a publishing recommendation.",
      },
      { property: "og:title", content: "Post an opportunity — Opportunity Navigator" },
      {
        property: "og:description",
        content: "A guided flow with live preview, duplicate checks and a publishing recommendation.",
      },
    ],
  }),
  component: PostOpportunity,
});

const steps = [
  "Basic information",
  "Eligibility",
  "Timing",
  "Benefits",
  "Application",
  "Verification",
  "Publication",
] as const;

const fields: Record<number, { label: string; placeholder: string; wide?: boolean }[]> = {
  0: [
    { label: "Title", placeholder: "AI Innovation Challenge 2026", wide: true },
    { label: "Organisation", placeholder: "Bharat Innovation Foundation" },
    { label: "Category", placeholder: "Hackathons" },
    { label: "Description", placeholder: "What participants will do, in two or three sentences", wide: true },
  ],
  1: [
    { label: "Education level", placeholder: "Undergraduate" },
    { label: "Year", placeholder: "2nd to 4th year" },
    { label: "Discipline", placeholder: "Engineering, any branch" },
    { label: "Location", placeholder: "Pan-India" },
    { label: "Age", placeholder: "18 to 25" },
    { label: "Skills", placeholder: "Python, machine learning" },
    { label: "Other requirements", placeholder: "Team of 2 to 4", wide: true },
  ],
  2: [
    { label: "Opening date", placeholder: "20 Sep 2026" },
    { label: "Closing date", placeholder: "18 Oct 2026" },
    { label: "Event date", placeholder: "26 Oct 2026" },
    { label: "Application deadline", placeholder: "16 Oct 2026" },
  ],
  3: [
    { label: "Stipend", placeholder: "Not applicable" },
    { label: "Prize", placeholder: "₹50,000" },
    { label: "Certificate", placeholder: "Yes, for all finalists" },
    { label: "Funding", placeholder: "Travel support for finalists" },
    { label: "Mentorship", placeholder: "Two mentor check-ins" },
    { label: "Other benefits", placeholder: "Internship shortlist" },
  ],
  4: [
    { label: "Application URL", placeholder: "https://…", wide: true },
    { label: "Application method", placeholder: "External portal" },
    { label: "Required documents", placeholder: "College ID, abstract" },
  ],
  5: [
    { label: "Official organisation name", placeholder: "Registered legal name" },
    { label: "Contact email", placeholder: "programs@organisation.in" },
    { label: "Source URL", placeholder: "Official announcement page", wide: true },
    { label: "Supporting document", placeholder: "Upload notice or letter", wide: true },
  ],
};

const checks = [
  { label: "Organisation identity", state: "Approved" },
  { label: "Source verification", state: "Approved" },
  { label: "Application URL reachable", state: "Approved" },
  { label: "Deadline validity", state: "Approved" },
  { label: "Eligibility completeness", state: "In review" },
  { label: "Duplicate listing detection", state: "Attention" },
  { label: "Spam and misleading claims", state: "Approved" },
];

function PostOpportunity() {
  const [step, setStep] = useState(0);
  const best = [...publishingDensity].sort((a, b) => a.listings - b.listings)[0]!;
  const congested = publishingDensity.find((d) => d.date === "18 Sep")!;

  return (
    <PosterShell
      title="Post an opportunity"
      subtitle={`Step ${step + 1} of 7 · ${steps[step]} · draft saved automatically`}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-5">
          <Panel>
            <ol className="rail flex gap-2 overflow-x-auto pb-1">
              {steps.map((s, i) => (
                <li key={s} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                      i === step
                        ? "bg-primary text-primary-foreground"
                        : i < step
                          ? "bg-trust/12 text-trust"
                          : "border border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <span className="font-bold">{i < step ? "✓" : i + 1}</span>
                    {s}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </Panel>

          <Panel>
            <SectionTitle>{steps[step]}</SectionTitle>

            {step < 6 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {fields[step]!.map((f) => (
                  <label key={f.label} className={f.wide ? "sm:col-span-2" : ""}>
                    <span className="text-xs font-medium text-muted-foreground">{f.label}</span>
                    <input
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none"
                    />
                  </label>
                ))}
                {step === 1 ? (
                  <p className="sm:col-span-2 rounded-xl bg-muted/70 px-4 py-3 text-xs text-muted-foreground">
                    Complete eligibility rules produce clearer student-side assessments. Anything left
                    blank appears to students as "needs verification", not as eligible.
                  </p>
                ) : null}
                {step === 5 ? (
                  <div className="sm:col-span-2 rounded-xl border border-soon/40 bg-soon/8 px-4 py-3">
                    <p className="text-sm font-semibold">Verification is required before going live</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your listing shows "verification in review" to students until checks pass. It is
                      never labelled verified before that.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-xl border border-soon/40 bg-soon/8 px-4 py-4">
                  <p className="text-sm font-semibold">Possible duplicate listing</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This appears similar to “AI Innovation Challenge 2025” from the same organisation —
                    same category, similar title, deadline 11 months apart.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium hover:bg-muted"
                    >
                      Update existing
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                    >
                      Create new edition
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium hover:bg-muted"
                    >
                      Request review
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold">Recommended publishing date</p>
                  <p className="mt-2 font-display text-3xl font-bold">{best.date}</p>
                  <p className="mt-1">
                    <StatusChip
                      label={densityLevel(best.listings).label}
                      token={densityLevel(best.listings).token as "trust"}
                    />
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Your opportunity is similar to {congested.listings} other listings scheduled on{" "}
                    {congested.date}. Publishing on {best.date} means competing with{" "}
                    {best.listings} comparable listings instead — likely lower competition for student
                    attention.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    This is a distribution estimate based on current scheduling. It does not guarantee
                    more applications.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold">Pre-publication checks</p>
                  <ul className="mt-3 divide-y divide-border">
                    {checks.map((c) => (
                      <li key={c.label} className="flex items-center justify-between gap-3 py-2.5">
                        <span className="text-sm">{c.label}</span>
                        <StatusChip
                          label={c.state}
                          token={
                            c.state === "Approved" ? "trust" : c.state === "In review" ? "soon" : "urgent"
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium disabled:opacity-40"
              >
                Previous
              </button>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  Save draft
                </button>
                {step === steps.length - 1 ? (
                  <>
                    <button
                      type="button"
                      className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      Schedule for {best.date}
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      Publish now
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </Panel>
        </div>

        <aside className="grid content-start gap-5 lg:sticky lg:top-8">
          <Panel>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Live preview</p>
            <div className="mt-3 rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">Hackathons</p>
              <p className="mt-1 text-sm font-semibold">AI Innovation Challenge 2026</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Bharat Innovation Foundation</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <StatusChip label="Opens 20 Sep" token="upcoming" />
                <StatusChip label="Verification in review" token="soon" />
              </div>
              <p className="mt-3 text-xs">₹50,000 prize · Online · Pan-India</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Students see exactly this card. It updates as you complete each step.
            </p>
          </Panel>
          <Panel>
            <p className="text-sm font-semibold">Draft status</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>Autosaved 30 seconds ago</li>
              <li>Steps completed: {step} of 7</li>
              <li>Status: Draft · not visible to students</li>
            </ul>
          </Panel>
        </aside>
      </div>
    </PosterShell>
  );
}

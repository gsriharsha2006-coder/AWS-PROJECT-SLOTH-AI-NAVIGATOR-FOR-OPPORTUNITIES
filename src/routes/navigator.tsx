import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Panel, Skeleton } from "@/components/status";
import { opportunities } from "@/lib/data";

export const Route = createFileRoute("/navigator")({
  head: () => ({
    meta: [
      { title: "AI Opportunity Navigator — ask what to apply to next" },
      {
        name: "description",
        content:
          "A contextual opportunity intelligence layer: ask what you are eligible for, what closes this week and what to apply to next.",
      },
      { property: "og:title", content: "AI Opportunity Navigator" },
      {
        property: "og:description",
        content: "Answers return opportunity cards, eligibility and a next action.",
      },
    ],
  }),
  component: Navigator,
});

const prompts = [
  "What should I apply to next?",
  "What closes this week?",
  "What am I eligible for?",
  "Show AI hackathons",
  "Scholarships I qualify for",
  "Opportunities for ECE students",
];

const answers: Record<string, { summary: string; ids: string[]; next: string }> = {
  "What should I apply to next?": {
    summary:
      "Your abstract for the AI Innovation Challenge closes tomorrow and it is your strongest match at 92%. The research fellowship is next, three days out, and it needs a faculty reference.",
    ids: ["ai-innovation-challenge", "ug-research-fellowship"],
    next: "Finish the AI Innovation Challenge abstract today.",
  },
  "What closes this week?": {
    summary: "Three listings close within seven days. One is already started, two are untouched.",
    ids: ["ai-innovation-challenge", "ug-research-fellowship", "startup-internship-ece"],
    next: "Set reminders on the two you have not started.",
  },
  "What am I eligible for?": {
    summary:
      "Four listings read as likely eligible from your profile. Two more need a check: an AICTE college code and an Andhra Pradesh domicile clause.",
    ids: ["ug-research-fellowship", "merit-scholarship-ug", "startup-internship-ece"],
    next: "Confirm your AICTE college code to unlock the national hackathon.",
  },
  "Show AI hackathons": {
    summary: "One open AI-focused challenge matches your discipline and skills right now.",
    ids: ["ai-innovation-challenge"],
    next: "Form a team through the AI Builders community.",
  },
  "Scholarships I qualify for": {
    summary: "One scholarship window opens on 12 October and your income band and year both match.",
    ids: ["merit-scholarship-ug"],
    next: "Prepare marksheets and the income certificate before the window opens.",
  },
  "Opportunities for ECE students": {
    summary: "Three listings are discipline-specific for electronics and communication.",
    ids: ["ug-research-fellowship", "startup-internship-ece", "design-challenge-ece"],
    next: "The internship deadline is nearest — six days.",
  },
};

function Navigator() {
  const [query, setQuery] = useState("What should I apply to next?");
  const [active, setActive] = useState("What should I apply to next?");
  const [loading, setLoading] = useState(false);

  const result = answers[active];
  const cards = result ? opportunities.filter((o) => result.ids.includes(o.id)) : [];

  function run(q: string) {
    setQuery(q);
    setLoading(true);
    setActive(answers[q] ? q : "What should I apply to next?");
    window.setTimeout(() => setLoading(false), 450);
  }

  return (
    <UserShell
      title="AI Opportunity Navigator"
      subtitle="Ask in your own words. Answers come back as opportunities with eligibility, deadline and a next action."
    >
      <Panel className="mb-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(query);
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Ask the navigator"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none"
            placeholder="What am I eligible for?"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Ask
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => run(p)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                active === p ? "bg-ink text-background" : "border border-border bg-card"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Panel>

      {loading ? (
        <div className="grid gap-4">
          <Skeleton className="h-24" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      ) : (
        <>
          <Panel className="mb-5">
            <p className="text-sm">{result.summary}</p>
            <div className="mt-4 rounded-xl bg-muted/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Next action
              </p>
              <p className="mt-1 text-sm">{result.next}</p>
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((o) => (
              <OpportunityCard key={o.id} opp={o} />
            ))}
          </div>
        </>
      )}
    </UserShell>
  );
}

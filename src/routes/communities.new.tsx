import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserShell } from "@/components/UserShell";
import { Panel, SectionTitle } from "@/components/status";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/communities/new")({
  head: () => ({
    meta: [
      { title: "Create a community — Commun-In" },
      {
        name: "description",
        content:
          "Start a purpose-built community around a discipline or opportunity type. Set the focus, rules and first event, then submit it for platform review.",
      },
      { property: "og:title", content: "Create a community — Commun-In" },
      {
        property: "og:description",
        content: "Purpose, rules and a first activity — then a short platform review before it opens.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreateCommunity,
});

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

const DEFAULT_RULES =
  "1. No paid promotions or referral links.\n2. Share only opportunities with a verifiable source.\n3. Credit teammates on shared submissions.";

function CreateCommunity() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [region, setRegion] = useState("");
  const [rules, setRules] = useState(DEFAULT_RULES);
  const [activity, setActivity] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [visibility, setVisibility] = useState("Open to join");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState<string>();

  const ready = name.trim().length >= 3 && focus.length > 0;

  async function submit() {
    setProblem(undefined);
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setSaving(false);
      setProblem("Log in to create a community — that's how members know who runs it.");
      return;
    }
    const { error } = await supabase.from("community_submissions").insert({
      owner_id: auth.user.id,
      name: name.trim(),
      purpose: purpose.trim(),
      focus_areas: focus,
      visibility,
      region: region.trim(),
      rules,
      first_activity: activity.trim(),
    });
    setSaving(false);
    if (error) {
      setProblem("We couldn't submit this just now. Try again in a moment.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <UserShell title="Community submitted" subtitle="One short review stands between this and its first members.">
        <Panel>
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-2xl bg-soon/15 text-xl text-soon"
          >
            ◌
          </span>
          <h2 className="mt-4 text-xl font-semibold">{name || "Your community"} is in review</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            We check the purpose, the rules and that the focus isn't duplicating an existing
            community. Reviews usually finish within two working days, and you'll get a notification
            either way.
          </p>
          <ul className="mt-5 grid gap-2 text-sm">
            <li>✓ You are listed as the founding leader once approved</li>
            <li>✓ Your first event can be scheduled during review</li>
            <li>✓ Organisation collaborations open only after 50 verified members</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/communities"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Back to Commun-In
            </Link>
            <Link
              to="/notifications"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              See notifications
            </Link>
          </div>
        </Panel>
      </UserShell>
    );
  }

  return (
    <UserShell
      title="Create a community"
      subtitle="Communities exist to help people participate — form teams, prepare together, host approved events. Give yours a clear purpose and it gets approved faster."
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <SectionTitle>The basics</SectionTitle>
          <div className="grid gap-5">
            <Field label="Community name" hint="Clear and specific beats clever.">
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Embedded Systems Builders — South India"
              />
            </Field>

            <Field
              label="What is this community for?"
              hint="Shown to every student deciding whether to join."
            >
              <textarea
                className={`${inputClass} min-h-24`}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="We help members form teams for hardware hackathons and review each other's submissions before deadlines."
              />
            </Field>

            <Field label="Focus areas" hint="Pick the opportunity types your members will chase.">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const on = focus.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setFocus((p) => (on ? p.filter((x) => x !== c) : [...p, c]))
                      }
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                        on ? "bg-ink text-background" : "border border-border bg-card hover:bg-muted"
                      }`}
                    >
                      {on ? "✓ " : ""}
                      {c}
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Who can join?">
                <select
                  className={inputClass}
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  {["Open to join", "Request to join", "Invite only"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </Field>
              <Field label="Primary region" hint="Use pan-India if location doesn't matter.">
                <input
                  className={inputClass}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Pan-India"
                />
              </Field>
            </div>

            <Field
              label="Community rules"
              hint="Members must accept these when joining. Keep them short and enforceable."
            >
              <textarea
                className={`${inputClass} min-h-24`}
                value={rules}
                onChange={(e) => setRules(e.target.value)}
              />
            </Field>

            <Field
              label="First activity"
              hint="Optional, but communities with a scheduled first event grow far faster."
            >
              <input
                className={inputClass}
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Team-forming call for Smart India Hackathon"
              />
            </Field>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              disabled={!ready || saving}
              onClick={submit}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {saving ? "Submitting…" : "Submit for review"}
            </button>
            <span className="text-xs text-muted-foreground">
              {ready ? "Review usually takes two working days" : "Add a name and at least one focus area"}
            </span>
          </div>
          {problem ? (
            <p role="alert" className="mt-3 text-xs font-medium text-urgent">
              ! {problem}
            </p>
          ) : null}
        </Panel>

        <div className="grid gap-4 content-start">
          <Panel>
            <SectionTitle>Before you submit</SectionTitle>
            <ul className="space-y-2 text-sm">
              <li>✓ Purpose is specific, not a general chat group</li>
              <li>✓ Focus doesn't duplicate an existing community</li>
              <li>✓ Rules are written and enforceable</li>
              <li>✓ You can commit to moderating for the first month</li>
            </ul>
          </Panel>
          <Panel>
            <SectionTitle>What founding leaders get</SectionTitle>
            <ul className="space-y-2 text-sm">
              <li>Event hosting tools with attendance verification</li>
              <li>Cohort view of member participation</li>
              <li>Collaboration requests from verified organisations</li>
              <li>Sloth Points for approved events and reviewed contributions</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Creation tools come with Sloth Leader.{" "}
              <Link to="/membership" className="font-medium text-primary">
                See membership
              </Link>
              . Leadership standing itself is still earned through verified contribution.
            </p>
          </Panel>
        </div>
      </div>
    </UserShell>
  );
}

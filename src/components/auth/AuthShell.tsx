import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const floatingCards = [
  { title: "AI Innovation Challenge", meta: "Hackathon · 1 day left", tone: "urgent", top: "8%", left: "6%" },
  { title: "Research Fellowship", meta: "IISc · ₹20,000/month", tone: "trust", top: "26%", left: "44%" },
  { title: "Student Internship", meta: "Hybrid · Chennai", tone: "soon", top: "48%", left: "10%" },
  {
    title: "Government Innovation Program",
    meta: "Seed support up to ₹5,00,000",
    tone: "trust",
    top: "66%",
    left: "40%",
  },
  { title: "Hackathon", meta: "Pan-India · Team of 4", tone: "soon", top: "84%", left: "12%" },
];

/**
 * Split authentication shell: product story and floating opportunity cards on
 * the left, the glass auth card on the right. On mobile the visual collapses
 * into a compact header so the form stays above the keyboard.
 */
export function AuthShell({
  eyebrow,
  children,
  variant = "user",
}: {
  eyebrow?: string;
  children: ReactNode;
  variant?: "user" | "poster";
}) {
  return (
    <div className="aurora min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden overflow-hidden px-10 py-10 lg:flex lg:flex-col">
        <Link to="/" className="font-display text-sm font-bold tracking-tight">
          AI OPPORTUNITY NAVIGATOR
        </Link>

        <div className="relative z-10 mt-auto max-w-lg">
          <h2 className="text-balance font-display text-4xl font-bold leading-[1.1]">
            Don't search through thousands of opportunities. Know which ones matter to you.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Discover relevant opportunities, understand your eligibility, track deadlines, and take
            the right next step.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 text-xs">
            {[
              { k: "Verified sources", v: "Every listing" },
              { k: "Eligibility", v: "Explained, not guessed" },
              { k: "Deadlines", v: "In days and words" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-xl px-3 py-3">
                <dt className="font-semibold">{s.k}</dt>
                <dd className="mt-1 text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {floatingCards.map((c, i) => (
            <div
              key={c.title}
              className="glass absolute w-56 rounded-2xl px-4 py-3 opacity-70 shadow-lg"
              style={{
                top: c.top,
                left: c.left,
                animation: `authFloat ${7 + i}s ease-in-out ${i * 0.6}s infinite`,
              }}
            >
              <p className="text-xs font-semibold">{c.title}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{c.meta}</p>
              <span
                className={`mt-2 block h-1 w-10 rounded-full ${
                  c.tone === "urgent" ? "bg-urgent" : c.tone === "soon" ? "bg-soon" : "bg-trust"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-screen flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between lg:hidden">
          <Link to="/" className="font-display text-xs font-bold tracking-tight">
            AI OPPORTUNITY NAVIGATOR
          </Link>
          {eyebrow ? <span className="text-xs text-muted-foreground">{eyebrow}</span> : null}
        </div>

        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-md">
            {variant === "poster" ? (
              <p className="mb-3 inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
                Poster account
              </p>
            ) : null}
            <div className="glass rounded-3xl p-6 sm:p-8">{children}</div>
            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/legal/terms" className="underline underline-offset-2 hover:text-ink">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/legal/privacy" className="underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

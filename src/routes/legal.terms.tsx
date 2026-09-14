import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "The terms that govern user and poster accounts on AI Opportunity Navigator, including listing accuracy and verification.",
      },
      { property: "og:title", content: "Terms of Service — AI Opportunity Navigator" },
      { property: "og:description", content: "How accounts, listings and verification work here." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return <LegalPage title="Terms of Service" sections={sections} />;
}

const sections = [
  {
    h: "1. Accounts",
    p: "There are two account types: user accounts, which discover and apply to opportunities, and poster accounts, which publish them. You are responsible for the accuracy of what you submit and for keeping your login credentials private.",
  },
  {
    h: "2. Posting opportunities",
    p: "Poster accounts must complete organisation verification before a listing can be published. Listings must link to an official source page, state real eligibility criteria, and carry an accurate deadline. Duplicate or misleading listings are removed.",
  },
  {
    h: "3. Verification",
    p: "Verification badges are only shown once our review is complete. We may ask for additional documents, contact your official email, or decline verification where information cannot be confirmed.",
  },
  {
    h: "4. Deadlines and eligibility",
    p: "We surface deadlines and eligibility explanations from source pages and from what you tell us about yourself. Always confirm on the official source before applying — the organisation running the opportunity has the final say.",
  },
  {
    h: "5. Communities and points",
    p: "Community participation and Sloth Points reward genuine contribution. Points can be redeemed for the benefits listed on the membership page. Leadership roles are earned through participation and cannot be purchased.",
  },
  {
    h: "6. Ending your account",
    p: "You can request deletion of your account at any time. We keep the minimum records needed for legal and anti-abuse purposes.",
  },
];

export function LegalPage({
  title,
  sections: items,
}: {
  title: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div className="aurora min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="font-display text-xs font-bold tracking-tight">
          AI OPPORTUNITY NAVIGATOR
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plain-language summary. Last updated when this product was assembled.
        </p>
        <div className="mt-8 space-y-6">
          {items.map((s) => (
            <section key={s.h} className="glass rounded-2xl p-5">
              <h2 className="font-display text-base font-semibold">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex gap-4 text-sm">
          <Link to="/legal/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          <Link to="/auth" className="underline underline-offset-2">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

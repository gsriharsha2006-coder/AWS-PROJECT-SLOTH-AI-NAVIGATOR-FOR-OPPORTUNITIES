import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "./legal.terms";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AI Opportunity Navigator" },
      {
        name: "description",
        content:
          "What we collect from users and posters, why we collect it, and the control you have over your data.",
      },
      { property: "og:title", content: "Privacy Policy — AI Opportunity Navigator" },
      { property: "og:description", content: "What we collect, why, and your control over it." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    h: "What we collect",
    p: "Your name, email, mobile number, and the education, skills, interests and preferences you add during profile setup. For poster accounts, organisation details and the documents you submit for verification.",
  },
  {
    h: "Why we collect it",
    p: "To match you with relevant opportunities, explain your eligibility honestly, remind you before deadlines, and to verify that organisations posting opportunities are real.",
  },
  {
    h: "What we never do",
    p: "We do not sell your profile. We do not share your documents with other users. Posters see only what an application requires.",
  },
  {
    h: "Emails you receive",
    p: "Account confirmation, password reset, verification updates, and the deadline reminders you choose. You can turn optional reminders off from notification settings.",
  },
  {
    h: "Your control",
    p: "You can edit or remove any profile field, export what you have submitted, and request account deletion. Verification records may be retained for anti-abuse purposes.",
  },
  {
    h: "Security",
    p: "Passwords are stored hashed, sessions are protected, and access to submitted documents is restricted to the review process.",
  },
];

function Privacy() {
  return <LegalPage title="Privacy Policy" sections={sections} />;
}

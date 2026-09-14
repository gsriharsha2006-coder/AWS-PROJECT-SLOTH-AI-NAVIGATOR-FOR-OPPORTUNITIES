export type Urgency = "urgent" | "soon" | "watch" | "upcoming" | "calm";
export type Eligibility = "likely" | "potential" | "verify" | "not";
export type OppStatus =
  | "open"
  | "closing"
  | "closed"
  | "upcoming"
  | "needs-verification";

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  category: string;
  daysLeft: number | null;
  opensIn?: string;
  match: number;
  eligibility: Eligibility;
  status: OppStatus;
  location: string;
  mode: "Online" | "Hybrid" | "On campus" | "In person";
  benefit: string;
  official: boolean;
  lastVerified: string;
  deadline: string;
  why: string[];
  verifyNotes: string[];
  documents: string[];
  process: string[];
  overview: string;
  community?: string;
};

export const CATEGORIES = [
  "Scholarships",
  "Internships",
  "Hackathons",
  "Competitions",
  "Fellowships",
  "Research",
  "Government",
  "Innovation",
  "Events",
  "Startup programs",
];

export const opportunities: Opportunity[] = [
  {
    id: "ai-innovation-challenge",
    title: "AI Innovation Challenge 2026",
    org: "Bharat Innovation Foundation",
    category: "Hackathons",
    daysLeft: 1,
    match: 92,
    eligibility: "likely",
    status: "closing",
    location: "Pan-India",
    mode: "Online",
    benefit: "₹50,000 prize",
    official: true,
    lastVerified: "2 days ago",
    deadline: "15 Sep 2026, 11:59 PM IST",
    why: [
      "Undergraduate student — matches required level",
      "ECE discipline is in scope",
      "Open to applicants across India",
      "You saved two similar AI challenges",
    ],
    verifyNotes: ["Minimum age requirement is not stated on the source page"],
    documents: ["College ID", "Team details", "Project abstract (1 page)"],
    process: [
      "Register the team on the official portal",
      "Submit a one-page abstract",
      "Shortlisted teams build for 36 hours",
      "Final demo to the jury panel",
    ],
    overview:
      "A national build sprint for student teams working on applied AI. Teams of 2–4 submit an abstract, and shortlisted teams get a 36-hour build window with mentor check-ins.",
    community: "ai-builders",
  },
  {
    id: "ug-research-fellowship",
    title: "Undergraduate Research Fellowship",
    org: "Indian Institute of Science",
    category: "Research",
    daysLeft: 3,
    match: 88,
    eligibility: "likely",
    status: "closing",
    location: "Bengaluru, Karnataka",
    mode: "In person",
    benefit: "₹20,000/month stipend",
    official: true,
    lastVerified: "Today",
    deadline: "17 Sep 2026",
    why: [
      "3rd year undergraduate — inside the eligible window",
      "Electronics and signal processing interest matches labs",
      "Karnataka and pan-India applicants accepted",
    ],
    verifyNotes: [],
    documents: ["Transcript", "Statement of interest", "Faculty reference"],
    process: ["Submit online form", "Lab preference ranking", "Interview round"],
    overview:
      "An eight-week summer research placement across host labs, with a stipend, housing support and a final research presentation.",
    community: "ece-researchers",
  },
  {
    id: "national-student-hackathon",
    title: "National Student Hackathon",
    org: "AICTE",
    category: "Competitions",
    daysLeft: 8,
    match: 81,
    eligibility: "potential",
    status: "open",
    location: "Hyderabad, Telangana",
    mode: "Hybrid",
    benefit: "₹1,00,000 prize pool",
    official: true,
    lastVerified: "4 days ago",
    deadline: "22 Sep 2026",
    why: ["Open to all engineering disciplines", "Hybrid participation available"],
    verifyNotes: [
      "Institution must be AICTE-approved — confirm your college code",
      "Team size limits differ between the PDF and the portal",
    ],
    documents: ["College ID", "Nomination letter"],
    process: ["College nominates the team", "Idea submission", "Regional round", "Grand finale"],
    overview:
      "A multi-stage national competition run through participating institutions, with regional rounds ahead of the grand finale.",
  },
  {
    id: "climate-innovation-fellowship",
    title: "Climate Innovation Fellowship",
    org: "Sustain India Trust",
    category: "Fellowships",
    daysLeft: 14,
    match: 74,
    eligibility: "potential",
    status: "open",
    location: "Pan-India",
    mode: "Hybrid",
    benefit: "₹2,00,000 grant + mentorship",
    official: true,
    lastVerified: "1 week ago",
    deadline: "28 Sep 2026",
    why: ["Open to final-year students and recent graduates"],
    verifyNotes: ["Prior climate project experience is described as preferred, not required"],
    documents: ["Project proposal", "Budget outline", "ID proof"],
    process: ["Proposal submission", "Shortlist interview", "Grant agreement"],
    overview:
      "A nine-month fellowship supporting early climate projects with grant funding, a mentor and a cohort of 30 fellows.",
  },
  {
    id: "govt-innovation-program",
    title: "State Innovation Program — Andhra Pradesh",
    org: "AP Innovation Society",
    category: "Government",
    daysLeft: 22,
    match: 69,
    eligibility: "verify",
    status: "needs-verification",
    location: "Andhra Pradesh",
    mode: "On campus",
    benefit: "Seed support up to ₹5,00,000",
    official: true,
    lastVerified: "12 days ago",
    deadline: "6 Oct 2026",
    why: ["Discipline is in scope", "Student founders are eligible"],
    verifyNotes: [
      "Domicile requirement for Andhra Pradesh is unclear",
      "Deadline on the notice differs from the portal — being re-checked",
    ],
    documents: ["Aadhaar", "Institution letter", "Pitch deck"],
    process: ["Portal registration", "District screening", "State jury"],
    overview:
      "State-backed support for student-led ventures, delivered through participating campus incubators.",
  },
  {
    id: "merit-scholarship-ug",
    title: "Undergraduate Merit Scholarship",
    org: "Vidya Trust",
    category: "Scholarships",
    daysLeft: null,
    opensIn: "Opens 12 Oct",
    match: 84,
    eligibility: "likely",
    status: "upcoming",
    location: "Pan-India",
    mode: "Online",
    benefit: "₹75,000 tuition support",
    official: true,
    lastVerified: "3 days ago",
    deadline: "Applications open 12 Oct 2026",
    why: ["Family income band matches", "Undergraduate, years 2–4 eligible"],
    verifyNotes: [],
    documents: ["Marksheets", "Income certificate", "Bank details"],
    process: ["Wait for the window to open", "Submit documents", "Verification call"],
    overview:
      "Annual tuition support for undergraduate students, awarded on academic record and income band.",
  },
  {
    id: "startup-internship-ece",
    title: "Embedded Systems Internship",
    org: "Nexa Robotics",
    category: "Internships",
    daysLeft: 6,
    match: 79,
    eligibility: "likely",
    status: "open",
    location: "Chennai, Tamil Nadu",
    mode: "Hybrid",
    benefit: "₹25,000/month stipend",
    official: false,
    lastVerified: "5 days ago",
    deadline: "20 Sep 2026",
    why: ["ECE discipline", "Embedded C and PCB skills on your profile"],
    verifyNotes: ["Organisation identity submitted, verification in review"],
    documents: ["Resume", "Portfolio link"],
    process: ["Apply with resume", "Take-home task", "Technical call"],
    overview:
      "Six-month internship on robotics firmware, with a possible full-time offer at the end.",
    community: "startup-builders",
  },
  {
    id: "design-challenge-ece",
    title: "ECE Circuit Design Challenge",
    org: "Semicon Skills Council",
    category: "Competitions",
    daysLeft: 30,
    match: 66,
    eligibility: "potential",
    status: "open",
    location: "Pan-India",
    mode: "Online",
    benefit: "Certificate + internship shortlist",
    official: true,
    lastVerified: "6 days ago",
    deadline: "14 Oct 2026",
    why: ["Discipline match"],
    verifyNotes: ["Second-year students may need a mentor endorsement"],
    documents: ["College ID"],
    process: ["Register", "Online round", "Design submission"],
    overview: "A two-round design contest on analog and digital circuit fundamentals.",
  },
];

export function urgencyOf(o: Opportunity): Urgency {
  if (o.status === "upcoming") return "upcoming";
  if (o.daysLeft === null) return "calm";
  if (o.daysLeft <= 1) return "urgent";
  if (o.daysLeft <= 4) return "soon";
  if (o.daysLeft <= 10) return "watch";
  return "calm";
}

export function deadlineLabel(o: Opportunity): string {
  if (o.status === "upcoming") return o.opensIn ?? "Upcoming";
  if (o.daysLeft === null) return "Date to confirm";
  if (o.daysLeft <= 0) return "Closes today";
  if (o.daysLeft === 1) return "1 day left";
  return `${o.daysLeft} days left`;
}

export type ApplicationState =
  | "Saved"
  | "Planning to apply"
  | "Started"
  | "Submitted"
  | "Under review"
  | "Shortlisted"
  | "Interview"
  | "Accepted"
  | "Rejected";

export type Application = {
  id: string;
  oppId: string;
  state: ApplicationState;
  nextAction: string;
  lastActivity: string;
};

export const applications: Application[] = [
  {
    id: "a1",
    oppId: "ai-innovation-challenge",
    state: "Started",
    nextAction: "Finish the abstract — closes tomorrow",
    lastActivity: "Draft saved 4 hours ago",
  },
  {
    id: "a2",
    oppId: "ug-research-fellowship",
    state: "Submitted",
    nextAction: "Wait for lab allocation, expected 24 Sep",
    lastActivity: "Submitted 2 days ago",
  },
  {
    id: "a3",
    oppId: "startup-internship-ece",
    state: "Shortlisted",
    nextAction: "Book your technical call slot",
    lastActivity: "Status changed yesterday",
  },
  {
    id: "a4",
    oppId: "national-student-hackathon",
    state: "Planning to apply",
    nextAction: "Ask your department for the nomination letter",
    lastActivity: "Added 3 days ago",
  },
  {
    id: "a5",
    oppId: "climate-innovation-fellowship",
    state: "Saved",
    nextAction: "Review the proposal format",
    lastActivity: "Saved last week",
  },
];

export const savedIds = ["climate-innovation-fellowship", "merit-scholarship-ug", "design-challenge-ece"];

export type Community = {
  id: string;
  name: string;
  focus: string;
  members: number;
  leader: string;
  activity: string;
  events: { name: string; when: string; mode: string }[];
  opportunities: string[];
  collaborations: { org: string; ask: string; status: string }[];
  about: string;
};

export const communities: Community[] = [
  {
    id: "ai-builders",
    name: "AI Builders",
    focus: "Applied AI projects, hackathon teams, model evaluation",
    members: 4820,
    leader: "Ananya R. — verified leader",
    activity: "12 events hosted · 38 verified participations this month",
    events: [
      { name: "Abstract clinic for AI Innovation Challenge", when: "Tonight, 8:00 PM", mode: "Online" },
      { name: "Evaluation metrics workshop", when: "18 Sep, 6:30 PM", mode: "Online" },
    ],
    opportunities: ["ai-innovation-challenge", "startup-internship-ece"],
    collaborations: [
      { org: "Nexa Robotics", ask: "Beta testers for a vision SDK", status: "Leader approved · opt-in open" },
      { org: "Kalpa Labs", ask: "Student ambassadors, 6 campuses", status: "Under platform verification" },
    ],
    about:
      "A working group for students shipping AI projects. Teams form here for hackathons, and members review each other's submissions before deadlines.",
  },
  {
    id: "ece-researchers",
    name: "ECE Researchers",
    focus: "Research fellowships, lab placements, paper reading",
    members: 2140,
    leader: "Vikram S. — verified leader",
    activity: "6 events hosted · 21 verified participations this month",
    events: [{ name: "Fellowship statement review", when: "16 Sep, 7:00 PM", mode: "Online" }],
    opportunities: ["ug-research-fellowship", "design-challenge-ece"],
    collaborations: [
      { org: "Semicon Skills Council", ask: "Workshop hosts across 4 states", status: "Leader approved" },
    ],
    about:
      "For undergraduates aiming at research placements. Members share lab openings, statement drafts and reference-letter guidance.",
  },
  {
    id: "startup-builders",
    name: "Startup Builders",
    focus: "Founder practice, early product feedback, internships",
    members: 3310,
    leader: "Meera K. — verified leader",
    activity: "9 events hosted · 44 verified participations this month",
    events: [{ name: "Pitch review circle", when: "19 Sep, 8:00 PM", mode: "Online" }],
    opportunities: ["govt-innovation-program", "startup-internship-ece"],
    collaborations: [
      { org: "AP Innovation Society", ask: "Campus awareness drive", status: "Student opt-in open" },
    ],
    about:
      "Student founders and early operators. Weekly pitch reviews and structured feedback from verified organisations.",
  },
  {
    id: "women-in-tech",
    name: "Women in Technology",
    focus: "Mentorship, scholarships, interview practice",
    members: 5610,
    leader: "Priya N. — verified leader",
    activity: "14 events hosted · 52 verified participations this month",
    events: [{ name: "Scholarship documents walkthrough", when: "21 Sep, 6:00 PM", mode: "Online" }],
    opportunities: ["merit-scholarship-ug", "ug-research-fellowship"],
    collaborations: [],
    about: "Mentorship circles, scholarship guidance and interview practice across disciplines.",
  },
];

export const slothLedger = [
  { reason: "Verified participation — National Student Hackathon", points: 120, when: "Aug 2026" },
  { reason: "Profile completion milestone", points: 40, when: "Aug 2026" },
  { reason: "Hosted approved event — Abstract clinic", points: 90, when: "Jul 2026" },
  { reason: "Community contribution — 8 reviewed submissions", points: 60, when: "Jul 2026" },
  { reason: "Certification added and verified", points: 50, when: "Jun 2026" },
];

export const notifications = [
  {
    id: "n1",
    category: "Deadline",
    title: "AI Innovation Challenge closes tomorrow",
    body: "Your abstract is still a draft.",
    when: "20 min ago",
    unread: true,
  },
  {
    id: "n2",
    category: "Application",
    title: "You were shortlisted",
    body: "Nexa Robotics moved your application to Shortlisted.",
    when: "Yesterday",
    unread: true,
  },
  {
    id: "n3",
    category: "Opportunity",
    title: "New strong match — 88%",
    body: "Undergraduate Research Fellowship, IISc.",
    when: "2 days ago",
    unread: false,
  },
  {
    id: "n4",
    category: "Community",
    title: "Collaboration opt-in open",
    body: "AI Builders — beta testing with Nexa Robotics.",
    when: "3 days ago",
    unread: false,
  },
  {
    id: "n5",
    category: "Opportunity",
    title: "Verification updated",
    body: "State Innovation Program deadline is being re-checked.",
    when: "4 days ago",
    unread: false,
  },
];

/* ---------- Poster side ---------- */

export type PosterListing = {
  id: string;
  title: string;
  status: "Draft" | "Needs verification" | "Under review" | "Scheduled" | "Live" | "Closing soon" | "Closed";
  publish: string;
  deadline: string;
  applications: number;
  views: number;
  matchQuality: string;
  verification: "Approved" | "In review" | "Not submitted";
};

export const posterListings: PosterListing[] = [
  {
    id: "p1",
    title: "AI Innovation Challenge 2026",
    status: "Closing soon",
    publish: "1 Sep",
    deadline: "15 Sep",
    applications: 412,
    views: 6240,
    matchQuality: "High — 68% strong matches",
    verification: "Approved",
  },
  {
    id: "p2",
    title: "Embedded Systems Internship",
    status: "Live",
    publish: "6 Sep",
    deadline: "20 Sep",
    applications: 98,
    views: 1810,
    matchQuality: "Medium — 41% strong matches",
    verification: "In review",
  },
  {
    id: "p3",
    title: "Campus Ambassador Program",
    status: "Scheduled",
    publish: "20 Sep",
    deadline: "10 Oct",
    applications: 0,
    views: 0,
    matchQuality: "Estimated medium",
    verification: "Approved",
  },
  {
    id: "p4",
    title: "Winter Research Assistantship",
    status: "Draft",
    publish: "—",
    deadline: "—",
    applications: 0,
    views: 0,
    matchQuality: "Not estimated",
    verification: "Not submitted",
  },
  {
    id: "p5",
    title: "Design Sprint Bootcamp",
    status: "Needs verification",
    publish: "—",
    deadline: "2 Oct",
    applications: 0,
    views: 0,
    matchQuality: "Not estimated",
    verification: "In review",
  },
];

export type DensityDay = { date: string; day: string; listings: number };

export const publishingDensity: DensityDay[] = [
  { date: "12 Sep", day: "Sat", listings: 18 },
  { date: "13 Sep", day: "Sun", listings: 14 },
  { date: "14 Sep", day: "Mon", listings: 10 },
  { date: "15 Sep", day: "Tue", listings: 6 },
  { date: "16 Sep", day: "Wed", listings: 2 },
  { date: "17 Sep", day: "Thu", listings: 5 },
  { date: "18 Sep", day: "Fri", listings: 12 },
  { date: "19 Sep", day: "Sat", listings: 9 },
  { date: "20 Sep", day: "Sun", listings: 3 },
  { date: "21 Sep", day: "Mon", listings: 7 },
  { date: "22 Sep", day: "Tue", listings: 11 },
  { date: "23 Sep", day: "Wed", listings: 4 },
  { date: "24 Sep", day: "Thu", listings: 8 },
  { date: "25 Sep", day: "Fri", listings: 15 },
];

export function densityLevel(n: number): { label: string; token: string } {
  if (n >= 12) return { label: "High competition", token: "urgent" };
  if (n >= 6) return { label: "Medium competition", token: "soon" };
  return { label: "Low competition", token: "trust" };
}

export const posterApplications = [
  { id: "pa1", name: "Aarav M.", opp: "AI Innovation Challenge 2026", stage: "Under review", match: 92, when: "2 h ago" },
  { id: "pa2", name: "Divya S.", opp: "AI Innovation Challenge 2026", stage: "Shortlisted", match: 88, when: "5 h ago" },
  { id: "pa3", name: "Rohit K.", opp: "Embedded Systems Internship", stage: "New", match: 79, when: "Yesterday" },
  { id: "pa4", name: "Sneha P.", opp: "Embedded Systems Internship", stage: "Accepted", match: 84, when: "Yesterday" },
  { id: "pa5", name: "Imran H.", opp: "AI Innovation Challenge 2026", stage: "New", match: 71, when: "2 days ago" },
  { id: "pa6", name: "Lakshmi V.", opp: "AI Innovation Challenge 2026", stage: "Rejected", match: 54, when: "3 days ago" },
];

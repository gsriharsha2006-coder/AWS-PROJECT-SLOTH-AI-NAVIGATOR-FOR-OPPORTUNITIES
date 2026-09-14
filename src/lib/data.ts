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
    id: "smart-india-hackathon",
    title: "Smart India Hackathon 2026 — Software Edition",
    org: "Ministry of Education Innovation Cell, Government of India",
    category: "Hackathons",
    daysLeft: 1,
    match: 92,
    eligibility: "likely",
    status: "closing",
    location: "Pan-India (nodal centres)",
    mode: "Hybrid",
    benefit: "₹1,00,000 per winning team + national recognition",
    official: true,
    lastVerified: "Today",
    deadline: "15 Sep 2026, 11:59 PM IST",
    why: [
      "Open to students of AICTE-approved and UGC-recognised institutions",
      "Undergraduate ECE is inside the eligible disciplines",
      "Team of 6 with at least one female member — your community has open slots",
      "You have shipped two AI projects listed on your profile",
    ],
    verifyNotes: [
      "Your college must register as a participating institute before the team can submit",
    ],
    documents: ["College ID card", "Team of 6 with mentor details", "Idea submission (PDF)"],
    process: [
      "College nominates teams through the SIH portal",
      "Internal hackathon shortlists ideas",
      "Idea submission against a published problem statement",
      "36-hour grand finale at an allotted nodal centre",
    ],
    overview:
      "India's largest nationwide innovation model, run by the Ministry of Education Innovation Cell with AICTE. Student teams solve real problem statements submitted by central ministries, state departments and industry, ending in a 36-hour grand finale.",
    community: "ai-builders",
  },
  {
    id: "iisc-summer-research",
    title: "Summer Research Fellowship (SRFP)",
    org: "Indian Institute of Science, Bengaluru",
    category: "Research",
    daysLeft: 3,
    match: 88,
    eligibility: "likely",
    status: "closing",
    location: "Bengaluru, Karnataka",
    mode: "In person",
    benefit: "₹20,000/month stipend + shared hostel + travel",
    official: true,
    lastVerified: "Today",
    deadline: "17 Sep 2026",
    why: [
      "Second and third-year engineering students are eligible",
      "Your CGPA is above the 8.0 shortlisting band",
      "Signal processing and embedded interests match host labs",
    ],
    verifyNotes: [],
    documents: [
      "Consolidated marksheets",
      "Statement of research interest (500 words)",
      "Recommendation letter from a faculty member",
    ],
    process: [
      "Apply on the IISc fellowship portal",
      "Rank three lab preferences",
      "Faculty shortlisting and offer letter",
      "Eight-week placement with a final presentation",
    ],
    overview:
      "An eight-week summer research placement hosted across IISc departments. Fellows work with a faculty guide and a PhD mentor, receive a monthly stipend and present their work at the closing colloquium.",
    community: "ece-researchers",
  },
  {
    id: "inspire-she-scholarship",
    title: "INSPIRE Scholarship for Higher Education (SHE)",
    org: "Department of Science & Technology, Government of India",
    category: "Scholarships",
    daysLeft: 12,
    match: 86,
    eligibility: "potential",
    status: "open",
    location: "Pan-India",
    mode: "Online",
    benefit: "₹80,000 per year for 5 years",
    official: true,
    lastVerified: "2 days ago",
    deadline: "26 Sep 2026",
    why: [
      "Awarded for pursuing natural and basic sciences at BSc/MSc level",
      "Income band is not a barrier — selection is on academic merit",
    ],
    verifyNotes: [
      "Requires top-1% board rank or a qualifying national exam rank — confirm your eligibility route",
      "Engineering programmes are not covered; check your enrolled degree",
    ],
    documents: [
      "Class XII marksheet or exam rank card",
      "Bonafide certificate from the institution",
      "Aadhaar-linked bank account details",
    ],
    process: [
      "Register on the DST INSPIRE portal",
      "Upload rank proof and institutional bonafide",
      "Provisional offer, then annual renewal on academic performance",
    ],
    overview:
      "A Department of Science & Technology scholarship encouraging talented students to take up basic and natural sciences, paying an annual scholarship plus a summer research grant for five years.",
  },
  {
    id: "flipkart-grid",
    title: "Flipkart GRiD 7.0 — Engineering Challenge",
    org: "Flipkart",
    category: "Competitions",
    daysLeft: 8,
    match: 84,
    eligibility: "likely",
    status: "open",
    location: "Bengaluru, Karnataka (finale)",
    mode: "Hybrid",
    benefit: "Cash prizes + internship and PPO interviews",
    official: true,
    lastVerified: "3 days ago",
    deadline: "22 Sep 2026",
    why: [
      "Open to engineering students graduating in 2027 and 2028",
      "Software and hardware tracks both accept ECE students",
      "Team of up to 3 from the same institute",
    ],
    verifyNotes: ["Track-specific graduation-year rules differ — confirm on the track page"],
    documents: ["College ID", "Resume", "Team details"],
    process: [
      "Register the team on the Flipkart GRiD portal",
      "Online quiz and coding round",
      "Semi-final project submission",
      "Grand finale presentation at Flipkart Bengaluru",
    ],
    overview:
      "Flipkart's national engineering challenge with software and robotics tracks. Finalists interview for internships and pre-placement offers with Flipkart engineering teams.",
    community: "ai-builders",
  },
  {
    id: "amazon-ml-summer-school",
    title: "Amazon ML Summer School India",
    org: "Amazon India",
    category: "Events",
    daysLeft: 14,
    match: 80,
    eligibility: "potential",
    status: "open",
    location: "Pan-India",
    mode: "Online",
    benefit: "Free structured ML curriculum + interview track",
    official: true,
    lastVerified: "4 days ago",
    deadline: "28 Sep 2026",
    why: ["Pre-final and final-year students of any engineering discipline are eligible"],
    verifyNotes: [
      "Selection is through an aptitude and ML fundamentals test — seats are limited",
    ],
    documents: ["Resume", "College ID", "Expected graduation year"],
    process: [
      "Apply on the Amazon Student Programs page",
      "Online selection test",
      "Attend weekend sessions taught by Amazon scientists",
    ],
    overview:
      "A selective, free machine learning school taught by Amazon applied scientists across supervised learning, deep learning, sequential models and reinforcement learning, with an interview track for top participants.",
  },
  {
    id: "startup-india-seed-fund",
    title: "Startup India Seed Fund Scheme",
    org: "DPIIT, Ministry of Commerce & Industry",
    category: "Government",
    daysLeft: 22,
    match: 72,
    eligibility: "verify",
    status: "needs-verification",
    location: "Pan-India (through approved incubators)",
    mode: "On campus",
    benefit: "Up to ₹20,00,000 grant / ₹50,00,000 convertible debentures",
    official: true,
    lastVerified: "9 days ago",
    deadline: "6 Oct 2026 (incubator-wise cycles)",
    why: ["Student founders are eligible", "Your campus incubator is on the approved list"],
    verifyNotes: [
      "The startup must be DPIIT-recognised and incorporated within the last 2 years",
      "Each approved incubator runs its own cut-off date — confirm your incubator's cycle",
    ],
    documents: [
      "DPIIT recognition certificate",
      "Certificate of incorporation",
      "Pitch deck and fund utilisation plan",
    ],
    process: [
      "Apply through the Startup India Seed Fund portal",
      "Select up to three approved incubators",
      "Incubator screening committee pitch",
      "Milestone-linked disbursement",
    ],
    overview:
      "Central government seed support for early-stage startups for proof of concept, prototype development, product trials and market entry, delivered through approved incubators.",
    community: "startup-builders",
  },
  {
    id: "reliance-foundation-scholarship",
    title: "Reliance Foundation Undergraduate Scholarship",
    org: "Reliance Foundation",
    category: "Scholarships",
    daysLeft: null,
    opensIn: "Opens 12 Oct",
    match: 83,
    eligibility: "likely",
    status: "upcoming",
    location: "Pan-India",
    mode: "Online",
    benefit: "Up to ₹2,00,000 total tuition support",
    official: true,
    lastVerified: "3 days ago",
    deadline: "Applications open 12 Oct 2026",
    why: [
      "First-year undergraduates across all streams are eligible",
      "Household income under ₹15 lakh matches the stated band",
    ],
    verifyNotes: [],
    documents: [
      "Class XII marksheet",
      "Family income proof",
      "Aadhaar and bank account details",
    ],
    process: [
      "Wait for the application window to open",
      "Aptitude assessment",
      "Document verification call",
      "Scholarship disbursement to the institution",
    ],
    overview:
      "A merit-and-need scholarship for undergraduate students in India, combining tuition support with mentoring, networking and access to the Reliance Foundation scholar community.",
  },
  {
    id: "iitb-research-internship",
    title: "Research Internship Award",
    org: "Indian Institute of Technology Bombay",
    category: "Internships",
    daysLeft: 6,
    match: 79,
    eligibility: "likely",
    status: "open",
    location: "Mumbai, Maharashtra",
    mode: "In person",
    benefit: "₹15,000/month stipend + hostel",
    official: true,
    lastVerified: "2 days ago",
    deadline: "20 Sep 2026",
    why: [
      "Third-year BTech students from recognised institutes are eligible",
      "Embedded C and PCB design skills match the listed lab requirements",
    ],
    verifyNotes: [],
    documents: ["Transcript", "Resume", "Faculty recommendation", "Statement of purpose"],
    process: [
      "Apply through the IIT Bombay RIA portal",
      "Faculty guide matching",
      "Offer letter and joining formalities",
    ],
    overview:
      "A two-month research internship across IIT Bombay departments and centres, where interns join an ongoing project under a faculty guide and submit a closing report.",
    community: "ece-researchers",
  },
  {
    id: "nidhi-prayas-grant",
    title: "NIDHI-PRAYAS Prototype Grant",
    org: "Department of Science & Technology / NIDHI",
    category: "Innovation",
    daysLeft: 18,
    match: 74,
    eligibility: "potential",
    status: "open",
    location: "Pan-India (PRAYAS centres)",
    mode: "Hybrid",
    benefit: "Up to ₹10,00,000 for prototype development",
    official: true,
    lastVerified: "6 days ago",
    deadline: "2 Oct 2026",
    why: ["Individual innovators, including students, can apply without a registered company"],
    verifyNotes: [
      "Hardware-oriented ideas are prioritised — software-only proposals are often out of scope",
    ],
    documents: ["Idea proposal", "Bill of materials and budget", "ID and institution proof"],
    process: [
      "Apply to a PRAYAS centre",
      "Technical screening",
      "Committee presentation",
      "Milestone-based grant release",
    ],
    overview:
      "A DST-supported grant that lets young innovators build a working prototype, with access to a fabrication lab, mentoring and milestone-linked funding.",
    community: "startup-builders",
  },
  {
    id: "isro-respond-project",
    title: "RESPOND Basket — Student Research Projects",
    org: "Indian Space Research Organisation",
    category: "Research",
    daysLeft: 30,
    match: 68,
    eligibility: "potential",
    status: "open",
    location: "Pan-India (host institutions)",
    mode: "On campus",
    benefit: "Project funding + ISRO centre mentoring",
    official: true,
    lastVerified: "5 days ago",
    deadline: "14 Oct 2026",
    why: ["Electronics, communications and signal processing topics are in the published basket"],
    verifyNotes: [
      "Proposals are submitted by a faculty principal investigator — a student cannot apply alone",
    ],
    documents: ["Faculty-led proposal", "Institutional endorsement", "Work plan"],
    process: [
      "Pick a topic from the RESPOND basket",
      "Faculty submits the proposal",
      "Technical review by the ISRO centre",
      "Sanction and periodic review meetings",
    ],
    overview:
      "ISRO's programme to fund academic research in space science, technology and applications, carried out at Indian universities and institutions with an ISRO centre as technical mentor.",
  },
  {
    id: "adobe-india-hackathon",
    title: "Adobe India Hackathon",
    org: "Adobe India",
    category: "Hackathons",
    daysLeft: 11,
    match: 76,
    eligibility: "likely",
    status: "open",
    location: "Noida / Bengaluru (finale)",
    mode: "Hybrid",
    benefit: "Cash prizes + internship interviews",
    official: true,
    lastVerified: "4 days ago",
    deadline: "25 Sep 2026",
    why: [
      "Open to engineering students graduating in 2027 or 2028",
      "Document intelligence track matches your ML project work",
    ],
    verifyNotes: [],
    documents: ["College ID", "Resume", "GitHub or portfolio link"],
    process: ["Register individually", "Round 1 build submission", "Finale at an Adobe office"],
    overview:
      "Adobe's student hackathon around document intelligence and creative tooling, with shortlisted participants interviewing for Adobe internships.",
    community: "ai-builders",
  },
  {
    id: "aicte-idea-lab-bootcamp",
    title: "AICTE IDEA Lab Innovation Bootcamp",
    org: "All India Council for Technical Education",
    category: "Startup programs",
    daysLeft: 26,
    match: 65,
    eligibility: "potential",
    status: "open",
    location: "Host IDEA Labs across states",
    mode: "On campus",
    benefit: "Fabrication access + mentoring + certificate",
    official: true,
    lastVerified: "8 days ago",
    deadline: "10 Oct 2026",
    why: ["Students of AICTE-approved institutions can apply directly"],
    verifyNotes: ["Seats are allotted per host lab — nearest centre may be in another district"],
    documents: ["College ID", "Short idea note"],
    process: ["Pick a host IDEA Lab", "Submit idea note", "Attend the residential bootcamp"],
    overview:
      "A hands-on bootcamp inside AICTE IDEA Labs where student teams learn prototyping, electronics fabrication and product thinking with campus mentors.",
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
    oppId: "smart-india-hackathon",
    state: "Started",
    nextAction: "Finish the idea submission — closes tomorrow",
    lastActivity: "Draft saved 4 hours ago",
  },
  {
    id: "a2",
    oppId: "iisc-summer-research",
    state: "Submitted",
    nextAction: "Wait for lab allocation, expected 24 Sep",
    lastActivity: "Submitted 2 days ago",
  },
  {
    id: "a3",
    oppId: "iitb-research-internship",
    state: "Shortlisted",
    nextAction: "Share your faculty recommendation letter",
    lastActivity: "Status changed yesterday",
  },
  {
    id: "a4",
    oppId: "flipkart-grid",
    state: "Planning to apply",
    nextAction: "Confirm the third team member before registering",
    lastActivity: "Added 3 days ago",
  },
  {
    id: "a5",
    oppId: "inspire-she-scholarship",
    state: "Saved",
    nextAction: "Check whether your degree is covered",
    lastActivity: "Saved last week",
  },
];

export const savedIds = [
  "inspire-she-scholarship",
  "reliance-foundation-scholarship",
  "isro-respond-project",
];

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
      { name: "Idea submission clinic for Smart India Hackathon", when: "Tonight, 8:00 PM", mode: "Online" },
      { name: "Evaluation metrics workshop", when: "18 Sep, 6:30 PM", mode: "Online" },
    ],
    opportunities: ["smart-india-hackathon", "flipkart-grid", "adobe-india-hackathon"],
    collaborations: [
      { org: "Zoho Labs", ask: "Beta testers for a vision SDK", status: "Leader approved · opt-in open" },
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
    opportunities: ["iisc-summer-research", "iitb-research-internship", "isro-respond-project"],
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
    opportunities: ["startup-india-seed-fund", "nidhi-prayas-grant", "aicte-idea-lab-bootcamp"],
    collaborations: [
      { org: "T-Hub Hyderabad", ask: "Campus awareness drive", status: "Student opt-in open" },
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
    opportunities: ["reliance-foundation-scholarship", "inspire-she-scholarship"],
    collaborations: [],
    about: "Mentorship circles, scholarship guidance and interview practice across disciplines.",
  },
];

export const slothLedger = [
  { reason: "Verified participation — Smart India Hackathon internal round", points: 120, when: "Aug 2026" },
  { reason: "Profile completion milestone", points: 40, when: "Aug 2026" },
  { reason: "Hosted approved event — Idea submission clinic", points: 90, when: "Jul 2026" },
  { reason: "Community contribution — 8 reviewed submissions", points: 60, when: "Jul 2026" },
  { reason: "Certification added and verified", points: 50, when: "Jun 2026" },
];

export const notifications = [
  {
    id: "n1",
    category: "Deadline",
    title: "Smart India Hackathon closes tomorrow",
    body: "Your idea submission is still a draft.",
    when: "20 min ago",
    unread: true,
  },
  {
    id: "n2",
    category: "Application",
    title: "You were shortlisted",
    body: "IIT Bombay moved your Research Internship Award application to Shortlisted.",
    when: "Yesterday",
    unread: true,
  },
  {
    id: "n3",
    category: "Opportunity",
    title: "New strong match — 88%",
    body: "Summer Research Fellowship, IISc Bengaluru.",
    when: "2 days ago",
    unread: false,
  },
  {
    id: "n4",
    category: "Community",
    title: "Collaboration opt-in open",
    body: "AI Builders — beta testing with Zoho Labs.",
    when: "3 days ago",
    unread: false,
  },
  {
    id: "n5",
    category: "Opportunity",
    title: "Verification updated",
    body: "Startup India Seed Fund incubator cycle is being re-checked.",
    when: "4 days ago",
    unread: false,
  },
];

/* ---------- Sloth Membership ---------- */

export type MembershipTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  includes: string[];
  limits: string[];
  current?: boolean;
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "free",
    name: "Sloth Free",
    price: "₹0",
    cadence: "always free",
    summary: "Everything needed to find, understand and apply to opportunities.",
    includes: [
      "Personalised matches and eligibility explanations",
      "Deadline intelligence and Slot Calendar",
      "Join up to 3 communities",
      "Earn Sloth Points from verified participation",
    ],
    limits: ["Cannot host community events", "One community membership request at a time"],
    current: true,
  },
  {
    id: "plus",
    name: "Sloth Plus",
    price: "₹149",
    cadence: "per month",
    summary: "For students who apply often and prepare with a group.",
    includes: [
      "Unlimited community memberships",
      "Host up to 2 approved events a month",
      "Priority eligibility re-checks on saved listings",
      "Extended profile surface with project showcase",
      "1.5× Sloth Points on verified participation",
    ],
    limits: ["Collaboration hosting still requires leader approval"],
  },
  {
    id: "leader",
    name: "Sloth Leader",
    price: "₹399",
    cadence: "per month",
    summary: "Tools for verified community leaders running teams and events.",
    includes: [
      "Full event hosting toolkit with attendance verification",
      "Create and moderate a community",
      "Receive organisation collaboration requests",
      "Cohort analytics for your community",
      "2× Sloth Points and enhanced discovery visibility",
    ],
    limits: [
      "Leadership eligibility is still earned through verified contribution — membership only unlocks the tools",
    ],
  },
];

export type Redemption = {
  id: string;
  name: string;
  cost: number;
  detail: string;
  category: "Membership" | "Community" | "Profile" | "Preparation";
  available: boolean;
};

export const redemptions: Redemption[] = [
  {
    id: "r1",
    name: "One month of Sloth Plus",
    cost: 1200,
    detail: "Applied to your next billing cycle instead of a payment.",
    category: "Membership",
    available: true,
  },
  {
    id: "r2",
    name: "Event hosting pass",
    cost: 600,
    detail: "Host one approved community event without a Plus membership.",
    category: "Community",
    available: true,
  },
  {
    id: "r3",
    name: "Profile spotlight for 14 days",
    cost: 450,
    detail: "Your verified profile is surfaced to organisations in your disciplines.",
    category: "Profile",
    available: true,
  },
  {
    id: "r4",
    name: "Application review by a verified leader",
    cost: 800,
    detail: "A leader in a relevant community reviews one application draft.",
    category: "Preparation",
    available: true,
  },
  {
    id: "r5",
    name: "Collaboration priority slot",
    cost: 1500,
    detail: "Earlier access to organisation collaborations opened in your communities.",
    category: "Community",
    available: false,
  },
];

export const slothBalance = 960;

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
    title: "Smart India Hackathon 2026 — Campus round",
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
  { id: "pa1", name: "Aarav M.", opp: "Smart India Hackathon 2026 — Campus round", stage: "Under review", match: 92, when: "2 h ago" },
  { id: "pa2", name: "Divya S.", opp: "Smart India Hackathon 2026 — Campus round", stage: "Shortlisted", match: 88, when: "5 h ago" },
  { id: "pa3", name: "Rohit K.", opp: "Embedded Systems Internship", stage: "New", match: 79, when: "Yesterday" },
  { id: "pa4", name: "Sneha P.", opp: "Embedded Systems Internship", stage: "Accepted", match: 84, when: "Yesterday" },
  { id: "pa5", name: "Imran H.", opp: "Smart India Hackathon 2026 — Campus round", stage: "New", match: 71, when: "2 days ago" },
  { id: "pa6", name: "Lakshmi V.", opp: "Smart India Hackathon 2026 — Campus round", stage: "Rejected", match: 54, when: "3 days ago" },
];

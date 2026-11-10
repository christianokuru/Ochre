// Hardcoded marketing content for Ochre. All companies and people are fictional.

export const NAV = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
];

export const PAYMENTS = [
  { studio: "Imole Studio", city: "Lagos", amount: "₦7,200,000" },
  { studio: "Paper Moon Type", city: "Lisbon", amount: "€1,250" },
  { studio: "Kumo Motion", city: "Osaka", amount: "¥680,000" },
  { studio: "Field & Frame", city: "Austin", amount: "$9,400" },
  { studio: "Atelier Brume", city: "Lyon", amount: "€3,600" },
  { studio: "Northbound", city: "Toronto", amount: "CA$7,200" },
  { studio: "Mira Okoye Photo", city: "Lagos", amount: "$2,150" },
  { studio: "Small Hours", city: "Glasgow", amount: "£5,900" },
  { studio: "Casa Tinta", city: "Mexico City", amount: "$3,300" },
  { studio: "Ostrava Works", city: "Prague", amount: "€2,700" },
  { studio: "Tidewater", city: "Sydney", amount: "A$11,800" },
  { studio: "Linden Studio", city: "Berlin", amount: "€6,450" },
];

export const STUDIO_LOGOS: { name: string; style: string }[] = [
  { name: "IMOLE", style: "font-sans font-bold tracking-[0.35em] text-sm" },
  { name: "Paper Moon", style: "font-serif italic text-2xl" },
  { name: "kumo/motion", style: "font-mono text-base lowercase" },
  { name: "Field&Frame", style: "font-sans font-black tracking-tight text-xl" },
  { name: "Atelier Brume", style: "font-serif text-2xl" },
  { name: "SMALL HOURS", style: "font-sans font-semibold tracking-[0.2em] text-xs" },
];

export const HERO_EVENTS = [
  { h: 2, title: "Nothing is due.", body: "Ochre is quiet. You should be too." },
  { h: 7.6, title: "Morning digest", body: "3 invoices due this week · $12,450 expected" },
  { h: 9.2, title: "Proposal viewed (4th time)", body: "Fernhill Coffee is reading the Packaging section" },
  { h: 11.1, title: "Contract signed", body: "Nordlys Architects · Brand guidelines, phase 2" },
  { h: 13.5, title: "Deposit received", body: "$2,550 from Paloma Films · arrives tomorrow" },
  { h: 15.8, title: "Reminder sent for you", body: "Invoice #0139, politely, to Saltmarsh Records" },
  { h: 17.7, title: "Invoice #0142 paid", body: "$4,800 · Verso Hotels · 2 days early" },
  { h: 20.25, title: "Weekly profit report", body: "Studio margin 41% · best month since March" },
  { h: 23.5, title: "Lights out", body: "Payments keep landing while you sleep." },
];

export const LIFECYCLE = [
  {
    n: "01",
    key: "inquiry",
    title: "Inquiry",
    line: "A form on your site that qualifies leads before you ever reply.",
  },
  {
    n: "02",
    key: "proposal",
    title: "Proposal",
    line: "Interactive proposals clients configure themselves. You see every view.",
  },
  {
    n: "03",
    key: "contract",
    title: "Contract",
    line: "Your terms, pre-filled from the proposal, signed in one click.",
  },
  {
    n: "04",
    key: "invoice",
    title: "Invoice",
    line: "Deposits and milestones scheduled the moment they sign.",
  },
  {
    n: "05",
    key: "paid",
    title: "Paid",
    line: "Card, bank or wallet. Money in your account next business day.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We used to lose a day a week to admin. Now a proposal goes out before the call has even ended, and half of them are signed by morning.",
    name: "Tolu Adeyemi",
    role: "Founder, Imole Studio",
    city: "Lagos",
    hue: ["#f2a25a", "#6f4a5c"],
    stat: "+38%",
    statLabel: "proposal close rate",
  },
  {
    quote:
      "The first tool our whole team actually likes opening. Clients comment on how good the invoices look, which is a strange sentence to say out loud.",
    name: "Kenji Arai",
    role: "Partner, Kumo Motion",
    city: "Osaka",
    hue: ["#7fb1e3", "#3f3d78"],
    stat: "9 days",
    statLabel: "faster to get paid",
  },
  {
    quote:
      "I'm a photographer, not an accountant. Ochre chases the late payments so I don't have to be the bad guy.",
    name: "Mira Okoye",
    role: "Photographer",
    city: "Lagos",
    hue: ["#f0c8b0", "#b06a8a"],
    stat: "$0",
    statLabel: "written off last year",
  },
];

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  seats: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    monthly: 19,
    annual: 15,
    blurb: "For freelancers who want to look like a studio.",
    seats: "1 seat",
    cta: "Start free",
    features: [
      "Unlimited proposals & invoices",
      "Contracts with e-signature",
      "Client portal on your domain",
      "Card & bank payments",
      "Automatic reminders",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 49,
    annual: 39,
    blurb: "For small teams that bill by the project.",
    seats: "Up to 5 seats",
    cta: "Start free",
    featured: true,
    features: [
      "Everything in Solo",
      "Time tracking & project profit",
      "Proposal analytics (who read what)",
      "Retainers & recurring invoices",
      "Payouts in 38 currencies",
      "Zapier, Figma, Slack & Notion",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    monthly: 129,
    annual: 103,
    blurb: "For established studios with real overheads.",
    seats: "Up to 20 seats",
    cta: "Talk to us",
    features: [
      "Everything in Studio",
      "Resource planning & capacity",
      "Multi-entity & multi-currency books",
      "Custom contract templates review",
      "SSO & audit log",
      "A human who answers, same day",
    ],
  },
];

export const COMPARISON: { group: string; rows: { label: string; v: (boolean | string)[] }[] }[] = [
  {
    group: "Win the work",
    rows: [
      { label: "Interactive proposals", v: [true, true, true] },
      { label: "Proposal view analytics", v: [false, true, true] },
      { label: "Package & add-on pricing", v: [true, true, true] },
      { label: "Branded client portal", v: ["ochre.page", "Custom domain", "Custom domain"] },
    ],
  },
  {
    group: "Get paid",
    rows: [
      { label: "Card fee", v: ["2.9% + 30¢", "2.7% + 30¢", "2.5% + 30¢"] },
      { label: "Bank transfer fee", v: ["0%", "0%", "0%"] },
      { label: "Payout speed", v: ["2 days", "Next day", "Same day"] },
      { label: "Multi-currency payouts", v: [false, true, true] },
    ],
  },
  {
    group: "Run the studio",
    rows: [
      { label: "Time tracking", v: [false, true, true] },
      { label: "Project profitability", v: [false, true, true] },
      { label: "Capacity planning", v: [false, false, true] },
      { label: "SSO & audit log", v: [false, false, true] },
    ],
  },
];

export const FAQS = [
  {
    q: "Is there really a free trial?",
    a: "Thirty days, every feature, no card. If you send a proposal and it gets signed during the trial, we'll extend it another month on us.",
  },
  {
    q: "Do you take a cut of my invoices?",
    a: "Never on bank transfers. Card payments carry the processor fee shown in the table, which you can choose to pass on to your client.",
  },
  {
    q: "Can I bring my existing contracts?",
    a: "Yes. Paste them in and Ochre turns the variables (client name, fees, dates) into fields that fill themselves from the proposal.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "Export everything (clients, documents, invoices, time) as CSV and PDF in one click. Your client portal stays readable for a year after you cancel.",
  },
  {
    q: "Do you work with accountants?",
    a: "Ochre syncs with Xero, QuickBooks and FreeAgent, and you can invite your accountant for free with read-only access.",
  },
];

export type Story = {
  slug: string;
  studio: string;
  discipline: "Branding" | "Photography" | "Architecture" | "Motion" | "Illustration";
  city: string;
  headline: string;
  metric: string;
  metricLabel: string;
  person: string;
  role: string;
  hue: [string, string];
  hour: number;
  quote: string;
  intro: string;
  body: string[];
  stats: { v: string; l: string }[];
  uses: string[];
};

export const STORIES: Story[] = [
  {
    slug: "imole-studio",
    studio: "Imole Studio",
    discipline: "Branding",
    city: "Ikoyi, Lagos",
    headline: "How a four-person branding studio stopped writing proposals at midnight",
    metric: "+38%",
    metricLabel: "close rate",
    person: "Tolu Adeyemi",
    role: "Founder",
    hue: ["#f2a25a", "#6f4a5c"],
    hour: 18.2,
    quote: "A proposal used to be a Thursday night. Now it's a coffee.",
    intro:
      "Imole Studio designs identities for restaurants, fashion labels and fintechs from a converted townhouse in Ikoyi. Their work is meticulous. Until last year, their paperwork wasn't.",
    body: [
      "Tolu's team was sending PDF proposals built in a design tool, contracts from a word processor and invoices from an accounting app that none of them enjoyed opening. Each new project meant re-typing the same client details three times.",
      "They moved to Ochre over a weekend. Their old proposal became a template with three packages and a handful of add-ons; clients now pick what they want, see the total change, and sign on the same page. Half of them pay in dollars from London and New York, the other half in naira from down the road, and it all lands in one account.",
      "The surprise was the analytics. Seeing that a prospect had read the Packaging section six times told them exactly what to talk about on the follow-up call. Their close rate went from 41% to 57% in two quarters.",
    ],
    stats: [
      { v: "57%", l: "close rate, up from 41%" },
      { v: "6 hrs", l: "saved per proposal" },
      { v: "4 days", l: "average time to deposit" },
    ],
    uses: ["Proposals", "Contracts", "Deposits", "Client portal"],
  },
  {
    slug: "kumo-motion",
    studio: "Kumo Motion",
    discipline: "Motion",
    city: "Osaka",
    headline: "Kumo Motion gets paid nine days faster, in three currencies",
    metric: "9 days",
    metricLabel: "faster payment",
    person: "Kenji Arai",
    role: "Partner",
    hue: ["#7fb1e3", "#3f3d78"],
    hour: 8.5,
    quote: "We bill in yen, dollars and euros. Ochre makes that boring, which is the highest compliment.",
    intro:
      "A twelve-person animation studio working with agencies in Tokyo, New York and Amsterdam, where every client has a different invoicing ritual.",
    body: [
      "Before Ochre, Kumo's producers kept a spreadsheet of who owed what, in which currency, and when they had last been nudged. Late payments were normal; awkward follow-up emails were a weekly chore.",
      "Now milestone invoices are generated from the signed proposal and go out automatically when a phase is marked done. Reminders are sent on a schedule the team wrote once, in their own tone of voice.",
      "Average days-to-paid dropped from 31 to 22 in the first quarter. The producers spend that time producing.",
    ],
    stats: [
      { v: "22 days", l: "average to paid, from 31" },
      { v: "3", l: "currencies, one dashboard" },
      { v: "0", l: "reminder emails written by hand" },
    ],
    uses: ["Milestone invoices", "Multi-currency", "Reminders", "Time tracking"],
  },
  {
    slug: "mira-okoye",
    studio: "Mira Okoye Photo",
    discipline: "Photography",
    city: "Lagos",
    headline: "A solo photographer who hasn't written off an invoice since",
    metric: "$0",
    metricLabel: "written off",
    person: "Mira Okoye",
    role: "Photographer",
    hue: ["#f0c8b0", "#b06a8a"],
    hour: 17.4,
    quote: "Ochre is the bad cop. I get to stay the nice photographer.",
    intro:
      "Mira shoots editorial and commercial work across West Africa and Europe, mostly alone, often on location with patchy signal.",
    body: [
      "Chasing payment from a magazine while you're on a shoot for another one is miserable. Mira was writing off two or three invoices a year simply because she didn't have the energy to keep asking.",
      "With Ochre, a 50% deposit is due on signature, and the balance invoice is sent the day the gallery is delivered. Clients pay by card or bank transfer from their phone.",
      "She hasn't written off a single invoice in fourteen months.",
    ],
    stats: [
      { v: "$0", l: "written off in 14 months" },
      { v: "50%", l: "deposit on every booking" },
      { v: "1 tap", l: "for clients to pay" },
    ],
    uses: ["Bookings", "Deposits", "Mobile payments", "Reminders"],
  },
  {
    slug: "nordlys-architects",
    studio: "Nordlys Architects",
    discipline: "Architecture",
    city: "Oslo",
    headline: "Long projects, clear money: Nordlys tracks profit phase by phase",
    metric: "41%",
    metricLabel: "margin",
    person: "Ingrid Sæther",
    role: "Managing partner",
    hue: ["#a7bccd", "#0c4243"],
    hour: 12.5,
    quote: "We finally know which projects pay for the studio and which ones the studio pays for.",
    intro:
      "Residential and cultural projects that run for eighteen months or more, with fee stages that rarely line up with the actual work.",
    body: [
      "Nordlys used to find out whether a project was profitable after it ended. Ochre's time tracking ties every hour to a fee stage, so the margin is visible while there is still time to act on it.",
      "When a phase starts to run over, the project lead sees it in the weekly report and can raise a change order from the same screen, pre-filled and ready to sign.",
    ],
    stats: [
      { v: "41%", l: "studio margin, from 29%" },
      { v: "12", l: "change orders signed last year" },
      { v: "1", l: "place for fees, time and invoices" },
    ],
    uses: ["Time tracking", "Profitability", "Change orders", "Retainers"],
  },
  {
    slug: "paper-moon-type",
    studio: "Paper Moon Type",
    discipline: "Illustration",
    city: "Lisbon",
    headline: "Licensing lettering to 40 brands without a single spreadsheet",
    metric: "40",
    metricLabel: "active licences",
    person: "Inês Carvalho",
    role: "Lettering artist",
    hue: ["#d4c7ff", "#714cb6"],
    hour: 10,
    quote: "Renewals used to slip through the cracks. Now they invoice themselves.",
    intro:
      "Inês draws custom lettering and licenses it for packaging, campaigns and broadcast, each with its own term and territory.",
    body: [
      "Recurring invoices handle annual licence renewals, and the client portal holds every signed licence so brands can find their own paperwork.",
      "The time she used to spend on admin now goes into a type family she has been sketching for three years.",
    ],
    stats: [
      { v: "40", l: "licences on auto-renew" },
      { v: "100%", l: "renewal invoices on time" },
      { v: "1", l: "type family finally in progress" },
    ],
    uses: ["Recurring invoices", "Client portal", "Contracts"],
  },
  {
    slug: "field-and-frame",
    studio: "Field & Frame",
    discipline: "Photography",
    city: "Austin",
    headline: "From inquiry to booked in 11 minutes, on a Saturday",
    metric: "11 min",
    metricLabel: "to booked",
    person: "Marcus Bell",
    role: "Co-founder",
    hue: ["#f4d6b0", "#9a6a78"],
    hour: 15.8,
    quote: "Someone booked a full brand shoot while I was at my kid's soccer game.",
    intro:
      "A two-person commercial photography studio that does most of its business through a contact form.",
    body: [
      "Field & Frame's inquiry form now asks the right questions up front and sends a matching proposal automatically for standard shoots.",
      "Clients choose a package, sign and pay the deposit on their phone. Marcus finds out when the money has already landed.",
    ],
    stats: [
      { v: "11 min", l: "inquiry to booked, fastest" },
      { v: "62%", l: "of shoots booked without a call" },
      { v: "2", l: "people, one tidy studio" },
    ],
    uses: ["Inquiry forms", "Auto-proposals", "Deposits"],
  },
];

export const CHANGELOG = [
  {
    date: "Nov 4, 2026",
    version: "4.8",
    tag: "New",
    title: "Ochre Payouts: next-day money in 38 currencies",
    body: "Get paid in your client's currency and receive it in yours, the next business day. Live FX rates, no hidden spread.",
    bullets: ["Supports 38 currencies at launch", "Per-client default currency", "Payout schedule: daily, weekly or on demand"],
    art: "payouts",
  },
  {
    date: "Oct 21, 2026",
    version: "4.7",
    tag: "Improved",
    title: "Proposal heatmaps",
    body: "See which sections a client lingers on, now broken down by reader when a proposal is shared within their team.",
    bullets: ["Per-reader timelines", "Section dwell time", "Email digest of proposal activity"],
    art: "heatmap",
  },
  {
    date: "Oct 2, 2026",
    version: "4.6",
    tag: "New",
    title: "Change orders",
    body: "Scope crept? Raise a change order from any project. It inherits the contract, shows the delta and collects a signature.",
    bullets: ["Inherited terms & rates", "Before/after fee comparison", "Auto-updates the invoice schedule"],
    art: "change",
  },
  {
    date: "Sep 15, 2026",
    version: "4.5",
    tag: "Improved",
    title: "Reminders that sound like you",
    body: "Write your reminder sequence once, in your own voice. Ochre sends it on schedule and stops the moment a payment lands.",
    bullets: ["Tone presets: warm, neutral, firm", "Skip weekends & holidays", "Pause per client"],
    art: "reminders",
  },
  {
    date: "Aug 28, 2026",
    version: "4.4",
    tag: "Fixed",
    title: "Faster portal, fewer clicks",
    body: "The client portal now loads in under 400ms worldwide and remembers clients across devices.",
    bullets: ["New edge caching", "Magic-link sign-in for clients", "Fixed PDF fonts on Windows"],
    art: "speed",
  },
  {
    date: "Aug 6, 2026",
    version: "4.3",
    tag: "New",
    title: "Capacity planning for Atelier",
    body: "See who's free next month before you say yes to the next project.",
    bullets: ["Team availability heatmap", "Tentative bookings from proposals", "Holiday calendars"],
    art: "capacity",
  },
];

export const TEAM = [
  { name: "Ada Nwosu", role: "Co-founder, CEO", city: "London", hue: ["#f2a25a", "#421d24"] },
  { name: "Tomás Reyes", role: "Co-founder, Design", city: "Lisbon", hue: ["#d4c7ff", "#714cb6"] },
  { name: "Hana Sato", role: "Engineering", city: "Tokyo", hue: ["#7fb1e3", "#3f3d78"] },
  { name: "Luca Ferri", role: "Payments", city: "Milan", hue: ["#f0c8b0", "#b06a8a"] },
  { name: "Noor Haddad", role: "Customer success", city: "Amman", hue: ["#a7bccd", "#0c4243"] },
  { name: "Elliot Park", role: "Engineering", city: "Seoul", hue: ["#f4d6b0", "#9a6a78"] },
  { name: "Freya Lund", role: "Brand & content", city: "Copenhagen", hue: ["#c9c0e6", "#6f4a5c"] },
  { name: "Sam Achebe", role: "Growth", city: "Lagos", hue: ["#f2b48a", "#4a3f63"] },
];

export const ROLES = [
  { title: "Senior product engineer, Payments", place: "Remote · Europe", team: "Engineering" },
  { title: "Product designer, Client experience", place: "Remote · Anywhere", team: "Design" },
  { title: "Customer success lead, Americas", place: "Remote · Americas", team: "Success" },
];

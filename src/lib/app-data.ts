// Hardcoded workspace data for the Ochre app demo ("Imole Studio", Ikoyi, Lagos). All fictional.
// "Today" in this demo is Tuesday, November 10, 2026.

export const ME = { name: "Tolu Adeyemi", first: "Tolu", email: "tolu@imole.studio", initials: "TA" };
export const STUDIO = { name: "Imole Studio", city: "Ikoyi, Lagos", plan: "Studio" };

export type Client = {
  id: string;
  name: string;
  contact: string;
  email: string;
  city: string;
  industry: string;
  ltv: number;
  projects: number;
  since: string;
  lastContact: string;
  health: "great" | "ok" | "quiet";
  hue: [string, string];
};

export const CLIENTS: Client[] = [
  { id: "fernhill", name: "Fernhill Coffee", contact: "Theo Marsh", email: "theo@fernhill.coffee", city: "Portland", industry: "Hospitality", ltv: 48200, projects: 4, since: "2023", lastContact: "Today", health: "great", hue: ["#f2a25a", "#6f4a5c"] },
  { id: "nordlys", name: "Nordlys Architects", contact: "Ingrid Sæther", email: "ingrid@nordlys.no", city: "Oslo", industry: "Architecture", ltv: 86500, projects: 6, since: "2022", lastContact: "Yesterday", health: "great", hue: ["#a7bccd", "#0c4243"] },
  { id: "paloma", name: "Paloma Films", contact: "Lucía Ortega", email: "lucia@palomafilms.mx", city: "Mexico City", industry: "Film", ltv: 31400, projects: 3, since: "2024", lastContact: "3 days ago", health: "ok", hue: ["#f0c8b0", "#b06a8a"] },
  { id: "juniper", name: "Juniper & Rye", contact: "Hannah Cole", email: "hannah@juniperandrye.com", city: "Melbourne", industry: "Food", ltv: 22900, projects: 2, since: "2024", lastContact: "1 week ago", health: "ok", hue: ["#f4d6b0", "#9a6a78"] },
  { id: "okapi", name: "Okapi Bikes", contact: "Daniel Mensah", email: "daniel@okapi.bike", city: "Accra", industry: "Mobility", ltv: 39800, projects: 3, since: "2023", lastContact: "4 days ago", health: "great", hue: ["#7fb1e3", "#3f3d78"] },
  { id: "saltmarsh", name: "Saltmarsh Records", contact: "Owen Price", email: "owen@saltmarsh.co.uk", city: "Bristol", industry: "Music", ltv: 14600, projects: 2, since: "2025", lastContact: "2 weeks ago", health: "quiet", hue: ["#c9c0e6", "#714cb6"] },
  { id: "verso", name: "Verso Hotels", contact: "Camille Roux", email: "camille@verso-hotels.fr", city: "Lyon", industry: "Hospitality", ltv: 72300, projects: 5, since: "2022", lastContact: "Today", health: "great", hue: ["#d4c7ff", "#421d24"] },
  { id: "kettle", name: "Kettle Labs", contact: "Priya Raman", email: "priya@kettlelabs.io", city: "Bengaluru", industry: "Software", ltv: 26100, projects: 2, since: "2025", lastContact: "5 days ago", health: "ok", hue: ["#b5afbf", "#4a3f63"] },
  { id: "meadow", name: "Meadow Health", contact: "Jonas Weber", email: "jonas@meadow.health", city: "Berlin", industry: "Health", ltv: 18750, projects: 1, since: "2026", lastContact: "1 month ago", health: "quiet", hue: ["#c7def2", "#577a8f"] },
  { id: "arcadia", name: "Arcadia Books", contact: "Ruth Okafor", email: "ruth@arcadiabooks.co.uk", city: "London", industry: "Publishing", ltv: 33200, projects: 3, since: "2023", lastContact: "6 days ago", health: "ok", hue: ["#f2b48a", "#573656"] },
];

export const clientById = (id: string) => CLIENTS.find((c) => c.id === id)!;

export type Stage = "inquiry" | "proposal" | "active" | "review" | "done";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "inquiry", label: "Inquiry" },
  { id: "proposal", label: "Proposal out" },
  { id: "active", label: "In progress" },
  { id: "review", label: "Client review" },
  { id: "done", label: "Wrapped" },
];

export type Project = {
  id: string;
  name: string;
  client: string;
  stage: Stage;
  value: number;
  progress: number;
  due: string;
  team: string[];
  hours: number;
  budgetHours: number;
  note?: string;
};

export const PROJECTS: Project[] = [
  { id: "p1", name: "Rebrand & packaging", client: "fernhill", stage: "proposal", value: 16300, progress: 0, due: "Viewed 4× today", team: ["TA", "AL"], hours: 6, budgetHours: 160, note: "Reading Packaging section" },
  { id: "p2", name: "Brand guidelines, phase 2", client: "nordlys", stage: "active", value: 24000, progress: 62, due: "Dec 12", team: ["TA", "MK", "JB"], hours: 118, budgetHours: 180 },
  { id: "p3", name: "Festival title sequence", client: "paloma", stage: "active", value: 12800, progress: 35, due: "Jan 8", team: ["MK"], hours: 51, budgetHours: 96 },
  { id: "p4", name: "Bakery signage", client: "juniper", stage: "review", value: 6400, progress: 90, due: "Nov 14", team: ["AL"], hours: 44, budgetHours: 48 },
  { id: "p5", name: "Spring campaign", client: "okapi", stage: "inquiry", value: 18000, progress: 0, due: "Budget $15–20k", team: [], hours: 0, budgetHours: 0, note: "Call booked Thu 10:00" },
  { id: "p6", name: "Album artwork ×3", client: "saltmarsh", stage: "review", value: 5400, progress: 85, due: "Nov 18", team: ["JB"], hours: 38, budgetHours: 36 },
  { id: "p7", name: "Lyon flagship wayfinding", client: "verso", stage: "active", value: 31500, progress: 48, due: "Feb 2", team: ["TA", "JB", "AL"], hours: 164, budgetHours: 300 },
  { id: "p8", name: "Product launch site", client: "kettle", stage: "proposal", value: 14200, progress: 0, due: "Sent Nov 6", team: ["MK"], hours: 2, budgetHours: 120 },
  { id: "p9", name: "Clinic interiors identity", client: "meadow", stage: "inquiry", value: 9000, progress: 0, due: "Form submitted today", team: [], hours: 0, budgetHours: 0 },
  { id: "p10", name: "Autumn catalogue", client: "arcadia", stage: "done", value: 8800, progress: 100, due: "Paid Oct 30", team: ["AL"], hours: 61, budgetHours: 70 },
  { id: "p11", name: "Verso Bordeaux menus", client: "verso", stage: "done", value: 7200, progress: 100, due: "Paid Nov 9", team: ["JB"], hours: 40, budgetHours: 45 },
];

export type InvoiceStatus = "draft" | "sent" | "viewed" | "overdue" | "paid";

export type Invoice = {
  id: string;
  number: string;
  client: string;
  project: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
  kind: "Deposit" | "Milestone" | "Final" | "Retainer";
  lines: { d: string; q: number; r: number }[];
  events: { t: string; e: string }[];
};

const inv = (
  n: number,
  client: string,
  project: string,
  issued: string,
  due: string,
  status: InvoiceStatus,
  kind: Invoice["kind"],
  lines: Invoice["lines"],
  events: Invoice["events"],
): Invoice => ({
  id: `inv-${n}`,
  number: `#${String(n).padStart(4, "0")}`,
  client,
  project,
  issued,
  due,
  status,
  kind,
  lines,
  events,
  amount: lines.reduce((s, l) => s + l.q * l.r, 0),
});

export const INVOICES: Invoice[] = [
  inv(148, "fernhill", "Rebrand & packaging", "—", "—", "draft", "Deposit",
    [{ d: "Deposit · Rebrand & packaging (30%)", q: 1, r: 4890 }],
    [{ t: "Nov 10", e: "Draft created from proposal" }]),
  inv(147, "nordlys", "Brand guidelines, phase 2", "Nov 9", "Nov 23", "viewed", "Milestone",
    [{ d: "Milestone 2 · Guidelines system", q: 1, r: 9600 }],
    [{ t: "Nov 9", e: "Sent to Ingrid Sæther" }, { t: "Nov 10", e: "Viewed by Ingrid (2×)" }]),
  inv(146, "verso", "Lyon flagship wayfinding", "Nov 3", "Nov 17", "sent", "Milestone",
    [{ d: "Milestone 2 · Signage family", q: 1, r: 9450 }, { d: "Site visit, Lyon", q: 1, r: 850 }],
    [{ t: "Nov 3", e: "Sent to Camille Roux" }]),
  inv(145, "paloma", "Festival title sequence", "Oct 28", "Nov 11", "viewed", "Deposit",
    [{ d: "Deposit · Title sequence (40%)", q: 1, r: 5120 }],
    [{ t: "Oct 28", e: "Sent to Lucía Ortega" }, { t: "Nov 2", e: "Viewed" }, { t: "Nov 9", e: "Reminder sent automatically" }]),
  inv(144, "saltmarsh", "Album artwork ×3", "Oct 14", "Oct 28", "overdue", "Milestone",
    [{ d: "Artwork · Record 1 & 2", q: 2, r: 1800 }],
    [{ t: "Oct 14", e: "Sent to Owen Price" }, { t: "Oct 29", e: "Reminder 1 (warm)" }, { t: "Nov 5", e: "Reminder 2 (neutral)" }]),
  inv(143, "juniper", "Bakery signage", "Oct 20", "Nov 3", "overdue", "Milestone",
    [{ d: "Signage design · 6 locations", q: 6, r: 520 }],
    [{ t: "Oct 20", e: "Sent to Hannah Cole" }, { t: "Oct 21", e: "Viewed" }, { t: "Nov 4", e: "Reminder 1 (warm)" }]),
  inv(142, "verso", "Verso Bordeaux menus", "Oct 30", "Nov 13", "paid", "Final",
    [{ d: "Menu system · final", q: 1, r: 4800 }],
    [{ t: "Oct 30", e: "Sent" }, { t: "Nov 1", e: "Viewed" }, { t: "Nov 9", e: "Paid by card · 4 days early" }]),
  inv(141, "arcadia", "Autumn catalogue", "Oct 16", "Oct 30", "paid", "Final",
    [{ d: "Catalogue design · 64pp", q: 1, r: 5200 }],
    [{ t: "Oct 16", e: "Sent" }, { t: "Oct 30", e: "Paid by bank transfer" }]),
  inv(140, "nordlys", "Brand guidelines, phase 2", "Oct 2", "Oct 16", "paid", "Deposit",
    [{ d: "Deposit · Phase 2 (30%)", q: 1, r: 7200 }],
    [{ t: "Oct 2", e: "Sent" }, { t: "Oct 6", e: "Paid by bank transfer" }]),
  inv(139, "okapi", "Retainer · October", "Oct 1", "Oct 15", "paid", "Retainer",
    [{ d: "Design retainer · October", q: 1, r: 4500 }],
    [{ t: "Oct 1", e: "Sent automatically" }, { t: "Oct 3", e: "Paid by card" }]),
  inv(138, "kettle", "Launch strategy workshop", "Sep 22", "Oct 6", "paid", "Final",
    [{ d: "Strategy workshop, 2 days", q: 2, r: 2400 }],
    [{ t: "Sep 22", e: "Sent" }, { t: "Sep 30", e: "Paid by card" }]),
  inv(137, "okapi", "Retainer · November", "Nov 1", "Nov 15", "sent", "Retainer",
    [{ d: "Design retainer · November", q: 1, r: 4500 }],
    [{ t: "Nov 1", e: "Sent automatically" }]),
];

export const invoiceById = (id: string) => INVOICES.find((i) => i.id === id);

/** Monthly revenue (paid). Nov 2026 is in progress: `paid` so far + `expected` remainder. */
export const REVENUE = [
  { m: "Dec", paid: 18400 },
  { m: "Jan", paid: 22100 },
  { m: "Feb", paid: 19800 },
  { m: "Mar", paid: 26500 },
  { m: "Apr", paid: 24300 },
  { m: "May", paid: 31200 },
  { m: "Jun", paid: 28900 },
  { m: "Jul", paid: 33800 },
  { m: "Aug", paid: 30100 },
  { m: "Sep", paid: 36400 },
  { m: "Oct", paid: 41250 },
  { m: "Nov", paid: 14800, expected: 23800 },
];

export const KPIS = [
  { label: "Revenue · October", value: "$41,250", delta: "+13%", up: true, note: "vs September", prefix: "$", suffix: "K", spark: [18.4, 22.1, 19.8, 26.5, 24.3, 31.2, 28.9, 33.8, 30.1, 36.4, 41.25] },
  { label: "Outstanding", value: "$36,240", delta: "6 invoices", up: null, note: "2 overdue", prefix: "$", suffix: "K", spark: [22, 30, 26, 34, 29, 38, 31, 36, 33, 34.5, 36.2] },
  { label: "Win rate · 90 days", value: "64%", delta: "+9 pts", up: true, note: "vs prior 90 days", prefix: "", suffix: "%", spark: [41, 44, 47, 46, 52, 55, 53, 58, 60, 61, 64] },
  { label: "Days to paid", value: "9.2", delta: "−3.1", up: true, note: "lower is better", prefix: "", suffix: " days", spark: [21, 19, 18, 17, 15, 14, 13, 12, 11, 10.4, 9.2] },
];

export const ACTIVITY = [
  { t: "12 min ago", who: "Theo Marsh", what: "viewed your proposal", obj: "Rebrand & packaging", kind: "view" },
  { t: "1 hr ago", who: "Ingrid Sæther", what: "opened invoice", obj: "#0147", kind: "view" },
  { t: "Yesterday", who: "Camille Roux", what: "paid", obj: "#0142 · $4,800", kind: "paid" },
  { t: "Yesterday", who: "Ochre", what: "sent a reminder for", obj: "#0145", kind: "auto" },
  { t: "Nov 8", who: "Jonas Weber", what: "submitted an inquiry", obj: "Clinic interiors identity", kind: "new" },
  { t: "Nov 6", who: "You", what: "sent a proposal to", obj: "Kettle Labs", kind: "sent" },
];

export const TASKS = [
  { id: "t1", label: "Follow up with Theo on packaging options", due: "Today", done: false },
  { id: "t2", label: "Review Juniper & Rye signage proofs", due: "Today", done: false },
  { id: "t3", label: "Prep Okapi discovery call", due: "Thu", done: false },
  { id: "t4", label: "Send Nordlys phase 2 milestone", due: "Done", done: true },
];

export const UPCOMING = [
  { client: "paloma", number: "#0145", amount: 5120, when: "Due tomorrow" },
  { client: "okapi", number: "#0137", amount: 4500, when: "Due Nov 15" },
  { client: "verso", number: "#0146", amount: 10300, when: "Due Nov 17" },
  { client: "nordlys", number: "#0147", amount: 9600, when: "Due Nov 23" },
];

/** The client-facing proposal used at /p/fernhill-coffee and on the homepage demo. */
export const PROPOSAL = {
  slug: "fernhill-coffee",
  studio: "Imole Studio",
  client: "Fernhill Coffee",
  contact: "Theo",
  title: "A brand that tastes like the first cup",
  date: "November 6, 2026",
  validUntil: "December 6, 2026",
  deposit: 0.3,
  packages: [
    { id: "identity", name: "Brand identity", desc: "Strategy workshop, logo suite, colour & type system, brand book.", price: 8500, required: true, weeks: 6 },
    { id: "packaging", name: "Packaging system", desc: "Bag, tin and cup designs for 6 blends, with a template for new ones.", price: 5800, required: false, weeks: 4 },
    { id: "signage", name: "Café signage", desc: "Exterior sign, menu boards and wayfinding for the flagship.", price: 2000, required: false, weeks: 2 },
  ],
  addons: [
    { id: "photo", name: "Half-day product shoot", price: 1400 },
    { id: "motion", name: "Animated logo for social", price: 900 },
    { id: "rush", name: "Priority timeline (−2 weeks)", price: 1600 },
  ],
};

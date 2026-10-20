export const profile = {
  name: "Vivek Mistry",
  role: "Senior MERN Stack Developer",
  email: "vbmistry90@gmail.com",
  phone: "+91 84696 72572",
  phoneHref: "tel:+918469672572",
  location: "Surat, Gujarat, India",
  resume: "/documents/Vivek_Mistry_Resume.pdf",
}

export const facts = [
  { label: "Based in", value: "Surat, Gujarat, India" },
  { label: "Languages", value: "English, Gujarati, Hindi" },
  { label: "Education", value: "M.C.A., SRIMCA, Uka Tarsadia University, Bardoli · 2016" },
  { label: "Main stack", value: "MongoDB, Express.js, React, Node.js, plus Python (Django)" },
]

// Taken from the "Relevant Skills" line of the resume, one card per integration.
export const integrations = [
  { icon: "payments", title: "Payments & POS", text: "Payment integration including in-app purchase, and POS integration." },
  { icon: "calendar", title: "Calendar sync", text: "Calendar event integration with Google, Microsoft Outlook, and iCal." },
  { icon: "bell", title: "Push notifications", text: "Firebase integration for push notifications and badge management." },
  { icon: "google", title: "Google & social", text: "Google APIs integration and social integration." },
  { icon: "pdf", title: "PDF generation", text: "PDF output with DeckTape." },
  { icon: "mail", title: "Mail", text: "Mail integration." },
  { icon: "accounting", title: "Accounting", text: "Accounting concepts handled inside the applications I build." },
  { icon: "realtime", title: "Realtime", text: "Socket.IO for live, two-way communication." },
  { icon: "signage", title: "Digital signage", text: "Screens, overhead music, and guest WiFi for restaurants, stores, and venues." },
]

export const experience = [
  {
    role: "MERN Stack Developer + Python (Django)",
    company: "Freelancing",
    place: "lernen-hub",
    dates: "July 2023 — Present",
    length: "Ongoing",
    current: true,
    points: ["Building Lernen Hub, an education platform for students, teachers, study material, and communication."],
  },
  {
    role: "MERN Stack Developer",
    company: "Logical Loop",
    place: "",
    dates: "January 2023 — July 2023",
    length: "6 months",
    points: [],
  },
  {
    role: "MERN Stack Developer",
    company: "WebLedger",
    place: "",
    dates: "June 2022 — December 2022",
    length: "6 months",
    points: ["GST filing software: reconciliation, ITC claims, e-invoices, inventory, and accounting."],
  },
  {
    role: "MERN Stack Developer",
    company: "S M Techno Consultants Pvt Ltd",
    place: "",
    dates: "June 2021 — July 2022",
    length: "1 year, 3 months",
    points: [],
  },
  {
    role: "Senior Web Developer",
    company: "Differenz System Pvt. Ltd.",
    place: "Surat, Gujarat",
    dates: "March 2019 — April 2021",
    length: "2 years",
    points: [],
  },
  {
    role: "Web Developer",
    company: "Nestcode Infotech Pvt. Ltd.",
    place: "Surat, Gujarat",
    dates: "November 2017 — January 2019",
    length: "1 year, 3 months",
    points: [],
  },
  {
    role: "Web Developer",
    company: "Lead Infosoft",
    place: "Surat, Gujarat",
    dates: "May 2017 — October 2017",
    length: "6 months",
    points: [],
  },
]

export const skillGroups = [
  {
    title: "Languages",
    items: ["Node.js", "Python", "React.js", "Next.js", "Vue.js", "JavaScript", "Tailwind CSS", "SQL", "PHP (CodeIgniter, Laravel)"],
  },
  {
    title: "Frameworks & libraries",
    items: ["AdonisJS", "Express.js", "Django", "Socket.IO", "Koa.js", "Firebase Web API"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis", "SQLite", "Microsoft SQL Server", "SQL"],
  },
  {
    title: "Tools",
    items: ["Visual Studio Code", "Sublime Text", "Robo 3T", "SQLyog"],
  },
]

export const cloudGroups = [
  { title: "Cloud", items: ["AWS Lambda", "Azure cloud management"] },
  { title: "Containers & delivery", items: ["Container concepts", "Docker", "Kubernetes", "CI/CD", "Pipelines", "Auto deployment"] },
]

export const pipeline = [
  { icon: "commit", title: "Commit", text: "Code is pushed to the repository." },
  { icon: "pipeline", title: "CI/CD pipeline", text: "The pipeline runs the checks and builds the release." },
  { icon: "container", title: "Container", text: "Packaged with Docker so it runs the same everywhere." },
  { icon: "deploy", title: "Auto deployment", text: "Released to the cloud, such as AWS Lambda or Azure, without manual steps." },
]

export const aiTools = [
  { name: "Cursor", icon: "cursor", color: "#9aa4b2" },
  { name: "GitHub Copilot", icon: "githubcopilot", color: "#8b5cf6" },
  { name: "Claude", icon: "claude", color: "#d97757" },
  { name: "ChatGPT", icon: "openai", color: "#10a37f" },
  { name: "Grok", icon: "grok", color: "#e5e7eb" },
  { name: "Google Antigravity", icon: "antigravity", color: "#4285f4" },
]

export const products = [
  {
    icon: "school",
    kind: "Education platform",
    name: "Lernen Hub",
    text: "A premium education platform to manage students, teachers, study material, communication, and day-to-day academic activities.",
    tags: ["Students", "Teachers", "Study material", "Communication"],
    url: "https://www.lernen-hub.com/",
    domain: "lernen-hub.com",
  },
  {
    icon: "tv",
    kind: "Digital signage",
    name: "Neon",
    text: "Cost-effective digital signage, overhead music, and guest WiFi for restaurants, stores, and venues, managed from the cloud on flexible monthly plans.",
    tags: ["Digital signage", "Overhead music", "Guest WiFi", "POS integration"],
    url: "https://www.neonscreens.com/",
    domain: "neonscreens.com",
  },
  {
    icon: "blocks",
    kind: "Low-code platform",
    name: "Glozic",
    text: "A cloud-agnostic, AI-native low-code/no-code platform to build, test, and publish enterprise applications quickly.",
    tags: ["Workflow designer", "Dynamic collections", "Calendar view", "Scheduler"],
    url: "https://www.glozic.com/",
    domain: "glozic.com",
  },
  {
    icon: "clipboard",
    kind: "Home inspection software",
    name: "Home Inspector Tech",
    text: "A cloud-based solution for home inspectors, created by home inspectors. Desktop and mobile friendly, it covers the whole business from reporting to payroll.",
    tags: ["Inspection reports", "Scheduling", "Back office", "Payroll"],
    url: "https://homeinspectortech.com/",
    domain: "homeinspectortech.com",
  },
  {
    icon: "receipt",
    kind: "Accounting software",
    name: "WebLedger",
    text: "Accounting software for India with GST billing, invoicing, inventory, compliance, reporting, and business management tools.",
    tags: ["GST billing", "Invoicing", "Inventory", "Compliance", "Reporting"],
    url: "https://office.webledger.in/#/sign-in",
    domain: "office.webledger.in",
  },
]

export const education = [
  {
    year: "2016",
    degree: "M.C.A.",
    school: "SRIMCA, Uka Tarsadia University",
    place: "Bardoli, Gujarat",
    score: "68.40 CGPA",
  },
  {
    year: "2014",
    degree: "B.C.A.",
    school: "B.V. Patel Institute of BMC & IT, Uka Tarsadia University",
    place: "Bardoli, Gujarat",
    score: "59.17 CGPA",
  },
]

export const ticker = [
  "Node.js",
  "React",
  "Next.js",
  "Tailwind CSS",
  "MongoDB",
  "Express.js",
  "Python",
  "Django",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS Lambda",
  "Azure",
]

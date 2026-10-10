// Edit this file to customise the whole portfolio.

export interface NavLink {
  label: string;
  href: string;
}

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Tools"
  | "Core CS";

export interface Skill {
  symbol: string;
  name: string;
  category: SkillCategory;
  level: number; // proficiency % (self-assessed — adjust freely)
}

export interface TimelineEvent {
  year: string;
  type: "education" | "experience" | "certification";
  title: string;
  org: string;
  period: string;
  badge?: string;
  note?: string;
  tags?: string[];
  credentialId?: string;
  points: string[];
}

export interface Achievement {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  size: "lg" | "md" | "sm";
}

export interface Project {
  title: string;
  kind: "Professional" | "Personal";
  org: string;
  period: string;
  blurb: string;
  highlights: string[];
  metric?: string;
  tags: string[];
  href?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
}

export const profile = {
  name: "Akhil Zade",
  firstName: "Akhil",
  monogram: "AZ",
  role: "Full Stack Developer",
  tagline: "Creative developer • AI & web technology",
  photo: "/avatar.svg", // replace with a transparent cutout, e.g. /me.png in /public
  badgePhoto: "/me.png",
  email: "akhil.zade@outlook.com",
  phone: "+91-9730927203",
  location: "Nagpur, Maharashtra, India",
  badgeId: "AZ-0223-FS",
  bio: "Full-stack developer with 5 years of experience — 4 building scalable web apps with React, Next.js, TypeScript, Node.js and MySQL, plus a year of Java 8 and Spring Boot in banking. I ship REST APIs, secure auth (JWT, OAuth2, RBAC), Stripe subscriptions, LLM-powered features and AWS deployments in Agile teams.",
  links: {
    resume: "/resume.pdf",
    github: "https://github.com/akhilza",
    linkedin: "https://linkedin.com/in/akhil-zade-a6b152281",
    portfolio: "https://akhil-zade-portfolio.onrender.com",
  },
  facts: [
    { label: "Based in", value: "Nagpur, India" },
    { label: "Degree", value: "B.Sc. Computer Science" },
    { label: "Graduated", value: "2021 · RTMNU" },
    { label: "Status", value: "Immediate joiner" },
    { label: "Focus", value: "Full stack · AI/LLM · Payments" },
  ],
  quote: "From the database to the last pixel.",
  stats: [
    { value: "5+", label: "Years building" },
    { value: "6", label: "Production projects" },
    { value: "5", label: "Certifications" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Tools",
  "Core CS",
];

export const skills: Skill[] = [
  // Languages
  { symbol: "Ts", name: "TypeScript", category: "Languages", level: 92 },
  { symbol: "Js", name: "JavaScript ES6+", category: "Languages", level: 95 },
  { symbol: "Jv", name: "Java 8", category: "Languages", level: 78 },
  { symbol: "Hc", name: "HTML5 / CSS3", category: "Languages", level: 95 },
  // Frontend
  { symbol: "Re", name: "React.js", category: "Frontend", level: 95 },
  { symbol: "Nx", name: "Next.js", category: "Frontend", level: 92 },
  { symbol: "Rx", name: "Redux Toolkit", category: "Frontend", level: 90 },
  { symbol: "Tq", name: "TanStack Query", category: "Frontend", level: 88 },
  { symbol: "Tw", name: "Tailwind CSS", category: "Frontend", level: 94 },
  { symbol: "Bs", name: "Bootstrap", category: "Frontend", level: 88 },
  // Backend
  { symbol: "No", name: "Node.js", category: "Backend", level: 90 },
  { symbol: "Ex", name: "Express.js", category: "Backend", level: 90 },
  { symbol: "Sb", name: "Spring Boot", category: "Backend", level: 74 },
  { symbol: "Ra", name: "REST APIs", category: "Backend", level: 94 },
  { symbol: "Jw", name: "JWT / OAuth2", category: "Backend", level: 88 },
  { symbol: "St", name: "Stripe", category: "Backend", level: 84 },
  { symbol: "Ai", name: "OpenAI / LLM", category: "Backend", level: 82 },
  // Databases
  { symbol: "My", name: "MySQL", category: "Databases", level: 90 },
  { symbol: "Pr", name: "Prisma ORM", category: "Databases", level: 84 },
  { symbol: "Rd", name: "Redis", category: "Databases", level: 72 },
  { symbol: "Ix", name: "Query Tuning", category: "Databases", level: 86 },
  // Tools
  { symbol: "Gt", name: "Git / GitHub", category: "Tools", level: 92 },
  { symbol: "Aw", name: "AWS EC2 / S3", category: "Tools", level: 80 },
  { symbol: "Vc", name: "Vercel / Render", category: "Tools", level: 88 },
  { symbol: "Pm", name: "Postman", category: "Tools", level: 92 },
  { symbol: "Ji", name: "Jira", category: "Tools", level: 85 },
  // Core CS
  { symbol: "Rb", name: "Auth & RBAC", category: "Core CS", level: 90 },
  { symbol: "Ss", name: "SSR & SEO", category: "Core CS", level: 88 },
  { symbol: "Pf", name: "Performance", category: "Core CS", level: 87 },
  { symbol: "Ag", name: "Agile / Scrum", category: "Core CS", level: 90 },
];

export const projects: Project[] = [
  {
    title: "PulseFit",
    kind: "Professional",
    org: "Wegile Pvt. Ltd.",
    period: "Nov 2024 — Present",
    blurb: "Fitness dashboard and subscription platform serving a web admin and a mobile app.",
    highlights: [
      "AI-powered program generation that builds complete workout sessions",
      "Deep-clone of programs, nested sessions and movements across schedules",
      "Standalone Stripe subscription page: plans, checkout, recurring billing",
      "Media uploads and exports on AWS S3, backend on EC2",
    ],
    metric: "−50% setup time",
    tags: ["React", "TypeScript", "Redux Toolkit", "Node.js", "MySQL", "Stripe", "AWS"],
  },
  {
    title: "Phormation",
    kind: "Professional",
    org: "Wegile Pvt. Ltd.",
    period: "Nov 2024 — Present",
    blurb: "Fitness management and community platform with real-time subscription lifecycle tracking.",
    highlights: [
      "Dashboard modules for programs, workouts, exercises and diet plans",
      "REST APIs for the mobile app: workouts, accounts, subscription sync",
      "Community features: comments, nested replies, user blocking",
    ],
    metric: "Web + mobile APIs",
    tags: ["React", "Node.js", "Express", "MySQL"],
  },
  {
    title: "SKPearls",
    kind: "Professional",
    org: "Tissa Technology",
    period: "Oct 2023 — Oct 2024",
    blurb: "Production e-commerce platform for pearl jewellery, from discovery to admin fulfilment.",
    highlights: [
      "Dynamic filtering, cart, checkout and admin order fulfilment",
      "JWT + OAuth2, RBAC middleware and request validation",
      "Optimistic cart updates with TanStack Query; media on S3",
    ],
    metric: "−40% search latency",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Tailwind", "MySQL", "AWS"],
  },
  {
    title: "Data Builder",
    kind: "Professional",
    org: "Labhanya Infotech",
    period: "Sep 2022 — Aug 2023",
    blurb: "Collaborative AI task-management app with boards, automated workflows and voice capture.",
    highlights: [
      "Python LLM APIs, voice-to-task capture and Google Drive uploads",
      "JWT auth with client-side RBAC route protection",
      "State refactor with Redux Toolkit and custom hooks",
    ],
    metric: "+30% task tracking",
    tags: ["React", "TypeScript", "Redux Toolkit", "LLM API", "Google Drive"],
  },
  {
    title: "POS — Restaurant System",
    kind: "Professional",
    org: "Labhanya Infotech",
    period: "Sep 2022 — Aug 2023",
    blurb: "Point-of-sale frontend for live billing, kitchen orders, stock and loyalty.",
    highlights: [
      "Reusable table and modal components for peak-hour responsiveness",
      "REST integrations for POS terminals and analytics dashboards",
    ],
    metric: "−25% checkout time",
    tags: ["React", "JavaScript", "Bootstrap", "REST"],
  },
  {
    title: "FinCore",
    kind: "Professional",
    org: "Labhanya Infotech",
    period: "Jul 2021 — Sep 2022",
    blurb: "Digital banking application: KYC, accounts, fund transfers and statements.",
    highlights: [
      "Business logic, exception handling and validation for balances and transfers",
      "JWT-secured Bank, Customer, Account and Transaction APIs",
    ],
    metric: "−35% statement time",
    tags: ["Java 8", "Spring Boot", "MySQL", "Maven", "JWT"],
  },
  {
    title: "Zoorich Bank",
    kind: "Personal",
    org: "Digital banking & financial ledger",
    period: "Personal project",
    blurb: "Core-banking architecture with a double-entry ledger and fraud-aware transfers.",
    highlights: [
      "Pessimistic locking and idempotency keys prevent duplicate transactions",
      "Multi-currency accounts, wires, scheduled payments, EMI loans",
      "TOTP 2FA with QR enrollment, email OTP, bcrypt, route guards",
    ],
    metric: "Double-entry ledger",
    tags: ["Next.js", "Prisma", "MySQL", "Redis", "2FA", "Vercel"],
  },
  {
    title: "Test Forge AI",
    kind: "Personal",
    org: "Automated test case generator",
    period: "Personal project",
    blurb: "Turns requirements into functional, boundary, edge-case and negative test cases.",
    highlights: [
      "Real-time streaming generation with inline review and editing",
      "MySQL persistence and one-click export",
    ],
    metric: "−60% QA writing effort",
    tags: ["Next.js", "TypeScript", "OpenAI", "Express", "MySQL", "Render"],
  },
  {
    title: "Developer Portfolio",
    kind: "Personal",
    org: "This website lineage",
    period: "Personal project",
    blurb: "Production portfolio with SSR, SEO, modular components and an interactive resume viewer.",
    highlights: ["Next.js 16 App Router, React 19, Tailwind, Turbopack"],
    metric: "SSR + SEO",
    tags: ["Next.js", "React 19", "Tailwind", "Render"],
    href: "https://akhil-zade-portfolio.onrender.com",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "2021",
    type: "education",
    title: "B.Sc. in Computer Science",
    org: "Rashtrasant Tukadoji Maharaj Nagpur University",
    period: "Graduated Jun 2021",
    badge: "B.Sc. CS",
    points: ["Nagpur, Maharashtra, India", "Foundation in programming, databases and software engineering"],
  },
  {
    year: "2021",
    type: "experience",
    title: "Junior Software Developer",
    org: "Labhanya Infotech",
    period: "Jul 2021 — Sep 2022",
    badge: "Java · Spring Boot",
    points: [
      "Built FinCore banking modules: KYC, accounts, fund transfers, statements",
      "Tuned MySQL queries and indexes, cutting statement generation time by 35%",
    ],
  },
  {
    year: "2022",
    type: "experience",
    title: "Frontend Developer",
    org: "Labhanya Infotech",
    period: "Sep 2022 — Aug 2023",
    points: [
      "Shipped Data Builder, an AI task platform that lifted team tracking efficiency by 30%",
      "Built the POS frontend, cutting average cashier checkout time by 25%",
    ],
  },
  {
    year: "2022",
    type: "education",
    title: "M.Sc. in Computer Science",
    org: "Postgraduate programme",
    period: "2022 — Left in 2nd year",
    badge: "M.Sc. CS",
    note: "Dropped out of college in the 2nd year to take a better career opportunity.",
    points: ["Enrolled for a Master’s degree in Computer Science"],
  },
  {
    year: "2023",
    type: "experience",
    title: "Full-Stack Developer",
    org: "Tissa Technology",
    period: "Oct 2023 — Oct 2024",
    points: [
      "Delivered the SKPearls e-commerce platform end to end",
      "Improved page load speed by 35% and search latency by 40%",
    ],
  },
  {
    year: "2024",
    type: "experience",
    title: "Full-Stack Developer",
    org: "Wegile Pvt. Ltd.",
    period: "Nov 2024 — Present",
    badge: "Current",
    points: [
      "Leading PulseFit and Phormation across web admin, mobile APIs and billing",
      "AI program generation cut workout setup time by 50%",
    ],
  },
  {
    year: "2025",
    type: "certification",
    title: "Developing Back-End Apps with Node.js and Express",
    org: "IBM",
    period: "Mar 2025",
    badge: "Verified",
    credentialId: "2DVRQI084Q27",
    tags: ["Node.js", "Express.js", "RESTful APIs", "Server-Side JavaScript", "Middleware", "JWT Auth"],
    points: [
      "Official IBM credential verifying hands-on expertise in scalable server-side apps, RESTful APIs, routing, middleware pipelines and asynchronous back-end services",
    ],
  },
  {
    year: "2026",
    type: "certification",
    title: "Claude Academy Certifications",
    org: "Anthropic",
    period: "Sep 2026",
    badge: "Claude Code 101 · Claude 101",
    points: ["Joined 3 earlier certifications from IBM, HP LIFE and HackerRank"],
  },
];

export const achievements: Achievement[] = [
  { value: 5, suffix: "+", label: "Years of experience", detail: "4 in modern web, 1+ in Java & Spring Boot banking", size: "lg" },
  { value: 6, suffix: "", label: "Production projects", detail: "Plus 3 personal projects shipped", size: "md" },
  { value: 5, suffix: "", label: "Certifications", detail: "Anthropic, IBM, HP LIFE, HackerRank", size: "sm" },
  { value: 50, suffix: "%", label: "Faster setup", detail: "AI program generation in PulseFit", size: "sm" },
  { value: 40, suffix: "%", label: "Lower latency", detail: "MySQL index work on SKPearls search", size: "md" },
  { value: 60, suffix: "%", label: "Less QA effort", detail: "Test Forge AI case generation", size: "md" },
];

export const certifications: Certification[] = [
  { name: "Claude Code 101", issuer: "Claude Academy (Anthropic)", date: "Sep 2026", id: "02ab8e11b59b47148444bb1ee7c52070" },
  { name: "Claude 101", issuer: "Claude Academy (Anthropic)", date: "Sep 2026", id: "b889f9a97723e4fe9eed3569f8a2198a" },
  { name: "Back-End Apps with Node.js & Express", issuer: "IBM", date: "Mar 2025", id: "2DVRQI084Q27" },
  { name: "Agile Project Management", issuer: "HP LIFE", date: "Nov 2024", id: "76fae0c0-c5b3-4acb-a883-4cbde47e5187" },
  { name: "JavaScript (Intermediate)", issuer: "HackerRank", date: "Sep 2023", id: "9355A0CB2680" },
];

// Version / standard shown in the skill popup (edit to match what you use).
export const skillVersions: Record<string, string> = {
  TypeScript: "5.x",
  "JavaScript ES6+": "ES2024",
  "Java 8": "8 (LTS)",
  "HTML5 / CSS3": "HTML5 · CSS3",
  "React.js": "19",
  "Next.js": "16 (App Router)",
  "Redux Toolkit": "2.x",
  "TanStack Query": "v5",
  "Tailwind CSS": "3.4 / 4",
  Bootstrap: "5.3",
  "Node.js": "20 LTS",
  "Express.js": "4.x",
  "Spring Boot": "2.7",
  "REST APIs": "Richardson L2",
  "JWT / OAuth2": "RFC 7519 · OAuth 2.0",
  Stripe: "Billing + Webhooks",
  "OpenAI / LLM": "Chat Completions",
  MySQL: "8.0",
  "Prisma ORM": "5.x",
  Redis: "7.x",
  "Query Tuning": "Indexes · EXPLAIN",
  "Git / GitHub": "2.x",
  "AWS EC2 / S3": "EC2 · S3",
  "Vercel / Render": "CI/CD",
  Postman: "v10",
  Jira: "Cloud",
  "Auth & RBAC": "2FA · TOTP",
  "SSR & SEO": "SSR · SSG · ISR",
  Performance: "Core Web Vitals",
  "Agile / Scrum": "Scrum",
};

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  affiliation?: string;
  company?: string;
  period?: string;
  tagline: string;
  description: string;
  technologies: string[];
  bulletPoints: string[];
  badge?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  project: string;
  technologies: string[];
  achievements: string[];
  highlights?: { label: string; value: string }[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; tags?: string[] }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  skills: string[];
  description: string;
}

export const PERSONAL_INFO = {
  name: "Akhil Zade",
  headline: "Full-Stack Developer | React.js | Next.js | Node.js | Express.js | TypeScript",
  location: "Nagpur, Maharashtra, India",
  email: "akhil.zade@outlook.com",
  phone: "+91-9730927203",
  linkedin: "https://www.linkedin.com/in/akhil-zade-a6b152281",
  github: "https://github.com/akhilza",
  summary:
    "Full-Stack Developer with 5 years of total software development experience, including 4 years of relevant experience building scalable web applications with React.js, Next.js, TypeScript, Redux Toolkit, TanStack Query, Node.js, Express.js, and MySQL, and 1+ year of backend experience with Java (Java 8) and Spring Boot in the banking domain. Experienced in building admin dashboards, e-commerce storefronts, mobile app RESTful APIs, JWT and OAuth2 authentication, Role-Based Access Control (RBAC), Stripe subscription payment workflows, OpenAI/LLM API integrations, and AWS (EC2, S3) deployments in Agile/Scrum teams.",
  status: "Immediate Joiner / Software Developer",
  stats: [
    { label: "Total Experience", value: "5 Years", subtext: "Software Engineering" },
    { label: "Web Application Dev", value: "4 Years", subtext: "React, Next.js, Node.js" },
    { label: "Banking Backend", value: "1+ Year", subtext: "Java 8 & Spring Boot" },
    { label: "QA Effort Saved", value: "60%", subtext: "Test Case Automation" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: 92, tags: ["Strict Typing", "Interfaces", "Generics"] },
      { name: "JavaScript (ES6+)", level: 95, tags: ["Async/Await", "Closures", "DOM", "Event Loop"] },
      { name: "Java (Java 8)", level: 86, tags: ["OOP", "Streams API", "Collections", "Lambda Expressions"] },
      { name: "HTML5 & CSS3", level: 92, tags: ["Semantic HTML", "Flexbox/Grid", "Responsive Layouts"] },
    ],
  },
  {
    category: "Frontend Frameworks",
    skills: [
      { name: "React.js", level: 95, tags: ["Context API", "React Hooks", "Custom Hooks"] },
      { name: "Next.js", level: 95, tags: ["App Router", "SSR", "SSG", "ISR", "Server Actions"] },
      { name: "Redux Toolkit", level: 90, tags: ["RTK Query", "State Slices", "Selectors"] },
      { name: "TanStack Query", level: 90, tags: ["React Query", "Optimistic Updates", "Cache Invalidation"] },
      { name: "Tailwind CSS", level: 95, tags: ["Design Systems", "Dark Mode", "Responsive Web Design"] },
      { name: "Bootstrap", level: 88, tags: ["Responsive Grid", "UI Components"] },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Node.js & Express.js", level: 92, tags: ["RESTful APIs", "Middleware", "Schema Validation"] },
      { name: "Spring Boot", level: 85, tags: ["REST Controllers", "MVC", "Exception Handling", "Dependency Injection"] },
      { name: "RESTful APIs", level: 94, tags: ["Endpoint Architecture", "Request Validation", "JSON API"] },
      { name: "JWT & OAuth2 Authentication", level: 90, tags: ["Token Security", "Session Storage", "Refresh Tokens"] },
      { name: "Role-Based Access Control (RBAC)", level: 92, tags: ["Route Guards", "Role Permissions", "Middleware"] },
      { name: "Stripe Billing & Webhooks", level: 92, tags: ["Plan Selection", "Checkout", "Recurring Subscriptions"] },
      { name: "OpenAI / LLM API Integration", level: 90, tags: ["Streaming Tokens", "Automated Generation", "Prompt Engineering"] },
    ],
  },
  {
    category: "Databases & Cloud (DB)",
    skills: [
      { name: "MySQL", level: 92, tags: ["Relational Schema Design", "Query & Index Optimization", "Transactions"] },
      { name: "AWS (EC2, S3)", level: 86, tags: ["S3 Media Storage", "EC2 Backend Deployments", "CDN Delivery"] },
      { name: "Render", level: 88, tags: ["Web Service Hosting", "Automated Builds", "CI/CD Deployment"] },
    ],
  },
  {
    category: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: 92, tags: ["Version Control", "Branches", "Code Reviews"] },
      { name: "Maven", level: 85, tags: ["Dependency Management", "Build Lifecycle", "Spring Artifacts"] },
      { name: "Postman", level: 90, tags: ["REST API Testing", "Collections", "Environment Variables"] },
      { name: "Webpack & Vite", level: 86, tags: ["Module Bundling", "Asset Pipelines", "Fast Refresh"] },
      { name: "FileZilla", level: 85, tags: ["FTP / SFTP", "Server File Deployments"] },
      { name: "Jira & Agile / Scrum", level: 90, tags: ["Sprint Planning", "SDLC", "Task Tracking"] },
      { name: "Google Drive API", level: 85, tags: ["File Uploads", "Cloud Attachments", "OAuth Flow"] },
    ],
  },
];

export const COMPANY_PROJECTS: ProjectItem[] = [
  {
    id: "pulsefit-platform",
    title: "PulseFit - Fitness Dashboard & Subscription Platform",
    role: "Full-Stack Developer",
    affiliation: "Wegile Pvt. Ltd.",
    period: "Aug 2024 - Present",
    tagline: "Fitness Dashboard, Deep-Cloning & Stripe Recurring Billing",
    description:
      "Enterprise fitness management dashboard and mobile RESTful APIs supporting workout scheduling, diet planning, automated workout routine builders, and Stripe billing workflows.",
    technologies: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MySQL",
      "Stripe API",
      "AWS (EC2, S3)",
      "Mobile RESTful APIs",
    ],
    bulletPoints: [
      "Built a responsive fitness management dashboard using React.js, TypeScript, and Redux Toolkit with full-stack modules to create and manage Programs, Workouts, Single Workouts, Exercises, and personalized Diet Plans.",
      "Engineered complex copy-and-paste functionality to deep-clone entire programs, nested workout sessions, and movements across schedules, and implemented automated routine generation that builds complete workout sessions, cutting setup time by 50%.",
      "Designed and developed scalable Node.js, Express.js, and MySQL RESTful APIs to serve both the web admin dashboard and the PulseFit mobile application with high availability and schema validation.",
      "Developed the standalone PulseFit subscription webpage integrated with the Stripe API for plan selection, checkout, and recurring billing.",
      "Implemented program export features and media upload workflows using AWS S3, with backend services deployed on AWS EC2.",
    ],
    badge: "Active Production",
    githubUrl: "https://github.com/akhilzade",
    liveUrl: "https://pulsefit.app",
  },
  {
    id: "phormation-platform",
    title: "Phormation - Fitness Management & Community Platform",
    role: "Full-Stack Developer",
    affiliation: "Wegile Pvt. Ltd.",
    period: "Nov 2024 - Oct 2025",
    tagline: "Fitness Dashboard, Mobile RESTful APIs & Community Moderation",
    description:
      "Full-stack fitness platform delivering workout delivery, real-time user subscription tracking, mobile RESTful APIs, and nested community discussion moderation.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "Mobile RESTful APIs",
      "User Moderation",
    ],
    bulletPoints: [
      "Built and managed React.js fitness dashboard modules for programs, workouts, exercises, and diet plans alongside complete user management and real-time user subscription status tracking and lifecycle administration.",
      "Designed and developed Node.js and Express.js RESTful APIs for the Phormation mobile application to support workout delivery, complete user account management, and subscription status synchronization.",
      "Engineered mobile community and moderation features, including user comments, nested comment replies, and user blocking workflows.",
    ],
    badge: "Mobile & Web Ecosystem",
    githubUrl: "https://github.com/akhilzade",
    liveUrl: "https://phormation.com",
  },
  {
    id: "skpearls-ecommerce",
    title: "SKPearls - E-Commerce Platform for Pearl Jewellery",
    role: "Full-Stack Developer",
    affiliation: "Tissa Technology",
    period: "Oct 2023 - Oct 2024",
    tagline: "Luxury Jewellery Storefront, TanStack Query & AWS Deployment",
    description:
      "Production e-commerce platform featuring dynamic multi-attribute product filtering, optimistic cart management with TanStack Query, and AWS S3/EC2 deployment.",
    technologies: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "AWS (EC2, S3)",
      "JWT & OAuth2",
      "RBAC",
    ],
    bulletPoints: [
      "Developed a production e-commerce platform with Next.js, TypeScript, and Tailwind CSS storefronts and Node.js/Express.js RESTful APIs covering product discovery, dynamic filtering, cart, checkout, and admin order fulfillment.",
      "Optimized MySQL queries and database indexing for multi-attribute product filtering and inventory tracking, reducing search query latency by 40%.",
      "Implemented JWT and OAuth2 authentication, Role-Based Access Control (RBAC) middleware, and request validation to secure customer checkout and admin operations.",
      "Configured AWS S3 for product media delivery and deployed application services on AWS EC2 with Next.js asset optimization, improving page load speed by 35% and lowering mobile bounce rates.",
      "Managed server state and caching with TanStack Query for optimistic cart updates, multi-step checkout validation, and errors.",
    ],
    badge: "Production Storefront",
    githubUrl: "https://github.com/akhilzade",
    liveUrl: "https://skpearls.com",
  },
  {
    id: "data-builder",
    title: "Data Builder - Task Management & Collaboration Platform",
    role: "Frontend Developer",
    affiliation: "Labhanya Infotech",
    period: "Sep 2022 - Aug 2023",
    tagline: "Collaborative Task Management, Voice Input & Cloud Sync",
    description:
      "Collaborative task management web application integrating intelligent LLM APIs, browser voice-to-task capture, and Google Drive API file synchronization to boost team productivity.",
    technologies: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Bootstrap",
      "LLM API",
      "Google Drive API",
      "JWT Auth",
      "RBAC",
    ],
    bulletPoints: [
      "Built a collaborative task-management web application using React.js, TypeScript, and Bootstrap with interactive task boards, automated workflows, and responsive dashboards, improving team task tracking efficiency by 30%.",
      "Integrated Python-based LLM APIs, browser voice-to-task capture, and Google Drive API file uploads on the frontend.",
      "Secured REST APIs with JWT authentication, client-side RBAC route protection, loading states, and error-state handling.",
      "Refactored UI components and state architecture using Redux Toolkit and custom React Hooks for scalable state management.",
    ],
    badge: "Productivity Platform",
    githubUrl: "https://github.com/akhilzade",
    liveUrl: "https://databuilder.app",
  },
  {
    id: "pos-restaurant",
    title: "POS - Restaurant Management System",
    role: "Frontend Developer",
    affiliation: "Labhanya Infotech",
    period: "Sep 2022 - Aug 2023",
    tagline: "Real-Time Terminal, Live Billing & Kitchen Order Management",
    description:
      "High-traffic Point-of-Sale (POS) frontend modules for live billing, kitchen order management, stock tracking, and customer loyalty workflows.",
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "RESTful APIs",
      "State Management",
    ],
    bulletPoints: [
      "Developed responsive Point-of-Sale (POS) frontend modules for live billing, kitchen order management, stock tracking, analytics dashboards, and customer loyalty workflows.",
      "Built responsive React.js views and REST API integrations for POS terminals, reducing average cashier checkout time by 25%.",
      "Created reusable table and modal components and streamlined data flow to keep UI responsive during peak restaurant hours.",
    ],
    badge: "High-Traffic POS",
    githubUrl: "https://github.com/akhilzade",
    liveUrl: "https://pos-restaurant.app",
  },
  {
    id: "fincore-banking",
    title: "FinCore - Digital Banking Application",
    role: "Junior Software Developer",
    affiliation: "Labhanya Infotech",
    period: "Jul 2021 - Sep 2022",
    tagline: "Core Banking, Fund Transfers & Secure RESTful APIs",
    description:
      "Digital banking backend application managing customer registration, KYC verification, Savings/Current accounts, fund transfers, and transaction history.",
    technologies: [
      "Java (Java 8)",
      "Spring Boot",
      "MySQL",
      "Maven",
      "RESTful APIs",
      "JWT",
      "Postman",
      "Git",
    ],
    bulletPoints: [
      "Developed and maintained banking application modules for customer registration, KYC verification, Savings and Current account management, fund transfers, and account statement generation using Java (8), Spring Boot, and MySQL.",
      "Built backend business logic, custom exception handling, and validation rules for balance checks and money transfers.",
      "Created and tested RESTful API endpoints for Bank, Customer, Account, Login (JWT), and Transaction controllers via Postman.",
      "Optimized MySQL queries and table indexes for transaction history lookups, reducing statement generation time by 35%.",
    ],
    badge: "Core Banking Engine",
    githubUrl: "https://github.com/akhilzade",
  },
];

export const PERSONAL_PROJECTS: ProjectItem[] = [
  {
    id: "test-forge-ai",
    title: "Test Forge - Automated Test Case Generator & QA Engine",
    role: "Architect & Creator",
    affiliation: "Personal Project",
    period: "QA Tooling Project",
    tagline: "Automated Test Case Generation & Quality Assurance Suite",
    description:
      "Full-stack web application that translates software requirements into structured functional, boundary, edge-case, and negative test suites with live streaming and instant export.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "OpenAI / LLM API",
      "Render",
    ],
    bulletPoints: [
      "Developed a full-stack application that parses user requirements and generates structured functional, boundary, edge-case, and negative test cases using Node.js, Express.js, and OpenAI/LLM APIs.",
      "Built a responsive React.js and Next.js (TypeScript) UI with real-time streaming generation, inline review and editing, MySQL persistence, and one-click export, reducing manual QA test-writing effort by 60%.",
    ],
    badge: "60% QA Effort Saved",
    githubUrl: "https://github.com/akhilza/test_forge_ai",
    liveUrl: "https://test-forge-ai.vercel.app",
  },
  {
    id: "akhil-zade-portfolio",
    title: "Akhil Zade - Developer Portfolio & Systems Showcase",
    role: "Architect & Creator",
    affiliation: "Personal Project",
    period: "Current Project",
    tagline: "High-Performance Next.js 16 Portfolio & Interactive Engineering Showcase",
    description:
      "Modern, production-ready portfolio web application built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Features 100% OLED pitch-black theme, modular component architecture, and interactive resume viewer.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "App Router",
      "Turbopack",
      "SSR / SSG",
      "Responsive UI",
    ],
    bulletPoints: [
      "Built with Next.js 16 (Turbopack, App Router, SSR) and React 19 for maximum rendering performance, SEO optimization, and zero layout shift.",
      "Engineered modular component design system with responsive layouts, accessible navigation, and interactive resume modal dialogs.",
      "Designed custom typography hierarchy, pure OLED black aesthetic (#000000), and electric cyan accent design tokens.",
    ],
    badge: "Live Next.js App",
    githubUrl: "https://github.com/akhilza/akhil-zade-portfolio",
    liveUrl: "https://akhil-zade-portfolio.vercel.app",
  },
];

export const PROJECTS: ProjectItem[] = [...PERSONAL_PROJECTS, ...COMPANY_PROJECTS];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    company: "Wegile Pvt. Ltd.",
    role: "Full-Stack Developer",
    period: "Nov 2024 - Present",
    location: "Remote / Hybrid",
    project: "Full-Stack Web & Mobile Architecture",
    technologies: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MySQL",
      "Stripe API",
      "AWS (EC2, S3)",
      "Mobile RESTful APIs",
    ],
    achievements: [
      "Built a responsive management dashboard using React.js, TypeScript, and Redux Toolkit with full-stack modules to create and manage programs, workouts, exercises, and personalized diet plans.",
      "Engineered complex copy-and-paste functionality to deep-clone entire programs, nested workout sessions, and movements across schedules, and implemented automated routine generation that builds complete workout sessions, cutting setup time by 50%.",
      "Designed and developed scalable Node.js, Express.js, and MySQL RESTful APIs to serve both web admin dashboards and mobile applications with high availability and schema validation.",
      "Developed standalone subscription webpages integrated with the Stripe API for plan selection, checkout, and recurring billing.",
      "Implemented program export features and media upload workflows using AWS S3, with backend services deployed on AWS EC2.",
      "Built and managed React.js dashboard modules for programs, workouts, exercises, and diet plans alongside complete user management and real-time user subscription lifecycle tracking.",
      "Designed and developed Node.js and Express.js RESTful APIs for mobile applications to support workout delivery, complete user account management, and subscription status synchronization.",
      "Engineered mobile community and moderation features, including user comments, nested comment replies, and user blocking workflows.",
    ],
  },
  {
    company: "Tissa Technology",
    role: "Full-Stack Developer",
    period: "Oct 2023 - Oct 2024",
    location: "Pune, India",
    project: "E-Commerce Web Architecture",
    technologies: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "AWS (EC2, S3)",
      "JWT / OAuth2",
      "RBAC",
    ],
    achievements: [
      "Developed a production e-commerce platform with Next.js, TypeScript, and Tailwind CSS storefronts and Node.js/Express.js RESTful APIs covering product discovery, dynamic filtering, cart, checkout, and admin order fulfillment.",
      "Optimized MySQL queries and database indexing for multi-attribute product filtering and inventory tracking, reducing search query latency by 40%.",
      "Implemented JWT and OAuth2 authentication, Role-Based Access Control (RBAC) middleware, and request validation to secure customer checkout and admin operations.",
      "Configured AWS S3 for product media delivery and deployed application services on AWS EC2 with Next.js asset optimization, improving page load speed by 35% and lowering mobile bounce rates.",
      "Managed server state and caching with TanStack Query for optimistic cart updates, multi-step checkout validation, and error handling.",
    ],
  },
  {
    company: "Labhanya Infotech",
    role: "Frontend Developer / Junior Software Developer",
    period: "Jul 2021 - Aug 2023",
    location: "Nagpur, India",
    project: "Web Applications & Banking Systems",
    technologies: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Java (Java 8)",
      "Spring Boot",
      "MySQL",
      "RESTful APIs",
      "JWT",
      "Bootstrap",
      "Postman",
      "Git",
    ],
    achievements: [
      "Built collaborative task-management web applications using React.js, TypeScript, and Bootstrap with interactive task boards, automated workflows, and responsive dashboards, improving team task tracking efficiency by 30%.",
      "Integrated Python-based LLM APIs, browser voice-to-task capture, and Google Drive API file uploads on the frontend.",
      "Secured REST APIs with JWT authentication, client-side RBAC route protection, loading states, and error-state handling.",
      "Refactored UI components and state architecture using Redux Toolkit and custom React Hooks for scalable state management.",
      "Developed responsive Point-of-Sale (POS) frontend modules for live billing, kitchen order management, stock tracking, analytics dashboards, and customer loyalty workflows.",
      "Built responsive React.js views and REST API integrations for POS terminals, reducing average cashier checkout time by 25%.",
      "Created reusable table and modal components and streamlined data flow to keep UI responsive during peak restaurant hours.",
      "Developed and maintained banking application modules for customer registration, KYC verification, Savings and Current account management, fund transfers, and account statement generation using Java 8, Spring Boot, and MySQL.",
      "Built backend business logic, custom exception handling, and validation rules for balance checks and money transfers.",
      "Created and tested RESTful API endpoints for Bank, Customer, Account, Login (JWT), and Transaction controllers via Postman.",
      "Optimized MySQL queries and table indexes for transaction history lookups, reducing statement generation time by 35%.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Science (B.Sc.) in Computer Science",
  institution: "Rashtrasant Tukadoji Maharaj Nagpur University",
  location: "Nagpur, Maharashtra, India",
  graduationDate: "Jun 2021",
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-anthropic-claude-code-101",
    title: "Claude Code 101",
    issuer: "Claude Academy (Anthropic)",
    issueDate: "Sep 2026",
    credentialId: "02ab8e11b59b47148444bb1ee7c52070",
    credentialUrl: "https://academy.claude.com/verify/02ab8e11b59b47148444bb1ee7c52070",
    category: "AI & Modern Tooling",
    skills: ["Claude Code", "Developer Tooling", "Anthropic CLI", "Pair Programming", "Terminal Workflows"],
    description: "Official completion badge issued through Claude Academy, Anthropic's learning platform, certifying verified proficiency in Claude Code for terminal-based developer workflows, codebase navigation, and accelerated programming.",
  },
  {
    id: "cert-anthropic-claude-101",
    title: "Claude Academy: Claude 101",
    issuer: "Anthropic",
    issueDate: "Sep 2026",
    credentialId: "b889f9a97723e4fe9eed3569f8a2198a",
    credentialUrl: "https://academy.claude.com/verify/b889f9a97723e4fe9eed3569f8a2198a",
    category: "AI & Modern Tooling",
    skills: ["Prompt Engineering", "Claude AI", "Anthropic APIs", "LLM Integration", "Modern Workflows"],
    description: "Official credential issued by Anthropic validating core competencies in Claude AI capabilities, context management, prompt engineering techniques, and application integration.",
  },
  {
    id: "cert-ibm-backend-node-express",
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM",
    issueDate: "Mar 2025",
    credentialId: "2DVRQI084Q27",
    category: "Backend & APIs",
    skills: ["Node.js", "Express.js", "RESTful APIs", "Server-Side JavaScript", "Middleware", "JWT Auth"],
    description: "Official credential issued by IBM verifying hands-on expertise in developing scalable server-side applications, RESTful APIs, routing architectures, middleware pipelines, and asynchronous backend services with Node.js and Express.",
  },
  {
    id: "cert-hp-agile-project-management",
    title: "Agile Project Management",
    issuer: "HP LIFE",
    issueDate: "Nov 2024",
    credentialId: "76fae0c0-c5b3-4acb-a883-4cbde47e5187",
    category: "Agile & Project Management",
    skills: ["Agile Methodologies", "Scrum", "Sprint Planning", "Jira", "Cross-Functional Collaboration", "SDLC"],
    description: "Verified certification by HP LIFE validating comprehensive understanding and execution of Agile frameworks, Scrum sprint rituals, iterative backlog management, team velocity, and stakeholder alignment.",
  },
  {
    id: "cert-hackerrank-javascript-intermediate",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    issueDate: "Sep 2023",
    credentialId: "9355A0CB2680",
    category: "Languages & Core",
    skills: ["JavaScript (ES6+)", "Closures", "Event Loop", "Promises & Async/Await", "Prototypes", "Data Structures"],
    description: "Verified technical assessment from HackerRank confirming advanced proficiency in core JavaScript fundamentals, asynchronous event loops, lexical scoping, closures, prototype chaining, and algorithmic problem solving.",
  },
];


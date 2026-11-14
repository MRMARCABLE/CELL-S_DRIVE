export type ProjectCategory =
  | "AI & Automation"
  | "Embedded & Vision"
  | "3D Web"
  | "UI/UX";

export interface FocusDomain {
  id: string;
  code: string;
  suit: "♦" | "♣" | "♠";
  rgb: "r" | "g" | "b";
  projectCategory: ProjectCategory;
  title: string;
  desc: string;
  highlights: string[];
  accent: string;
}

export interface ExperienceItem {
  id: string;
  hash: string;
  branch: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  summary: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  hash: string;
  branch: string;
  institution: string;
  degree: string;
  period: string;
  note: string;
  skills: string[];
}

export interface TechCategory {
  id: string;
  busCode: string;
  category: string;
  items: string[];
}

export interface CredlyBadge {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  imageUrl: string;
  verifyUrl: string;
  skills: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  period: string;
  credentialType: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  code: string;
  category: ProjectCategory;
  status: string;
  year: string;
  accent: string;
  borderHover: string;
  title: string;
  desc: string;
  highlights: string[];
  architecture: string[];
  tech: string[];
  repoUrl: string;
}

export const profile = {
  brand: "Marca.",
  name: "Yohannes Marcel Lalopua",
  roleBadge: "Informatics Student — UKWMS",
  location: "Surabaya, Indonesia",
  availability: "OPEN FOR INTERNSHIP",
  email: "yohanneslalopua@gmail.com",
  avatarUrl: "https://github.com/MRMARCABLE.png",
  githubUrl: "https://github.com/MRMARCABLE",
  linkedinUrl: "https://www.linkedin.com/in/yohannes-marcel-lalopua-8bb10b31b/",
  credlyUrl: "https://www.credly.com/users/yohannes-lalopua/badges",
  gitEngUrl: "https://git-eng.ukwms.ac.id/5803025050",
  bio: "Informatics student at Widya Mandala Surabaya Catholic University focusing on modern full-stack web applications, User-Centered UI/UX design, and intelligent systems bridging microcontroller robotics (IoT) with Generative AI.",
};

export const focusDomains: FocusDomain[] = [
  {
    id: "01",
    code: "AI.AGENT",
    suit: "♦",
    rgb: "r",
    projectCategory: "AI & Automation",
    title: "Autonomous AI & Workflow Automation",
    desc: "Building autonomous AI agents and automated pipelines for operational audits, document retrieval, and smart workspace workflows using Langflow, IBM watsonx, Astra DB, and n8n.",
    highlights: ["Langflow & IBM watsonx", "Vector RAG (Astra DB)", "n8n Event Pipelines"],
    accent:
      "text-rose-700 dark:text-rose-300/90 border-[var(--border-soft)] bg-rose-500/8",
  },
  {
    id: "02",
    code: "SYS.EMBED",
    suit: "♣",
    rgb: "g",
    projectCategory: "Embedded & Vision",
    title: "Embedded Systems & Computer Vision",
    desc: "Developing ESP32-based desktop robotics with 2-axis pan-tilt actuation and real-time face tracking powered by Python, OpenCV, and MediaPipe.",
    highlights: ["ESP32 2-Axis Actuation", "OpenCV & MediaPipe", "Serial Hardware Telemetry"],
    accent:
      "text-emerald-700 dark:text-emerald-300/90 border-[var(--border-soft)] bg-emerald-500/8",
  },
  {
    id: "03",
    code: "WEB.3D_UX",
    suit: "♠",
    rgb: "b",
    projectCategory: "3D Web",
    title: "Interactive 3D Web & UI/UX Engineering",
    desc: "Designing User-Centered Design (UCD) interfaces in Figma and interactive 3D mathematical visualizations in the browser with React, Next.js, and Three.js.",
    highlights: ["Next.js & React Architecture", "Three.js 3D Space", "Figma UCD Systems"],
    accent:
      "text-sky-800 dark:text-sky-300/90 border-[var(--border-soft)] bg-sky-500/8",
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: "01",
    hash: "a9c4f12",
    branch: "feat/fiesto-web",
    role: "Creative Team & Web Developer Intern",
    organization: "Fiesto",
    period: "Mar 2023 · 6 Months",
    type: "INTERNSHIP",
    summary:
      "Developed frontend web pages, designed UI/UX layouts in Figma, and planned digital content strategies while collaborating across creative and technical deliverables.",
    skills: ["HTML", "CSS", "Figma", "UI/UX Design"],
  },
  {
    id: "02",
    hash: "c3e81b4",
    branch: "org/hippast-sec",
    role: "Secretary",
    organization: "HIPPAST St. Louis",
    period: "Feb 2023",
    type: "ORGANIZATION",
    summary:
      "Managed organizational documentation and supported logistics and equipment readiness for outdoor and mountaineering activities.",
    skills: ["Administration", "Team Coordination"],
  },
  {
    id: "03",
    hash: "7d2b09e",
    branch: "ops/cls-broadcast",
    role: "Camera Crew & Livestreaming Operator Intern",
    organization: "Fiesto — CLS CUP International",
    period: "Dec 2022",
    type: "INTERNSHIP",
    summary:
      "Operated live broadcast cameras and real-time score/time overlays during the CLS CUP international basketball tournament.",
    skills: ["Live Production", "Camera Operation"],
  },
];

export const education: EducationItem[] = [
  {
    id: "01",
    hash: "f580302",
    branch: "main/ukwms-informatics",
    institution: "Universitas Katolik Widya Mandala Surabaya (UKWMS)",
    degree: "B.Sc. in Informatics (Teknik Informatika)",
    period: "2025 — Present",
    note: "Focusing on Web Engineering, Artificial Intelligence, Computer Vision, and Embedded Systems.",
    skills: ["Web Engineering", "AI & Vision", "Embedded Systems", "NRP 5803025050"],
  },
  {
    id: "02",
    hash: "4b19d0a",
    branch: "edu/stlouis-multimedia",
    institution: "SMK St. Louis Surabaya",
    degree: "Vocational High School — Multimedia",
    period: "2021 — 2024",
    note: "Built a strong foundation in visual design, UI/UX prototyping, digital media production, and frontend basics.",
    skills: ["Multimedia Production", "Visual Design", "UI/UX Prototyping"],
  },
];

export const techCategories: TechCategory[] = [
  {
    id: "BUS_01",
    busCode: "BUS // WEB_ARCH",
    category: "Web & Frontend Architecture",
    items: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    id: "BUS_02",
    busCode: "BUS // AI_VISION",
    category: "AI, Automation & Vision",
    items: ["Python", "Langflow", "Astra DB", "n8n", "OpenCV", "MediaPipe"],
  },
  {
    id: "BUS_03",
    busCode: "BUS // HW_DESIGN",
    category: "Hardware, Design & Tooling",
    items: ["ESP32 / IoT", "UI/UX Design (UCD)", "Figma", "Git & GitLab"],
  },
];

export const credlyBadges: CredlyBadge[] = [
  {
    id: "01",
    name: "Build an AI Agent",
    issuer: "IBM SkillsBuild",
    issuedAt: "Sep 2026",
    imageUrl:
      "https://images.credly.com/images/d8f30e8e-4c24-42e8-bb15-b106bb082614/BadgeEmblem_BuildAnAIAgent.png",
    verifyUrl:
      "https://www.credly.com/badges/870b43c0-b1c6-4722-9dc5-89ef961ffbe3",
    skills: ["Agentic AI", "IBM watsonx.ai", "AI Agent Workflow"],
  },
  {
    id: "02",
    name: "AI Literacy",
    issuer: "IBM SkillsBuild",
    issuedAt: "Oct 2026",
    imageUrl:
      "https://images.credly.com/images/bc70837c-99ae-499d-a31d-2a7be79095e6/BadgeEmblem_AILiteracy.png",
    verifyUrl:
      "https://www.credly.com/badges/6cf16fde-7229-42db-990a-c2b731aa6f46",
    skills: ["Generative AI", "Prompt Writing", "Responsible AI"],
  },
  {
    id: "03",
    name: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    issuedAt: "Sep 2026",
    imageUrl:
      "https://images.credly.com/images/9a6e098a-618a-4e5a-8e8e-364a66b2f3de/Getting_20Started_20With_20Data_20Badge.png",
    verifyUrl:
      "https://www.credly.com/badges/bab85aa1-d5f5-4b96-ba5d-d7a6f037f367",
    skills: ["Data Analytics", "Data Science", "Tableau"],
  },
  {
    id: "04",
    name: "IC3 Digital Literacy GS6 Level 1",
    issuer: "Certiport // Pearson VUE",
    issuedAt: "Jun 2026",
    imageUrl:
      "https://images.credly.com/images/29a6f7a3-2cf6-426c-969d-e432b44532e0/IC3_Digital_Literacy_Levels_1.png",
    verifyUrl:
      "https://www.credly.com/badges/660410c1-846e-4cca-86d2-6b033243b544",
    skills: ["Software Concepts", "Digital Security", "Collaboration"],
  },
];

export const certificates: CertificateItem[] = [
  {
    id: "05",
    name: "Mini-Bootcamp Roblox Game Development #1",
    issuer: "Codelamp Indonesia",
    issuedAt: "Apr 2026",
    period: "Jan 2026 — Feb 2026",
    credentialType: "CERTIFICATE OF APPRECIATION",
    skills: ["Game Development", "Scripting Logic", "Interactive Systems"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "01",
    code: "CRAFT.AI // AUTONOMOUS AGENT",
    category: "AI & Automation",
    status: "PROTOTYPE",
    year: "2026",
    accent:
      "text-emerald-700 dark:text-emerald-300/90 border-[var(--border-soft)] bg-emerald-500/8",
    borderHover: "",
    title: "ChiefOfStaff AI",
    desc: "Autonomous AI agent prototype built during the Hacktiv8 × IBM program for operational compliance auditing and workspace orchestration using Langflow, IBM watsonx, and Astra DB.",
    highlights: [
      "Multi-step LLM workflow orchestration with Langflow",
      "Vector-based context storage and semantic document retrieval via Astra DB",
    ],
    architecture: [
      "Audit Query",
      "Langflow Orchestrator",
      "IBM watsonx LLM",
      "Astra DB Vector RAG",
    ],
    tech: ["Langflow", "IBM watsonx", "Astra DB", "Generative AI"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "02",
    code: "CRAFT.BOT // HARDWARE & VISION",
    category: "Embedded & Vision",
    status: "HARDWARE BUILD",
    year: "2026",
    accent:
      "text-amber-800 dark:text-amber-300/90 border-[var(--border-soft)] bg-amber-500/8",
    borderHover: "",
    title: "Desktop Face-Tracking Robot",
    desc: "Desktop robotics assistant featuring a 2-axis pan-tilt mechanism and OLED display that tracks faces in real time through computer vision.",
    highlights: [
      "Real-time face coordinate detection with Python, OpenCV & MediaPipe",
      "Serial communication to ESP32 for 2-axis servo actuation & OLED feedback",
    ],
    architecture: [
      "Camera Feed",
      "OpenCV + MediaPipe",
      "UART Serial Link",
      "ESP32 Servo + OLED",
    ],
    tech: ["ESP32", "Python", "OpenCV", "MediaPipe"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "03",
    code: "CRAFT.3D // WEBGL ENGINE",
    category: "3D Web",
    status: "WEB APP",
    year: "2026",
    accent:
      "text-violet-800 dark:text-violet-300/90 border-[var(--border-soft)] bg-violet-500/8",
    borderHover: "",
    title: "3D Math Vector Visualizer",
    desc: "Interactive browser application for visualizing 3D vector operations and surface mappings in real time.",
    highlights: [
      "Interactive 3D Cartesian space rendered with Three.js & React",
      "Live parameter controls for vector transformations and projections",
    ],
    architecture: [
      "Vector Controls",
      "React State Matrix",
      "Three.js Scene Graph",
      "WebGL Canvas Render",
    ],
    tech: ["Three.js", "React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "04",
    code: "CRAFT.UX // DESIGN SYSTEM",
    category: "UI/UX",
    status: "UCD RESEARCH",
    year: "2026",
    accent:
      "text-sky-800 dark:text-sky-300/90 border-[var(--border-soft)] bg-sky-500/8",
    borderHover: "",
    title: "Smart Energy Monitoring UI/UX",
    desc: "User-Centered Design (UCD) interface prototype for a smart energy consumption monitoring application.",
    highlights: [
      "User needs analysis and information architecture grounded in UCD",
      "Component design system and high-fidelity interactive prototype in Figma",
    ],
    architecture: [
      "UCD Research",
      "Information Architecture",
      "Figma Design System",
      "Interactive Prototype",
    ],
    tech: ["UI/UX Design", "Figma", "UCD", "Prototyping"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "05",
    code: "CRAFT.FLOW // WORKFLOW BOT",
    category: "AI & Automation",
    status: "AUTOMATION",
    year: "2026",
    accent:
      "text-emerald-700 dark:text-emerald-300/90 border-[var(--border-soft)] bg-emerald-500/8",
    borderHover: "",
    title: "Telegram Expense Logger (n8n)",
    desc: "Automated personal expense tracking workflow connecting Telegram bot messages to structured spreadsheet logging via n8n.",
    highlights: [
      "Event-driven Telegram webhook parsing and expense categorization in n8n",
      "Automated structured logging and summary reporting to spreadsheets",
    ],
    architecture: [
      "Telegram Webhook",
      "n8n Event Workflow",
      "Expense Parser",
      "Spreadsheet Sync",
    ],
    tech: ["n8n", "Telegram Bot API", "Automation", "Spreadsheets"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "06",
    code: "CRAFT.ML // PREDICTIVE AI",
    category: "AI & Automation",
    status: "RESEARCH",
    year: "2026",
    accent:
      "text-emerald-700 dark:text-emerald-300/90 border-[var(--border-soft)] bg-emerald-500/8",
    borderHover: "",
    title: "Student Academic Performance Predictor",
    desc: "AI research project proposing predictive modeling for university student academic performance using structured behavioral and academic indicators.",
    highlights: [
      "Feature analysis and data preprocessing pipeline in Python",
      "Predictive classification/regression evaluation for early academic support",
    ],
    architecture: [
      "Academic Dataset",
      "Python Preprocessing",
      "Feature Extraction",
      "Predictive Model",
    ],
    tech: ["Python", "Machine Learning", "Data Analytics", "Jupyter"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "07",
    code: "CRAFT.OS // TERMINAL PORTFOLIO",
    category: "UI/UX",
    status: "LIVE SYSTEM",
    year: "2026",
    accent:
      "text-sky-800 dark:text-sky-300/90 border-[var(--border-soft)] bg-sky-500/8",
    borderHover: "",
    title: "CELL-S_DRIVE v2.1 (Marca OS)",
    desc: "Interactive terminal-inspired personal engineering portfolio built with Next.js 16 App Router, featuring 6 dynamic scenes, 3D playing cards, SVG git & PCB graphs, and a bilingual CLI shell.",
    highlights: [
      "Dual-theme (Shadow & Bone) CSS token engine with per-scene ambient silhouettes",
      "Interactive marca-sh shell, 3D RGB playing cards, and custom Web Audio synth",
    ],
    architecture: [
      "Next.js 16 App Router",
      "Scene State Engine",
      "Canvas & SVG Shaders",
      "Bilingual CLI Shell",
    ],
    tech: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "UI/UX Design (UCD)",
      "Figma",
      "Git & GitLab",
    ],
    repoUrl: "https://github.com/MRMARCABLE/CELL-S_DRIVE",
  },
];


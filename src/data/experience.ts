export type ExperienceProject = {
  name: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  projects: ExperienceProject[];
};

export const experience: Experience[] = [
  {
    company: "Optima Geeks",
    role: "Software Engineer",
    period: "Jan 2025 – Present",
    location: "Lahore, Pakistan",
    current: true,
    projects: [
      {
        name: "Cuddle Clones — Shopify Order Management (US Client)",
        summary:
          "Full-stack platform to process and track high-volume custom pet product orders.",
        bullets: [
          "Built order platform syncing 500+ daily Shopify orders via webhooks, reducing manual effort by ~60%",
          "Designed BullMQ async job queues for multi-category workflows, improving throughput by ~35%",
          "Developed NestJS + Next.js admin with Casbin RBAC; Twilio SMS + email at 5 lifecycle stages; ShipStation fulfilment",
          "Deployed on AWS (EC2, ECS, S3) + Docker + Vercel with GitHub Actions CI/CD",
        ],
        stack: [
          "NestJS",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "BullMQ",
          "Casbin",
          "AWS",
          "Docker",
        ],
      },
      {
        name: "YapIt Marketing Hub (Alvo Marketing)",
        summary:
          "AI marketing platform that turns any business URL into a launched ad campaign.",
        bullets: [
          "Built Next.js 16 platform generating ad strategy, copy, and creative via LLMs (DigitalOcean Inference + Gemini) in a 5-step wizard",
          "Engineered a Trigger.dev v4 background pipeline with Jina Reader scraping and a multilingual (i18n) marketing site",
          "Launches posts and ads via the YapIt Ads API; media served from DigitalOcean Spaces CDN",
        ],
        stack: [
          "Next.js 16",
          "Prisma",
          "PostgreSQL",
          "Trigger.dev",
          "Gemini",
          "shadcn/ui",
          "Framer Motion",
        ],
      },
      {
        name: "GID (Get it Done) Platform",
        summary:
          "Kafka-driven microservices platform for a field-service marketplace.",
        bullets: [
          "Contributed to NestJS + Flask microservices (order intake, payments, documents, email, jobs) on a Kafka message bus",
          "Worked across Vue admin/partner/customer/brand apps deployed on Kubernetes (k3s) with Helm + Tilt",
          "PostgreSQL/TypeORM + Redis caching behind a GraphQL gateway",
        ],
        stack: [
          "NestJS",
          "Kafka",
          "Kubernetes",
          "Vue",
          "PostgreSQL",
          "Redis",
          "GraphQL",
        ],
      },
    ],
  },
  {
    company: "SolutionsLoft",
    role: "Software Engineer",
    period: "Mar 2023 – Jan 2025",
    location: "Delaware, USA (Remote)",
    projects: [
      {
        name: "Control Net App — AI Content & 3D Generation Platform",
        summary:
          "Unified platform for AI-generated text, chat, and 3D outputs with gamified engagement.",
        bullets: [
          "Integrated OpenAI API for text-to-text, text-to-chat, and text-to-3D generation with avatar customization",
          "Built CMS for content and DropCoin rewards; shipped a Swipe-to-Earn feature boosting daily active engagement",
        ],
        stack: [
          "NestJS",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "OpenAI API",
          "AWS",
          "Cloudinary",
        ],
      },
      {
        name: "Fantasy Showdown — Blockchain Fantasy Football",
        summary:
          "Web3 platform bridging Yahoo/ESPN fantasy teams with wallet-based digital assets.",
        bullets: [
          "Built MERN + Ethereum platform with Yahoo/ESPN team imports, MetaMask wallet integration, and smart-contract prize distribution",
          "Developed high-concurrency REST APIs for game state, rosters, and real-time scoring for 1,000+ users",
        ],
        stack: ["Node.js", "React", "MongoDB", "Web3.js", "Ethereum", "AWS"],
      },
      {
        name: "AQR Link — Multi-Channel Property Management",
        summary:
          "Real-time OTA sync eliminating double bookings across Booking.com, Airbnb, and Vrbo.",
        bullets: [
          "Built a real-time XML-to-JSON OTA sync pipeline via the Rental United API, eliminating double bookings",
          "Designed a microservices architecture with JWT + RBAC for high availability and multi-role access",
        ],
        stack: ["NestJS", "PostgreSQL", "TypeORM", "JWT", "RBAC"],
      },
      {
        name: "EventZero — Carbon Emission Calculation Platform",
        summary:
          "Tool to calculate and report carbon footprints from organizational events.",
        bullets: [
          "Built React + Node platform with automated carbon calculation using emission-factor models",
          "Integrated Stripe subscriptions and AWS Cognito authentication for secure multi-tier access",
        ],
        stack: [
          "Node.js",
          "React",
          "TypeScript",
          "Stripe",
          "AWS Cognito",
          "AWS Lambda",
        ],
      },
      {
        name: "Aramco CMS — Training Content Management",
        summary:
          "Centralized CMS keeping training content in sync with the Aramco mobile app.",
        bullets: [
          "Built centralized CMS with REST API sync to the Aramco iOS/Android app, ensuring up-to-date content org-wide",
          "Implemented RBAC separating editor, reviewer, and admin access to prevent unauthorized changes",
        ],
        stack: ["NestJS", "React", "TypeScript", "PostgreSQL", "TypeORM", "JWT"],
      },
    ],
  },
  {
    company: "Axiom World Pvt Ltd",
    role: "Associate Software Engineer",
    period: "Sep 2021 – Feb 2023",
    location: "Lahore, Pakistan",
    projects: [
      {
        name: "SSLC ERP — 14-Branch Supermarket Chain (Saudi Arabia)",
        summary:
          "Full ERP unifying sales, inventory, and financials across 14 branches.",
        bullets: [
          "Built ERP covering Sales, POS, Inventory, Warehouse, Purchase Orders, and Financials across 14 branches",
          "Delivered a React e-commerce site with real-time ERP inventory sync to prevent overselling",
        ],
        stack: ["Node.js", "React", "PostgreSQL", "REST APIs", "Material UI"],
      },
      {
        name: "Onzbus — Real-Time School Bus Tracking",
        summary:
          "GPS tracking system letting parents monitor student bus locations in real time.",
        bullets: [
          "Built GPS-integrated tracking with REST APIs for parent and driver mobile apps, monitoring 500+ students",
        ],
        stack: ["Node.js", "Express.js", "React", "PostgreSQL", "JWT"],
      },
      {
        name: "Al Jalil — Real Estate ERP & Investor Portal",
        summary:
          "Investor portal integrated with an ERP for real-time property and portfolio access.",
        bullets: [
          "Built a React investor portal integrated with the ERP via REST APIs for real-time properties, packages, and portfolios",
          "Implemented RBAC separating investor, sales team, and admin views within the ERP",
        ],
        stack: ["Node.js", "React", "PostgreSQL", "JWT", "RBAC", "Tailwind CSS"],
      },
    ],
  },
];

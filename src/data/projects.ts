export type ProjectCategory = "AI" | "Full-Stack" | "ERP" | "Blockchain";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  ai?: boolean;
  problem: string;
  solution: string;
  impact: string[];
  stack: string[];
  image?: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "yapit",
    title: "YapIt Marketing Hub",
    category: "AI",
    ai: true,
    problem:
      "Small merchants lack the time and expertise to plan and launch effective ad campaigns.",
    solution:
      "Next.js 16 platform that scrapes any business URL and uses LLMs to auto-generate ad strategy, copy, and images, then launches the ads — all in a 5-step wizard.",
    impact: [
      "5-step URL-to-launched-ad wizard",
      "AI text + image generation (Gemini, DO Inference)",
      "Trigger.dev background pipeline",
      "Multilingual marketing site",
    ],
    stack: [
      "Next.js 16",
      "Prisma",
      "PostgreSQL",
      "Trigger.dev",
      "Gemini",
      "shadcn/ui",
    ],
    link: "https://business.yapit.app",
  },
  {
    slug: "gid",
    title: "GID — Get it Done Platform",
    category: "Full-Stack",
    problem:
      "A field-service marketplace needed a scalable, event-driven backbone across many apps.",
    solution:
      "Contributed to a Kafka-driven microservices platform with NestJS/Flask services and Vue apps running on Kubernetes.",
    impact: [
      "Event-driven microservices on Kafka",
      "NestJS + Flask services",
      "Vue admin/partner/customer/brand apps",
      "k3s + Helm + Tilt",
    ],
    stack: ["NestJS", "Kafka", "Kubernetes", "Vue", "PostgreSQL", "Redis"],
  },
  {
    slug: "cuddle-clones",
    title: "Cuddle Clones — Shopify Order Mgmt",
    category: "Full-Stack",
    problem:
      "No internal system to process high-volume custom pet product orders — all done manually.",
    solution:
      "Full-stack order platform syncing Shopify orders with async workflows and an RBAC admin dashboard.",
    impact: [
      "500+ daily orders synced",
      "~60% less manual effort",
      "~35% higher throughput (BullMQ)",
      "Twilio/SendGrid + ShipStation",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "BullMQ", "Casbin", "AWS"],
  },
  {
    slug: "control-net",
    title: "Control Net App — AI Content & 3D",
    category: "AI",
    ai: true,
    problem:
      "Client needed a unified platform for AI text, chat, and 3D outputs with gamified engagement.",
    solution:
      "Integrated OpenAI for text-to-text/chat/3D with avatar customization and a DropCoin rewards CMS.",
    impact: [
      "Text-to-3D generation",
      "DropCoin rewards + Swipe-to-Earn",
      "Avatar customization",
    ],
    stack: ["NestJS", "Next.js", "OpenAI API", "PostgreSQL", "AWS", "Cloudinary"],
  },
  {
    slug: "fantasy-showdown",
    title: "Fantasy Showdown — Web3 Fantasy Football",
    category: "Blockchain",
    problem:
      "No platform bridging Yahoo/ESPN fantasy teams with Web3 wallet assets and tournaments.",
    solution:
      "MERN + Ethereum platform with team imports, MetaMask integration, and smart-contract prize distribution.",
    impact: [
      "1,000+ users",
      "MetaMask wallet integration",
      "Smart-contract payouts",
      "Real-time scoring",
    ],
    stack: ["Node.js", "React", "MongoDB", "Web3.js", "Ethereum", "AWS"],
  },
  {
    slug: "aqr-link",
    title: "AQR Link — Property Management",
    category: "Full-Stack",
    problem:
      "Managers manually synced availability across Booking.com, Airbnb, and Vrbo — causing double bookings.",
    solution:
      "Real-time XML-to-JSON OTA sync pipeline via Rental United, with a microservices + RBAC architecture.",
    impact: [
      "Eliminated double bookings",
      "Real-time multi-OTA sync",
      "Microservices + RBAC",
    ],
    stack: ["NestJS", "PostgreSQL", "TypeORM", "JWT", "RBAC"],
  },
  {
    slug: "eventzero",
    title: "EventZero — Carbon Calculation",
    category: "Full-Stack",
    problem:
      "Organizations had no digital tool to calculate and report event carbon footprints.",
    solution:
      "React + Node platform with automated emission-factor calculation and subscription billing.",
    impact: [
      "Automated carbon calculation",
      "Stripe subscriptions",
      "AWS Cognito auth",
    ],
    stack: ["Node.js", "React", "TypeScript", "Stripe", "AWS Cognito", "AWS Lambda"],
    link: "https://eventzero.io/",
  },
  {
    slug: "aramco-cms",
    title: "Aramco CMS — Training Content",
    category: "Full-Stack",
    problem:
      "Training materials were distributed manually, causing outdated content to reach employees.",
    solution:
      "Centralized CMS with REST sync to the Aramco mobile app and RBAC editorial controls.",
    impact: [
      "Org-wide content sync",
      "iOS/Android REST sync",
      "Editor/reviewer/admin RBAC",
    ],
    stack: ["NestJS", "React", "TypeScript", "PostgreSQL", "TypeORM", "JWT"],
  },
];

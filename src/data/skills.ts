export type SkillCategory = {
  category: string;
  featured?: boolean;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "AI & LLMs",
    featured: true,
    items: [
      "Claude AI",
      "ChatGPT",
      "GitHub Copilot",
      "OpenAI API",
      "Prompt Engineering",
      "LLM Integration",
      "AI-Assisted Development",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "BullMQ",
      "Microservices",
      "WebSockets",
    ],
  },
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "TypeORM", "Mongoose", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (S3/EC2/ECS/Lambda/ECR)",
      "Docker",
      "Vercel",
      "Kubernetes",
      "GitHub Actions CI/CD",
    ],
  },
  {
    category: "Auth & Security",
    items: ["JWT", "RBAC", "OAuth 2.0", "AWS Cognito", "Casbin", "Casl"],
  },
  {
    category: "Integrations",
    items: [
      "Shopify Webhooks",
      "Stripe",
      "OpenAI API",
      "Twilio",
      "SendGrid",
      "ShipStation",
    ],
  },
];

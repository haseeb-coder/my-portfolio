import {
  SiNodedotjs,
  SiNestjs,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiRedis,
  SiTailwindcss,
  SiGraphql,
  SiOpenai,
  SiVercel,
  SiPrisma,
} from "react-icons/si";
import { Cloud } from "lucide-react";

const tech = [
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiNestjs, label: "NestJS" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiGraphql, label: "GraphQL" },
  { icon: Cloud, label: "AWS" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiKubernetes, label: "Kubernetes" },
  { icon: SiRedis, label: "Redis" },
  { icon: SiOpenai, label: "OpenAI" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiVercel, label: "Vercel" },
];

export function TechMarquee() {
  const row = [...tech, ...tech];
  return (
    <section className="border-y border-border/60 py-8" aria-label="Tech stack">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12">
          {row.map((t, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 text-zinc-500 transition hover:text-white"
            >
              <t.icon className="h-7 w-7" />
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

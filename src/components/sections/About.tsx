import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading eyebrow="About" title="Who I" accent="Am" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-zinc-300">
            <p>
              I&apos;m an{" "}
              <span className="font-semibold text-white">
                AI-Augmented Full-Stack Software Engineer
              </span>{" "}
              with 4+ years delivering scalable web applications, ERP systems,
              and AI-powered platforms for US and international clients.
            </p>
            <p>
              I integrate{" "}
              <span className="text-violet-300">
                Claude AI, ChatGPT, and GitHub Copilot
              </span>{" "}
              into my daily workflow to ship features faster, automate
              repetitive tasks, and solve complex engineering problems with
              greater precision — delivering production-grade software at 2×
              speed.
            </p>
            <p>
              My core stack is Node.js, NestJS, Next.js, TypeScript, and
              PostgreSQL, with deep experience in microservices, REST API
              design, RBAC security, OpenAI API integrations, and AWS
              deployments.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {site.stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 text-center"
              >
                <div className="gradient-text text-3xl font-extrabold">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

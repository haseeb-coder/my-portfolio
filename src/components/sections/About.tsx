"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Globe, Briefcase } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { site } from "@/data/site";

const tile = "card-modern p-6";
const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading index="01" eyebrow="About" title="Who I" accent="Am" />

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-3">
          {/* Bio — spans 2 cols */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.4 }}
            className={`${tile} md:col-span-2 md:row-span-2`}
          >
            <h3 className="font-display text-xl font-semibold">
              AI-Augmented Full-Stack Engineer
            </h3>
            <p className="mt-4 text-zinc-300">
              4+ years delivering scalable web applications, ERP systems, and
              AI-powered platforms for US and international clients. I weave{" "}
              <span className="text-indigo-300">
                Claude AI, ChatGPT, and GitHub Copilot
              </span>{" "}
              into my daily workflow to ship features faster, automate
              repetitive work, and solve hard engineering problems with more
              precision — delivering production-grade software at 2× speed.
            </p>
            <p className="mt-3 text-zinc-400">
              Core stack: Node.js, NestJS, Next.js, TypeScript, PostgreSQL — with
              deep experience in microservices, REST APIs, RBAC security, OpenAI
              integrations, and AWS deployments.
            </p>
          </motion.div>

          {/* AI tile */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="card-modern flex flex-col justify-between border-indigo-500/30 bg-indigo-500/5 p-6"
          >
            <Sparkles className="h-7 w-7 text-indigo-400" />
            <div className="mt-4">
              <p className="font-display text-lg font-semibold text-indigo-200">
                AI-First Workflow
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Prompt engineering & LLM integration baked into delivery.
              </p>
            </div>
          </motion.div>

          {/* Stats row */}
          {site.stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...reveal}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className={`${tile} flex flex-col justify-center text-center`}
            >
              <div className="gradient-text font-display text-4xl font-bold">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick facts strip */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={`${tile} flex items-center gap-3`}>
            <Globe className="h-5 w-5 text-indigo-400" />
            <span className="text-sm text-zinc-300">{site.available}</span>
          </div>
          <div className={`${tile} flex items-center gap-3`}>
            <MapPin className="h-5 w-5 text-indigo-400" />
            <span className="text-sm text-zinc-300">{site.location}</span>
          </div>
          <div className={`${tile} flex items-center gap-3`}>
            <Briefcase className="h-5 w-5 text-indigo-400" />
            <span className="text-sm text-zinc-300">
              US · Saudi · International clients
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading eyebrow="Career" title="Work" accent="Experience" />
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 to-blue-500/10 md:left-4" />
          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative pl-10 md:pl-14"
              >
                <span
                  className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 md:left-1 ${
                    job.current
                      ? "border-violet-400 bg-violet-500 shadow-[0_0_16px_rgba(124,58,237,0.7)]"
                      : "border-zinc-600 bg-background"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold">
                    {job.role} ·{" "}
                    <span className="gradient-text">{job.company}</span>
                  </h3>
                  {job.current && (
                    <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs text-green-300">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 text-sm text-zinc-400">
                  <span>{job.period}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {job.projects.map((p) => (
                    <div
                      key={p.name}
                      className="glass rounded-xl p-5"
                    >
                      <h4 className="font-semibold text-white">{p.name}</h4>
                      <p className="mt-1 text-sm text-zinc-400">{p.summary}</p>
                      <ul className="mt-3 space-y-1.5">
                        {p.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-sm text-zinc-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

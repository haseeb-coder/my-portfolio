"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skills } from "@/data/skills";

export function Skills() {
  const featured = skills.find((s) => s.featured);
  const rest = skills.filter((s) => !s.featured);

  return (
    <section id="skills" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading eyebrow="Skills" title="Technical" accent="Toolbox" />

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 rounded-2xl border border-violet-500/40 bg-violet-500/5 p-6 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-semibold text-violet-200">
                {featured.category}
              </h3>
              <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
                Most in-demand
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {featured.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-sm text-violet-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="mb-3 font-semibold text-white">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-white/5 px-3 py-1 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects, type ProjectCategory } from "@/data/projects";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "AI",
  "Full-Stack",
  "ERP",
  "Blockchain",
];

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading eyebrow="Portfolio" title="Featured" accent="Projects" />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === f
                  ? "border-violet-500 bg-violet-500/15 text-violet-200"
                  : "border-border text-zinc-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

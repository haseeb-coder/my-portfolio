"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/data/projects";
import { AIBadge } from "@/components/shared/AIBadge";

function initials(title: string) {
  return title
    .replace(/—.*$/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="card-modern group flex h-full flex-col overflow-hidden"
    >
      {/* Header banner */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700/40 via-cyan-700/25 to-indigo-900/30">
        <span className="absolute left-4 top-3 font-mono text-xs text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-5xl font-extrabold tracking-tight text-white/85 transition duration-500 group-hover:scale-110">
            {initials(project.title)}
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-2">
          {project.ai && <AIBadge />}
          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-zinc-200 backdrop-blur">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-white">{project.title}</h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title}`}
              className="text-zinc-500 transition group-hover:text-indigo-300"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          )}
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          <span className="font-medium text-zinc-300">Problem: </span>
          {project.problem}
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          <span className="font-medium text-zinc-300">Solution: </span>
          {project.solution}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.impact.map((chip) => (
            <span
              key={chip}
              className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-200"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
          {(project.link || project.repo) && (
            <div className="mt-4 flex gap-4 border-t border-border pt-4 text-sm">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-300 transition hover:text-indigo-200"
                >
                  <ExternalLink className="h-4 w-4" /> Live
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
                >
                  <FaGithub className="h-4 w-4" /> Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

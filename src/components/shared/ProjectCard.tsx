import { ExternalLink } from "lucide-react";
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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-violet-500/40">
      {/* Header banner: image if present, else branded gradient with initials */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700/40 via-blue-700/30 to-fuchsia-700/30">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl font-extrabold tracking-tight text-white/80">
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
        <h3 className="font-bold text-white">{project.title}</h3>
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
              className="rounded-md bg-violet-500/10 px-2 py-0.5 text-xs text-violet-200"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
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
          <div className="mt-5 flex gap-4 border-t border-border pt-4 text-sm">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-300 transition hover:text-violet-200"
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
    </article>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { MagneticButton } from "@/components/shared/MagneticButton";

const roles = [
  "AI-Augmented Engineer",
  "Full-Stack Developer",
  "Next.js & NestJS Expert",
  "Cloud & Microservices",
];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              {site.available}
            </span>

            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>

            <div className="mt-4 flex h-9 items-center justify-center gap-2 text-xl font-semibold sm:text-2xl lg:justify-start">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="gradient-text"
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="mx-auto mt-6 max-w-xl text-zinc-400 lg:mx-0">
              {site.tagline}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 font-medium text-white shadow-[0_8px_30px_-8px_rgba(79,70,229,0.6)] transition hover:opacity-90"
              >
                Hire Me <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href={site.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:border-indigo-500/50"
              >
                <Download className="h-4 w-4" /> Download CV
              </MagneticButton>
            </div>

            <SocialLinks className="mt-8 justify-center lg:justify-start" />
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-sm"
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-600/40 to-cyan-600/40 blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-white/10 bg-card p-1.5">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/profile.png"
                  alt={`${site.name} — ${site.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 384px"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Floating accent badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -left-2 top-8 rounded-xl px-3 py-2 text-xs font-medium sm:-left-6"
            >
              ⚡ 2× faster delivery
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -right-2 bottom-10 rounded-xl px-3 py-2 text-xs font-medium sm:-right-6"
            >
              🤖 AI-Augmented
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

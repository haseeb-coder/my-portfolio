"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Hero() {
  return (
    <section className="relative pb-20 pt-28 sm:pt-32">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {site.available}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="gradient-text mt-3 text-xl font-semibold sm:text-2xl">
            {site.title}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Hire Me <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:border-violet-500/50"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
          <SocialLinks className="mt-8 justify-center" />
        </motion.div>
      </Container>
    </section>
  );
}

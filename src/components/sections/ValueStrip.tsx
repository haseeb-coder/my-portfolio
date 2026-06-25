"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Briefcase, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";

const values = [
  {
    icon: Globe,
    title: "Remote-ready, timezone-flexible",
    desc: "Proven async collaborator delivering for US, Saudi, and EU clients.",
  },
  {
    icon: Zap,
    title: "AI-accelerated 2× delivery",
    desc: "Claude, ChatGPT & Copilot woven into my workflow to ship faster.",
  },
  {
    icon: Briefcase,
    title: "4+ years, international clients",
    desc: "Scalable web apps, ERPs, and AI platforms shipped to production.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade engineering",
    desc: "Microservices, AWS, CI/CD, RBAC security — built to scale.",
  },
];

export function ValueStrip() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <v.icon className="h-7 w-7 text-violet-400" />
              <h3 className="mt-3 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

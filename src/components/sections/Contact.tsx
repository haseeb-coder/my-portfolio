"use client";

import { useState } from "react";
import { Mail, MapPin, Download, Send, CheckCircle2, CalendarClock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's Build"
          accent="Together"
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Direct contact */}
          <div className="space-y-4">
            <p className="text-zinc-300">
              Have a project in mind or a role to fill? I usually respond within
              24–48 hours.
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="glass flex items-center gap-3 rounded-xl p-4 transition hover:border-indigo-500/40"
              >
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-sm">{site.email}</span>
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-3 rounded-xl p-4 transition hover:border-indigo-500/40"
              >
                <FaWhatsapp className="h-5 w-5 text-green-400" />
                <span className="text-sm">WhatsApp: {site.phone}</span>
              </a>
              <div className="glass flex items-center gap-3 rounded-xl p-4">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span className="text-sm">
                  {site.location} · {site.available}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={site.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-indigo-500/50"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
              {site.calendly && (
                <a
                  href={site.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  <CalendarClock className="h-4 w-4" /> Book a Call
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-400" />
                <h3 className="mt-4 text-lg font-semibold">Message sent!</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Thanks for reaching out — check your inbox for a confirmation.
                  I&apos;ll reply within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    aria-label="Your name"
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={update("email")}
                    aria-label="Your email"
                  />
                </div>
                <Input
                  required
                  placeholder="Subject"
                  value={form.subject}
                  onChange={update("subject")}
                  aria-label="Subject"
                />
                <Textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={update("message")}
                  aria-label="Message"
                />
                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.honeypot}
                  onChange={update("honeypot")}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                {status === "error" && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

import { Quote } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/data/testimonials";

function avatarInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Social Proof"
          title="What Clients"
          accent="Say"
        />

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="glass rounded-2xl p-6">
                <Quote className="h-7 w-7 text-indigo-400" />
                <blockquote className="mt-3 text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 text-sm font-bold text-white">
                    {avatarInitials(t.name)}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block text-sm text-zinc-400">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="glass mx-auto max-w-2xl rounded-2xl p-8 text-center">
            <Quote className="mx-auto h-8 w-8 text-indigo-400" />
            <p className="mt-4 text-zinc-300">
              Client testimonials are on the way — based on delivered work for
              US, Saudi, and international clients across e-commerce, AI
              platforms, and ERP systems.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Be the next success story →
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

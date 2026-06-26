import { ThemeBackground } from "@/components/shared/ThemeBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="grain">
      <ThemeBackground />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <ValueStrip />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

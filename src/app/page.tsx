import { ThemeBackground } from "@/components/shared/ThemeBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <>
      <ThemeBackground />
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
        <About />
        <Skills />
        <Experience />
      </main>
    </>
  );
}

import { ThemeBackground } from "@/components/shared/ThemeBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";

export default function Home() {
  return (
    <>
      <ThemeBackground />
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
      </main>
    </>
  );
}

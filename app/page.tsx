import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Contact } from "@/sections/contact";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-3 focus:py-1"
      >
        skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 md:px-8 pt-24 pb-32">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <footer className="mx-auto max-w-3xl px-6 md:px-8 pb-10 text-xs text-muted">
        <span aria-hidden>$</span> exit 0 — built with next.js ·{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}

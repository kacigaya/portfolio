import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Separator } from "@/components/separator";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Blogs } from "@/sections/blogs";
import { Skills } from "@/sections/skills";
import { Contact } from "@/sections/contact";

export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-1"
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
          <Blogs />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Separator className="mx-auto max-w-3xl" />
      <footer className="mx-auto max-w-3xl px-6 md:px-8 pt-6 pb-10 text-xs text-muted-foreground">
        <span aria-hidden>~*~</span> © Gaya KACI · built with next.js ·{" "}
        {new Date().getFullYear()} <span aria-hidden>~*~</span>
      </footer>
    </>
  );
}

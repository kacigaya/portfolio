import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Deferred } from "@/components/deferred";
import { Separator } from "@/components/separator";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Contributions } from "@/sections/contributions";
import { Blogs } from "@/sections/blogs";
import { Skills } from "@/sections/skills";
import { Contact } from "@/sections/contact";

// Next requires a literal here — it can't be imported from REVALIDATE in
// lib/site.ts, so keep the two in sync.
export const revalidate = 86400;

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
        <Deferred>
          <About />
        </Deferred>
        <Deferred>
          <Projects />
        </Deferred>
        <Deferred>
          <Contributions />
        </Deferred>
        <Deferred>
          <Blogs />
        </Deferred>
        <Deferred>
          <Skills />
        </Deferred>
        <Deferred>
          <Contact />
        </Deferred>
      </main>
      <Separator className="mx-auto max-w-3xl" />
      <Footer />
    </>
  );
}

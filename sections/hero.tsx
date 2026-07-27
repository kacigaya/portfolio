import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Caret } from "@/components/caret";
import { socials } from "@/lib/socials";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <p className="text-sm text-muted-foreground">
        <span aria-hidden>$</span> whoami
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
        Gaya KACI
        <Caret />
      </h1>
      <p className="mt-4 text-base md:text-lg text-muted-foreground">
        cybersecurity student · web security researcher
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed text-pretty">
        Master&apos;s student at{" "}
        <span className="text-foreground">
          Efrei Paris Panthéon-Assas Université
        </span>
        . Currently working in web development and cybersecurity at{" "}
        <span className="text-foreground">Société Générale Assurance</span> doing web
        security research and building security tooling.
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        <Button size="lg" render={<a href="#projects" />}>
          view selected work
          <ArrowRight
            aria-hidden="true"
            className="transition-transform in-[[data-slot=button]:hover]:translate-x-0.5"
          />
        </Button>
        <Button size="lg" variant="outline" render={<a href="#contact" />}>
          contact me
        </Button>
        <Button size="lg" variant="ghost" render={<a href="#blogs" />}>
          read research
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <span aria-hidden>$</span> pwd
        <br />
        <span className="text-foreground">
          /{socials.location.toLowerCase().replace(/, /g, "/")}
        </span>
      </p>
    </section>
  );
}

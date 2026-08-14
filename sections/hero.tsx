import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Caret } from "@/components/caret";
import { socials } from "@/lib/socials";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <h1 className="md-h1 text-2xl md:text-3xl uppercase leading-[1.15] text-balance">
        Gaya KACI
        <Caret />
      </h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground uppercase">
        cybersecurity student · web security researcher
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
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
        <Button size="lg" variant="outline" render={<a href="#blogs" />}>
          read writing
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <span aria-hidden>&gt;</span>{" "}
        <span className="text-foreground">
          /{socials.location.toLowerCase().replace(/, /g, "/")}
        </span>
      </p>
    </section>
  );
}

import { Caret } from "@/components/caret";
import { socials } from "@/lib/socials";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <p className="text-sm text-muted">
        <span aria-hidden>$</span> whoami
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
        Gaya KACI
        <Caret />
      </h1>
      <p className="mt-4 text-base md:text-lg text-muted">
        cybersecurity student · web security researcher
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed text-pretty">
        Master&apos;s student at{" "}
        <span className="text-fg">
          Efrei Paris Panthéon-Assas Université
        </span>
        . Currently working in web development and cybersecurity at{" "}
        <span className="text-fg">Société Générale Assurance</span> doing web
        security research and building security tooling.
      </p>
      <div className="mt-7 flex flex-wrap gap-3 text-sm">
        <a href="#projects" className="border border-fg bg-fg px-3 py-2 text-bg hover:bg-bg hover:text-fg">view selected work</a>
        <a href="#contact" className="border px-3 py-2 hover:bg-fg hover:text-bg">contact me</a>
        <a href="#blogs" className="border px-3 py-2 hover:bg-fg hover:text-bg">read research</a>
      </div>
      <p className="mt-6 text-sm text-muted">
        <span aria-hidden>$</span> pwd
        <br />
        <span className="text-fg">
          /{socials.location.toLowerCase().replace(/, /g, "/")}
        </span>
      </p>
    </section>
  );
}

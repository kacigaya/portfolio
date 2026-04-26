import { Caret } from "@/components/caret";
import { socials } from "@/lib/socials";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <p className="text-sm text-muted">
        <span aria-hidden>$</span> whoami
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        Gaya KACI
        <Caret />
      </h1>
      <p className="mt-4 text-base md:text-lg text-muted">
        cybersecurity student · web developer · automation
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed">
        Master&apos;s student at <span className="text-white">ESGI Paris</span>.
        Currently web dev / cybersecurity at{" "}
        <span className="text-white">Société Générale Assurance</span> —
        building Python automation, scrapers, and security tooling.
      </p>
      <p className="mt-6 text-sm text-muted">
        <span aria-hidden>$</span> pwd
        <br />
        <span className="text-white">
          /{socials.location.toLowerCase().replace(/, /g, "/")}
        </span>
      </p>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> ls ~/projects
      </h2>
      <p className="mt-2 text-xs text-muted tabular-nums">
        selected open-source work · source and live demos where available
      </p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {featured.map((p) => (
          <li key={p.name}>
            <article className="group flex h-full flex-col border p-4 transition-colors hover:bg-white hover:text-black focus-within:bg-white focus-within:text-black">
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold">[ {p.name} ]</span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed">{p.desc}</p>
              <p className="mt-auto pt-3 text-xs text-muted group-hover:text-black">
                {p.stack.map((s) => `[${s}]`).join(" ")}
              </p>
              <div className="mt-4 flex gap-4 text-xs font-bold">
                {p.homepage && (
                  <a href={p.homepage} target="_blank" rel="noreferrer" className="underline underline-offset-4 focus-visible:outline-black">
                    live demo <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
                <a href={p.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 focus-visible:outline-black">
                  source <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <details className="mt-6 border p-4">
        <summary className="cursor-pointer text-sm">show {more.length} more projects</summary>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {more.map((project) => (
            <li key={project.name}>
              <a href={project.url} target="_blank" rel="noreferrer" className="text-muted underline underline-offset-4 hover:text-white">
                {project.name}<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

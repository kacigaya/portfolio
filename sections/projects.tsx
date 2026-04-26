import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> ls ~/projects
      </h2>
      <p className="mt-2 text-xs text-muted">
        {projects.length} entries · all open source · github.com/kacigaya
      </p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group block h-full border p-4 transition-colors hover:bg-white hover:text-black"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold">[ {p.name} ]</span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed">{p.desc}</p>
              <p className="mt-3 text-xs text-muted group-hover:text-black">
                {p.stack.map((s) => `[${s}]`).join(" ")}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

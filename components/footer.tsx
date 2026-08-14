import { socials } from "@/lib/socials";
import { cn } from "@/lib/utils";

const links = [
  { href: socials.github, label: "github", external: true },
  { href: socials.linkedin, label: "linkedin", external: true },
  { href: socials.x, label: "x", external: true },
  { href: "/feed.xml", label: "rss", external: false },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 pt-6 pb-10 text-xs text-muted-foreground md:px-8",
        className,
      )}
    >
      <span>
        © Gaya KACI · built with next.js · {new Date().getFullYear()}
      </span>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {links.map(({ href, label, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external && { target: "_blank", rel: "noreferrer" })}
              className="underline decoration-border underline-offset-4 hover:text-foreground"
            >
              <span className="bracketed">{label}</span>
              {external && <span className="sr-only"> (opens in new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

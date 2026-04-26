import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { socials } from "@/lib/socials";

const lines = [
  {
    icon: Mail,
    label: "mail",
    value: socials.email,
    href: `mailto:${socials.email}`,
  },
  {
    icon: GithubIcon,
    label: "git ",
    value: socials.githubLabel,
    href: socials.github,
  },
  {
    icon: LinkedinIcon,
    label: "in  ",
    value: socials.linkedinLabel,
    href: socials.linkedin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> contact
      </h2>
      <ul className="mt-4 space-y-2 font-mono">
        {lines.map(({ icon: Icon, label, value, href }) => {
          const external = href.startsWith("http");
          return (
            <li key={label}>
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noreferrer" })}
                className="group inline-flex items-center gap-3 hover:bg-white hover:text-black px-1 -mx-1 transition-colors"
              >
                <Icon size={16} aria-hidden />
                <span className="text-muted group-hover:text-black uppercase tracking-wider text-xs">
                  {label}
                </span>
                <span className="underline-offset-4 group-hover:no-underline underline decoration-muted group-hover:decoration-black">
                  {value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

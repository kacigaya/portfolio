import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#about", label: "~/about" },
  { href: "#projects", label: "~/projects" },
  { href: "#skills", label: "~/skills" },
  { href: "#contact", label: "~/contact" },
];

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-3xl px-6 md:px-8 h-14 flex items-center justify-between text-sm">
        <Link href="#top" aria-label="home" className="flex items-center gap-2">
          <Image
            src="/logo_dark.svg"
            alt="Logo"
            width={24}
            height={24}
            priority
            className="h-6 w-6"
          />
        </Link>
        <nav aria-label="primary">
          <ul className="flex items-center gap-3 md:gap-5 text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-white transition-colors hidden sm:inline"
                >
                  {l.label}
                </a>
                <a
                  href={l.href}
                  className="hover:text-white transition-colors sm:hidden"
                >
                  {l.label.replace("~/", "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

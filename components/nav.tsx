import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#blogs", label: "blogs" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="mx-auto max-w-3xl px-6 md:px-8 h-14 flex items-center justify-between text-sm">
        <Link href="/#top" aria-label="home" className="flex items-center gap-2">
          <Image
            src="/logo_dark.svg"
            alt=""
            width={24}
            height={24}
            priority
            className="size-6"
          />
        </Link>
        <nav aria-label="primary">
          <ul className="flex items-center gap-3 md:gap-5 text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition-colors">
                  <span className="hidden sm:inline" aria-hidden>
                    ~/
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

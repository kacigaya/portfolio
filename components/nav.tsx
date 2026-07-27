"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-provider";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#blogs", label: "blogs" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b bg-bg/90 backdrop-blur pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="mx-auto max-w-3xl px-6 md:px-8 h-14 flex items-center justify-between gap-2 text-sm">
        <Link href="/#top" aria-label="home" className="flex items-center gap-2">
          <Image
            src="/logo_dark.svg"
            alt=""
            width={24}
            height={24}
            priority
            className="size-6 hidden dark:block"
          />
          <Image
            src="/logo_light.svg"
            alt=""
            width={24}
            height={24}
            priority
            className="size-6 block dark:hidden"
          />
        </Link>
        <div
          className="flex items-center gap-1"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        >
          <nav aria-label="primary" className="hidden sm:block">
            <ul className="flex items-center gap-3 text-muted md:gap-5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block py-2 transition-colors hover:text-fg"
                  >
                    <span aria-hidden>~/</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative sm:hidden">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "close menu" : "open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-9 place-items-center text-muted transition-colors hover:text-fg sm:hidden"
            >
              {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
            <nav
              id="mobile-nav"
              aria-label="primary mobile"
              hidden={!menuOpen}
              className="absolute right-0 top-full mt-1 w-44 border bg-bg p-1 sm:hidden"
            >
              <ul className="flex flex-col text-muted">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 transition-colors hover:bg-fg hover:text-bg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

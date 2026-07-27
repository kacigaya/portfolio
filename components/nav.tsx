"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/button";
import { Menu, MenuLinkItem, MenuPopup, MenuTrigger } from "@/components/menu";
import { ThemeToggle } from "@/components/theme-provider";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#blogs", label: "blogs" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 px-4 pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)]">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between gap-2 rounded-xl border bg-background/80 px-3 text-sm shadow-xs/5 backdrop-blur md:px-4">
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
        <div className="flex items-center gap-1">
          <nav aria-label="primary" className="hidden sm:block">
            <ul className="flex items-center gap-0.5 md:gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    render={<a href={l.href} />}
                  >
                    <span aria-hidden>~/</span>
                    {l.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <Menu>
            <MenuTrigger
              aria-label="open menu"
              className="sm:hidden"
              render={
                <Button variant="ghost" size="icon">
                  <MenuIcon aria-hidden="true" />
                </Button>
              }
            />
            <MenuPopup align="end" className="w-44 sm:hidden">
              <nav aria-label="primary mobile">
                {links.map((l) => (
                  <MenuLinkItem key={l.href} href={l.href}>
                    {l.label}
                  </MenuLinkItem>
                ))}
              </nav>
            </MenuPopup>
          </Menu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

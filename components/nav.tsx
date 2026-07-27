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
    <header className="fixed top-0 inset-x-0 z-40 border-b bg-background/90 backdrop-blur pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
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

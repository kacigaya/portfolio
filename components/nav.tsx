"use client";

import Image from "next/image";
import Link from "next/link";
import { MorphIcon } from "morphicons/react";
import { useState } from "react";
import { CLOSE_ICON, MENU_ICON } from "@/components/icons";
import { Button } from "@/components/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { ThemeToggle } from "@/components/theme-provider";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#blogs", label: "blogs" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 px-4 pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)]">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="mx-auto max-w-3xl rounded-xl border bg-background/95 text-sm shadow-xs/5"
      >
        <div className="flex h-12 items-center justify-between gap-2 px-3 md:px-4">
          <Link
            href="/#top"
            aria-label="home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo_dark.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 hidden dark:block"
            />
            <Image
              src="/logo_light.svg"
              alt=""
              width={24}
              height={24}
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
                      <span className="bracketed">{l.label}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            <CollapsibleTrigger
              aria-label={open ? "close menu" : "open menu"}
              className="sm:hidden"
              render={
                <Button variant="ghost" size="icon">
                  <MorphIcon icon={open ? CLOSE_ICON : MENU_ICON} spring="snappy" />
                </Button>
              }
            />
            <ThemeToggle />
          </div>
        </div>
        <CollapsiblePanel className="sm:hidden">
          <nav aria-label="primary mobile" className="px-3 pb-3">
            <ul className="flex flex-col gap-0.5 border-t pt-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    render={<a href={l.href} onClick={() => setOpen(false)} />}
                  >
                    <span className="bracketed">{l.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </CollapsiblePanel>
      </Collapsible>
    </header>
  );
}

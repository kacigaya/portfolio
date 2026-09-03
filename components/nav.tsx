"use client";

import Image from "next/image";
import Link from "next/link";
import { MorphIcon } from "morphicons/react";
import { useEffect, useRef, useState } from "react";
import { CLOSE_ICON, MENU_ICON } from "@/components/icons";
import { Button } from "@/components/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { ThemeToggle } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", href: "/#about", label: "about" },
  { id: "projects", href: "/#projects", label: "projects" },
  { id: "contributions", href: "/#contributions", label: "contributions" },
  { id: "blogs", href: "/#blogs", label: "writing" },
  { id: "skills", href: "/#skills", label: "skills" },
  { id: "certifications", href: "/#certifications", label: "certs" },
  { id: "contact", href: "/#contact", label: "contact" },
];

// Marks the section currently under the nav bar. The bottom margin keeps a
// section from staying active once it has scrolled past the top third.
function useActiveSection(): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const lastId = sections[sections.length - 1].id;
    const visible = new Set<string>();
    // The last section is short enough to stay below the observer band even at
    // maximum scroll, so the end of the page marks it active on its own.
    let atBottom = false;

    function update() {
      if (atBottom) {
        setActive(lastId);
        return;
      }
      // links order is document order, so the first match is the topmost
      // visible section.
      setActive(links.find((l) => visible.has(l.id))?.id ?? "");
    }

    function onScroll() {
      const next =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (next === atBottom) return;
      atBottom = next;
      update();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: "-96px 0px -66% 0px" },
    );
    for (const section of sections) observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const headerRef = useRef<HTMLElement>(null);

  // The mobile panel is inline rather than a dialog, so Base UI does not close
  // it on Escape or on a click elsewhere. Both are expected of a menu.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 px-4 pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)]"
    >
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="mx-auto max-w-3xl rounded-xl border bg-background text-sm shadow-xs/5"
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
            <nav aria-label="primary" className="hidden md:block">
              <ul className="flex items-center gap-0.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-current={active === l.id ? "location" : undefined}
                      className={cn(
                        "text-muted-foreground hover:text-foreground",
                        active === l.id && "text-foreground bg-accent",
                      )}
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
              className="md:hidden"
              render={
                <Button variant="ghost" size="icon">
                  <MorphIcon
                    icon={open ? CLOSE_ICON : MENU_ICON}
                    spring="snappy"
                    reducedMotion="user"
                  />
                </Button>
              }
            />
            <ThemeToggle />
          </div>
        </div>
        <CollapsiblePanel className="md:hidden">
          <nav aria-label="primary mobile" className="px-3 pb-3">
            <ul className="flex flex-col gap-0.5 border-t pt-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-current={active === l.id ? "location" : undefined}
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-foreground",
                      active === l.id && "text-foreground bg-accent",
                    )}
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

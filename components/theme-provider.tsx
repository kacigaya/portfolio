"use client";

import { Moon, Sun } from "lucide-react";
import { MorphIcon } from "morphicons/react";
import { Button } from "@/components/button";
import { MOON_ICON, SUN_ICON } from "@/components/icons";
import {
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "theme";

// Runs before paint in the document head so the stored theme wins over the
// server-rendered default without a flash.
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}`;

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el || typeof el.tagName !== "string") return false;
  return (
    el.isContentEditable ||
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT"
  );
}

// The <html> class is the source of truth: the init script sets it before React
// boots, so the theme is read from the DOM instead of mirrored into state.
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const SUBSCRIBE_NOTHING = () => () => {};

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, getTheme, () => "dark");
  const hydrated = useSyncExternalStore(SUBSCRIBE_NOTHING, () => true, () => false);

  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "d" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.repeat || isTypingTarget(event.target)) return;
      event.preventDefault();
      toggleTheme();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title="toggle theme (d)"
      aria-label={`switch to ${theme === "dark" ? "light" : "dark"} theme, shortcut d`}
    >
      {hydrated ? (
        <MorphIcon
          icon={theme === "dark" ? SUN_ICON : MOON_ICON}
          spring="snappy"
          reducedMotion="user"
        />
      ) : (
        <>
          <Sun aria-hidden="true" className="hidden dark:block" />
          <Moon aria-hidden="true" className="block dark:hidden" />
        </>
      )}
    </Button>
  );
}

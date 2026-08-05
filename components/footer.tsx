import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mx-auto max-w-3xl px-6 md:px-8 pt-6 pb-10 text-xs text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden>~*~</span> © Gaya KACI · built with next.js ·{" "}
      {new Date().getFullYear()} <span aria-hidden>~*~</span>
    </footer>
  );
}

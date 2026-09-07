"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/logo";
import { mountLiquidLogo } from "@/lib/liquid-logo/renderer";
import { cn } from "@/lib/utils";

// The caller sets the height; the aspect ratio and the static fallback stay
// fixed. Each instance owns a WebGL context, so keep the count on a page low.
export function LiquidLogo({ className, fps }: { className?: string; fps?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) return mountLiquidLogo(canvas, fps);
  }, [fps]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block aspect-[951/851] motion-safe:[&:has(canvas[data-ready])>svg]:invisible",
        className,
      )}
    >
      <Logo className="block h-full w-full" />
      {/* The shader paints near-white chrome, which washes out on the light page.
          Darken it there so it reads as the black --logo-ink the SVG falls back to. */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full invisible brightness-45 dark:brightness-100 motion-safe:data-ready:visible" />
    </span>
  );
}

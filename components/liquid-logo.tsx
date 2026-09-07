"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/logo";
import { mountLiquidLogo } from "@/lib/liquid-logo/renderer";

export function LiquidLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) return mountLiquidLogo(canvas);
  }, []);

  return (
    <span aria-hidden="true" className="relative block h-16 aspect-[951/851] md:h-20 motion-safe:[&:has(canvas[data-ready])>svg]:invisible">
      <Logo className="block h-full w-full" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full invisible motion-safe:data-ready:visible" />
    </span>
  );
}

"use client";

import { useEffect, useRef } from "react";

export function Caret() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.style.animationPlayState = e.isIntersecting ? "running" : "paused";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <span ref={ref} aria-hidden className="caret" />;
}

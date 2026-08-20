import type { ReactNode } from "react";

// Skips rendering work for sections below the fold. No animation involved.
// the old name (Reveal) implied one.
export function Deferred({ children }: { children: ReactNode }) {
  return <div className="deferred-section">{children}</div>;
}

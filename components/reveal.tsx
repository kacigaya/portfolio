import type { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  return <div className="deferred-section">{children}</div>;
}

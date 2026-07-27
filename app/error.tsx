"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="mx-auto max-w-3xl px-6 pt-32 pb-32 md:px-8"
      role="alert"
    >
      <p className="text-sm text-muted-foreground">
        <span aria-hidden>$</span> tail -n 1 error.log
      </p>
      <h1 className="mt-4 text-4xl font-bold">500: something broke</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        This page failed to render. Retry it, or head back home.
        {error.digest && (
          <>
            {" "}
            <span className="tabular-nums">digest {error.digest}</span>
          </>
        )}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Button size="lg" onClick={reset}>
          retry
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/" />}>
          cd ~
        </Button>
      </div>
    </main>
  );
}

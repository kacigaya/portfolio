"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { jetbrains } from "./fonts";
import "./globals.css";

// Catches errors in the root layout itself, where app/error.tsx cannot.
// Must carry its own <html> and <body> since the root layout is replaced.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${jetbrains.variable} dark`}>
      <title>Something went wrong | Gaya KACI</title>
      <body className="min-h-dvh">
        <main id="main" className="mx-auto max-w-3xl px-6 pt-32 pb-32 md:px-8">
          <h1 className="md-h1 text-2xl md:text-3xl uppercase">
            500: something broke
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground" role="alert">
            This page failed to render. Retry it, or head back home.
            {error.digest && (
              <>
                {" "}
                <span className="tabular-nums">digest {error.digest}</span>
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Button size="lg" onClick={retry}>
              retry
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/" />}>
              <span className="bracketed">back home</span>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";

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
      <p className="text-sm text-muted">
        <span aria-hidden>$</span> tail -n 1 error.log
      </p>
      <h1 className="mt-4 text-4xl font-bold">500: something broke</h1>
      <p className="mt-6 max-w-2xl text-muted">
        This page failed to render. Retry it, or head back home.
        {error.digest && (
          <>
            {" "}
            <span className="tabular-nums">digest {error.digest}</span>
          </>
        )}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={reset}
          className="border border-fg bg-fg px-3 py-2 text-bg hover:bg-bg hover:text-fg"
        >
          retry
        </button>
        <Link href="/" className="border px-3 py-2 hover:bg-fg hover:text-bg">
          cd ~
        </Link>
      </div>
    </main>
  );
}

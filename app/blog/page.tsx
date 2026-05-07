import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Gaya KACI",
  description: "Notes on cybersecurity, web dev, and tooling.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 md:px-8 pt-24 pb-32">
        <section>
          <h1 className="text-sm text-muted">
            <span aria-hidden>$</span> ls ~/blog
          </h1>
          <p className="mt-2 text-xs text-muted">
            {posts.length} {posts.length === 1 ? "entry" : "entries"} · notes
            and write-ups
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block border p-4 transition-colors hover:bg-white hover:text-black"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold">[ {p.title} ]</span>
                    <span className="text-xs text-muted shrink-0 mt-1 group-hover:text-black">
                      {p.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{p.description}</p>
                  {p.tags && p.tags.length > 0 && (
                    <p className="mt-3 text-xs text-muted group-hover:text-black">
                      {p.tags.map((t) => `[${t}]`).join(" ")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="mx-auto max-w-3xl px-6 md:px-8 pb-10 text-xs text-muted">
        <span aria-hidden>$</span> exit 0 — built with next.js ·{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}

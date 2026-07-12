import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export function Blogs() {
  const posts = getAllPosts();

  return (
    <section id="blogs" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> ls ~/blog
      </h2>
      <p className="mt-2 text-xs text-muted tabular-nums">
        {posts.length} {posts.length === 1 ? "entry" : "entries"} · notes and
        write-ups
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
                <ArrowUpRight
                  size={16}
                  className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-sm leading-relaxed">{p.description}</p>
                <span className="text-xs text-muted shrink-0 group-hover:text-black tabular-nums">
                  {p.date}
                </span>
              </div>
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
  );
}

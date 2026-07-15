import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { getAllPosts, getPost, readingTime } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical notes on browser security, automation, reverse engineering, and web development.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return <><Nav /><main id="main" className="mx-auto max-w-3xl px-6 pt-24 pb-32 md:px-8">
    <p className="text-sm text-muted"><span aria-hidden>$</span> ls ~/blog</p>
    <h1 className="mt-3 text-4xl font-bold">Technical notes</h1>
    <p className="mt-4 max-w-2xl text-muted">Browser security, automation, reverse engineering, and the things I learn while building.</p>
    <ul className="mt-10 space-y-3">
      {posts.map((post) => <li key={post.slug}>
        <Link href={`/blog/${post.slug}`} className="group block border p-4 hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black">
          <h2 className="font-bold">{post.title}</h2>
          <p className="mt-2 text-sm leading-relaxed">{post.description}</p>
          <p className="mt-3 text-xs text-muted group-hover:text-black group-focus-visible:text-black">{post.date} · {readingTime(getPost(post.slug)?.content ?? "")} min read</p>
        </Link>
      </li>)}
    </ul>
  </main></>;
}

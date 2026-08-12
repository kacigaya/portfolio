import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Nav } from "@/components/nav";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical notes on browser security, automation, reverse engineering, and web development.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 pt-24 pb-32 md:px-8">
        <h1 className="md-h1 text-2xl md:text-3xl uppercase">Technical notes</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Browser security, automation, reverse engineering, and the things I
          learn while building.
        </p>
        <ul className="mt-10 flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              {/* the title link stretches over the card, so the whole card is the hit target */}
              <Card className="transition-colors hover:bg-accent has-[a:focus-visible]:bg-accent">
                <CardHeader className="p-4">
                  <CardTitle as="h2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="outline-none after:absolute after:inset-0"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {post.date} · {post.minutes} min read
                  </span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

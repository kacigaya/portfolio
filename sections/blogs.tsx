import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { getAllPosts, getPost, readingTime } from "@/lib/posts";

export function Blogs() {
  const posts = getAllPosts();

  return (
    <section id="blogs" className="mt-32">
      <h2 className="text-sm text-muted-foreground">
        <span aria-hidden>$</span> ls ~/blog
      </h2>
      <p className="mt-2 text-xs text-muted-foreground tabular-nums">
        {posts.length} {posts.length === 1 ? "entry" : "entries"} · notes and
        write-ups
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-3">
        {posts.map((p) => (
          <li key={p.slug}>
            {/* the title link stretches over the card, so the whole card is the hit target */}
            <Card className="transition-colors hover:bg-accent has-[a:focus-visible]:bg-accent">
              <CardHeader className="p-4">
                <CardTitle>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="outline-none after:absolute after:inset-0"
                  >
                    {p.title}
                  </Link>
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {p.description}
                </CardDescription>
                <CardAction>
                  <ArrowUpRight aria-hidden="true" className="size-4 opacity-80" />
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-wrap items-center gap-2 p-4">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {p.date} · {readingTime(getPost(p.slug)?.content ?? "")} min
                </span>
                {p.tags?.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <Button
        variant="link"
        size="sm"
        className="mt-5 px-0 text-muted-foreground hover:text-foreground"
        render={<Link href="/blog" />}
      >
        browse all posts
        <ArrowUpRight aria-hidden="true" />
      </Button>
    </section>
  );
}

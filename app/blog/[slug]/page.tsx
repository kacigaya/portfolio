import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Separator } from "@/components/separator";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${slug}`,
      images: ["/opengraph-image"],
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 md:px-8 pt-24 pb-32">
        <p className="text-sm text-muted-foreground">/blog/{post.slug}.md</p>
        <header className="mt-6 border-b pb-6">
          <h1 className="md-h1 text-2xl md:text-3xl leading-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="tabular-nums">{post.date} · {post.minutes} min read</span>
            {post.tags && post.tags.length > 0 && (
              <span className="flex flex-wrap gap-1">
                {post.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </span>
            )}
            {post.repo && (
              <Button
                variant="outline"
                size="xs"
                render={<a href={post.repo} target="_blank" rel="noreferrer" />}
              >
                source repo
                <span className="sr-only">(opens in new tab)</span>
                <ArrowUpRight aria-hidden="true" />
              </Button>
            )}
          </div>
        </header>
        <article className="prose-blog mt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
        <Separator className="mt-16" />
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          render={<Link href="/blog" />}
        >
          <span className="bracketed">back to /blog</span>
        </Button>
      </main>
      <Footer className="pt-0" />
    </>
  );
}

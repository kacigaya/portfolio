import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gaya KACI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
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
        <p className="text-sm text-muted">
          <span aria-hidden>$</span> cat ~/blog/{post.slug}.md
        </p>
        <header className="mt-6 border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span>{post.date}</span>
            {post.tags && post.tags.length > 0 && (
              <span>{post.tags.map((t) => `[${t}]`).join(" ")}</span>
            )}
            {post.repo && (
              <a
                href={post.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-white"
              >
                source repo
                <ArrowUpRight size={12} aria-hidden />
              </a>
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
        <p className="mt-16 text-sm">
          <Link href="/blog" className="text-muted hover:text-white">
            <span aria-hidden>$</span> cd ..
          </Link>
        </p>
      </main>
      <footer className="mx-auto max-w-3xl px-6 md:px-8 pb-10 text-xs text-muted">
        <span aria-hidden>$</span> exit 0 | built with next.js ·{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}

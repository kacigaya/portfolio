import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  repo?: string;
};

export type Post = PostMeta & { content: string };

function metadata(slug: string, data: Record<string, unknown>): PostMeta | null {
  if (typeof data.title !== "string" || typeof data.date !== "string" || typeof data.description !== "string") {
    console.warn(`Skipping post with invalid frontmatter: ${slug}`);
    return null;
  }
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: Array.isArray(data.tags) && data.tags.every((tag) => typeof tag === "string") ? data.tags : undefined,
    repo: typeof data.repo === "string" ? data.repo : undefined,
  };
}

export function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const { data } = matter(raw);
      return metadata(slug, data);
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const meta = metadata(slug, data);
  return meta ? { ...meta, content } : null;
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { utcDate } from "@/lib/utils";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  minutes: number;
  tags?: string[];
  repo?: string;
};

export type Post = PostMeta & { content: string };

function metadata(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): PostMeta {
  if (typeof data.title !== "string" || typeof data.date !== "string" || typeof data.description !== "string") {
    throw new Error(`${slug}: title, date, and description must be strings`);
  }
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`${slug}: invalid slug`);
  const date = utcDate(data.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== data.date) {
    throw new Error(`${slug}: date must be YYYY-MM-DD`);
  }
  if (data.tags !== undefined && (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string"))) {
    throw new Error(`${slug}: tags must be strings`);
  }
  if (data.repo !== undefined && (typeof data.repo !== "string" || !URL.canParse(data.repo) || !/^https?:$/.test(new URL(data.repo).protocol))) {
    throw new Error(`${slug}: repo must be an HTTP(S) URL`);
  }
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    minutes: readingTime(content),
    tags: data.tags as string[] | undefined,
    repo: data.repo as string | undefined,
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
      const { data, content } = matter(raw);
      return metadata(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...metadata(slug, data, content), content };
}

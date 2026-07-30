import { describe, expect, test } from "bun:test";
import { GET } from "@/app/feed.xml/route";
import { getAllPosts, getPost, readingTime } from "@/lib/posts";

describe("posts", () => {
  test("loads valid posts once with stable metadata", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts).toEqual([...posts].sort((a, b) => b.date.localeCompare(a.date)));
    for (const post of posts) {
      expect(new Date(`${post.date}T00:00:00Z`).toISOString().slice(0, 10)).toBe(post.date);
      expect(post.minutes).toBeGreaterThan(0);
      expect(getPost(post.slug)?.minutes).toBe(post.minutes);
    }
  });

  test("rounds reading time up to at least one minute", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime(Array(221).fill("word").join(" "))).toBe(2);
  });

  test("generates an escaped RSS feed for every post", async () => {
    const response = GET();
    const xml = await response.text();

    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
    for (const post of getAllPosts()) {
      expect(xml).toContain(`/blog/${encodeURIComponent(post.slug)}`);
      expect(xml).toContain(`<title>${post.title.replaceAll("&", "&amp;")}</title>`);
    }
  });
});

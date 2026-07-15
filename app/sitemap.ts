import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://gayakaci.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...getAllPosts().map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}

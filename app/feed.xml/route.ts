import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function GET() {
  const items = getAllPosts().map((post) => {
    const url = escape(`${SITE_URL}/blog/${encodeURIComponent(post.slug)}`);
    return `<item><title>${escape(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escape(post.description)}</description></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Gaya KACI</title><link>${SITE_URL}/blog</link><description>Technical notes on browser security, automation, and reverse engineering.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://gayakaci.netlify.app";
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function GET() {
  const items = getAllPosts().map((post) => `<item><title>${escape(post.title)}</title><link>${baseUrl}/blog/${post.slug}</link><guid>${baseUrl}/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escape(post.description)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Gaya KACI</title><link>${baseUrl}/blog</link><description>Technical notes on browser security, automation, and reverse engineering.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

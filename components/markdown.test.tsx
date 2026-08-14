import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createMarkdownComponents } from "@/components/markdown";
import { getAllPosts, getHeadings, getPost } from "@/lib/posts";

function render(markdown: string) {
  const headings = getHeadings(markdown);
  return renderToStaticMarkup(
    <ReactMarkdown
      components={createMarkdownComponents(headings)}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>,
  );
}

describe("markdown headings", () => {
  test("every table-of-contents anchor exists in the rendered post", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);

    for (const { slug } of posts) {
      const content = getPost(slug)!.content;
      const html = render(content);
      for (const heading of getHeadings(content)) {
        expect(html).toContain(`id="${heading.id}"`);
      }
    }
  });

  test("keeps anchors alive for links, entities, and repeated headings", () => {
    const html = render(
      [
        "## See the [RFC 8446](https://example.com)",
        "text",
        "## Notes &amp; caveats",
        "text",
        "### Result",
        "text",
        "### Result",
      ].join("\n\n"),
    );

    expect(getHeadings("## See the [RFC 8446](https://example.com)")[0].text).toBe(
      "See the RFC 8446",
    );
    expect(html).toContain('id="see-the-rfc-8446"');
    expect(html).toContain('id="notes-caveats"');
    expect(html).toContain('id="result"');
    expect(html).toContain('id="result-2"');
  });

  test("does not leak the react-markdown node handle into the DOM", () => {
    expect(render("## Heading")).not.toContain("node=");
  });
});

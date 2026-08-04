import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MorphIcon } from "morphicons/react";
import { MENU_ICON, CLOSE_ICON, SUN_ICON, MOON_ICON } from "@/components/icons";

test("icon nodes render server-side to a non-empty path", () => {
  for (const icon of [MENU_ICON, CLOSE_ICON, SUN_ICON, MOON_ICON]) {
    const html = renderToStaticMarkup(<MorphIcon icon={icon} />);
    expect(html).toContain("<path");
    expect(html).toMatch(/d="M[^"]{10,}"/);
  }
});

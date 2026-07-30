import localFont from "next/font/local";

export const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  // ponytail: content glyph subset; regenerate the WOFF2 files when adding new scripts.
  src: [
    { path: "../public/fonts/JetBrainsMonoNerdFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/JetBrainsMonoNerdFont-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/JetBrainsMonoNerdFont-Bold.woff2", weight: "700", style: "normal" },
  ],
});

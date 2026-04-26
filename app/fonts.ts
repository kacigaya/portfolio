import localFont from "next/font/local";

export const jetbrains = localFont({
  variable: "--font-jetbrains",
  display: "swap",
  src: [
    { path: "../public/fonts/JetBrainsMonoNerdFont-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/JetBrainsMonoNerdFont-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/JetBrainsMonoNerdFont-Bold.ttf", weight: "700", style: "normal" },
  ],
});

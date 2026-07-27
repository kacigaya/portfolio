import type { Metadata, Viewport } from "next";
import { jetbrains } from "./fonts";
import { THEME_INIT_SCRIPT, ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gaya KACI | Cybersecurity and web",
    template: "%s | Gaya KACI",
  },
  description:
    "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
  metadataBase: new URL("https://gayakaci.netlify.app/"),
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: "Gaya KACI",
    description:
      "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Gaya KACI",
          url: "https://gayakaci.netlify.app/",
          jobTitle: "Cybersecurity student and web security researcher",
          sameAs: ["https://github.com/kacigaya", "https://linkedin.com/in/kacigaya", "https://x.com/kacigaya"],
        }).replace(/</g, "\\u003c") }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

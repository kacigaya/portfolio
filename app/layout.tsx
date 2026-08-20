import type { Metadata, Viewport } from "next";
import { jetbrains } from "./fonts";
import { THEME_INIT_SCRIPT } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/site";
import { socials } from "@/lib/socials";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gaya KACI | Cybersecurity and web security",
    template: "%s | Gaya KACI",
  },
  description:
    "Cybersecurity student and web security researcher building developer tools, browser automation, and security software.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: "Gaya KACI",
    description:
      "Cybersecurity student and web security researcher building developer tools, browser automation, and security software.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#151516" },
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
          url: SITE_URL,
          jobTitle: "Cybersecurity student and web security researcher",
          sameAs: [socials.github, socials.linkedin, socials.x],
        }).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}

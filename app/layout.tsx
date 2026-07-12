import type { Metadata, Viewport } from "next";
import { jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gaya KACI | Cybersecurity and web",
    template: "%s | Gaya KACI",
  },
  description:
    "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
  metadataBase: new URL("https://gayakaci.netlify.app/"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gaya KACI",
    description:
      "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

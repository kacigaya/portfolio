import type { Metadata } from "next";
import { jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaya KACI | Cybersecurity and web",
  description:
    "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
  metadataBase: new URL("https://gayakaci.vercel.app/"),
  openGraph: {
    title: "Gaya KACI",
    description:
      "Cybersecurity student at Efrei Paris Pantheon-Assas. Web development, automation, and security tooling.",
    type: "website",
  },
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

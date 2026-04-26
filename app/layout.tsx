import type { Metadata } from "next";
import { jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaya KACI — Cybersecurity & Web",
  description:
    "Cybersecurity student at ESGI Paris. Web developer, automation and security tooling.",
  metadataBase: new URL("https://gayakaci.vercel.app/"),
  openGraph: {
    title: "Gaya KACI",
    description:
      "Cybersecurity student at ESGI Paris. Web dev, automation, security tooling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

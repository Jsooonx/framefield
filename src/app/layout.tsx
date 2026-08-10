import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Framefield — Rare starting points for the web.",
  description:
    "Art-directed website builds, reusable sections, visual assets, and prompts for modern builders.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

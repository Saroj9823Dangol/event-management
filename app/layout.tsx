import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "EventSphere | Where Experiences Find You",
  description:
    "Discover extraordinary events through a cinematic lens. Curated experiences for the discerning.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

import { Providers } from "./providers";
import { BackgroundPattern } from "@/components/background-pattern";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} dark`}>
      <body className="font-sans bg-background text-foreground min-h-screen antialiased selection:bg-accent selection:text-accent-foreground">
        <Providers>
          <BackgroundPattern />
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google"; // Import Montserrat
import type React from "react";
import "./globals.css";

// Configure both fonts to use the same variable name so globals.css doesn't need to change logic
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-main", // Changed from --font-playfair
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-main",
});

const font =
  process.env.NEXT_PUBLIC_FONT_FAMILY === "montserrat" ? montserrat : playfair;

export const metadata: Metadata = {
  title: "UCNCEE | Where Experiences Find You",
  description:
    "Discover extraordinary events through a cinematic lens. Curated experiences for the discerning.",
  generator: "https://apptechnologies.co",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

import { BackgroundPattern } from "@/components/background-pattern";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/auth/auth-context";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${font.variable} dark`}>
      <body
        suppressHydrationWarning
        className="font-sans bg-background text-foreground min-h-screen antialiased selection:bg-accent selection:text-accent-foreground"
      >
        <Providers>
          <AuthProvider>
            <BackgroundPattern />
            <div className="relative z-10">{children}</div>
            <Toaster richColors />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

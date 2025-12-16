import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import type React from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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
    <html lang="en" className={`${playfair.variable} dark`}>
      <body className="font-sans bg-background text-foreground min-h-screen antialiased selection:bg-accent selection:text-accent-foreground">
        <Providers>
          <AuthProvider>
            <BackgroundPattern />
            <div className="relative z-10">{children}</div>
            <Toaster position="bottom-right" richColors theme="dark" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

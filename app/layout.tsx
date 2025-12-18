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

// Dynamic metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.title.default,
    template: siteConfig.metadata.title.template,
  },
  description: siteConfig.metadata.description,
  applicationName: siteConfig.metadata.applicationName,
  generator: siteConfig.metadata.generator,
  referrer: siteConfig.metadata.referrer,
  keywords: siteConfig.metadata.keywords,
  authors: [
    {
      name: siteConfig.metadata.author.name,
      url: siteConfig.metadata.author.url,
    },
  ],
  creator: siteConfig.metadata.creator,
  publisher: siteConfig.metadata.publisher,
  formatDetection: siteConfig.metadata.formatDetection,
  metadataBase: siteConfig.metadata.metadataBase,
  alternates: siteConfig.metadata.alternates,
  openGraph: {
    title: siteConfig.metadata.openGraph.title,
    description: siteConfig.metadata.openGraph.description,
    url: siteConfig.metadata.openGraph.url,
    siteName: siteConfig.metadata.openGraph.siteName,
    images: [
      {
        url: siteConfig.metadata.openGraph.images.url,
        width: siteConfig.metadata.openGraph.images.width,
        height: siteConfig.metadata.openGraph.images.height,
        alt: siteConfig.metadata.openGraph.images.alt,
      },
    ],
    locale: siteConfig.metadata.openGraph.locale,
    type: siteConfig.metadata.openGraph.type,
    emails: siteConfig.metadata.openGraph.emails,
  },
  twitter: {
    card: siteConfig.metadata.twitter.card,
    site: siteConfig.metadata.twitter.site,
    creator: siteConfig.metadata.twitter.creator,
    title: siteConfig.metadata.twitter.title,
    description: siteConfig.metadata.twitter.description,
    images: siteConfig.metadata.twitter.images.map((img) => img.url),
  },
  icons: {
    icon: siteConfig.metadata.icons.icon,
    shortcut: siteConfig.metadata.icons.shortcut,
    apple: siteConfig.metadata.icons.apple,
    other: siteConfig.metadata.icons.other,
  },
  manifest: siteConfig.metadata.manifest,
  robots: siteConfig.metadata.robots,
  verification: {
    google: siteConfig.metadata.verification.google,
  },
  other: siteConfig.metadata.other,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

import { BackgroundPattern } from "@/components/background-pattern";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/auth/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/site-config";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/api/categories";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

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
            <SiteFooter categories={categories} />
            <Toaster richColors />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

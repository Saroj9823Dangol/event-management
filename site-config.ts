import type { Metadata } from "next";
import { Attribute } from "next-themes";

interface SiteConfig {
  fonts: {
    montserrat: {
      subsets: ("latin" | "latin-ext")[];
      weights: (
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900"
      )[];
      variable: `--${string}`;
    };
    playfair: {
      subsets: ("latin" | "latin-ext")[];
      weights: ("400" | "500" | "600" | "700" | "800" | "900")[];
      variable: `--${string}`;
    };
  };
  theme: {
    attribute: Attribute;
    defaultTheme: string;
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
  };
  metadata: Metadata & {
    title: {
      default: string;
      template: string;
    };
    author: {
      name: string;
      url: string;
    };
    openGraph: {
      title: string;
      description: string;
      url: string;
      siteName: string;
      images: {
        url: string;
        width: number;
        height: number;
        alt: string;
      };
      locale: string;
      type:
        | "website"
        | "article"
        | "book"
        | "profile"
        | "music.song"
        | "music.album"
        | "music.playlist"
        | "music.radio_station"
        | "video.movie"
        | "video.episode"
        | "video.tv_show"
        | "video.other";
      emails: string[];
    };
    twitter: {
      card: "summary" | "summary_large_image" | "player" | "app";
      site: string;
      creator: string;
      title: string;
      description: string;
      images: Array<{
        url: string;
        width?: number;
        height?: number;
        alt?: string;
      }>;
    };
    icons: {
      icon: Array<{ url: string; sizes?: string; type?: string }>;
      shortcut: string[];
      apple: Array<{ url: string; sizes?: string; type?: string }>;
      other: Array<{ rel: string; url: string; color?: string }>;
    };
    verification: {
      google: string;
      yandex?: string;
    };
    other: Record<string, string>;
  };
  structuredData: {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    logo: string;
    sameAs: string[];
    description: string;
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    contactPoint: {
      "@type": string;
      telephone: string;
      contactType: string;
      email: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  fonts: {
    montserrat: {
      subsets: ["latin", "latin-ext"],
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      variable: "--font-montserrat",
    },
    playfair: {
      subsets: ["latin", "latin-ext"],
      weights: ["400", "500", "600", "700", "800", "900"],
      variable: "--font-playfair",
    },
  },
  theme: {
    attribute: "class",
    defaultTheme: "dark",
    enableSystem: true,
    disableTransitionOnChange: true,
  },
  metadata: {
    title: {
      default: "UCNCEE | Discover Extraordinary Events",
      template: "%s | UCNCEE - Event Discovery Platform",
    },
    author: {
      name: "UCNCEE Team",
      url: "https://ucncee.vercel.app",
    },
    description:
      "Discover and book the best events in your city. Music, Arts, Workshops, and Nightlife experiences curated just for you.",
    applicationName: "UCNCEE Event Platform",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: [
      "Event Tickets",
      "Concerts",
      "Workshops",
      "Nightlife",
      "Booking Platform",
      "Events in Nepal",
      "Kathmandu Events",
      "Live Music",
      "Art Exhibitions",
      "Tech Conferences",
      "Networking Events",
      "Food Festivals",
      "Cultural Events",
      "Online Booking",
      "Event Management",
    ],
    authors: [
      {
        name: "UCNCEE Team",
        url: "https://ucncee.vercel.app",
      },
    ],
    creator: "UCNCEE",
    publisher: "UCNCEE",
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    metadataBase: new URL("https://ucncee.vercel.app"),
    alternates: {
      canonical: "https://ucncee.vercel.app/",
    },
    openGraph: {
      title: "UCNCEE | Discover Extraordinary Events",
      description:
        "Your gateway to premium events and experiences. Find tickets for concerts, workshops, and more.",
      url: "https://ucncee.vercel.app",
      siteName: "UCNCEE",
      images: {
        url: "https://ucncee.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "UCNCEE Event Discovery",
      },
      locale: "en_US",
      type: "website",
      emails: ["support@ucncee.com"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ucncee",
      creator: "@ucncee",
      title: "UCNCEE | Discover Extraordinary Events",
      description:
        "Discover and book the best events in your city. Music, Arts, Workshops, and Nightlife.",
      images: [
        {
          url: "https://ucncee.vercel.app/og-image.png",
          width: 1200,
          height: 600,
          alt: "UCNCEE Events",
        },
      ],
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [],
    },
    verification: {
      google: "google-site-verification-code",
    },
    other: {
      "theme-color": "#ffffff",
    },
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UCNCEE",
    url: "https://ucncee.vercel.app",
    logo: "https://ucncee.vercel.app/logo/dark-theme-logo.png",
    sameAs: [
      "https://facebook.com/ucncee",
      "https://twitter.com/ucncee",
      "https://instagram.com/ucncee",
    ],
    description: "A premier platform for discovering and booking events.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Event Street",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "Nepal",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+977-1-4444444",
      contactType: "customer service",
      email: "support@ucncee.com",
    },
  },
};

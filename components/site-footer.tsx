"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/types";
import { IPaginatedResponse } from "@/types/response";

const otherLinks = {
  Support: [{ label: "Contact Us", href: "/contact" }],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms-and-conditions" },
    { label: "Privacy Policy", href: "/legal/privacy-policies" },
    { label: "Refund Policy", href: "/legal/refund-policies" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

interface SiteFooterProps {
  categories: IPaginatedResponse<ICategory>;
}

export function SiteFooter({ categories }: SiteFooterProps) {
  const discoverLinks = [
    { label: "All Events", href: "/events" },
    ...(categories?.data?.map((category) => ({
      label: category.name,
      href: `/events?category=${category.slug}`,
    })) || []),
  ];

  const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const discoverChunks = chunkArray(discoverLinks, 8);

  const columns = [
    ...discoverChunks.map((links, index) => ({
      title: index === 0 ? "Discover" : "",
      links,
    })),
    ...Object.entries(otherLinks).map(([title, links]) => ({
      title,
      links,
    })),
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-40 h-10">
                <Image
                  src="/logo/dark-theme-logo.png"
                  alt="UCNCEE"
                  fill
                  className="w-40 h-10 object-cover"
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Where experiences find you. Discover, book, and live extraordinary
              moments.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column, idx) => (
            <div key={`${column.title}-${idx}`}>
              <h4 className="text-sm tracking-wider mb-6 min-h-[1.25rem]">
                {column.title.toUpperCase()}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 UCNCEE. All rights reserved.</p>
            <div className="flex gap-6">
              <span>USD ($)</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Discover: [
    { label: "All Events", href: "/events" },
    { label: "Concerts", href: "/events?category=concerts" },
    { label: "Theater", href: "/events?category=theater" },
    { label: "Sports", href: "/events?category=sports" },
    { label: "Comedy", href: "/events?category=comedy" },
    { label: "Festivals", href: "/events?category=festivals" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Refund Policy", href: "/legal/terms" }, // Usually part of terms or separate
    { label: "Accessibility", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Cookie Policy", href: "/legal/privacy" }, // Often same page
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter */}
      {/* <div className="border-b border-border">
        <div className="container mx-auto py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif mb-2">
                Stay in the Loop
              </h3>
              <p className="text-muted-foreground">
                Get exclusive access to presales and curated recommendations.
              </p>
            </div>
            <form className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-5 py-4 bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Links */}
      <div className="mx-auto container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand */}
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

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm tracking-wider mb-6">
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
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

      {/* Bottom Bar */}
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

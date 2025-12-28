"use client";

import { ArrowRight } from "lucide-react";

const footerLinks = {
  Discover: ["Events", "Collections", "Artists", "Venues", "Cities"],
  Company: ["About", "Careers", "Press", "Partners", "Contact"],
  Support: ["Help Center", "Terms", "Privacy", "Accessibility", "Sitemap"],
};

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Newsletter */}
      <div className="00px] mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Stay in the know
            </h3>
            <p className="text-muted-foreground max-w-md">
              Subscribe for curated event recommendations and exclusive early
              access opportunities.
            </p>
          </div>

          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-border">
        <div className="00px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <span className="font-serif text-2xl text-foreground">
                UCNCEE
              </span>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Curated experiences for the discerning.
              </p>
            </div>

            {/* Link Groups */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm tracking-widest text-muted-foreground uppercase mb-6">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors link-underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="00px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 UCNCEE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

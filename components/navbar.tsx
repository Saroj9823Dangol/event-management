"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Events", href: "#events" },
  { name: "Collections", href: "#collections" },
  { name: "Exclusive", href: "#exclusive" },
  { name: "Partners", href: "#partners" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="00px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="relative z-10">
              <span className="font-serif text-2xl tracking-tight text-foreground">
                EventSphere
              </span>
            </a>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <a
                href="#"
                className="hidden sm:block text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Sign In
              </a>

              <a
                href="#"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                Get Started
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-foreground"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-sm"
          >
            <div className="max-w-3xl mx-auto px-6 pt-32">
              <div className="flex items-center justify-between mb-12">
                <span className="text-sm tracking-widest text-muted-foreground uppercase">
                  Search
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-foreground"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                autoFocus
                className="w-full bg-transparent border-b border-border pb-4 text-3xl md:text-5xl font-serif placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
              />
              <div className="mt-12">
                <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Concerts",
                    "Theatre",
                    "Art Exhibitions",
                    "Food & Wine",
                    "Sports",
                  ].map((term) => (
                    <span
                      key={term}
                      className="px-4 py-2 border border-border text-sm hover:bg-secondary transition-colors cursor-pointer"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background lg:hidden"
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-16">
                <span className="font-serif text-2xl">EventSphere</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="space-y-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-4xl font-serif text-foreground"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <div className="absolute bottom-12 left-6 right-6">
                <a
                  href="#"
                  className="block w-full py-4 bg-foreground text-background text-center text-sm tracking-wide"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

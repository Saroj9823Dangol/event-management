"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  User,
  ArrowRight,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/components/auth/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CinematicNav() {
  const router = useRouter();
  const { isAuthenticated, user, logout, openLoginModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "glass py-4 !border-0 border-b" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-1">
              <Link
                href="/"
                className="block relative z-10 group cursor-pointer w-fit"
              >
                <motion.div className="flex items-center gap-3">
                  <div className="relative w-40 h-10">
                    <Image
                      src="/logo/dark-theme-logo.png"
                      alt="UCNCEE"
                      fill
                      className="w-40 h-10 object-cover"
                    />
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Center Nav */}
            <nav className="hidden lg:flex items-center gap-12 justify-center flex-1">
              {["Discover", "Live Now", "Enterprise"].map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Discover"
                      ? "/events"
                      : item === "Enterprise"
                      ? "/enterprise"
                      : item === "Live Now"
                      ? "/live-now"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-sm tracking-[0.1em] font-bold hover:text-white transition-colors relative group"
                >
                  {item.toUpperCase()}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-6 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar className="h-9 w-9 border border-white/10 hover:border-accent transition-colors cursor-pointer">
                        <AvatarImage src={(user as any)?.avatar?.url} />
                        <AvatarFallback className="bg-white/10 text-white text-xs">
                          {user?.name?.slice(0, 2).toUpperCase() || "KV"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-black/90 backdrop-blur-xl border-white/10 text-white"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer focus:bg-white/10 focus:text-white"
                        onClick={() => router.push("/dashboard")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="flex items-center gap-2 p-2 hover:text-accent transition-colors font-medium text-sm"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline">Log in</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:text-accent transition-colors lg:hidden"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link
                href="/events"
                className="hidden lg:block px-6 py-2.5 bg-white text-black text-sm tracking-wider font-medium hover:bg-accent hover:text-white transition-all duration-300 rounded-sm"
              >
                Whispering Willow
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 p-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative group flex items-center">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Search events, artists, venues..."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full bg-transparent border-b border-border/50 py-8 pl-14 pr-16 text-4xl md:text-6xl font-serif text-white placeholder:text-muted-foreground/30 focus:border-accent outline-none transition-colors"
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={handleSearch}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-accent transition-colors"
                      >
                        <ArrowRight className="w-8 h-8" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-background border-l border-white/5"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-xl tracking-[0.2em] font-light">
                  UCNCEE
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:text-accent"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center px-8 gap-8">
                {/* Regular Nav Links */}
                {["Discover", "Live Now", "Enterprise"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={
                        item === "Discover"
                          ? "/events"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      onClick={() => setMenuOpen(false)}
                      className="text-5xl font-serif hover:text-accent transition-colors block"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth Links for Mobile */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 border-t border-white/10"
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl font-serif hover:text-accent transition-colors block mb-6"
                      >
                        My Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="text-xl text-red-500 hover:text-red-400 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-5 h-5" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openLoginModal();
                      }}
                      className="text-4xl font-serif text-accent hover:text-white transition-colors"
                    >
                      Login / Register
                    </button>
                  )}
                </motion.div>
              </nav>
              <div className="p-8 border-t border-white/5">
                <p className="text-muted-foreground text-sm">© 2025 UCNCEE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

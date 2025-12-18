"use client";

import { BackgroundPattern } from "@/components/background-pattern";
import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background relative font-sans">
      <BackgroundPattern />
      <CinematicNav />

      <main className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Professional Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
            <div className="flex items-center gap-6">
              {/* Square Avatar */}
              <div className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-white/40">
                {user ? getInitials(user.name) : "SD"}
              </div>
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">
                  {user ? user.name : "Guest User"}
                </h1>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
              {[
                { label: "My Tickets", href: "/dashboard" },
                { label: "Profile", href: "/dashboard/profile" },
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-accent border-accent text-white"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

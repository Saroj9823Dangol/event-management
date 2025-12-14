import { BackgroundPattern } from "@/components/background-pattern";
import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                SD
              </div>
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">
                  Saroj Dangol
                </h1>
                <p className="text-accent font-mono text-sm tracking-wider">
                  MEMBER #992-10
                </p>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
              {[
                { label: "My Tickets", href: "/dashboard" },
                { label: "Profile", href: "/dashboard/profile" },
                { label: "Loyalty", href: "/dashboard/loyalty" },
                { label: "Promo History", href: "/dashboard/promo-history" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

import { BackgroundPattern } from "@/components/background-pattern";
import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <CinematicNav />

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <div className="w-full max-w-md relative z-10">{children}</div>
      </main>
    </div>
  );
}

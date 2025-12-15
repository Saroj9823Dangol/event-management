import { CinematicNav } from "@/components/cinematic-nav";
import LiveNowComponent from "@/components/live-now/live-now-component";
import { SiteFooter } from "@/components/site-footer";
import { getLiveEvents } from "@/lib/api/events";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function LivePage() {
  const liveEvents = await getLiveEvents();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CinematicNav />
      <LiveNowComponent events={liveEvents} />
      <SiteFooter />
    </main>
  );
}

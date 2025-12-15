import { Suspense } from "react";
import { CinematicNav } from "@/components/cinematic-nav";
import { EventsHero } from "@/components/events/events-hero";
import { EventsFilter } from "@/components/events/events-filter";
import { EventsGrid } from "@/components/events/events-grid";
import { SiteFooter } from "@/components/site-footer";
import { getFilteredEvents } from "@/lib/api/events";

// Fix Vercel caching - force dynamic rendering
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getFilteredEvents();

  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <EventsHero />
      <div className="mx-auto container py-20">
        <EventsFilter />
        <EventsGrid events={events} />
      </div>
      <SiteFooter />
    </main>
  );
}

import { Suspense } from "react";
import { CinematicNav } from "@/components/cinematic-nav";
import { EventsHero } from "@/components/events/events-hero";
import { EventsFilter } from "@/components/events/events-filter";
import { EventsGrid } from "@/components/events/events-grid";
import { SiteFooter } from "@/components/site-footer";
import { getFilteredEvents } from "@/lib/api/events";
import { getCategories } from "@/lib/api/categories";
import logger from "@/lib/logger/logger";

// Fix Vercel caching - force dynamic rendering
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const events = await getFilteredEvents(resolvedSearchParams);
  const categories = await getCategories();

  logger.log(events.data, "events");

  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <EventsHero />
      <div className="mx-auto container py-20">
        <EventsFilter categories={categories} />
        <EventsGrid events={events} />
      </div>
    </main>
  );
}

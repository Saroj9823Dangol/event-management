import { CinematicNav } from "@/components/cinematic-nav"
import { EventsHero } from "@/components/events/events-hero"
import { EventsFilter } from "@/components/events/events-filter"
import { EventsGrid } from "@/components/events/events-grid"
import { SiteFooter } from "@/components/site-footer"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <EventsHero />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
        <EventsFilter />
        <EventsGrid />
      </div>
      <SiteFooter />
    </main>
  )
}

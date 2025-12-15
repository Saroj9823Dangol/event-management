import { CinematicNav } from "@/components/cinematic-nav";
import { EventDetailHero } from "@/components/event-detail/event-hero";
import { EventInfo } from "@/components/event-detail/event-info";
import { EventGallery } from "@/components/event-detail/event-gallery";
import { TicketSelection } from "@/components/event-detail/ticket-selection";
import { VenueMap } from "@/components/event-detail/venue-map";
import { RelatedEvents } from "@/components/event-detail/related-events";
import { SiteFooter } from "@/components/site-footer";
import { EventTabs } from "@/components/event-detail/event-tabs";
import { BookingProvider } from "@/components/event-detail/booking-context";
import { EventLineup } from "@/components/event-detail/event-lineup";
import logger from "@/lib/logger/logger";
import { getEventDetail } from "@/lib/api/events";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventDetail(id);

  logger.log(event, "event", id, "slugggg");

  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <EventDetailHero event={event} />
      <EventTabs />
      <BookingProvider>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-20">
              {/* Overview Section */}
              <section id="overview" className="space-y-12">
                <EventInfo event={event} />
                {/* <VenueMap venue={event.location} address={event.address} /> */}
              </section>

              {/* Artists Section */}
              <section
                id="artists"
                className="space-y-8 pt-8 border-t border-white/10"
              >
                <h2 className="text-3xl font-serif">Artists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Artist 1 */}
                  <div className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 border border-white/10">
                    <img
                      src="/placeholder.svg"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="Beyoncé"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold">Beyoncé</h3>
                      <p className="text-accent text-sm font-medium tracking-wider uppercase">
                        Headliner
                      </p>
                    </div>
                  </div>
                  {/* Artist 2 */}
                  <div className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 border border-white/10">
                    <img
                      src="/placeholder.svg"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      alt="Special Guest"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold">Special Guests</h3>
                      <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
                        Support
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <EventLineup />

              {/* Policies Section with HTML Parsing */}
              <section
                id="info"
                className="space-y-8 pt-8 border-t border-white/10"
              >
                <h2 className="text-3xl font-serif">Terms & Information</h2>

                <div className="prose prose-invert max-w-none prose-headings:font-serif prose-a:text-accent">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                     <h3>Event Terms and Conditions</h3>
                     <p>By purchasing a ticket, you agree to the following <strong>Terms and Conditions</strong>:</p>
                     <ul>
                        <li>Tickets are non-transferable and must be presented at the gate.</li>
                        <li>The venue reserves the right to search all bags upon entry.</li>
                        <li>Prohibited items include weapons, illegal substances, and professional cameras.</li>
                     </ul>

                     <br />
                     <h3>Cancellation & Refund Policy</h3>
                     <p>All sales are final. Refunds are only issued if the event is officially cancelled and not rescheduled. If the event is postponed, your ticket will be valid for the new date.</p>
                     
                     <br />
                     <h3>Age Restriction</h3>
                     <p>This event is <strong>All Ages</strong>. Children under 12 must be accompanied by an adult.</p>
                  `,
                    }}
                  />
                </div>
              </section>

              <EventGallery images={event.files} />
            </div>
            {/* Sidebar - Sticky Ticket Selection */}
            <div className="lg:col-span-1">
              <TicketSelection event={event} />
            </div>
          </div>
          <RelatedEvents />
        </div>
      </BookingProvider>
      <SiteFooter />
    </main>
  );
}

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
import { getEventDetail, getRelatedEvents } from "@/lib/api/events";
import { Metadata } from "next";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// Define Props interface compatible with Next.js PageProps
interface Props {
  params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Await the params Promise
  const event = await getEventDetail(id);

  logger.log("canonical", `${process.env.NEXT_PUBLIC_APP_URL}/events/${id}`);

  if (event) {
    return {
      title: `${event.name}`,
      description: event.description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/events/${id}`,
      },
      openGraph: {
        title: event.name,
        description: event.description,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${id}`,
        type: "article",
        publishedTime: event.created_at,
        modifiedTime: event.updated_at,
        authors: ["Saroj Dangol"],
        images: [
          {
            url: event.thumbnail?.url,
            width: 1200,
            height: 630,
            alt: event.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: event.name,
        description: event.description,
        images: [event.thumbnail?.url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } else {
    return {};
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventDetail(id);

  const relatedEvents = await getRelatedEvents({
    categoryId: event?.category?.slug,
  });

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
                  {event?.performers?.map((artist) => {
                    return (
                      <div
                        key={artist.id}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 border border-white/10"
                      >
                        <img
                          src={artist.files[0].url}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={artist.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                          <h3 className="text-xl font-bold">{artist.name}</h3>
                          <p className="text-accent text-sm font-medium tracking-wider uppercase">
                            {artist.sub_name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <EventLineup lineups={event?.lineups} />

              {/* Sidebar - Sticky Ticket Selection */}
              <div className="lg:col-span-1 block lg:hidden">
                <TicketSelection event={event} />
              </div>
              {/* Policies Section with HTML Parsing */}
              <section
                id="info"
                className="space-y-8 pt-8 border-t border-white/10"
              >
                {event?.policies?.map((policy: any, index: number) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-3xl font-serif">
                      {policy?.policy_name}
                    </h2>
                    <div
                      className="prose prose-invert max-w-none prose-headings:font-serif prose-a:text-accent"
                      dangerouslySetInnerHTML={{
                        __html: policy?.policy_description,
                      }}
                    />
                  </div>
                ))}
              </section>

              <EventGallery images={event?.files} />
            </div>
            {/* Sidebar - Sticky Ticket Selection */}
            <div className="lg:col-span-1 hidden lg:block">
              <TicketSelection event={event} />
            </div>
          </div>
          <RelatedEvents relatedEvents={relatedEvents} />
        </div>
      </BookingProvider>
      <SiteFooter />
    </main>
  );
}

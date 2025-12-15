// app/page.tsx or app/(home)/page.tsx
import { Suspense } from "react";
import { CategoryShowcase } from "@/components/category-showcase";
import { CTASection } from "@/components/cta-section";
import { EnterpriseSection } from "@/components/enterprise-section";
import { EventFilters } from "@/components/event-filters";
import { FeaturedGrid } from "@/components/featured-grid";
import { LastMinuteDeals } from "@/components/last-minute-deals";
import { LiveNowStrip } from "@/components/live-now-strip";
import { SiteFooter } from "@/components/site-footer";
import { StatsSection } from "@/components/stats-section";
import { TicketCategories } from "@/components/ticket-categories";
import { TrendingEvents } from "@/components/trending-events";
import { VideoHero } from "@/components/video-hero";
import { CinematicNav } from "@/components/cinematic-nav";
import {
  getHomeFeaturedEvents,
  getHomeTrendingEvents,
  getUpcomingEvents,
  getTopSellingEvents,
} from "@/lib/api/events";
import { UpcomingEvents } from "@/components/upcoming-events";
import { TopSellingEvents } from "@/components/top-selling-events";
import { getCategories } from "@/lib/api/categories";

// Fix Vercel caching - force dynamic rendering
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredEvents = await getHomeFeaturedEvents();
  const trendingEvents = await getHomeTrendingEvents();
  const upcomingEvents = await getUpcomingEvents();
  const topSellingEvents = await getTopSellingEvents();

  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CinematicNav />
      {/* Hero Section - Immediate Impact */}
      <VideoHero featuredEvents={featuredEvents} />

      {/* Utility - Quick Search */}
      <EventFilters />

      {/* Discovery - Broad Categories first */}
      <CategoryShowcase categories={categories} />

      {/* Social Proof - What's Popular */}
      {!!trendingEvents.meta.total && (
        <TrendingEvents trendingEvents={trendingEvents} />
      )}

      {/* Timeline - Planning Ahead */}
      <UpcomingEvents events={upcomingEvents} />

      {/* Engagement - Live Content strip */}
      <LiveNowStrip />

      {/* Curated/Featured Grid */}
      <FeaturedGrid featuredEvents={featuredEvents} />

      {/* Popular/Sales Driven */}
      <TopSellingEvents events={topSellingEvents} />

      {/* Urgency/Deals */}
      <LastMinuteDeals />

      {/* Trust & Authority */}
      <StatsSection />

      {/* B2B / Secondary Audience */}
      <EnterpriseSection />

      {/* Final Calls to Action */}
      <CTASection />
      <SiteFooter />
    </main>
  );
}

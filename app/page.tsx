// app/page.tsx or app/(home)/page.tsx
import { CategoryShowcase } from "@/components/category-showcase";
import { CinematicNav } from "@/components/cinematic-nav";
import { CTASection } from "@/components/cta-section";
import { DownloadAppSection } from "@/components/download-app-section";
import { EnterpriseSection } from "@/components/enterprise-section";
import { EventFilters } from "@/components/event-filters";
import { FeaturedGrid } from "@/components/featured-grid";
import { LiveNowStrip } from "@/components/live-now-strip";
import { PastHistory } from "@/components/past-history";
import { StatsSection } from "@/components/stats-section";
import { TopSellingEvents } from "@/components/top-selling-events";
import { UpcomingEvents } from "@/components/upcoming-events";
import { VideoHero } from "@/components/video-hero";
import { PromotionBanners } from "@/components/promotion-banners";
import { getCategories } from "@/lib/api/categories";
import {
  getHomefeaturedEvents,
  getHomeLiveEvents,
  getPastEvents,
  getTopSellingEvents,
  getUpcomingEvents,
} from "@/lib/api/events";
import { getPromotionBanners } from "@/lib/api/promotion-banner";
import logger from "@/lib/logger/logger";

// Fix Vercel caching - force dynamic rendering
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredEvents = await getHomefeaturedEvents();
  // const trendingEvents = await getHomeTrendingEvents();
  const upcomingEvents = await getUpcomingEvents();
  const topSellingEvents = await getTopSellingEvents();
  const liveEvents = await getHomeLiveEvents();
  const pastEvents = await getPastEvents();

  const categories = await getCategories();

  const promotionBanners = await getPromotionBanners();

  logger.log(featuredEvents.data[0], "featured");

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
      {/* {!!trendingEvents?.meta.total && (
        <TrendingEvents trendingEvents={trendingEvents} />
      )} */}

      {/* Timeline - Planning Ahead */}
      {!!upcomingEvents?.meta.total && (
        <UpcomingEvents events={upcomingEvents} />
      )}

      {/* Engagement - Live Content strip */}
      {!!liveEvents?.meta.total && <LiveNowStrip liveEvents={liveEvents} />}

      {/* Curated/Featured Grid */}
      <FeaturedGrid featuredEvents={featuredEvents} />

      {/* Popular/Sales Driven */}
      <TopSellingEvents events={topSellingEvents} />

      {/* Past History */}
      <PastHistory events={pastEvents} />

      {/* Urgency/Deals */}
      {/* <LastMinuteDeals /> */}

      {/* Trust & Authority */}
      <StatsSection />

      {/* B2B / Secondary Audience */}
      <EnterpriseSection />

      {/* Mobile App Promo */}
      <DownloadAppSection />

      {/* Final Calls to Action */}
      <CTASection />

      {/* Promotion Banners Popup */}
      {!!promotionBanners?.meta.total && (
        <PromotionBanners banners={promotionBanners} />
      )}
    </main>
  );
}

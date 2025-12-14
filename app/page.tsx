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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CinematicNav />
      <VideoHero />
      <EventFilters />
      <TrendingEvents />
      {/* <RecommendedSection /> */}
      <LiveNowStrip />
      <FeaturedGrid />
      <LastMinuteDeals />
      <CategoryShowcase />
      <EnterpriseSection />
      <TicketCategories />
      <StatsSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}

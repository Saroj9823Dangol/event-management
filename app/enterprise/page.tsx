import { CinematicNav } from "@/components/cinematic-nav";
import { EnterpriseHero } from "@/components/enterprise/enterprise-hero";
import { EnterpriseFeatures } from "@/components/enterprise/enterprise-features";
import { EnterpriseDashboardPreview } from "@/components/enterprise/dashboard-preview";
import { EnterpriseTestimonials } from "@/components/enterprise/testimonials";
import { EnterprisePricing } from "@/components/enterprise/pricing";
import { EnterpriseCTA } from "@/components/enterprise/enterprise-cta";
import { SiteFooter } from "@/components/site-footer";

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <EnterpriseHero />
      <EnterpriseFeatures />
      <EnterpriseDashboardPreview />
      <EnterpriseTestimonials />
      <EnterprisePricing />
      <EnterpriseCTA />
    </main>
  );
}

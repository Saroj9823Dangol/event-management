import { CinematicNav } from "@/components/cinematic-nav"
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"
import { MarketplaceProducts } from "@/components/marketplace/marketplace-products"
import { BrandSpotlight } from "@/components/marketplace/brand-spotlight"
import { SiteFooter } from "@/components/site-footer"

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background">
      <CinematicNav />
      <MarketplaceHero />
      <MarketplaceCategories />
      <MarketplaceProducts />
      <BrandSpotlight />
      <SiteFooter />
    </main>
  )
}

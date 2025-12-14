"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Sparkles, TrendingUp, Star, Heart, ExternalLink, Zap } from "lucide-react"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  limited: boolean
  aiMatch: number
  story: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Concert Essentials Bundle",
    brand: "EventStyle Co",
    price: 89,
    originalPrice: 129,
    image: "/concert-merch-bundle-bag.jpg",
    category: "Accessories",
    rating: 4.8,
    limited: true,
    aiMatch: 95,
    story: "Premium festival gear designed for music lovers",
  },
  {
    id: 2,
    name: "VIP Experience Package",
    brand: "Luxury Events",
    price: 299,
    image: "/vip-package-champagne-tickets.jpg",
    category: "Experiences",
    rating: 4.9,
    limited: true,
    aiMatch: 88,
    story: "Elevate your event experience with exclusive access",
  },
  {
    id: 3,
    name: "Smart Event Tracker",
    brand: "TechWear",
    price: 149,
    image: "/smart-wearable-device-tech.jpg",
    category: "Tech",
    rating: 4.7,
    limited: false,
    aiMatch: 92,
    story: "Never miss a moment with AI-powered event tracking",
  },
  {
    id: 4,
    name: "Artist Collection Hoodie",
    brand: "MerchHub",
    price: 79,
    originalPrice: 99,
    image: "/artist-hoodie-streetwear.jpg",
    category: "Apparel",
    rating: 4.6,
    limited: true,
    aiMatch: 87,
    story: "Limited edition collaboration with top artists",
  },
  {
    id: 5,
    name: "Gourmet Food Pass",
    brand: "Taste Events",
    price: 199,
    image: "/food-pass-gourmet-dining.jpg",
    category: "Food & Drink",
    rating: 4.8,
    limited: false,
    aiMatch: 91,
    story: "Unlimited access to premium event dining",
  },
  {
    id: 6,
    name: "Pro Photography Package",
    brand: "CaptureMoments",
    price: 249,
    image: "/photography-package-camera.jpg",
    category: "Services",
    rating: 4.9,
    limited: true,
    aiMatch: 84,
    story: "Professional event photography and instant prints",
  },
]

export function UCNCEEMarketplace() {
  const [savedProducts, setSavedProducts] = useState<Set<number>>(new Set())
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const toggleSave = (id: number) => {
    setSavedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section id="marketplace" className="relative py-24 px-4 overflow-hidden bg-muted/20">
      {/* Background gradient */}
      <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[160px] animate-[float_15s_ease-in-out_infinite]" />

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <ShoppingBag className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium">Brand Marketplace • UCNCEE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Curated Brand Experience
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exclusive products and experiences from top brands, matched to your event preferences with AI.
          </p>
        </div>

        {/* AI Style Match Banner */}
        <div className="glass-strong rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-10 h-10 text-black" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">AI Style Match: 94% Compatibility</h3>
              <p className="text-sm text-muted-foreground">
                Based on your event preferences, we've found products you'll love. Personalized just for you.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-accent to-amber-500 hover:opacity-90 text-black font-bold">
              <Zap className="w-4 h-4 mr-2" />
              Refine Match
            </Button>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div
                className={`glass-strong rounded-2xl overflow-hidden transition-all duration-500 ${
                  hoveredProduct === product.id ? "scale-105 neon-glow" : ""
                }`}
              >
                {/* Product image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredProduct === product.id ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      {product.limited && (
                        <Badge className="bg-red-500/90 backdrop-blur-sm text-white border-0 w-fit animate-[pulse-glow_2s_ease-in-out_infinite]">
                          Limited Edition
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge className="bg-accent/90 backdrop-blur-sm text-black border-0 w-fit">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSave(product.id)}
                      className="w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          savedProducts.has(product.id) ? "fill-red-500 text-red-500" : "text-foreground"
                        }`}
                      />
                    </button>
                  </div>

                  {/* AI Match indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div className="glass-strong px-3 py-2 rounded-full flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold">{product.aiMatch}% Match</span>
                    </div>
                  </div>
                </div>

                {/* Product details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="glass border-0 text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-balance">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>

                  {/* Brand story */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.story}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-accent">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-accent to-amber-500 hover:opacity-90 text-black font-bold">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="glass bg-transparent">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Stories Section */}
        <div className="glass-strong rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Brand Stories</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                brand: "EventStyle Co",
                story: "From Local Artists to Global Festival Essentials",
                image: "/brand-story-festival.jpg",
              },
              {
                brand: "TechWear",
                story: "Innovation Meets Style: The Future of Event Tech",
                image: "/brand-story-tech.jpg",
              },
              {
                brand: "CaptureMoments",
                story: "Preserving Memories: 10 Years of Event Photography",
                image: "/brand-story-photography.jpg",
              },
            ].map((story, i) => (
              <div
                key={i}
                className="glass rounded-xl overflow-hidden hover:glass-strong transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.brand}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-bold mb-1">{story.brand}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{story.story}</p>
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="ghost" size="sm" className="w-full">
                    Read Story
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">Trending in Your Area</span>
          </div>
          <Button size="lg" variant="outline" className="glass bg-transparent">
            Explore More Products
          </Button>
        </div>
      </div>
    </section>
  )
}

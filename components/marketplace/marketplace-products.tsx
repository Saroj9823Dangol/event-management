"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Renaissance Tour Hoodie",
    artist: "Beyoncé",
    price: 125,
    originalPrice: null,
    image: "/concert-merch-hoodie-black.jpg",
    rating: 4.9,
    reviews: 234,
    badge: "Best Seller",
    limited: true,
  },
  {
    id: 2,
    name: "Eras Tour Vinyl Box Set",
    artist: "Taylor Swift",
    price: 199,
    originalPrice: 249,
    image: "/vinyl-box-set-collector.jpg",
    rating: 5.0,
    reviews: 892,
    badge: "Limited Edition",
    limited: true,
  },
  {
    id: 3,
    name: "VIP Experience Package",
    artist: "Coldplay",
    price: 450,
    originalPrice: null,
    image: "/vip-package-exclusive.jpg",
    rating: 4.8,
    reviews: 156,
    badge: "VIP",
    limited: false,
  },
  {
    id: 4,
    name: "Concert Photography Print",
    artist: "Various Artists",
    price: 89,
    originalPrice: null,
    image: "/concert-photography-print.jpg",
    rating: 4.7,
    reviews: 78,
    badge: null,
    limited: false,
  },
  {
    id: 5,
    name: "F1 Monaco GP Poster",
    artist: "Formula 1",
    price: 45,
    originalPrice: null,
    image: "/f1-race-car-monaco-circuit-dramatic.jpg",
    rating: 4.6,
    reviews: 312,
    badge: null,
    limited: false,
  },
  {
    id: 6,
    name: "Broadway Playbill Collection",
    artist: "Hamilton",
    price: 75,
    originalPrice: 95,
    image: "/broadway-theater-stage-curtains-dramatic-lighting.jpg",
    rating: 4.9,
    reviews: 445,
    badge: "Sale",
    limited: false,
  },
  {
    id: 7,
    name: "Festival Wristband Set",
    artist: "Coachella",
    price: 35,
    originalPrice: null,
    image: "/edc-festival-colorful-lights-night-sky.jpg",
    rating: 4.5,
    reviews: 167,
    badge: null,
    limited: false,
  },
  {
    id: 8,
    name: "Artist Signed Drumsticks",
    artist: "Various",
    price: 150,
    originalPrice: null,
    image: "/concert-crowd-hands-up-stage-lights-dramatic.jpg",
    rating: 4.8,
    reviews: 89,
    badge: "Rare",
    limited: true,
  },
]

export function MarketplaceProducts() {
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [filter, setFilter] = useState("all")

  const toggleSave = (id: number) => {
    setSavedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const filteredProducts = filter === "all" ? products : products.filter((p) => p.limited)

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-2">Shop All Products</h2>
            <p className="text-muted-foreground">Exclusive merchandise from your favorite events and artists</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 text-sm tracking-wider transition-colors ${
                filter === "all" ? "bg-white text-black" : "border border-border hover:bg-white/10"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("limited")}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm tracking-wider transition-colors ${
                filter === "limited" ? "bg-white text-black" : "border border-border hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              LIMITED
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <Link href={`/marketplace/product/${product.id}`} className="block">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1.5 text-xs tracking-wider ${
                        product.badge === "Sale"
                          ? "bg-red-500 text-white"
                          : product.badge === "VIP"
                            ? "bg-amber-500 text-black"
                            : "bg-white text-black"
                      }`}
                    >
                      {product.badge.toUpperCase()}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleSave(product.id)
                      }}
                      className={`p-2.5 backdrop-blur-sm transition-colors ${
                        savedItems.includes(product.id) ? "bg-accent text-white" : "bg-black/70 hover:bg-black"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${savedItems.includes(product.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-2.5 bg-black/70 backdrop-blur-sm hover:bg-black transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Add */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="w-full py-3 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-sm text-accent mb-1">{product.artist}</p>
                  <h3 className="font-serif mb-2 group-hover:text-accent transition-colors">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-12 py-4 border border-border text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  )
}

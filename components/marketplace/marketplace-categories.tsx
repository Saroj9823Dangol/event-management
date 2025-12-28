"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shirt, Disc, Camera, Gift, Headphones, Star } from "lucide-react"

const categories = [
  { id: "apparel", name: "Apparel", icon: Shirt, count: 1240 },
  { id: "vinyl", name: "Vinyl & Music", icon: Disc, count: 456 },
  { id: "photos", name: "Photography", icon: Camera, count: 234 },
  { id: "collectibles", name: "Collectibles", icon: Gift, count: 567 },
  { id: "audio", name: "Audio Gear", icon: Headphones, count: 189 },
  { id: "vip", name: "VIP Packages", icon: Star, count: 78 },
]

export function MarketplaceCategories() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/marketplace?category=${category.id}`}
                className="group flex items-center gap-4 px-6 py-4 bg-card border border-border hover:border-accent/50 transition-colors whitespace-nowrap"
              >
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <category.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

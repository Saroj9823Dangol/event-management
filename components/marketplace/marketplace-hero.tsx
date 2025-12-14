"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const featuredDrops = [
  {
    id: 1,
    title: "Renaissance Tour Collection",
    artist: "Beyoncé",
    description: "Exclusive limited edition merchandise from the Renaissance World Tour",
    image: "/concert-merch-premium-collection.jpg",
    dropDate: "Available Now",
    itemsLeft: 234,
  },
  {
    id: 2,
    title: "Eras Tour Exclusives",
    artist: "Taylor Swift",
    description: "Collector's items from the record-breaking Eras Tour",
    image: "/concert-merch-eras-tour.jpg",
    dropDate: "Dropping Friday",
    itemsLeft: null,
  },
  {
    id: 3,
    title: "F1 Monaco GP Collection",
    artist: "Formula 1",
    description: "Premium racing memorabilia and team merchandise",
    image: "/f1-monaco-merchandise.jpg",
    dropDate: "Available Now",
    itemsLeft: 89,
  },
]

export function MarketplaceHero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredDrops.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const featured = featuredDrops[current]

  return (
    <section className="relative pt-20 min-h-[80vh] flex items-center">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={featured.image || "/placeholder.svg"}
            alt={featured.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-accent-foreground text-xs tracking-wider mb-6"
          >
            <Sparkles className="w-3 h-3" />
            UCNCEE MARKETPLACE
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-sm text-accent mb-2">{featured.artist}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{featured.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{featured.description}</p>

              <div className="flex items-center gap-6 mb-8">
                <span
                  className={`px-3 py-1.5 text-xs tracking-wider ${
                    featured.dropDate === "Available Now"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {featured.dropDate.toUpperCase()}
                </span>
                {featured.itemsLeft && (
                  <span className="text-sm text-muted-foreground">Only {featured.itemsLeft} items left</span>
                )}
              </div>

              <Link
                href={`/marketplace/drop/${featured.id}`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                SHOP COLLECTION
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-6 lg:left-12 flex gap-3">
          {featuredDrops.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all ${i === current ? "w-12 bg-white" : "w-6 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

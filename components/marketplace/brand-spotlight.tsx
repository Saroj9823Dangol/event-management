"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

const brands = [
  {
    id: "beyonce",
    name: "Beyoncé Official",
    description: "Exclusive Renaissance Tour merchandise and limited collector's items",
    image: "/concert-crowd-hands-up-stage-lights-dramatic.jpg",
    products: 45,
  },
  {
    id: "f1",
    name: "Formula 1 Store",
    description: "Official team merchandise, race day essentials, and memorabilia",
    image: "/f1-race-car-monaco-circuit-dramatic.jpg",
    products: 128,
  },
  {
    id: "broadway",
    name: "Broadway Collection",
    description: "Playbills, soundtracks, and exclusive theater merchandise",
    image: "/broadway-theater-stage-curtains-dramatic-lighting.jpg",
    products: 67,
  },
]

export function BrandSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">BRAND PARTNERS</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Official Brand Stores</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shop authentic merchandise directly from your favorite artists and events
          </p>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-[400px] md:w-[500px]"
            >
              <Link href={`/marketplace/brand/${brand.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-sm text-white/70">{brand.products} Products</span>
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">{brand.name}</h3>
                <p className="text-muted-foreground mb-4">{brand.description}</p>
                <span className="inline-flex items-center gap-2 text-sm tracking-wider group-hover:text-accent transition-colors">
                  SHOP NOW
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

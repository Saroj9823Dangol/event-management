"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "The Connoisseur",
    description: "For those with refined tastes in classical arts",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2066&auto=format&fit=crop",
    count: "24 Events",
  },
  {
    id: 2,
    title: "Night Owl",
    description: "Late-night experiences for the adventurous",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop",
    count: "18 Events",
  },
  {
    id: 3,
    title: "Cultural Explorer",
    description: "Immersive journeys through art and history",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
    count: "32 Events",
  },
  {
    id: 4,
    title: "Epicurean",
    description: "Culinary adventures for the discerning palate",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    count: "15 Events",
  },
];

export function CuratedCollections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="collections"
      ref={containerRef}
      className="py-32 bg-background relative"
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6"
            >
              Curated Selections
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl text-foreground"
            >
              Collections
            </motion.h2>
          </div>
          <div className="lg:flex lg:items-end lg:justify-end">
            <Link
              href="/collections"
              className="group flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
            >
              <span className="text-sm font-bold tracking-widest uppercase">
                Explore All Collections
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href="/collections"
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="w-full h-full"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">
                    {collection.count}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 group-hover:text-accent transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {collection.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

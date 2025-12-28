"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allCollections = [
  {
    id: 1,
    title: "The Connoisseur",
    description:
      "For those with refined tastes in classical arts, opera, and ballet.",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2066&auto=format&fit=crop",
    count: "24 Events",
    tags: ["Opera", "Classical", "Ballet"],
  },
  {
    id: 2,
    title: "Night Owl",
    description:
      "Late-night experiences, underground clubs, and exclusive after-parties.",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop",
    count: "18 Events",
    tags: ["Nightlife", "Electronic", "Bars"],
  },
  {
    id: 3,
    title: "Cultural Explorer",
    description:
      "Immersive journeys through art exhibitions, museums, and historical tours.",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
    count: "32 Events",
    tags: ["Art", "History", "Culture"],
  },
  {
    id: 4,
    title: "Epicurean",
    description:
      "Culinary adventures, wine tastings, and chef's table experiences.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    count: "15 Events",
    tags: ["Food", "Wine", "Dining"],
  },
  {
    id: 5,
    title: "Wellness & Zen",
    description:
      "Yoga retreats, meditation sessions, and mindfulness workshops.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop",
    count: "12 Events",
    tags: ["Yoga", "Health", "Retreats"],
  },
  {
    id: 6,
    title: "Adrenaline Junkie",
    description: "Extreme sports, racing events, and outdoor adventures.",
    image:
      "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=2070&auto=format&fit=crop",
    count: "20 Events",
    tags: ["Sports", "Adventure", "Racing"],
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CinematicNav />

      {/* Hero Section */}
      <section className="py-32 px-6 max-w-[1800px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent text-sm font-bold tracking-[0.3em] uppercase mb-6"
        >
          Curated Selections
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-serif text-white mb-8"
        >
          Collections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Discover events handpicked by our editorial team, categorized to match
          your unique lifestyle and interests.
        </motion.p>
      </section>

      {/* Collections Grid */}
      <section className="pb-24 px-6 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {allCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative block h-[500px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="flex flex-wrap gap-3 mb-6">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white/80 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 group-hover:text-accent transition-colors">
                  {collection.title}
                </h2>
                <p className="text-white/70 text-lg mb-6 max-w-md line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white group-hover:gap-4 transition-all">
                  View Collection{" "}
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </div>

              <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-sm font-bold text-white">
                  {collection.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const trendingEvents = [
  {
    id: 1,
    title: "Neon Dreams Festival",
    date: "Aug 15-17",
    location: "Cyber City Arena",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    category: "Music",
  },
  {
    id: 2,
    title: "Future Tech Summit",
    date: "Sep 05",
    location: "Innovation Hub",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    category: "Technology",
  },
  {
    id: 3,
    title: "Abstract Art Gala",
    date: "Oct 12",
    location: "Modern Art Museum",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    category: "Art",
  },
  {
    id: 4,
    title: "Culinary Masters",
    date: "Nov 20",
    location: "Grand Hotel",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    category: "Food",
  },
];

export function TrendingEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-accent font-bold tracking-[0.2em] uppercase block mb-6 text-sm"
            >
              Popular This Week
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif leading-tight"
            >
              Trending Now
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/events"
              className="group flex items-center gap-3 text-sm tracking-widest uppercase hover:text-accent transition-colors"
            >
              View All
              <div className="w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {trendingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-8 relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pr-4">
                <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-muted-foreground/80 group-hover:text-accent transition-colors">
                  <span>{event.date}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{event.location}</span>
                </div>
                <h3 className="text-3xl font-serif leading-none group-hover:text-white transition-colors">
                  {event.title}
                </h3>
                <div className="h-px w-0 bg-accent group-hover:w-full transition-all duration-700 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

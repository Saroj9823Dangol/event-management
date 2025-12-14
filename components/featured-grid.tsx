"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

// Mock Data - In a real app, this would be passed as props
const featuredEvents = [
  {
    id: 1,
    title: "Beyoncé Renaissance Tour",
    category: "Concert",
    date: "Jul 29, 2025",
    location: "Wembley Stadium",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
    price: "From $189",
    featured: true,
  },

  {
    id: 2,
    title: "The Phantom of the Opera",
    category: "Theater",
    date: "Running Daily",
    location: "Her Majesty's Theatre",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    price: "From $79",
    featured: false,
  },
  {
    id: 3,
    title: "Formula 1 Monaco Grand Prix",
    category: "Sports",
    date: "May 25, 2025",
    location: "Circuit de Monaco",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop",
    price: "From $450",
    featured: false,
  },
  {
    id: 4,
    title: "Dave Chappelle Live",
    category: "Comedy",
    date: "Aug 15, 2025",
    location: "Radio City Music Hall",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
    price: "From $125",
    featured: false,
  },
  {
    id: 5,
    title: "Electric Daisy Carnival",
    category: "Festival",
    date: "Jun 20-22, 2025",
    location: "Las Vegas Motor Speedway",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    price: "From $299",
    featured: false,
  },
];

export function FeaturedGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 px-4 lg:px-8 max-w-[1800px] mx-auto"
    >
      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:px-4">
        <div>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] text-accent uppercase block mb-6"
          >
            Curated For You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9]"
          >
            Featured Events
          </motion.h2>
        </div>
        <Link
          href="/events"
          className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors"
        >
          VIEW ALL
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Dynamic Grid Layout */}
      {/* 
         - Grid setup: 1 col mobile, 2 cols tablet, 3 cols desktop.
         - The first item (index 0) will span 2 cols and 2 rows on desktop to act as the "Hero".
         - On tablet, it spans 2 cols (full width) to properly lead the section.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[400px]">
        {featuredEvents.map((event, index) => {
          const isHero = index === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.1, 0.5) }}
              // Responsive Class Logic:
              // Mobile: All span 1 (default)
              // Tablet (md): Hero spans 2 cols (full width)
              // Desktop (lg): Hero spans 2 cols & 2 rows (Big box)
              className={`relative group overflow-hidden rounded-lg ${
                isHero
                  ? "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2 min-h-[500px] md:min-h-auto"
                  : "col-span-1"
              }`}
            >
              <Link
                href={`/events/${event.id}`}
                className="block w-full h-full relative"
              >
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div
                  className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8 flex flex-col justify-end transition-all duration-500 ${
                    isHero
                      ? "h-1/2"
                      : "h-2/3 translate-y-4 group-hover:translate-y-0"
                  }`}
                >
                  <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
                    {event.category}
                  </span>

                  <h3
                    className={`font-serif mb-3 leading-tight ${
                      isHero ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl"
                    }`}
                  >
                    {event.title}
                  </h3>

                  <div
                    className={`flex flex-col gap-1 ${
                      !isHero
                        ? "opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  {isHero && (
                    <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-end">
                      <span className="text-2xl font-serif italic text-white">
                        {event.price}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest bg-white text-black px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors">
                        GET TICKETS
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

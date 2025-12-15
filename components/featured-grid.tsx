"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface IFeaturedGridProps {
  featuredEvents: IPaginatedResponse<IEvent>;
}

export function FeaturedGrid({ featuredEvents }: IFeaturedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 lg:px-8 mx-auto container"
    >
      {/* Section Header */}
      <div className="mx-auto relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-accent font-bold tracking-[0.2em] uppercase block mb-6 text-sm"
          >
            CURATED FOR YOU
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-2xl"
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
        {featuredEvents.data.map((event, index) => {
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
                href={`/events/${event.slug}`}
                className="block w-full h-full relative"
              >
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={event.thumbnail.url || "/placeholder.svg"}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 object-top"
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
                    {event.category.name}
                  </span>

                  <h3
                    className={`font-serif mb-3 leading-tight ${
                      isHero ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl"
                    }`}
                  >
                    {event.name}
                  </h3>

                  <div
                    className={`flex flex-col gap-1 ${
                      !isHero
                        ? "opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white text-sm">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">
                        {event.lineups[0].addressable.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateTime(event.lineups[0].start_date)}</span>
                    </div>
                  </div>

                  {isHero && (
                    <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-end">
                      <span className="text-2xl font-serif italic text-white">
                        {event.currency} {event.low_price}
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

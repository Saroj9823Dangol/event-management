"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface ITrendingEventsProps {
  trendingEvents: IPaginatedResponse<IEvent>;
}

export function TrendingEvents({ trendingEvents }: ITrendingEventsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-accent font-bold tracking-[0.2em] uppercase block mb-6 text-sm"
            >
              POPULAR THIS WEEK
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-2xl"
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
          {trendingEvents.data.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative cursor-pointer"
            >
              <Link
                href={`/events/${event.id}`}
                className="aspect-square block overflow-hidden mb-8 relative"
              >
                <Image
                  src={event.files[0].url}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {event.category.name}
                  </span>
                </div>
              </Link>

              <div className="space-y-4 pr-4">
                <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-muted-foreground/80 group-hover:text-accent transition-colors">
                  <span>{formatDateTime(event.lineups[0].start_date)}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{event.lineups[0].custom_fields.venue_name}</span>
                </div>
                <h3 className="text-3xl font-serif leading-none group-hover:text-white transition-colors">
                  {event.name}
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

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface UpcomingEventsProps {
  events: IPaginatedResponse<IEvent>;
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  if (!events || events.data.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="py-20 bg-zinc-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div style={{ opacity }} className="mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-accent font-bold tracking-[0.2em] uppercase block mb-6 text-sm"
          >
            MARK YOUR CALENDAR
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-2xl"
          >
            Upcoming Events
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.data.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-l border-white/10 pl-8 hover:border-accent transition-colors duration-500"
            >
              {/* Date Badge */}
              <div className="mb-6">
                <span className="text-5xl font-serif text-white/20 group-hover:text-white transition-colors duration-500 block">
                  {new Date(event.nearest_lineup.start_date)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                </span>
                <span className="text-sm font-bold text-accent tracking-widest uppercase">
                  {new Date(event.nearest_lineup.start_date).toLocaleString(
                    "default",
                    { month: "long" }
                  )}
                </span>
              </div>

              <div className="relative aspect-[3/2] mb-6 overflow-hidden rounded-sm bg-zinc-900">
                <Link href={`/events/${event.slug}`}>
                  <Image
                    src={event.thumbnail?.url || "/placeholder.svg"}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 object-top"
                  />
                </Link>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-white/40 tracking-widest uppercase">
                  {event.category.name}
                </span>
                <h3 className="text-2xl font-serif text-white group-hover:text-accent transition-colors duration-300">
                  <Link href={`/events/${event.slug}`}>{event.name}</Link>
                </h3>

                <div className="flex flex-col gap-2 pt-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent/70" />
                    <span>
                      {formatDateTime(event.nearest_lineup.start_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent/70" />
                    <span className="truncate max-w-[250px]">
                      {event.nearest_lineup.custom_fields.venue_name},{" "}
                      {event.nearest_lineup.addressable.city}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

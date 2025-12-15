"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, Share2, Clock, Star } from "lucide-react";
import logger from "@/lib/logger/logger";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";

interface EventsGridProps {
  events: IPaginatedResponse<IEvent>;
}

export function EventsGrid({ events }: EventsGridProps) {
  const searchParams = useSearchParams();
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  // Simple filtering logic based on URL params
  const search = searchParams.get("search")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";

  // Date params
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");
  const category = searchParams.get("category")?.toLowerCase() || "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {events.data.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group border p-4 border-border bg-card hover:border-accent transition-colors"
        >
          <Link href={`/events/${event.id}`} className="block">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden mb-4">
              <Image
                src={
                  event.thumbnail.url ||
                  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop"
                }
                alt={event.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-xs tracking-wider">
                  {event.category.name.toUpperCase()}
                </span>
              </div>

              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs tracking-wider">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 bg-black/70 backdrop-blur-sm hover:bg-black transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              {/* Title */}
              <h3 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {event.name}
              </h3>

              {/* Details */}
              <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{formatDate(event.nearest_lineup.start_date)}</span>
                  <span className="text-border">|</span>
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{formatTime(event.nearest_lineup.start_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {event.nearest_lineup.addressable.address}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">From</span>
                  <span className="text-lg font-medium ml-1">
                    {event.currency} {event.low_price}
                  </span>
                </div>

                <span className="text-xs tracking-wider text-accent group-hover:underline">
                  GET TICKETS
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Load More */}
      <div className="col-span-full flex justify-center mt-12">
        <button className="px-12 py-4 border border-border text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
          LOAD MORE EVENTS
        </button>
      </div>
    </div>
  );
}

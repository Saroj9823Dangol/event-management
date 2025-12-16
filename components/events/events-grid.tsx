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
import NoData from "../ui/no-data";

interface EventsGridProps {
  events: IPaginatedResponse<IEvent>;
}

import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";

export function EventsGrid({ events }: EventsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/events?${params.toString()}`);
  };

  if (events?.meta.total === 0) {
    return (
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <NoData
          title="No Events"
          description="There are currently no events found. Please check back later."
        />
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {events?.data.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group border p-4 border-border bg-card hover:border-accent transition-colors"
          >
            <Link href={`/events/${event.slug}`} className="block">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-4">
                <Image
                  src={
                    event.thumbnail?.url ||
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
                    <span>{formatDate(event?.nearest_lineup?.start_date)}</span>
                    <span className="text-border">|</span>
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{formatTime(event?.nearest_lineup?.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                      {event?.nearest_lineup?.addressable.address}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">From</span>
                    <span className="text-lg font-medium ml-1">
                      {event.currency}{" "}
                      {Number(event.low_price).toLocaleString()}
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
      </div>

      {/* Pagination */}
      {events?.meta.total > events?.meta.per_page && (
        <div className="flex justify-center mt-12">
          <Pagination
            total={events?.meta.last_page}
            initialPage={events?.meta.current_page}
            page={events?.meta.current_page}
            onChange={handlePageChange}
            showControls
            variant="light"
            classNames={{
              wrapper: "gap-2",
              item: "w-10 h-10 text-small bg-transparent hover:bg-accent/10 data-[active=true]:bg-accent data-[active=true]:text-white data-[active=true]:font-bold rounded-none border border-transparent hover:border-accent/30 transition-colors",
              prev: "w-10 h-10 bg-transparent hover:bg-accent/10 rounded-none border border-border hover:border-accent/30",
              next: "w-10 h-10 rotate-0 bg-transparent hover:bg-accent/10 rounded-none border border-border hover:border-accent/30",
              cursor: "bg-accent text-white font-bold",
            }}
          />
        </div>
      )}
    </div>
  );
}

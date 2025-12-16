"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface RelatedEventsProps {
  relatedEvents: IPaginatedResponse<IEvent>;
}

export function RelatedEvents({ relatedEvents }: RelatedEventsProps) {
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-serif">You Might Also Like</h2>
        <Link
          href="/events"
          className="hidden md:flex items-center gap-2 text-sm tracking-wider hover:text-accent transition-colors"
        >
          VIEW ALL
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedEvents.data.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/events/${event.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden mb-4">
                <Image
                  src={event.thumbnail.url || "/placeholder.svg"}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-lg mb-2 group-hover:text-accent transition-colors">
                {event.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDateTime(event?.nearest_lineup?.start_date)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                {event?.nearest_lineup?.addressable.address}
              </div>
              <p className="mt-2">
                <span className="text-xs text-muted-foreground">From </span>
                <span className="font-medium">
                  {event.currency} {Number(event.low_price).toLocaleString()}
                </span>
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

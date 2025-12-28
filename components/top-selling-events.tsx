"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Ticket, Calendar } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { formatDateTime } from "@/lib/utils";

interface TopSellingEventsProps {
  events: IPaginatedResponse<IEvent>;
}

export function TopSellingEvents({ events }: TopSellingEventsProps) {
  if (!events || events?.data.length === 0) return null;

  return (
    <section className="py-20 bg-white text-black relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-black text-white p-2 rounded-full">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Top Selling Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events?.data.map((event, index) => (
            <Link
              href={`/events/${event.slug}`}
              key={event.id}
              className="group relative flex flex-col h-full bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-sm overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={event.thumbnail?.url || "/placeholder.svg"}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white text-black font-bold font-serif text-xl shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="p-6 flex flex-col flex-1 relative">
                <div className="flex items-center gap-2 text-black/70 text-xs uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {formatDateTime(event?.nearest_lineup?.start_date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                  {event.name}
                </h3>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black/70">
                    <Ticket size={14} className="text-accent" />
                    <span>Selling Fast</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

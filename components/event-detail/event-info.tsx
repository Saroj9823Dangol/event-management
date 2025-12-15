"use client";

import { calculateDuration } from "@/lib/utils";
import { IEvent } from "@/types";
import { motion } from "framer-motion";
import { Star, Clock, Users, Shield, Info } from "lucide-react";

interface EventInfoProps {
  event: IEvent;
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-serif mb-6 text-white leading-none tracking-tight line-clamp-1">
        {event?.name}
      </h1>
      <p className="text-base md:text-lg lg:text-xl font-light text-white/90 mb-10 max-w-2xl leading-tight line-clamp-1">
        {event?.description}
      </p>

      {/* Quick Facts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Clock className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Duration
          </p>
          <p className="font-serif text-lg text-white">
            {calculateDuration(
              event?.nearest_lineup?.start_date,
              event?.nearest_lineup?.end_date
            )}
          </p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Users className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Age
          </p>
          <p className="font-serif text-lg text-white">
            {event?.is_adults_only ? "18+" : "All ages"}
          </p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Info className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Venue
          </p>
          <p className="font-serif text-lg text-white">
            {event?.nearest_lineup?.custom_fields?.venue_name}
          </p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Shield className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Organizer
          </p>
          <p
            className="font-serif text-lg text-white truncate"
            title={event?.organizer?.name}
          >
            {event?.organizer?.name}
          </p>
        </div>
      </div>

      {/* Important Info */}
      <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <h3 className="text-lg font-serif mb-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-accent" />
          Important Information
        </h3>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start gap-3 p-4 bg-black/20 rounded-lg">
            <span className="text-accent mt-1">•</span>
            <span className="text-sm text-gray-400">
              All tickets are mobile delivery only. Please have your phone
              charged and ready.
            </span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-black/20 rounded-lg">
            <span className="text-accent mt-1">•</span>
            <span className="text-sm text-gray-400">
              No professional cameras, audio/video recording devices allowed
              inside.
            </span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-black/20 rounded-lg">
            <span className="text-accent mt-1">•</span>
            <span className="text-sm text-gray-400">
              This event is rain or shine. No refunds issued due to inclement
              weather.
            </span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-black/20 rounded-lg">
            <span className="text-accent mt-1">•</span>
            <span className="text-sm text-gray-400">
              Please review the full terms and conditions before purchasing
              tickets.
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

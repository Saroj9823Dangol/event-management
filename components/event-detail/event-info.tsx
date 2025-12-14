"use client";

import { motion } from "framer-motion";
import { Star, Clock, Users, Shield, Info } from "lucide-react";

interface EventInfoProps {
  event: {
    description: string;
    rating: number;
    reviews: number;
    duration: string;
    ageRestriction: string;
    organizer: string;
    doors: string;
  };
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Rating & Quick Info */}
      <div className="flex flex-wrap items-center gap-6 mb-12">
        <h2 className="text-3xl font-serif">About The Event</h2>
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(event.rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="font-medium text-sm">{event.rating}/5.0</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            ({event.reviews.toLocaleString()} verified reviews)
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-16">
        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
          {event.description.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="leading-relaxed mb-6 first:text-white first:text-xl first:font-light"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Quick Facts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Clock className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Duration
          </p>
          <p className="font-serif text-lg text-white">{event.duration}</p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Users className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Age
          </p>
          <p className="font-serif text-lg text-white">
            {event.ageRestriction}
          </p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Info className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Doors
          </p>
          <p className="font-serif text-lg text-white">{event.doors}</p>
        </div>
        <div className="group p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
          <Shield className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Organizer
          </p>
          <p
            className="font-serif text-lg text-white truncate"
            title={event.organizer}
          >
            {event.organizer}
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Radio } from "lucide-react";

const liveEvents = [
  {
    id: 1,
    title: "Taylor Swift - Eras Tour",
    venue: "SoFi Stadium",
    viewers: "45.2K",
  },
  { id: 2, title: "UFC 305", venue: "T-Mobile Arena", viewers: "32.1K" },
  { id: 3, title: "Wimbledon Finals", venue: "Centre Court", viewers: "28.4K" },
  {
    id: 4,
    title: "Coachella Day 2",
    venue: "Empire Polo Club",
    viewers: "89.3K",
  },
];

export function LiveNowStrip() {
  return (
    <section className="relative z-30 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      <div className="flex items-center h-14">
        {/* Static "LIVE" Badge */}
        <Link
          href="/live-now"
          className="relative z-20 flex items-center gap-3 px-6 lg:px-8 h-full bg-accent/10 border-r border-white/10 hover:bg-accent/20 transition-colors shrink-0 group"
        >
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-white group-hover:text-accent-foreground transition-colors uppercase">
            Live Now
          </span>
        </Link>

        {/* Scrolling Ticker */}
        <div className="flex-1 overflow-hidden relative group cursor-default">
          {/* Gradient Masks for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />

          <div className="flex w-full overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="flex items-center gap-12 px-6 w-max group-hover:[animation-play-state:paused]"
            >
              {[...liveEvents, ...liveEvents, ...liveEvents].map((event, i) => (
                <Link
                  key={i}
                  href={`/events/${event.id}`}
                  className="flex items-center gap-4 group/item opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-white font-serif text-lg tracking-wide whitespace-nowrap group-hover/item:text-accent transition-colors">
                    {event.title}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-xs font-medium tracking-widest uppercase text-white/60 whitespace-nowrap">
                    {event.venue}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                    <Users className="w-3 h-3 text-white/40" />
                    <span className="text-[10px] font-mono text-white/60">
                      {event.viewers}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

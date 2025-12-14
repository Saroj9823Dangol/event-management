"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { Play, Users, Signal, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const liveEvents = [
  {
    id: 1,
    title: "Taylor Swift - Eras Tour",
    venue: "SoFi Stadium",
    viewers: "45.2K",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop",
    category: "Concert",
    status: "LIVE 🔴",
  },
  {
    id: 2,
    title: "UFC 305: Adesanya vs Du Plessis",
    venue: "T-Mobile Arena",
    viewers: "32.1K",
    image:
      "https://images.unsplash.com/photo-1599522316574-7097e3355322?q=80&w=2015&auto=format&fit=crop",
    category: "Sports",
    status: "LIVE 🔴",
  },
  {
    id: 3,
    title: "Wimbledon Finals 2024",
    venue: "Centre Court",
    viewers: "28.4K",
    image:
      "https://images.unsplash.com/photo-1563205764-9ae3fa893661?q=80&w=2072&auto=format&fit=crop",
    category: "Sports",
    status: "LIVE 🔴",
  },
  {
    id: 4,
    title: "Coachella Music Festival",
    venue: "Empire Polo Club",
    viewers: "89.3K",
    image:
      "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop",
    category: "Festival",
    status: "LIVE 🔴",
  },
  {
    id: 5,
    title: "Tomorrowland Mainstage",
    venue: "Boom, Belgium",
    viewers: "120K",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    category: "Festival",
    status: "LIVE 🔴",
  },
  {
    id: 6,
    title: "Global Tech Summit Keynote",
    venue: "Moscone Center",
    viewers: "12.5K",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50918c71?q=80&w=2070&auto=format&fit=crop",
    category: "Conference",
    status: "LIVE 🔴",
  },
];

export default function LivePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CinematicNav />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
            alt="Live Events Background"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-3 h-3 bg-red-500 rounded-none animate-pulse" />
            <span className="text-accent font-bold tracking-[0.2em] uppercase">
              Happening Now
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif text-white"
          >
            Live Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Experience the world's most exciting moments as they unfold. Join
            millions of viewers in real-time.
          </motion.p>
        </div>
      </section>

      {/* Live Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden border border-white/10"
            >
              <Link
              href={`/events/${event.id}`}
                className="block w-full h-full"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-3 py-1.5 z-10 border border-red-500">
                  <Signal className="w-3 h-3 text-white animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                    Live
                  </span>
                </div>

                {/* Viewers */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 z-10 border border-white/10">
                  <Users className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                    {event.viewers}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                    {event.category}
                  </p>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {event.venue}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-8 border border-white/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors">
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                    Watch Stream
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

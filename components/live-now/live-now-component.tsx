"use client";
import React, { useState } from "react";
import { Play, Users, Signal, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import logger from "@/lib/logger/logger";
import VideoModal from "../ui/video-modal";
import NoData from "../ui/no-data";
import { motion } from "framer-motion";

interface LiveNowProps {
  events: IPaginatedResponse<IEvent>;
}

const LiveNowComponent = ({ events }: LiveNowProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (!events || events.data.length === 0) {
    return (
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <NoData
          title="No Live Events"
          description="There are currently no live events found. Please check back later."
        />
      </section>
    );
  }

  return (
    <>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/live-event-bg.avif"
            alt="Live Events Background"
            fill
            className="object-cover opacity-50 object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 bg-secondary px-2 w-fit mx-auto"
          >
            <span className="w-3 h-3 bg-red-500 rounded-none animate-pulse" />
            <span className="text-accent font-extrabold tracking-[0.2em] uppercase">
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

      <section className="py-20 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.data.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden border border-white/10"
            >
              <Link
                href={`/events/${event.slug}`}
                className="block w-full h-full"
              >
                <Image
                  src={event.thumbnail?.url || "/placeholder.svg"}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

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
                    {event.tickets_count}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                    {event.category?.name}
                  </p>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />{" "}
                      {event?.nearest_lineup?.custom_fields.venue_name}
                    </span>
                  </div>

                  {event.custom_fields?.youtube_link && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Use embed_url if available, otherwise try to construct it or fallback to the link
                        const videoUrl =
                          event.custom_fields?.embed_url ||
                          event.custom_fields?.youtube_link;
                        setSelectedVideo(videoUrl || "");
                      }}
                      className="mt-6 cursor-pointer flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase transition-opacity duration-500"
                    >
                      <span className="w-8 h-8 border border-white/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors">
                        <Play className="w-3 h-3 fill-current" />
                      </span>
                      Watch Stream
                    </button>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />
    </>
  );
};

export default LiveNowComponent;

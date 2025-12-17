"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, History, ArrowRight } from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { IEvent } from "@/types";
import { cn } from "@/lib/utils";

interface PastHistoryProps {
  events: IPaginatedResponse<IEvent>;
}

export function PastHistory({ events }: PastHistoryProps) {
  if (!events || events?.data.length === 0) return null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedEvent = events?.data[selectedIndex];

  // Extract YouTube ID if possible, or use as direct link
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";

    // Simple YouTube ID extraction
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&mute=1`;
    }

    return url;
  };

  const videoUrl = getEmbedUrl(selectedEvent.custom_fields?.youtube_link);
  const isYoutube = videoUrl.includes("youtube.com/embed");

  return (
    <section className="py-20 text-white overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white text-black p-2 rounded-full">
            <History size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Past Events History
          </h2>
        </div>

        {/* Layout: Thumbnails Top (Scrollable), Video Bottom */}
        <div className="flex flex-col gap-8">
          {/* Scrollable Thumbnails */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {events?.data.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "relative group flex-shrink-0 w-64 aspect-video rounded-lg overflow-hidden transition-all duration-300 border-2",
                    selectedIndex === index
                      ? "border-accent scale-105 ring-2 ring-accent/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={event.thumbnail?.url || "/placeholder.svg"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-xs font-bold text-white line-clamp-1 text-left">
                      {event.name}
                    </p>
                    <p className="text-[10px] text-zinc-300 text-left">
                      {event.custom_fields?.venue_name || "Venue N/A"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Video Player Area - Inspired by VideoHero style */}
          <div className="relative w-full aspect-video md:aspect-[21/9] bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {videoUrl ? (
                  isYoutube ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                    />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                    <Image
                      src={
                        selectedEvent.featured_banner?.url ||
                        selectedEvent.thumbnail?.url ||
                        "/placeholder.svg"
                      }
                      alt={selectedEvent.name}
                      fill
                      className="object-cover opacity-50 blur-sm"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <p className="text-xl text-white font-serif mb-2">
                        Video Unavailable
                      </p>
                      <p className="text-zinc-400 text-sm">
                        No video link provided for this event.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Info Cards Overlay (Only show if not playing full screen or if desired style)
                 VideoHero keeps controls overlayed. Here we keep it clean for the player.
                 Maybe add a side description panel or overlay like VideoHero.
             */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-white drop-shadow-md">
                {selectedEvent.name}
              </h3>
              <p className="text-white/80 text-sm mt-1 max-w-md drop-shadow-sm line-clamp-2">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

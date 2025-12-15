"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { IEvent } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";

interface EventHeroProps {
  event: IEvent;
}

export function EventDetailHero({ event }: EventHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 select-none">
        {showVideo ? (
          <motion.video
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={() => setShowVideo(false)}
          >
            <source src={event.featured_banner.url} type="video/mp4" />
          </motion.video>
        ) : (
          <Image
            src={event.thumbnail.url || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      {/* Back Button */}
      <div className="absolute top-28 left-6 lg:left-12 z-20">
        <Link
          href="/events"
          className="group flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase"
        >
          <div className="p-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Events
        </Link>
      </div>

      {/* Video Controls */}
      {showVideo && (
        <div className="absolute top-28 right-6 lg:right-12 z-20 flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="px-4 py-1.5 bg-accent text-white text-xs font-bold tracking-widest uppercase rounded-sm shadow-lg shadow-accent/20">
              {event.category.name}
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 text-white leading-none tracking-tight">
            {event.name}
          </h1>
          <p className="text-2xl md:text-4xl font-light text-white/90 mb-10 max-w-2xl leading-tight">
            {event.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-8 text-white/80 mb-12 text-sm tracking-widest uppercase font-medium">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span>{formatDate(event.nearest_lineup.start_date)}</span>
            </div>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <span>{formatTime(event.nearest_lineup.start_date)}</span>
            </div>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{event.nearest_lineup.addressable.city}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-6">
            {/* <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all duration-300 rounded-lg">
              <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
              <span className="text-sm font-bold tracking-widest">
                SAVE TO LIST
              </span>
            </button> */}
            <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all duration-300 rounded-lg">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest">
                SHARE EVENT
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

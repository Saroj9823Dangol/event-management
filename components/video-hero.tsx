"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import axios from "axios";
import { use } from "react";
import { IEvent } from "@/types";
import { getMediaCategory } from "@/lib/mediaType";
import { IPaginatedResponse } from "@/types/response";
import { formatDateTime } from "@/lib/utils";

interface VideoHeroProps {
  featuredEvents: IPaginatedResponse<IEvent>;
}

const IMAGE_DURATION = 6000; // 6 seconds for images

export function VideoHero({ featuredEvents }: VideoHeroProps) {
  if (!featuredEvents || featuredEvents?.data.length === 0) {
    return null;
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Use state callback ref to detect when video element actually mounts
  const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);

  const imageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const currentEvent = featuredEvents?.data[currentIndex];

  // Reset state when slide changes
  useEffect(() => {
    setProgress(0);
    // Note: Video play logic is now handled in the videoRef useEffect
    // when the new video element mounts

    if (getMediaCategory(currentEvent.featured_banner.url) !== "video") {
      // For images, we just start the timer
      startTimeRef.current = Date.now();
      startImageTimer();
    }

    return () => {
      clearImageTimer();
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const startImageTimer = () => {
    if (getMediaCategory(currentEvent.featured_banner.url) !== "image") return;

    // Clear existing
    if (imageTimeoutRef.current) clearTimeout(imageTimeoutRef.current);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);

    // Set timeout to advance
    imageTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, IMAGE_DURATION);

    // Animation loop for progress bar
    const updateImageProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const prog = Math.min((elapsed / IMAGE_DURATION) * 100, 100);
      setProgress(prog);

      if (prog < 100) {
        animationFrameRef.current = requestAnimationFrame(updateImageProgress);
      }
    };
    animationFrameRef.current = requestAnimationFrame(updateImageProgress);
  };

  const clearImageTimer = () => {
    if (imageTimeoutRef.current) {
      clearTimeout(imageTimeoutRef.current);
      imageTimeoutRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }
  };

  // Main Video Logic: Reacts to the video element mounting/unmounting
  useEffect(() => {
    // If no video node or not a video type, stop
    if (
      !videoNode ||
      getMediaCategory(currentEvent.featured_banner.url) !== "video"
    )
      return;

    const onTimeUpdate = () => {
      if (videoNode.duration) {
        setProgress((videoNode.currentTime / videoNode.duration) * 100);
      }
    };
    const onEnded = () => handleNext();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    // Attach listeners
    videoNode.addEventListener("timeupdate", onTimeUpdate);
    videoNode.addEventListener("ended", onEnded);
    videoNode.addEventListener("play", onPlay);
    videoNode.addEventListener("pause", onPause);

    // Initial setup
    videoNode.muted = isMuted;

    // Attempt auto-play
    const playVideo = async () => {
      try {
        await videoNode.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Auto-play prevented:", err);
        setIsPlaying(false);
      }
    };
    playVideo();

    return () => {
      videoNode.removeEventListener("timeupdate", onTimeUpdate);
      videoNode.removeEventListener("ended", onEnded);
      videoNode.removeEventListener("play", onPlay);
      videoNode.removeEventListener("pause", onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoNode, currentEvent.featured_banner.url]); // Re-run when the DOM node changes (mounts)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents?.meta.total);
  };

  const togglePlay = () => {
    if (getMediaCategory(currentEvent.featured_banner.url) !== "video") return;
    if (!videoNode) return;

    if (isPlaying) {
      videoNode.pause();
    } else {
      videoNode.play();
    }
  };

  const toggleMute = () => {
    if (getMediaCategory(currentEvent.featured_banner.url) !== "video") return;
    if (!videoNode) return;

    videoNode.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Media Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {getMediaCategory(currentEvent.featured_banner.url) === "video" ? (
            <video
              ref={setVideoNode} // Use state setter as ref callback
              playsInline
              className="w-full h-full object-cover object-top"
              poster={currentEvent.featured_banner.url.replace(".mp4", ".jpg")} // Fallback if applicable
            >
              <source src={currentEvent.featured_banner.url} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentEvent.featured_banner.url}
              alt={currentEvent.name}
              className="w-full h-full object-cover object-top"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full  flex flex-col justify-end pb-20 container mx-auto z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="px-3 py-1 bg-accent text-white text-xs font-bold tracking-widest uppercase rounded-sm">
                {currentEvent.category.name}
              </span>
              <span className="text-white/80 text-sm tracking-widest uppercase border-l border-white/20 pl-4">
                Featured Event
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 text-white leading-[0.9] tracking-tight line-clamp-1">
              {currentEvent.name}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light tracking-wide line-clamp-2">
              {currentEvent.description}
            </p>
            <div className="flex items-center gap-6 text-white/60 mb-10 text-sm tracking-widest uppercase">
              <span>{currentEvent?.nearest_lineup?.addressable?.address}</span>
              <span className="w-1 h-1 bg-accent rounded-full" />
              <span>
                {formatDateTime(currentEvent?.nearest_lineup?.start_date)}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 relative z-30">
              <Link
                href={`/events/${currentEvent.slug}`}
                className="group relative px-10 py-5 bg-white text-black overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 text-sm font-bold tracking-widest flex items-center gap-2">
                  GET TICKETS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                <span className="absolute z-10 inset-0 flex items-center justify-center text-white text-sm font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  GET TICKETS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {getMediaCategory(currentEvent.featured_banner.url) ===
                "video" && (
                <button
                  onClick={toggleMute}
                  className="px-8 py-5 text-white text-sm font-bold tracking-widest hover:text-accent transition-colors flex items-center gap-2 group z-30 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 fill-current" />
                    ) : (
                      <Volume2 className="w-4 h-4 fill-current" />
                    )}
                  </div>
                  {isMuted ? "UNMUTE" : "MUTE"}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls & Progress */}
        <div className="absolute bottom-10 right-6 lg:right-12 flex items-center gap-6 z-30">
          {/* Progress Bar */}
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden hidden md:block">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              layoutId="progress" // Keep layoutId consistent for smooth transitions
              transition={{ duration: 0.1, ease: "linear" }} // Smooth linear update
            />
          </div>

          <div className="flex items-center gap-2 mr-2 text-white/60 text-xs tracking-widest">
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            <div className="w-12 h-px bg-white/20" />
            <span>{String(featuredEvents?.meta.total).padStart(2, "0")}</span>
          </div>

          {getMediaCategory(currentEvent.featured_banner.url) === "video" && (
            <>
              <button
                onClick={togglePlay}
                className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {featuredEvents?.data.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 h-4 ${
                i === currentIndex
                  ? "w-12 h-4 bg-primary"
                  : "w-2 h-4 bg-white/20 hover:bg-white/40"
              } rounded-full cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

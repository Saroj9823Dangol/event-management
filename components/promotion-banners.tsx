"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Youtube,
  Facebook,
  Instagram,
  Music2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Square,
  ChevronRightIcon,
} from "lucide-react";
import { IPromotionBanner } from "@/types";
import { IPaginatedResponse } from "@/types/response";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLenis } from "lenis/react";

interface PromotionBannersProps {
  banners: IPaginatedResponse<IPromotionBanner>;
}

// Track visibility across internal navigations, but reset on hard refresh
let hasBeenShownInSession = false;

export function PromotionBanners({ banners }: PromotionBannersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    // Cleanup to ensure lenis is started if component unmounts while open
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (banners?.data && banners.data.length > 0) {
      if (!hasBeenShownInSession) {
        // Show promotion after 1.5 second delay
        const timer = setTimeout(() => {
          setIsOpen(true);
          hasBeenShownInSession = true;
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [banners]);

  if (!banners?.data || banners.data.length === 0) return null;

  const currentBanner = banners.data[currentIndex];
  const totalBanners = banners.data.length;

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  const SocialIcon = ({ type, url }: { type: string; url: string }) => {
    if (!url) return null;
    const icons = {
      youtube: <Youtube size={14} />,
      facebook: <Facebook size={14} />,
      instagram: <Instagram size={14} />,
      tiktok: <Music2 size={14} />,
    };

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-none bg-white text-black flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {icons[type as keyof typeof icons] || <ChevronRightIcon size={14} />}
      </a>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`max-w-[95vw] ${
          viewMode === "grid" ? "lg:max-w-6xl" : "lg:max-w-4xl"
        } p-0 bg-stone-950/95 backdrop-blur-3xl border border-white/20 rounded-none overflow-hidden !flex !flex-col h-[90vh] md:h-[85vh]`}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Promotions</DialogTitle>

        {/* Header / Controls - Static positioning relative to content */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
          {totalBanners > 1 && (
            <div className="bg-white/10 backdrop-blur-xl p-1 border border-white/20 flex items-center gap-1 rounded-none">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-all rounded-none ${
                  viewMode === "grid"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("carousel")}
                className={`p-2 transition-all rounded-none ${
                  viewMode === "carousel"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                }`}
                title="Carousel View"
              >
                <Square size={18} />
              </button>
            </div>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 bg-white/10 text-white hover:bg-black hover:text-white transition-colors border border-white/20 rounded-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 p-8 md:p-12 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/40"
        >
          {viewMode === "grid" ? (
            /* Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {banners?.data.map((banner: IPromotionBanner, index: number) => (
                <motion.div
                  key={`${banner.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 border border-white/10 hover:border-white/40 transition-all flex flex-col h-full rounded-none"
                >
                  <div className="relative aspect-video overflow-hidden rounded-none">
                    <Image
                      src={banner.files[0]?.url || "/placeholder.svg"}
                      alt={banner.event.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors line-clamp-2">
                      {banner.event.name}
                    </h3>

                    <div className="mt-auto">
                      <Link
                        href={`/events/${banner.event.slug}`}
                        className="w-full inline-flex items-center justify-between gap-2 px-6 py-4 bg-white text-black font-bold tracking-[0.2em] text-xs transition-all hover:bg-accent hover:text-white rounded-none underline-none"
                        onClick={() => setIsOpen(false)}
                      >
                        BOOK TICKETS <ChevronRightIcon size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Carousel Layout */
            <div className="flex flex-col md:flex-row h-full bg-white/5 border border-white/10 rounded-none overflow-hidden min-h-[500px]">
              <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBanner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentBanner.files[0]?.url || "/placeholder.svg"}
                      alt={currentBanner.event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </motion.div>
                </AnimatePresence>

                {totalBanners > 1 && (
                  <div className="absolute bottom-10 left-10 flex items-center gap-4 z-20">
                    <button
                      onClick={prevBanner}
                      className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-none"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextBanner}
                      className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-none"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <motion.div
                  key={currentBanner.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase block mb-6">
                    EVENT SPOTLIGHT
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                    {currentBanner.event.name}
                  </h2>
                  <p className="text-white/60 text-lg mb-12 line-clamp-4 font-light leading-relaxed">
                    {currentBanner.event.description}
                  </p>

                  <Link
                    href={`/events/${currentBanner.event.slug}`}
                    className="group relative inline-flex items-center justify-between w-full px-10 py-6 bg-white text-black font-bold tracking-[0.3em] text-sm overflow-hidden transition-all hover:bg-accent hover:text-white rounded-none underline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10 uppercase">ENROLL NOW</span>
                    <ChevronRight
                      size={20}
                      className="z-10 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

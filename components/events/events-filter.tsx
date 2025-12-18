"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Grid,
  LayoutList,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { IPaginatedResponse } from "@/types/response";
import { ICategory } from "@/types";

interface EventsFilterProps {
  categories: IPaginatedResponse<ICategory>;
}

export function EventsFilter({ categories }: EventsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(
        '[data-active="true"]'
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "All") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      {/* Main Filter Bar */}
      <div className="flex flex-col gap-4 mb-6 items-start">
        {/* Categories */}
        <div className="relative w-full group/slider">
          {/* Left Gradient & Button */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                  left: -200,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0 px-8"
          >
            <button
              onClick={() => handleCategoryChange("All")}
              data-active={activeCategory === "All"}
              className={`px-5 py-2.5 text-sm tracking-wider whitespace-nowrap transition-colors flex-shrink-0 ${
                activeCategory === "All"
                  ? "bg-white text-black font-bold"
                  : "border border-border hover:bg-white/10 text-muted-foreground hover:text-white"
              }`}
            >
              ALL
            </button>
            {categories.data.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                data-active={activeCategory === category.slug}
                className={`px-5 py-2.5 text-sm tracking-wider whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeCategory === category.slug
                    ? "bg-white text-black font-bold"
                    : "border border-border hover:bg-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Right Gradient & Button */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                  left: 200,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white opacity-0 group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

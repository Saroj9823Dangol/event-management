"use client";

import { useState, useRef } from "react";
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

const sortOptions = [
  "Date: Soonest",
  "Price: Low to High",
  "Price: High to Low",
];

export function EventsFilter({ categories }: EventsFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Date: Soonest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
            {categories.data.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
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

        {/* Right Controls */}
        <div className="flex justify-end items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm hover:bg-white/10 transition-colors">
              <span className="text-muted-foreground">Sort:</span>
              {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors ${
                    sortBy === option ? "text-accent" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border text-sm transition-colors ${
              showFilters
                ? "border-white bg-white text-black"
                : "border-border hover:bg-white/10"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            FILTERS
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="py-8 border-t border-b border-border grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Price Range */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">PRICE RANGE</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([+e.target.value, priceRange[1]])
                    }
                    className="w-24 px-3 py-2 bg-background border border-border text-sm outline-none focus:border-foreground"
                    placeholder="Min"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], +e.target.value])
                    }
                    className="w-24 px-3 py-2 bg-background border border-border text-sm outline-none focus:border-foreground"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">DATE</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Today",
                    "Tomorrow",
                    "This Week",
                    "This Month",
                    "Custom",
                  ].map((date) => (
                    <button
                      key={date}
                      className="px-3 py-1.5 text-sm border border-border hover:bg-white hover:text-black transition-colors"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <span>Showing 1-24 of 2,340 events</span>
        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      </div>
    </div>
  );
}

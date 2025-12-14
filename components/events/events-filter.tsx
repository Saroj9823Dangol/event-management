"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, Grid, LayoutList, ChevronDown, X } from "lucide-react"

const categories = ["All", "Concerts", "Theater", "Sports", "Comedy", "Festivals", "Arts", "Family"]
const sortOptions = ["Relevance", "Date: Soonest", "Price: Low to High", "Price: High to Low", "Popularity"]

export function EventsFilter() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="mb-8">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-sm tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === category ? "bg-white text-black" : "border border-border hover:bg-white/10"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
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
              showFilters ? "border-white bg-white text-black" : "border-border hover:bg-white/10"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            FILTERS
          </button>

          {/* View Mode */}
          <div className="hidden md:flex border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-white text-black" : "hover:bg-white/10"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 border-l border-border transition-colors ${viewMode === "list" ? "bg-white text-black" : "hover:bg-white/10"}`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
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
            <div className="py-8 border-t border-b border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Price Range */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">PRICE RANGE</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-24 px-3 py-2 bg-background border border-border text-sm outline-none focus:border-foreground"
                    placeholder="Min"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-24 px-3 py-2 bg-background border border-border text-sm outline-none focus:border-foreground"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">DATE</h4>
                <div className="flex flex-wrap gap-2">
                  {["Today", "Tomorrow", "This Week", "This Month", "Custom"].map((date) => (
                    <button
                      key={date}
                      className="px-3 py-1.5 text-sm border border-border hover:bg-white hover:text-black transition-colors"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Venue Type */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">VENUE TYPE</h4>
                <div className="flex flex-wrap gap-2">
                  {["Indoor", "Outdoor", "Arena", "Theater", "Club"].map((venue) => (
                    <button
                      key={venue}
                      className="px-3 py-1.5 text-sm border border-border hover:bg-white hover:text-black transition-colors"
                    >
                      {venue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm tracking-wider mb-4">FEATURES</h4>
                <div className="space-y-3">
                  {["VIP Available", "Accessible Seating", "Parking", "Food & Drinks"].map((feature) => (
                    <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-border group-hover:border-foreground transition-colors flex items-center justify-center">
                        <div className="w-3 h-3 bg-white scale-0 group-hover:scale-50 transition-transform" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </label>
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
  )
}

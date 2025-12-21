"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import { DateRangePicker } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

export function EventsHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [dateRange, setDateRange] = useState<any>(null);

  // Advanced Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("Date: Soonest");

  // Update state when URL params change (e.g. back button navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");

    const start = searchParams.get("start");
    const end = searchParams.get("end");
    if (start && end) {
      try {
        setDateRange({
          start: parseDate(start),
          end: parseDate(end),
        });
      } catch (e) {
        console.error("Invalid date params", e);
      }
    } else {
      setDateRange(null);
    }
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    if (dateRange && dateRange.start && dateRange.end) {
      params.set("start", dateRange.start.toString());
      params.set("end", dateRange.end.toString());
    } else {
      params.delete("start");
      params.delete("end");
    }

    // Add advanced filters
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    if (sortBy) {
      params.set("sort", sortBy);
    }

    // We do NOT reset category here, so it persists from searchParams because we initialized with searchParams.toString()

    router.push(`/events?${params.toString()}`);
  };

  const handleQuickDate = (type: string) => {
    const now = today(getLocalTimeZone());
    switch (type) {
      case "Today":
        setDateRange({ start: now, end: now });
        break;
      case "Tomorrow":
        setDateRange({
          start: now.add({ days: 1 }),
          end: now.add({ days: 1 }),
        });
        break;
      case "This Week":
        // localized start of week logic can be complex, simplifying to "next 7 days" for now or using standard helpers if available.
        // for simplicity let's just do Today to Today+6 days for "This Week" perspective or just use the buttons as quick setters.
        setDateRange({ start: now, end: now.add({ days: 6 }) });
        break;
      case "This Month":
        setDateRange({ start: now, end: now.add({ months: 1 }) });
        break;
    }
  };

  const activeCategory = searchParams.get("category");
  const displayTitle = activeCategory
    ? `${activeCategory
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} Events`
    : "Find Your Next Adventure";

  return (
    <section className="relative pt-32 lg:pt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">
            DISCOVER EXPERIENCES
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair mb-6">
            {displayTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {activeCategory
              ? `Browse all upcoming ${activeCategory} events and find your next unforgettable experience.`
              : "Explore thousands of curated events across concerts, theater, sports, and more"}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto container"
        >
          <div className="bg-card border border-border p-2">
            <div className="flex flex-wrap gap-2">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-background">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent text-base placeholder:text-muted-foreground outline-none"
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 bg-background md:border-l border-border">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full md:w-40 bg-transparent text-base placeholder:text-muted-foreground outline-none"
                />
              </div>

              {/* Date Range Picker */}
              <div className="flex items-center gap-3 bg-background md:border-l border-border md:min-w-[280px] w-full md:w-auto min-w-0">
                <DateRangePicker
                  aria-label="Filter by date range"
                  className="w-full"
                  variant="underlined"
                  value={dateRange}
                  onChange={setDateRange}
                  minValue={today(getLocalTimeZone())}
                  showMonthAndYearPickers
                  classNames={{
                    inputWrapper: "shadow-none border-b-0",
                    label: "hidden",
                    input: "text-foreground placeholder:text-muted-foreground",
                    segment:
                      "text-foreground hover:text-foreground group-data-[editable=true]:text-foreground",
                    separator: "text-foreground mx-2",
                  }}
                  popoverProps={{
                    className: "border-border bg-background",
                  }}
                  calendarProps={{
                    classNames: {
                      base: "bg-background border border-border text-foreground shadow-xl",
                      headerWrapper: "bg-background",
                      gridHeader: "bg-background text-foreground",
                      gridHeaderCell: "text-foreground",
                      gridWrapper: "w-fit",
                      content: "w-fit",
                      cellButton:
                        "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground text-foreground hover:bg-accent hover:text-accent-foreground data-[today=true]:bg-accent/50 data-[disabled=true]:text-muted-foreground data-[disabled=true]:cursor-not-allowed",
                    },
                  }}
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">SEARCH</span>
              </button>

              {/* Clear Filters Button */}
              {params.toString() && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setLocation("");
                    setDateRange(null);
                    setPriceRange([0, 500]);
                    setSortBy("Date: Soonest");
                    router.push("/events");
                    setShowFilters(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 border-l border-border bg-background hover:bg-accent/10 hover:text-accent transition-colors text-muted-foreground"
                  title="Clear All Filters"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-3 border-l border-border transition-colors ${
                  showFilters
                    ? "bg-accent text-white"
                    : "bg-background hover:bg-accent/10"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border mt-2"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 bg-background/50 backdrop-blur-sm">
                    {/* Sort By */}
                    <div className="space-y-3">
                      <label className="text-xs tracking-widest text-muted-foreground font-semibold">
                        SORT BY
                      </label>
                      <div className="space-y-1">
                        {[
                          "Date: Soonest",
                          "Price: Low to High",
                          "Price: High to Low",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors border ${
                              sortBy === option
                                ? "border-accent text-accent bg-accent/5 font-medium"
                                : "border-transparent hover:bg-white/5"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                      <label className="text-xs tracking-widest text-muted-foreground font-semibold">
                        PRICE RANGE
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([+e.target.value, priceRange[1]])
                          }
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                          placeholder="Min"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], +e.target.value])
                          }
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                          placeholder="Max"
                        />
                      </div>
                      <div className="pt-2">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], +e.target.value])
                          }
                          className="w-full accent-accent h-1 bg-border rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Quick Dates */}
                    <div className="space-y-3">
                      <label className="text-xs tracking-widest text-muted-foreground font-semibold">
                        QUICK DATES
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Today", "Tomorrow", "This Week", "This Month"].map(
                          (date) => (
                            <button
                              key={date}
                              onClick={() => handleQuickDate(date)}
                              className="px-3 py-2 text-sm border border-border hover:border-accent hover:text-accent transition-colors text-left"
                            >
                              {date}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

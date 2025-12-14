"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { DateRangePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";

export function EventsHero() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [dateRange, setDateRange] = useState<any>(null);

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
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (location) params.set("location", location);

    if (dateRange && dateRange.start && dateRange.end) {
      params.set("start", dateRange.start.toString());
      params.set("end", dateRange.end.toString());
    }

    router.push(`/events?${params.toString()}`);
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">
            DISCOVER EXPERIENCES
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair mb-6">
            Find Your Next Adventure
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore thousands of curated events across concerts, theater,
            sports, and more
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border p-2">
            <div className="flex flex-col md:flex-row gap-2">
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
              <div className="flex items-center gap-3 px-4 py-1 bg-background md:border-l border-border min-w-[280px]">
                <DateRangePicker
                  aria-label="Filter by date range"
                  className="max-w-xs"
                  variant="underlined"
                  value={dateRange}
                  onChange={setDateRange}
                  classNames={{
                    inputWrapper: "shadow-none border-b-0",
                    label: "hidden",
                    input: "text-foreground placeholder:text-muted-foreground",
                    segment:
                      "text-foreground hover:text-foreground group-data-[editable=true]:text-foreground",
                  }}
                  popoverProps={{
                    className: "border-border bg-background",
                  }}
                  calendarProps={{
                    classNames: {
                      base: "bg-background border border-border text-foreground shadow-xl",
                      headerWrapper: "bg-background",
                      gridHeader: "bg-background text-foreground",
                      cellButton:
                        "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground text-foreground hover:bg-accent hover:text-accent-foreground data-[today=true]:bg-accent/50",
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
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-6 justify-center">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["This Weekend", "Concerts", "Comedy", "Sports", "Family"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    router.push(
                      `/events?category=${filter
                        .toLowerCase()
                        .replace(" ", "-")}`
                    )
                  }
                  className="px-4 py-2 text-sm border border-border hover:bg-white hover:text-black transition-colors"
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

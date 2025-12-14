"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { DateRangePicker } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export function EventFilters() {
  const router = useRouter();

  // State for filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  // Date range state
  const [dateRange, setDateRange] = useState<any>(null);

  const handleDiscover = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);

    if (dateRange && dateRange.start && dateRange.end) {
      params.set("start", dateRange.start.toString());
      params.set("end", dateRange.end.toString());
    }

    // Redirect to /events page with query params
    router.push(`/events?${params.toString()}`);
  };

  return (
    <section className="relative px-6 py-12 bg-background">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              Curate Your Experience
            </h2>
            <p className="text-white/60 text-lg font-sans">
              Find the perfect event for your unique taste.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-2">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 md:border-none md:bg-transparent">
                <Search className="w-5 h-5 text-white/50 shrink-0" />
                <input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 md:border-l md:border-white/10 md:bg-transparent">
                <MapPin className="w-5 h-5 text-white/50 shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full md:w-40 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                />
              </div>

              {/* Date Range Picker */}
              <div className="flex items-center gap-3 px-4 py-1 bg-white/5 border border-white/5 md:border-l md:border-white/10 md:bg-transparent">
                <DateRangePicker
                  label="Event Dates"
                  className="max-w-xs"
                  variant="underlined"
                  value={dateRange}
                  onChange={setDateRange}
                  classNames={{
                    inputWrapper: "shadow-none border-b-0",
                    label: "text-white/50 text-xs",
                    input: "text-white placeholder:text-white/40",
                    segment:
                      "text-white hover:text-white group-data-[editable=true]:text-white",
                    separator: "text-white",
                  }}
                  popoverProps={{
                    className: "border-white/20 bg-[#0a0a0a]",
                  }}
                  calendarProps={{
                    classNames: {
                      base: "bg-[#0a0a0a] border border-white/20 text-white shadow-xl",
                      headerWrapper: "bg-[#0a0a0a]",
                      gridHeader: "bg-[#0a0a0a] text-white",
                      cellButton:
                        "data-[selected=true]:bg-accent data-[selected=true]:text-white text-white hover:bg-white/10 data-[today=true]:bg-white/10",
                    },
                  }}
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleDiscover}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-accent text-white text-sm font-bold tracking-wider hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              >
                <span className="hidden md:inline">DISCOVER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-6 justify-center">
            <span className="text-sm text-white/60">Popular:</span>
            {["Concerts", "Theater", "Sports", "Comedy", "Nightlife"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    router.push(`/events?category=${filter.toLowerCase()}`)
                  }
                  className="px-4 py-1.5 text-sm border border-white/10 text-white/80 hover:bg-white hover:text-black transition-colors"
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

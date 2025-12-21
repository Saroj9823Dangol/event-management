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
    <section className="relative py-20 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-0 md:p-10"
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
            <div className="flex flex-wrap gap-2">
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
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 md:border-l md:border-white/10 md:bg-transparent w-full md:w-auto min-w-0">
                <DateRangePicker
                  label="Event Dates"
                  className="w-full"
                  variant="bordered"
                  value={dateRange}
                  onChange={setDateRange}
                  classNames={{
                    inputWrapper:
                      "bg-white/5 border-white/10 hover:border-white/20 data-[hover=true]:border-white/20 group-data-[focus=true]:border-white/30",
                    label: "text-white/50 text-xs",
                    input: "text-white placeholder:text-white/40",
                    segment:
                      "text-white hover:text-white group-data-[editable=true]:text-white",
                    separator: "text-white mx-2",
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
        </motion.div>
      </div>
    </section>
  );
}

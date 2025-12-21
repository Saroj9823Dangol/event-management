"use client";

import { useBooking } from "@/components/event-detail/booking-context";
import logger from "@/lib/logger/logger";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { ILineup } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventLineupProps {
  lineups: ILineup[];
}

export function EventLineup({ lineups }: EventLineupProps) {
  const { selectedLineupId, setSelectedLineupId } = useBooking();

  return (
    <section id="lineup" className="space-y-8 pt-8 border-t border-white/10">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-serif">Event Schedule</h2>
        <p className="text-muted-foreground text-sm hidden md:block">
          Select a day to view tickets
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {lineups?.map((item) => {
          const isSelected = selectedLineupId === item.id;
          return (
            <motion.div
              layout
              key={item.id}
              className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                isSelected
                  ? "bg-accent/5 border-accent shadow-lg shadow-accent/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {/* Selection Indicator Stripe */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              )}

              <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
                {/* Left: Day Info (Larger) */}
                <div className="flex-[2] min-w-[240px]">
                  <div className="flex items-center gap-3 text-accent mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {formatDate(item.start_date)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.name}</h3>

                  <div className="space-y-2 text-white/70 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatTime(item?.start_date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {item?.addressable?.address}
                      <a
                        href={item?.custom_fields?.google_map_link}
                        target="_blank"
                        className="text-xs underline decoration-dotted underline-offset-4 text-white hover:text-accent ml-2"
                      >
                        (View Map)
                      </a>
                    </div>
                  </div>

                  <button
                    disabled={new Date(item.start_date) < new Date()}
                    onClick={() => {
                      setSelectedLineupId(item.id);
                    }}
                    className={`w-full lg:w-auto px-8 py-3 font-bold text-sm tracking-widest transition-all rounded-lg whitespace-nowrap ${
                      new Date(item.start_date) < new Date()
                        ? "bg-white/5 text-white/20 cursor-not-allowed"
                        : isSelected
                        ? "bg-accent text-white shadow-lg shadow-accent/20"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    {isSelected ? "SELECTED" : "BOOK TICKET"}
                  </button>
                </div>

                {/* Right: Performers List (Smaller) */}
                <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                  <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
                    Performances
                  </h4>
                  <div className="space-y-3">
                    {item.performers.map((act, index) => (
                      <div
                        key={act.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{act.name}</p>
                            <p className="text-[10px] text-white/50 uppercase tracking-wider">
                              {act.sub_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

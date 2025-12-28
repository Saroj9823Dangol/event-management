"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type SeatStatus = "available" | "occupied" | "selected" | "vip";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

interface CustomSeatPickerProps {
  rows?: number;
  cols?: number;
  onSeatSelect?: (seat: Seat) => void;
  onSeatDeselect?: (seat: Seat) => void;
  selectedSeats?: Seat[];
}

// Generate dummy data
const generateSeats = (rows: number, cols: number): Seat[] => {
  const seats: Seat[] = [];
  const rowsLabel = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const isVip = i < 2; // First 2 rows are VIP
      const isOccupied = Math.random() < 0.2; // 20% chance occupied

      seats.push({
        id: `${rowsLabel[i]}${j + 1}`,
        row: rowsLabel[i],
        number: j + 1,
        status: isOccupied ? "occupied" : isVip ? "vip" : "available",
        price: isVip ? 150 : 50,
      });
    }
  }
  return seats;
};

export function CustomSeatPicker({
  rows = 8,
  cols = 10,
  onSeatSelect,
  onSeatDeselect,
  selectedSeats = [],
}: CustomSeatPickerProps) {
  const [seats] = useState<Seat[]>(() => generateSeats(rows, cols));

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      onSeatDeselect?.(seat);
    } else {
      onSeatSelect?.(seat);
    }
  };

  return (
    <div className="w-full bg-card/50 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col items-center">
      {/* Screen */}
      <div className="w-full max-w-2xl mb-12">
        <div className="w-full h-2 bg-accent/50 rounded-full mb-2 shadow-[0_0_30px_rgba(var(--accent),0.5)]" />
        <p className="text-center text-xs text-muted-foreground tracking-[0.2em] font-medium">
          SCREEN
        </p>
        {/* Screen Glow */}
        <div className="w-full h-16 bg-gradient-to-b from-accent/10 to-transparent -mt-2" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-white/10 border border-white/20" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-accent border border-accent shadow-[0_0_10px_currentColor]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-primary/80 border border-primary/50" />
          <span>VIP ($150)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-white/5 border border-white/10 opacity-50 cursor-not-allowed" />
          <span>Occupied</span>
        </div>
      </div>

      {/* Seats Grid */}
      <div
        className="grid gap-x-2 gap-y-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {seats.map((seat) => {
          const isSelected = selectedSeats.some((s) => s.id === seat.id);
          const isOccupied = seat.status === "occupied";
          const isVip = seat.status === "vip";

          return (
            <TooltipProvider key={seat.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={
                      !isOccupied
                        ? { scale: 1.1, filter: "brightness(1.2)" }
                        : {}
                    }
                    whileTap={!isOccupied ? { scale: 0.95 } : {}}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isOccupied}
                    className={cn(
                      "w-8 h-8 rounded-t-lg relative transition-all duration-300",
                      isOccupied
                        ? "bg-white/5 border border-white/10 opacity-30 cursor-not-allowed"
                        : isSelected
                        ? "bg-accent border-accent shadow-[0_0_15px_hsl(var(--accent))] text-black z-10"
                        : isVip
                        ? "bg-primary/50 border border-primary/50 hover:bg-primary/70"
                        : "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30"
                    )}
                  >
                    {/* Seat contour */}
                    <span className="sr-only">{seat.id}</span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-white/10 text-white">
                  <p className="font-bold">
                    Row {seat.row} Seat {seat.number}
                  </p>
                  <p className="text-xs text-muted-foreground">${seat.price}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}

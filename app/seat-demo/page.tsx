"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SeatSelection } from "@/components/booking/seat-selection";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function SeatDemoPage() {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  // No external keys needed for custom seat picker

  const handleSeatSelected = (seat: any) => {
    console.log("Selected:", seat);
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const handleSeatDeselected = (seat: any) => {
    console.log("Deselected:", seat);
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CinematicNav />

      <div className="container mx-auto pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">
              Select Your Seats
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our seamless seat selection interface. Choose your
              preferred spot for the upcoming event.
            </p>
          </div>

          <SeatSelection
            selectedSeats={selectedSeats}
            onSeatSelected={handleSeatSelected}
            onSeatDeselected={handleSeatDeselected}
          />

          <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-serif mb-4">
              Selected Seats ({selectedSeats.length})
            </h3>
            {selectedSeats.length === 0 ? (
              <p className="text-muted-foreground italic">
                No seats selected yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {selectedSeats.map((seat) => (
                  <li
                    key={seat.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <span className="font-medium text-accent">
                      Row {seat.row} Seat {seat.number}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${seat.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

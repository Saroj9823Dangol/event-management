"use client";

import { CustomSeatPicker, Seat } from "./custom-seat-picker";
import { useState } from "react";

export interface PricingCategory {
  category: number | string;
  price: number;
}

interface SeatSelectionProps {
  onSeatSelected?: (seat: Seat) => void;
  onSeatDeselected?: (seat: Seat) => void;
  selectedSeats?: Seat[];
  pricing?: PricingCategory[];
}

export function SeatSelection({
  onSeatSelected,
  onSeatDeselected,
  selectedSeats = [],
  pricing = [],
}: SeatSelectionProps) {
  return (
    <div className="w-full relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group p-4">
      <CustomSeatPicker
        onSeatSelect={(seat) => onSeatSelected?.(seat)}
        onSeatDeselect={(seat) => onSeatDeselected?.(seat)}
        selectedSeats={selectedSeats}
      />
    </div>
  );
}

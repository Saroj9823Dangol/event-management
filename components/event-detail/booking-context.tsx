"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextType {
  selectedLineupId: string | null;
  setSelectedLineupId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedLineupId, setSelectedLineupId] = useState<string | null>(null);

  return (
    <BookingContext.Provider value={{ selectedLineupId, setSelectedLineupId }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

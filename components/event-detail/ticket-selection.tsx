"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Shield,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useBooking } from "@/components/event-detail/booking-context";
import { IEvent } from "@/types";
import logger from "@/lib/logger/logger";
import { useAuth } from "@/components/auth/auth-context";

interface TicketSelectionProps {
  event: IEvent;
}

export function TicketSelection({ event }: TicketSelectionProps) {
  // State to track quantity for each ticket type: { [ticketId]: quantity }
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { selectedLineupId } = useBooking();
  const { isAuthenticated, openLoginModal } = useAuth();

  // Scroll navigation state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const isLineupSelected = !!selectedLineupId;

  const selectedLineUpTicketTypes = event?.lineups?.find(
    (lineup) => lineup.id === selectedLineupId
  )?.ticketTypes;

  logger.log(selectedLineUpTicketTypes, "lineeeeup");

  // Calculate totals
  const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);
  const subtotal = selectedLineUpTicketTypes?.reduce(
    (sum, ticket) => sum + ticket.price * (quantities[ticket.id] || 0),
    0
  );
  const total = subtotal ? subtotal : 0;

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(10, current + delta)); // Limit 10 per type
      return { ...prev, [ticketId]: next };
    });
  };

  // Check scroll position to show/hide navigation arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 10);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  // Scroll by one ticket container height
  const scrollByTicket = (direction: "up" | "down") => {
    if (scrollContainerRef.current) {
      const ticketHeight = 200; // Approximate height of one ticket card
      const scrollAmount = direction === "down" ? ticketHeight : -ticketHeight;
      scrollContainerRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll);
      // Check on resize too
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [selectedLineUpTicketTypes]);

  if (!isLineupSelected) {
    return (
      <div className="lg:sticky lg:top-32 p-8 rounded-2xl border border-white/10 bg-white/5 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-serif font-bold">Select a Lineup</h3>
        <p className="text-muted-foreground text-sm">
          Please choose a performance from the lineup schedule to view available
          tickets and prices.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("lineup")
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className="px-6 py-2 cursor-pointer bg-white text-black text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors mt-4"
        >
          View Schedule
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] lg:flex lg:flex-col lg:self-start w-full"
    >
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden relative group flex flex-col h-full min-h-0">
        <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

        {/* Header - Fixed Top */}
        <div className="relative p-6 border-b border-white/5 bg-white/5 flex-none z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                Starting from
              </p>
              <p className="text-4xl font-serif text-white">
                {event.currency} {Number(event.low_price).toLocaleString()}
              </p>
            </div>
            <div className="bg-accent/20 px-3 py-1 rounded text-accent text-xs font-bold uppercase tracking-wider">
              Selling Fast
            </div>
          </div>
        </div>

        {/* Ticket Types List - Scrollable Center with Navigation */}
        <div className="relative flex-1 min-h-0">
          {/* Scroll Up Button */}
          {canScrollUp && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => scrollByTicket("up")}
              className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-accent/90 hover:bg-accent text-white rounded-full p-2 shadow-lg transition-all duration-300 animate-bounce"
              aria-label="Scroll up"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}

          <div
            ref={scrollContainerRef}
            className="relative overflow-y-scroll min-h-0 p-6 touch-pan-y h-full"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)",
              maxHeight: "calc(100vh - 400px)",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 6px;
                background: rgba(255, 255, 255, 0.05);
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
            `}</style>
            <h3 className="text-xs font-bold tracking-widest text-white/50 mb-4 uppercase">
              Select Tickets
            </h3>
            <div className="space-y-4">
              {selectedLineUpTicketTypes?.map((ticket) => {
                const qty = quantities[ticket.id] || 0;
                return (
                  <div
                    key={ticket.id}
                    className={`p-4 border rounded-xl transition-all duration-300 ${
                      qty > 0
                        ? "border-accent bg-accent/5"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-white mb-1">
                          {ticket.name}
                        </h4>
                        {ticket?.description &&
                          ticket.description.length > 0 && (
                            <ul className="list-disc list-inside text-xs text-muted-foreground mt-1 space-y-0.5">
                              {ticket.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                      <div className="font-serif text-lg">
                        {event.currency} {Number(ticket.price).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center justify-end mt-4 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(ticket.id, -1)}
                          disabled={qty === 0}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold">{qty}</span>
                        <button
                          onClick={() => handleQuantityChange(ticket.id, 1)}
                          disabled={qty >= 10}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Down Button */}
          {canScrollDown && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => scrollByTicket("down")}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-accent/90 hover:bg-accent text-white rounded-full p-2 shadow-lg transition-all duration-300 animate-bounce"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Summary - Fixed Bottom */}
        <div className="relative p-6 bg-black/20 space-y-4 flex-none border-t border-white/5 z-20">
          {/* Line Items Summary */}
          {totalQuantity > 0 && (
            <div className="space-y-2 pb-4 border-b border-white/10 text-sm">
              {selectedLineUpTicketTypes?.map((ticket) => {
                const qty = quantities[ticket.id] || 0;
                if (qty === 0) return null;
                return (
                  <div
                    key={ticket.id}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span>
                      {qty}x {ticket.name}
                    </span>
                    <span>
                      {event.currency} {(ticket.price * qty).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between text-xl font-serif text-white">
            <span>Total</span>
            <span>
              {event.currency} {total.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/events/${event.slug}/book`}
            className={`block w-full py-4 bg-white text-black text-center font-bold tracking-widest uppercase rounded-lg shadow-lg shadow-white/10 mt-6 transition-all duration-300 ${
              totalQuantity === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-accent hover:text-white"
            }`}
            onClick={(e) => {
              if (totalQuantity === 0) {
                e.preventDefault();
                return;
              }

              if (!isAuthenticated) {
                e.preventDefault();
                openLoginModal();
                return;
              }

              const bookingSession = {
                eventId: event.id,
                lineupId: selectedLineupId,
                quantities,
                timestamp: Date.now(),
              };

              localStorage.setItem(
                "booking_session",
                JSON.stringify(bookingSession)
              );
            }}
          >
            Get Tickets
          </Link>

          <div className="flex flex-col gap-2 pt-4">
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              <Shield className="w-3 h-3 text-green-500" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

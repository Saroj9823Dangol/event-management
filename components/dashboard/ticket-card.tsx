"use client";

import logger from "@/lib/logger/logger";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, QrCode } from "lucide-react";

import Link from "next/link";

interface TicketProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: "upcoming" | "past";
  qrCode?: string;
  ticketNumber?: string;
}

export function TicketCard({
  ticket,
  eventId,
}: {
  ticket: TicketProps;
  eventId: string;
}) {
  return (
    <motion.div
      layout
      className="group relative overflow-hidden bg-black border border-white/10 hover:border-accent transition-all duration-300"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          style={{ backgroundImage: `url(${ticket.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span
            className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
              ticket.status === "upcoming"
                ? "bg-accent text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {ticket.status === "upcoming" ? "Confirmed" : "Past Event"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold leading-none uppercase mb-2">
            {ticket.title}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-black">
        <div className="space-y-3 font-mono text-sm text-white/60">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="uppercase tracking-wide">
              {ticket.date} • {ticket.time}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="truncate uppercase tracking-wide">
              {ticket.location}
            </span>
          </div>
        </div>
        <Link
          href={`/dashboard/tickets/${eventId}`}
          className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all group/btn"
        >
          <QrCode className="w-4 h-4" />
          View Ticket
        </Link>
      </div>
    </motion.div>
  );
}

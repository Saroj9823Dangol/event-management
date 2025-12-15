"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { BackgroundPattern } from "@/components/background-pattern";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  Ticket as TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function TicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock Data: Multiple tickets for the same event
  const eventDetails = {
    id: params.id,
    name: "Neon Horizon Festival",
    date: "AUG 12, 2025",
    time: "20:00",
    venue: "SILVER LAKE ARENA",
    address: "123 Echo Park Ave, Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
  };

  const tickets = [
    {
      type: "VIP ACCESS",
      seat: "ROW A • SEAT 12",
      price: "$250.00",
      holder: "SAROJ DANGOL",
      id: "NHF-8832-01",
    },
    {
      type: "VIP ACCESS",
      seat: "ROW A • SEAT 13",
      price: "$250.00",
      holder: "SAROJ DANGOL",
      id: "NHF-8832-02",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white font-sans">
      <BackgroundPattern />
      <CinematicNav />

      <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white mb-8 transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Event Details (Professional/Minimal) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="aspect-[4/5] relative overflow-hidden border border-white/10 bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url(${eventDetails.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/80 backdrop-blur-sm">
                <h1 className="text-3xl font-bold leading-none mb-2 uppercase">
                  {eventDetails.name}
                </h1>
                <div className="flex flex-col gap-1 text-sm font-mono text-accent">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {eventDetails.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {eventDetails.venue}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm text-white/60">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>STATUS</span>
                <span className="text-white">CONFIRMED</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>ORDER ID</span>
                <span className="text-white">#8832-9901</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>TOTAL TICKETS</span>
                <span className="text-white">{tickets.length}</span>
              </div>
            </div>
          </div>

          {/* Right: Tickets List (Sharp Cards) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold uppercase tracking-wider">
                Your Passes
              </h2>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">
                <Download className="w-4 h-4" /> Download All
              </button>
            </div>

            {tickets.map((ticket, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white text-black flex flex-col md:flex-row shadow-2xl relative"
              >
                {/* Ticket Stub (Left) */}
                <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-gray-300 relative">
                  {/* Punch holes visual */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full md:block hidden" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full md:block hidden" />

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                          Event
                        </span>
                        <span className="font-bold text-lg uppercase leading-none">
                          {eventDetails.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                          {ticket.type}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                          Date & Time
                        </span>
                        <span className="font-mono text-sm font-bold">
                          {eventDetails.date} <br /> {eventDetails.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                          Seat
                        </span>
                        <span className="font-mono text-sm font-bold bg-gray-100 px-2 py-1">
                          {ticket.seat}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        Ticketholder
                      </span>
                      <span className="font-bold uppercase">
                        {ticket.holder}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        Price
                      </span>
                      <span className="font-bold">{ticket.price}</span>
                    </div>
                  </div>
                </div>

                {/* QR Section (Right) */}
                <div className="w-full md:w-64 bg-gray-50 p-6 flex flex-col items-center justify-center border-l border-dashed border-gray-200 relative">
                  <div className="bg-white p-2 shadow-sm border border-gray-100 mb-4">
                    <QRCodeSVG
                      value={ticket.id}
                      size={120}
                      level="H"
                      className="w-full h-auto"
                    />
                  </div>
                  <span className="font-mono text-xs text-gray-400 tracking-widest">
                    {ticket.id}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase mt-1">
                    Scan for Entry
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

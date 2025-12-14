"use client";

import { TicketCard } from "@/components/dashboard/ticket-card";
import { motion } from "framer-motion";

// Mock Data
const tickets = [
  {
    id: "t1",
    title: "Neon Horizon Festival",
    date: "Fri, Aug 12",
    time: "20:00",
    location: "Silver Lake Arena",
    image:
      "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    status: "upcoming" as const,
  },
  {
    id: "t2",
    title: "Midnight Jazz Club",
    date: "Sat, Sep 05",
    time: "21:30",
    location: "The Blue Note",
    image:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop",
    status: "upcoming" as const,
  },
  {
    id: "t3",
    title: "Summer Solstice Gala",
    date: "Jun 21, 2024",
    time: "18:00",
    location: "City Park Gardens",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop",
    status: "past" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TicketCard ticket={ticket} />
          </motion.div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
          <h3 className="text-xl font-serif mb-2">No tickets found</h3>
          <p className="text-white/60 text-sm">
            You haven't booked any events yet.
          </p>
        </div>
      )}
    </div>
  );
}

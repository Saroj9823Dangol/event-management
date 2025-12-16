"use client";

import { TicketCard } from "@/components/dashboard/ticket-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/api/order";
import { IOrder, IPaginatedResponse } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";
import moment from "moment";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

export default function DashboardPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<
    IPaginatedResponse<IOrder>["meta"] | null
  >(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getUserOrders({
          page,
          per_page: 6,
          sorts: "-created_at",
        });
        const data: IPaginatedResponse<IOrder> = response.data;
        setOrders(data.data);
        setPagination(data.meta);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const mapOrderToTicket = (order: IOrder) => {
    // Assuming one event per order context as per response structure
    const event = order.event;
    const lineup = order.eventLineup;
    const isPast = moment(lineup?.start_date || event.start_date).isBefore(
      moment()
    );

    // Get the first ticket info if available
    const firstItem = order.order_items?.[0];
    const ticketInfo = firstItem?.ticket;

    return {
      id: order.id,
      title: event.name,
      date: formatDate(lineup?.start_date || event.start_date),
      time: formatTime(lineup?.start_date || event.start_date),
      location:
        lineup?.custom_fields?.venue_name ||
        event.venue_name ||
        "Unknown Location",
      image: event.thumbnail?.url || "/placeholder.svg",
      status: (isPast ? "past" : "upcoming") as "upcoming" | "past",
      qrCode: ticketInfo?.qr_code,
      ticketNumber: ticketInfo?.ticket_number,
    };
  };

  if (loading && orders.length === 0) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TicketCard
              ticket={mapOrderToTicket(order)}
              eventId={order.event.id}
            />
          </motion.div>
        ))}
      </div>

      {!loading && orders.length === 0 && (
        <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
          <h3 className="text-xl font-serif mb-2">No tickets found</h3>
          <p className="text-white/60 text-sm">
            You haven't booked any events yet.
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center px-4 text-sm">
            Page {pagination.current_page} of {pagination.last_page}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setPage((p) => Math.min(pagination.last_page, p + 1))
            }
            disabled={page === pagination.last_page || loading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

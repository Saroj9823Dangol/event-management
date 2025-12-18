"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { BackgroundPattern } from "@/components/background-pattern";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Download } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/api/order";
import { formatDate, formatTime } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/auth-context";
import { Loader } from "@/components/loader";
import NoData from "@/components/ui/no-data";
import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";
import logger from "@/lib/logger/logger";
import { renderToStaticMarkup } from "react-dom/server";
import { TicketPrintTemplate } from "@/components/tickets/ticket-print-template";

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchOrder();
    }
  }, [params, user]);

  const fetchOrder = async () => {
    try {
      const response = await getOrderById((await params).id);
      setOrder(response.data.data[0]);
    } catch (error) {
      console.error("Failed to fetch order", error);
      toast.error("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    try {
      setLoading(true);
      const receiptHtml = renderToStaticMarkup(
        <TicketPrintTemplate order={order} />
      );

      const styles = Array.from(
        document.querySelectorAll("link[rel='stylesheet'], style")
      )
        .map((node) => node.outerHTML)
        .join("");

      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
           <html>
             <head>
               <title>Print Tickets - ${order.event?.name || "Event"}</title>
               ${styles}
               <style>
                 body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                 @page { margin: 20mm; }
               </style>
             </head>
             <body>
               ${receiptHtml}
               <script>
                 window.onload = () => {
                   window.focus();
                   window.print();
                   window.close();
                 };
               </script>
             </body>
           </html>
         `);
        printWindow.document.close();
      } else {
        toast.error("Popup blocked. Please allow popups for this site.");
      }
    } catch (error) {
      logger.error("Failed to print tickets:", error);
      toast.error("Failed to initiate printing.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <NoData
        title="Ticket Not Found"
        description="The ticket you are looking for does not exist."
      />
    );
  }

  // Destructure based on the provided JSON structure
  const {
    event,
    eventLineup,
    order_items,
    user: orderUser,
    status,
    id: orderId,
  } = order;

  // Data Mapping
  const eventName = event?.name || "Event Name";
  const eventImage = event?.thumbnail?.url || "/placeholder.svg";

  // Prefer eventLineup start_date, fallback to event start_date
  const startDateStr = eventLineup?.start_date || event?.start_date;
  const date = formatDate(startDateStr);
  const time = formatTime(startDateStr);

  // Venue from eventLineup custom_fields
  const venue = eventLineup?.custom_fields?.venue_name || "Unknown Venue";

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white font-sans">
      <CinematicNav />

      <main className="pb-24 px-4 max-w-7xl mx-auto">
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
                style={{ backgroundImage: `url(${eventImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/80 backdrop-blur-sm">
                <h1 className="text-3xl font-bold leading-none mb-2 uppercase">
                  {eventName}
                </h1>
                <div className="flex flex-col gap-1 text-sm font-mono text-accent">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {venue}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {time}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm text-white/60">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>STATUS</span>
                <span className="text-white uppercase">
                  {status || "Confirmed"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>ORDER ID</span>
                <span className="text-white">#{orderId?.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>TOTAL TICKETS</span>
                <span className="text-white">{order_items?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Right: Tickets List (Sharp Cards) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold uppercase tracking-wider">
                Your Passes
              </h2>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" /> Print / PDF
              </button>
            </div>

            <div id="ticket-pass-section" className="space-y-6">
              {order_items?.map((item: any, index: number) => {
                const ticket = item.ticket;
                // Handle missing ticket or QR
                const qrValue =
                  ticket?.qr_code && ticket.qr_code.startsWith("http")
                    ? ticket.qr_code
                    : JSON.stringify({ id: ticket?.id || item.id });

                const ticketTypeName =
                  typeof item.ticket_type === "string"
                    ? item.ticket_type
                    : item.ticket_type?.name;
                const holderName = orderUser?.name || "Guest";

                return (
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
                              {eventName}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                              {ticketTypeName || "Standard"}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                              Date & Time
                            </span>
                            <span className="font-mono text-sm font-bold">
                              {date} <br /> {time}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                              Location
                            </span>
                            <span className="font-mono text-sm font-bold block">
                              {venue}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                            Ticket Holder
                          </span>
                          <span className="font-mono text-sm font-bold block">
                            {holderName}
                          </span>
                        </div>
                        <div className="text-right">
                          {item.quantity >= 1 && (
                            <div className="mb-1">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest inline-block mr-2">
                                Qty
                              </span>
                              <span className="font-bold">{item.quantity}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest inline-block mr-2">
                              Price
                            </span>
                            <span className="font-bold">
                              {Number(item.total_price) > 0
                                ? `${order.currency} ${item.total_price}`
                                : "Free"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* QR Section (Right) */}
                    <div className="w-full md:w-64 bg-gray-50 p-6 flex flex-col items-center justify-center border-l border-dashed border-gray-200 relative">
                      <div className="bg-white p-2 shadow-sm border border-gray-100 mb-4 mix-blend-multiply">
                        {/* Use Ticket QR Code URL if available, else Generate SVG */}
                        {ticket?.qr_code &&
                        ticket.qr_code.startsWith("http") ? (
                          <img
                            src={ticket.qr_code}
                            alt="QR Code"
                            className="w-full h-auto"
                          />
                        ) : (
                          <QRCodeSVG
                            value={qrValue}
                            size={120}
                            level="H"
                            className="w-full h-auto"
                          />
                        )}
                      </div>
                      <span className="font-mono text-xs text-gray-400 tracking-widest w-full text-center px-4">
                        {ticket?.ticket_number || "N/A"}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase mt-1">
                        Scan for Entry
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

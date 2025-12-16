import { formatDate, formatTime } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface TicketPrintTemplateProps {
  order: any;
}

export const TicketPrintTemplate: React.FC<TicketPrintTemplateProps> = ({
  order,
}) => {
  if (!order) return null;

  const {
    event,
    eventLineup,
    order_items,
    user: orderUser,
    id: orderId,
  } = order;

  const eventName = event?.name || "Event Name";
  const startDateStr = eventLineup?.start_date || event?.start_date;
  const date = formatDate(startDateStr);
  const time = formatTime(startDateStr);
  const venue = eventLineup?.custom_fields?.venue_name || "Unknown Venue";

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 font-sans text-black">
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
          {eventName}
        </h1>
        <p className="text-sm text-gray-600">ORDER #{orderId?.slice(0, 8)}</p>
      </div>

      {order_items?.map((item: any, index: number) => {
        const ticket = item.ticket;
        const qrValue =
          ticket?.qr_code && ticket.qr_code.startsWith("http")
            ? ticket.qr_code
            : JSON.stringify({ id: ticket?.id || item.id });

        const ticketTypeName =
          typeof item.ticket_type === "string"
            ? item.ticket_type
            : item.ticket_type?.name;

        return (
          <div
            key={index}
            className="border border-black flex flex-col md:flex-row relative break-inside-avoid page-break-inside-avoid"
            style={{ breakInside: "avoid" }}
          >
            {/* Ticket Stub */}
            <div className="flex-1 p-6 relative border-b md:border-b-0 md:border-r border-black border-dashed">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
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
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Date & Time
                  </span>
                  <span className="font-mono text-sm font-bold">
                    {date} <br /> {time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Location
                  </span>
                  <span className="font-mono text-sm font-bold block">
                    {venue}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end items-end">
                <div className="text-right">
                  {item.quantity > 1 && (
                    <div className="mb-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest inline-block mr-2">
                        Qty
                      </span>
                      <span className="font-bold">{item.quantity}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest inline-block mr-2">
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

            {/* QR Section */}
            <div className="w-full md:w-48 bg-gray-50 p-6 flex flex-col items-center justify-center">
              <div className="bg-white p-2 border border-gray-200 mb-2">
                {ticket?.qr_code && ticket.qr_code.startsWith("http") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={ticket.qr_code}
                    alt="QR Code"
                    className="w-full h-auto"
                  />
                ) : (
                  <QRCodeSVG
                    value={qrValue}
                    size={100}
                    level="H"
                    className="w-full h-auto"
                  />
                )}
              </div>
              <span className="font-mono text-[10px] text-gray-500 tracking-widest w-full text-center truncate">
                {ticket?.ticket_number || "N/A"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

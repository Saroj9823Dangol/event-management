import Booking from "@/components/booking/Booking";
import { getEventDetail } from "@/lib/api/events";
import React from "react";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const event = await getEventDetail(id);

  return <Booking event={event} />;
};

export default BookingPage;

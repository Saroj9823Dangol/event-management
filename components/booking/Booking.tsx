"use client";

import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import BookingComponent from "./BookingMainComponent";
import { getStripe } from "@/lib/api/stripe";
import { IEvent } from "@/types";

interface BookingProps {
  event: IEvent;
}

const Booking = ({ event }: BookingProps) => {
  return (
    <Elements stripe={getStripe()}>
      <BookingComponent event={event} />
    </Elements>
  );
};

export default Booking;

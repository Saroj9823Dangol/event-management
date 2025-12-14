"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Lock,
  CreditCard,
  Shield,
  Clock,
  Calendar,
  MapPin,
  Ticket,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Mock event data
const event = {
  id: 1,
  title: "Beyoncé",
  subtitle: "Renaissance World Tour",
  date: "Saturday, July 29, 2025",
  time: "8:00 PM",
  location: "Wembley Stadium, London",
  image: "/beyonce-concert-stage-dramatic-lighting.jpg",
};

const steps = ["Select Seats", "Payment", "Confirmation"];

interface SeatSection {
  id: string;
  name: string;
  price: number;
  available: number;
  color: string;
  description: string;
}

const seatSections: SeatSection[] = [
  {
    id: "floor",
    name: "Floor - Standing",
    price: 289,
    available: 234,
    color: "#FF6B35",
    description: "Closest to stage",
  },
  {
    id: "lower-a",
    name: "Lower Bowl A",
    price: 249,
    available: 89,
    color: "#9B59B6",
    description: "Premium lower level",
  },
  {
    id: "lower-b",
    name: "Lower Bowl B",
    price: 199,
    available: 156,
    color: "#27AE60",
    description: "Great sightlines",
  },
  {
    id: "upper-a",
    name: "Upper Bowl A",
    price: 149,
    available: 312,
    color: "#3498DB",
    description: "Elevated view",
  },
  {
    id: "upper-b",
    name: "Upper Bowl B",
    price: 99,
    available: 547,
    color: "#95A5A6",
    description: "Value seating",
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(2); // Mock quantity for now, would typically come from URL params or context
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock price for the selected lineup ticket
  const ticketPrice = 189;

  const calculateTotal = () => {
    const ticketTotal = ticketPrice * quantity;
    const fees = Math.round(ticketTotal * 0.15);
    return { ticketTotal, fees, total: ticketTotal + fees };
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(1);
    }, 2000);
  };

  const { ticketTotal, fees, total } = calculateTotal();

  const steps = ["Payment", "Confirmation"];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/events/${event.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Event
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-32">
        <div className="mx-auto px-6">
          {/* Progress Steps */}
          <div className="py-8 border-b border-border mb-8">
            <div className="flex items-center justify-center gap-4">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
                        i < currentStep
                          ? "bg-accent text-white"
                          : i === currentStep
                          ? "bg-white text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-sm hidden sm:block ${
                        i === currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Payment */}
                {currentStep === 0 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-serif mb-2">
                      Payment Details
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      All transactions are secure and encrypted
                    </p>

                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div className="p-6 bg-card border border-border">
                        <h3 className="font-medium mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="md:col-span-2 px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            className="md:col-span-2 px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                          />
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="p-6 bg-card border border-border">
                        <h3 className="font-medium mb-4 flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM / YY"
                              className="px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="px-4 py-3 bg-background border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <div className="w-5 h-5 border border-border mt-0.5 flex items-center justify-center">
                          <Check className="w-3 h-3 opacity-0 hover:opacity-50 transition-opacity" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-foreground hover:underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-foreground hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Confirmation */}
                {currentStep === 1 && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-accent mx-auto mb-8 flex items-center justify-center"
                    >
                      <Check className="w-10 h-10" />
                    </motion.div>

                    <h2 className="text-3xl font-serif mb-4">
                      You're All Set!
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Your tickets have been confirmed. Check your email for the
                      confirmation and mobile tickets.
                    </p>

                    <div className="bg-card border border-border p-8 max-w-md mx-auto mb-8">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                        <div className="relative w-20 h-20 shrink-0">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-serif text-lg">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Order Number
                          </span>
                          <span className="font-mono">EVT-2025-78934</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tickets</span>
                          <span>{quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/dashboard"
                        className="px-8 py-4 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
                      >
                        VIEW MY TICKETS
                      </Link>
                      <Link
                        href="/"
                        className="px-8 py-4 border border-border text-sm tracking-wider hover:bg-white/10 transition-colors"
                      >
                        DISCOVER MORE
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            {currentStep < 1 && (
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-card border border-border">
                  {/* Event Info */}
                  <div className="p-6 border-b border-border">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 shrink-0">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6 border-b border-border space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        <Ticket className="w-4 h-4 inline mr-2" />
                        {quantity}x General Admission
                      </span>
                      <span>${ticketTotal}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Service Fees
                      </span>
                      <span>${fees}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="p-6 border-b border-border">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6">
                    <button
                      onClick={() => {
                        if (currentStep === 0) {
                          handlePayment();
                        }
                      }}
                      disabled={isProcessing}
                      className="w-full py-4 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          PAY ${total}
                        </>
                      )}
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      100% Secure Checkout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

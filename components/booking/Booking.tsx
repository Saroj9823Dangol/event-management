"use client";

// import logger from "@/lib/logger/logger";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { IEvent } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Lock,
  MapPin,
  Shield,
  Ticket,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";

interface BookingProps {
  event: IEvent;
}

export default function Booking({ event }: BookingProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >({});
  const [selectedLineupId, setSelectedLineupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Load from localStorage
  useEffect(() => {
    let mounted = true;

    const loadBookingSession = () => {
      // Wait for auth check to complete
      if (authLoading) return;

      if (!isAuthenticated) {
        if (mounted) {
          setIsRedirecting(true);
          setTimeout(() => {
            router.replace(`/events/${event.slug}`);
          }, 100);
        }
        return;
      }

      try {
        const session = localStorage.getItem("booking_session");

        const handleRedirect = () => {
          if (!mounted) return;
          setIsRedirecting(true);
          // Small delay to ensure state updates before routing
          setTimeout(() => {
            router.replace(`/events/${event.slug}`);
          }, 100);
        };

        if (!session) {
          console.log("No session found");
          handleRedirect();
          return;
        }

        const data = JSON.parse(session);

        // Validation: Verify it matches current event and has valid quantities
        const hasValidQuantities =
          data.quantities &&
          Object.values(data.quantities).some((q: any) => q > 0);
        const isCurrentEvent = data.eventId === event.id;

        if (!isCurrentEvent || !hasValidQuantities) {
          console.log("Invalid session");
          localStorage.removeItem("booking_session"); // Clear invalid session
          handleRedirect();
          return;
        }

        if (mounted) {
          setSelectedQuantities(data.quantities);
          setSelectedLineupId(data.lineupId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading booking session:", error);
        localStorage.removeItem("booking_session"); // Clear potentially corrupted session
        if (mounted) {
          setIsRedirecting(true);
          router.replace(`/events/${event.slug}`);
        }
      }
    };

    if (loading && !isRedirecting) {
      loadBookingSession();
    }

    return () => {
      mounted = false;
    };
  }, [
    event.id,
    event.slug,
    router,
    loading,
    isRedirecting,
    authLoading,
    isAuthenticated,
  ]);

  // Warning on page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle browser back button
  useEffect(() => {
    // Push state to create a trap
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (
        window.confirm(
          "Are you sure you want to leave? Your booking session will be lost."
        )
      ) {
        // User confirmed they want to leave
        localStorage.removeItem("booking_session");
        router.push(`/events/${event.slug}`);
      } else {
        // User cancelled, they want to stay.
        // Restore the trap
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [event.slug, router]);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to leave? Your booking session will be lost."
      )
    ) {
      localStorage.removeItem("booking_session");
      router.push(`/events/${event.slug}`);
    }
  };

  // Find the selected lineup and getting its ticket types
  // We use the selectedLineupId from the loaded session to ensure we get the correct specific tickets
  const selectedLineup = event.lineups?.find((l) => l.id === selectedLineupId);
  const allTicketTypes = selectedLineup?.ticketTypes || [];

  const selectedTickets = allTicketTypes
    .filter((ticket) => selectedQuantities[ticket.id] > 0)
    .map((ticket) => ({
      ...ticket,
      quantity: selectedQuantities[ticket.id],
    }));

  const calculateTotal = () => {
    const ticketTotal = selectedTickets.reduce((sum, ticket) => {
      return sum + ticket.price * ticket.quantity;
    }, 0);

    return { ticketTotal, total: ticketTotal };
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(1);
    }, 2000);
  };

  const { ticketTotal, total } = calculateTotal();
  const totalQuantity = selectedTickets.reduce((sum, t) => sum + t.quantity, 0);

  const steps = ["Payment", "Confirmation"];

  if (loading || isRedirecting || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="mx-auto container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleExit}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Event
            </button>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-32">
        <div className="mx-auto container">
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
                            src={event.thumbnail.url || "/placeholder.svg"}
                            alt={event.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-serif text-lg">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
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
                          <span>
                            {formatDateTime(event.nearest_lineup.start_date)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tickets</span>
                          <span>{totalQuantity}</span>
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
                          src={event.thumbnail.url || "/placeholder.svg"}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(
                          event.lineups.find((l) => l.id === selectedLineupId)
                            ?.start_date || ""
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formatTime(
                          event.lineups.find((l) => l.id === selectedLineupId)
                            ?.start_date || ""
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {
                          event.lineups.find((l) => l.id === selectedLineupId)
                            ?.addressable.address
                        }
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6 border-b border-border space-y-4">
                    {selectedTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          <Ticket className="w-4 h-4 inline mr-2" />
                          {ticket.quantity}x {ticket.name}
                        </span>
                        <span>
                          {event.currency}{" "}
                          {(ticket.price * ticket.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-border mt-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Subtotal</span>
                        <span>
                          {event.currency} {ticketTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="p-6 border-b border-border">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>
                        {event.currency} {total.toLocaleString()}
                      </span>
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
                          PAY {event.currency} {total.toLocaleString()}
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

"use client";

// import logger from "@/lib/logger/logger";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { IEvent, IOrder } from "@/types";
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
import BookingHead from "./BookingHead";
import ProgressStep from "./ProgressStep";
import BookingEventInfo from "./BookingEventInfo";
import { Button } from "../ui/button";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/api/stripe";
import { createOrder, checkPromoCode } from "@/lib/api/order";
import { toast } from "sonner";
import logger from "@/lib/logger/logger";

interface BookingProps {
  event: IEvent;
}

export default function BookingComponent({ event }: BookingProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    id: string;
    code: string;
    discountAmount: number;
  } | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const [step, setStep] = useState<"stripe" | "paypal">("stripe");
  const stripe = useStripe();
  const elements = useElements();

  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >({});
  const [selectedLineupId, setSelectedLineupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
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
          logger.log("No session found");
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
          logger.log("Invalid session");
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
    logger.log("selectedTickets", selectedLineup);
    const ticketTotal = selectedTickets.reduce((sum, ticket) => {
      return sum + ticket.price * ticket.quantity;
    }, 0);

    const discount = appliedPromo ? appliedPromo.discountAmount : 0;
    const total = Math.max(0, ticketTotal - discount);

    return { ticketTotal, total, discount };
  };

  const { ticketTotal, total, discount } = calculateTotal();
  const totalQuantity = selectedTickets.reduce((sum, t) => sum + t.quantity, 0);

  const steps = ["Payment", "Confirmation"];

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setPromoLoading(true);
    try {
      const response = await checkPromoCode({
        promo_code: promoCode,
        event_id: event.id,
      });

      const responseData = response.data.data || response.data;

      // Structure: { is_valid: boolean, reason: string, promo_code: { id, code, discount_value, ... } }
      if (responseData.is_valid) {
        const { id, code, discount_value, discount_type } =
          responseData.promo_code;

        logger.log("Promo code applied!", responseData);
        let calculatedDiscountAmount = 0;
        if (discount_type === "percentage") {
          calculatedDiscountAmount =
            ticketTotal * (Number(discount_value) / 100);
        } else if (discount_type === "fixed") {
          calculatedDiscountAmount = Number(discount_value);
        }

        setAppliedPromo({
          id,
          code,
          discountAmount: calculatedDiscountAmount,
        });
        toast.success("Promo code applied!");
      } else {
        toast.error(responseData.reason || "Invalid promo code");
        setAppliedPromo(null);
      }
    } catch (error: any) {
      console.error("Promo check failed:", error);
      const msg = error.response?.data?.message || "Invalid promo code";
      toast.error(msg);
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const handlePay = async () => {
    logger.log({
      promo_code_id: appliedPromo?.id,
      items: selectedTickets.map((item) => ({
        ticket_type_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      })),
      sub_total: ticketTotal,
      total_amount: total,
      discount_amount: discount,
      payment_method: step,
      event_lineup_id: selectedLineupId,
      currency: event.currency,
      source: "web",
    });
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    let stripeToken: string | undefined;

    // Only generate token for Stripe/card
    if (step === "stripe") {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage("Card details missing");
        setIsProcessing(false);
        return;
      }

      const { error, token } = await stripe.createToken(cardElement);
      if (error || !token) {
        setErrorMessage(error?.message || "Invalid card");
        setIsProcessing(false);
        return;
      }
      stripeToken = token.id;
    }

    let cancel_redirect_url: string | undefined;
    let success_redirect_url: string | undefined;

    // safe event_slug usage
    const event_slug = event.slug;

    if (step === "paypal") {
      cancel_redirect_url = `${window.location.origin}${window.location.pathname}`;
      success_redirect_url = `${window.location.origin}/events/${event_slug}?success=true`;
    }

    const payload: any = {
      promo_code_id: appliedPromo?.id,
      items: selectedTickets.map((item) => ({
        ticket_type_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      })),
      sub_total: ticketTotal,
      total_amount: total,
      discount_amount: discount,
      payment_method: step,
      stripe_token: stripeToken,
      event_lineup_id: selectedLineupId,
      currency: event.currency,
      source: "web",
      cancel_redirect_url,
      success_redirect_url,
    };

    try {
      // Use imported createOrder
      const result = await createOrder(payload);
      logger.info("Order created:", result);

      // Handle backend response
      const { payment_method, payment_response } =
        result.data.data || result.data || {};

      // PayPal → redirect to PayPal
      if (payment_method === "paypal" && payment_response?.redirect_url) {
        window.location.href = payment_response.redirect_url;
        return;
      }

      // Stripe/card or fallback → show toast first
      toast.success("Payment successful! Redirecting...");

      localStorage.removeItem("booking_session");

      setTimeout(() => {
        router.push(`/events/${event.slug}`);
      }, 1500); // wait 1.5 seconds to show toast
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Order creation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <BookingHead handleExit={handleExit} />

      <div className="py-20 bg-card">
        <div className="mx-auto container">
          {/* Progress Steps */}
          <ProgressStep steps={steps} currentStep={currentStep} />

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
                      {/* Payment Method */}
                      <div className="p-6 border border-border">
                        <h3 className="font-medium mb-4 flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className={`${
                              step === "stripe"
                                ? "bg-muted border-primary/30"
                                : ""
                            } p-6 h-auto border-2 rounded-xl flex flex-col items-center justify-center gap-3`}
                            onClick={() => setStep("stripe")}
                          >
                            <Image
                              src="/payment/stripe.webp"
                              alt="Stripe"
                              width={100}
                              height={50}
                            />
                          </Button>

                          <Button
                            variant="outline"
                            className={`${
                              step === "paypal"
                                ? "bg-muted border-primary/30"
                                : ""
                            } p-6 h-auto border-2 rounded-xl flex flex-col items-center justify-center gap-3`}
                            onClick={() => setStep("paypal")}
                          >
                            <Image
                              src="/payment/paypal.webp"
                              alt="PayPal"
                              width={100}
                              height={50}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Card Form */}
                    {step === "stripe" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold">Enter Card Details</h5>
                        </div>
                        <div>
                          <div className="p-3 border rounded-lg">
                            <CardElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#fff",
                                    "::placeholder": { color: "#9ca3af" },
                                  },
                                },
                              }}
                            />
                          </div>

                          {errorMessage && (
                            <p className="text-red-600 text-sm font-medium mt-2">
                              {errorMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* PayPal Info */}
                    {step === "paypal" && (
                      <div className="p-4 border-2 border-dashed rounded-xl text-center text-muted-foreground mt-4">
                        You will be redirected to PayPal to complete your
                        payment.
                      </div>
                    )}
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
                            src={event?.thumbnail?.url || "/placeholder.svg"}
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
                            {formatDateTime(event?.nearest_lineup?.start_date)}
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

              {/* Terms */}
            </div>

            {/* Order Summary Sidebar */}
            {currentStep < 1 && (
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-card border border-border">
                  {/* Event Info */}
                  <BookingEventInfo
                    event={event}
                    selectedLineupId={selectedLineupId}
                  />

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

                  {/* Promo Code */}
                  <div className="p-6 border-b border-border space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={!!appliedPromo || promoLoading}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm outline-none focus:border-foreground transition-colors disabled:opacity-50"
                      />
                      {appliedPromo ? (
                        <button
                          onClick={removePromo}
                          className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyPromo}
                          disabled={!promoCode || promoLoading}
                          className="px-4 py-2 bg-foreground text-background hover:opacity-90 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {promoLoading ? "..." : "Apply"}
                        </button>
                      )}
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-sm text-green-500">
                        <span>{appliedPromo.code}</span>
                        <span>
                          - {event.currency}{" "}
                          {appliedPromo.discountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
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
                          handlePay();
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

import { ArrowLeft, Lock } from "lucide-react";
import React from "react";

interface BookingHeadProps {
  handleExit: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const BookingHead = ({ handleExit }: BookingHeadProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="mx-auto container py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => handleExit(e)}
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
  );
};

export default BookingHead;

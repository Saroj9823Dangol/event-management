import { Check } from "lucide-react";
import React from "react";

const BookingTermsConditions = () => {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div className="w-5 h-5 border border-border mt-0.5 flex items-center justify-center">
        <Check className="w-3 h-3 opacity-0 hover:opacity-50 transition-opacity" />
      </div>
      <span className="text-sm text-muted-foreground">
        I agree to the{" "}
        <a href="#" className="text-foreground hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-foreground hover:underline">
          Privacy Policy
        </a>
      </span>
    </label>
  );
};

export default BookingTermsConditions;

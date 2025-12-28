"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  className?: string;
  error?: string;
  placeholder?: string;
}

export function CustomPhoneInput({
  value,
  onChange,
  className,
  error,
  placeholder = "Enter phone number",
}: PhoneInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <PhoneInput
        international
        defaultCountry="NP"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        /**
         * We override the default input component with Shadcn's Input.
         * We need to ref forward manually or use a wrapper if specific props mismatch,
         * but standard Input usually works well.
         */
        inputComponent={Input as any}
        /**
         * Styling the container (the flag + input wrapper).
         * react-phone-number-input adds its own structure: .PhoneInput
         * We want to make the country selector blend in.
         */
        className={cn(
          "flex gap-2",
          // Global CSS tweaks might be needed for .PhoneInputCountry to look right in dark mode
          "[&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountry]:items-center",
          "[&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:text-foreground",
          "[&_.PhoneInputInput]:bg-white/5 [&_.PhoneInputInput]:border-white/10"
        )}
        /**
         * We styling the input field itself via the component prop,
         * but we used 'inputComponent={Input}' so we pass classes to it via smart logic or global css override?
         * Actually, 'numberInputProps' sends props to the input.
         */
        numberInputProps={{
          className: cn(
            "bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-accent",
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          ),
        }}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

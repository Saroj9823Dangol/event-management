"use client";

import { useState } from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CustomPhoneInput } from "@/components/auth/phone-input";
import { authApi } from "@/lib/api/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

type Step = "PHONE" | "OTP";

export function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  onLoginSuccess,
}: LoginModalProps) {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setStep("PHONE");
    setPhone("");
    setOtp("");
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 5) {
      // Basic validation
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      await authApi.sendOtp({ phone });
      setStep("OTP");
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      console.error(error);

      const errorData = error.response?.data;
      let errorMessage = "Invalid code. Please try again.";

      if (errorData?.errors?.[0]?.detail) {
        errorMessage = errorData.errors[0].detail;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login({ phone, otp });
      const { user, token } = response.data.data;
      toast.success(response.data.message || "Logged in successfully!");
      onLoginSuccess(user, token);
      handleClose();
    } catch (error: any) {
      console.error(error);

      const errorData = error.response?.data;
      let errorMessage = "Login failed. Please try again.";

      if (errorData?.errors?.[0]?.detail) {
        errorMessage = errorData.errors[0].detail;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass-card text-white border-white/10 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-serif text-white">
            {step === "PHONE" ? "Login" : "Verify OTP"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {step === "PHONE"
              ? "Enter your phone number to continue."
              : `Enter the 6-digit code sent to ${formatPhoneNumber(phone)}`}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2 space-y-4">
          {step === "PHONE" ? (
            <div className="space-y-4">
              <CustomPhoneInput
                value={phone}
                onChange={(val) => setPhone(val || "")}
                placeholder="Enter valid phone number"
              />
              <Button
                onClick={handleSendOtp}
                className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-wide"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    handleClose();
                    onRegisterClick();
                  }}
                  className="text-accent hover:text-accent/80 hover:underline font-medium ml-1"
                >
                  Register
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex flex-col items-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <InputOTPSlot
                    index={1}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <InputOTPSlot
                    index={2}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <InputOTPSlot
                    index={3}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <InputOTPSlot
                    index={4}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <InputOTPSlot
                    index={5}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </InputOTPGroup>
              </InputOTP>
              <div className="w-full space-y-2 pt-4">
                <Button
                  onClick={handleLogin}
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-wide"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & Login
                </Button>
                <Button
                  onClick={() => setStep("PHONE")}
                  className="w-full text-white/60 hover:text-white"
                  disabled={loading}
                >
                  Back to Phone
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CustomPhoneInput } from "@/components/auth/phone-input";
import { authApi } from "@/lib/api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterSuccess: (user: any, token: string) => void;
}

type Step = "PHONE" | "DETAILS";

const detailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

export function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterSuccess,
}: RegisterModalProps) {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: "",
      email: "",
      otp: "",
    },
  });

  const resetState = () => {
    setStep("PHONE");
    setPhone("");
    setLoading(false);
    form.reset();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 5) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      await authApi.sendOtp({ phone });
      setStep("DETAILS");
      toast.success("OTP sent. Please complete your registration.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data: DetailsFormValues) => {
    setLoading(true);
    try {
      const response = await authApi.register({
        phone,
        otp: data.otp,
        name: data.name,
        email: data.email,
      });

      const { user, token } = response.data.data;
      toast.success(response.data.message || "Registered successfully!");
      onRegisterSuccess(user, token);
      handleClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass-card text-white border-white/10 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-serif text-white">
            {step === "PHONE" ? "Register" : "Complete Registration"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {step === "PHONE"
              ? "Create a new account."
              : `Verify your phone ${formatPhoneNumber(
                  phone
                )} and enter details.`}
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
                Continue
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    handleClose();
                    onLoginClick();
                  }}
                  className="text-accent hover:text-accent/80 hover:underline font-medium ml-1"
                >
                  Login
                </button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onRegister)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="text-white/80">OTP Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
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
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2 pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-wide"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep("PHONE")}
                    className="w-full text-white/60 hover:text-white bg-transparent hover:bg-white/5"
                    disabled={loading}
                  >
                    Back to Phone
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

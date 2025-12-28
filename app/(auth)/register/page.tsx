"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-2xl border border-white/10"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif mb-2">Create Account</h1>
        <p className="text-white/60 text-sm">Start your journey with UCNCEE</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:bg-accent/5 transition-all"
            />
            <User className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:bg-accent/5 transition-all"
            />
            <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:bg-accent/5 transition-all"
            />
            <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
          </div>
        </div>

        <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase rounded-lg hover:bg-accent hover:text-white transition-all duration-300 shadow-lg shadow-white/10 mt-6 group flex items-center justify-center gap-2">
          Create Account
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-white/40 max-w-xs mx-auto">
          By registering, you agree to our{" "}
          <Link href="/legal/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
}

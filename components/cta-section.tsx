"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="relative overflow-hidden">
        {/* Background Image - static */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Content with only fade and slide animations */}
        <div className="relative py-24 lg:py-32 px-8 lg:px-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-white/60 block mb-6"
          >
            START YOUR JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 max-w-4xl mx-auto text-balance"
          >
            Every Moment Deserves to Be Extraordinary
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Join millions of experience seekers who discover their next
            unforgettable moment on UCNCEE.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/events"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-all duration-300"
            >
              EXPLORE EVENTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/30 text-sm tracking-wider hover:bg-white/10 transition-colors"
            >
              FOR BUSINESSES
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

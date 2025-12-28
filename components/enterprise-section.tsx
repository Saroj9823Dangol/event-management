"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function EnterpriseSection() {
  return (
    <section className="py-20 bg-white text-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 border border-black/20 rounded-full text-sm font-medium tracking-wide mb-6">
                FOR ORGANIZERS
              </span>
              <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[0.9]">
                Whispering Willow
              </h2>
              <p className="text-xl text-black/60 max-w-xl leading-relaxed">
                The premium suite for companies to host, manage, and scale their
                events?. From intimate gatherings to global summits.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                "Custom branded event pages",
                "Advanced analytics dashboard",
                "Seamless multi-tier ticketing",
                "Dedicated 24/7 priority support",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-lg"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  {item}
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-10 py-5 bg-black text-white font-medium hover:bg-black/80 transition-colors rounded-sm mt-4"
            >
              EXPLORE ENTERPRISE SOLUTIONS
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] lg:h-[700px] w-full"
          >
            <div className="absolute inset-0 bg-gray-100 -rotate-3 rounded-3xl" />
            <div className="absolute inset-0 bg-gray-200 rotate-2 rounded-3xl" />
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
                alt="Corporate Event"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-4xl font-serif">"Seamless execution."</p>
                <p className="mt-2 opacity-80">- TechGiant Corp.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { QrCode, Smartphone, Star } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";

export function DownloadAppSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl relative">
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium tracking-wide">
                <Smartphone className="w-4 h-4" />
                <span>Available now on iOS & Android</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1]">
                  The Entire City in <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                    Your Pocket
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  Get exclusive access to pre-sales, real-time event updates,
                  and digital ticketing. Experience the future of event
                  discovery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <FaApple className="w-6 h-6" />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-medium opacity-60 uppercase tracking-wider">
                      Download on the
                    </div>
                    <div className="text-lg">App Store</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>

                <button className="group px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                  <div className="w-6 h-6 relative">
                    {/* Google Play Icon Replacement SVG */}
                    <FaGooglePlay className="w-6 h-6" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-medium opacity-60 uppercase tracking-wider">
                      Get it on
                    </div>
                    <div className="text-lg">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium ml-2">4.9/5</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div>1M+ Downloads</div>
              </div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Abstract blurred shapes behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-accent/20 to-transparent blur-3xl -z-10 rounded-full" />

              <div className="relative mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm z-10 group">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-8 w-full flex justify-between items-center px-6 pt-2 text-white text-[10px] font-medium z-20 relative">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 bg-white rounded-sm" />
                    </div>
                  </div>

                  {/* App UI Header */}
                  <div className="px-6 pt-8 pb-4">
                    <div className="text-white/50 text-xs uppercase tracking-widest mb-1">
                      Discover
                    </div>
                    <div className="text-white text-2xl font-serif">
                      Trending Now
                    </div>
                  </div>

                  {/* Scrollable Cards Mockup */}
                  <div className="space-y-4 px-4 overflow-hidden mask-image-b-0">
                    {/* Card 1 */}
                    <div className="aspect-[4/5] bg-white/5 rounded-2xl border border-white/10 p-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="bg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">
                          LIVE
                        </div>
                        <div className="text-white font-bold text-lg leading-tight">
                          Neon Nights Festival
                        </div>
                        <div className="text-white/60 text-xs mt-1">
                          Starting in 2h 15m
                        </div>
                      </div>
                      {/* Abstract Image Placeholder */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-black to-black opacity-80" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/30 blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>

                    {/* Card 2 Partial */}
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black" />
                    </div>
                  </div>

                  {/* Floating Ticket Element */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-8 right-[-20px] w-48 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl z-30 transform rotate-[-5deg]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <QrCode className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/60 uppercase">
                          Ticket #0192
                        </div>
                        <div className="text-white font-bold text-xs">
                          VIP Access
                        </div>
                      </div>
                    </div>
                    <div className="h-8 w-full bg-white/90 rounded opacity-20" />
                  </motion.div>
                </div>

                {/* Notion Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30" />
              </div>

              {/* Reflection */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/50 blur-xl rounded-[100%]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

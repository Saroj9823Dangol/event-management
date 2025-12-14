"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, Play } from "lucide-react";

export function RecommendedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Background Parallax */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[15vw] font-serif font-black text-white/5 opacity-50 select-none pointer-events-none"
      >
        FOR YOU · RECOMMENDED · CURATED
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-4 lg:col-start-2 space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                AI Curated Selection
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
                Electric <br />
                <span className="italic text-white/50">Soul</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed"
            >
              Based on your recent interests in Jazz and Electronic music, we've
              found the perfect fusion event. Experience the soul of the city.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
                <Play className="w-4 h-4 fill-current" />
              </div>
              View Details
            </motion.button>
          </div>

          {/* Floaty Image */}
          <motion.div
            style={{ y }}
            className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative aspect-[4/5] lg:aspect-[3/4]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20 blur-3xl opacity-60" />
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
              alt="Recommended Event"
              fill
              className="object-cover rounded-lg shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-12 -left-12 z-20 bg-background p-6 rounded-lg shadow-xl hidden md:block border border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/20 border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="text-accent">128+</span> friends went
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

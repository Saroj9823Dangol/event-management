"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/elegant-orchestra-concert-hall-with-warm-amber-lig.jpg"
          alt="Concert hall"
          className="w-full h-full object-cover img-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-24 pt-40 px-6 lg:px-12">
        <div className="00px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-6">
              Curated Experiences
            </p>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] mb-8 text-balance">
              Discover moments worth living
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed">
              An intelligently curated collection of extraordinary events,
              handpicked for those who seek the exceptional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#events"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground text-sm tracking-wide hover:bg-foreground/5 transition-colors"
              >
                View Collections
              </a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="00px] mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "12,000+", label: "Live Events" },
              { value: "98%", label: "Satisfaction" },
              { value: "50+", label: "Cities" },
              { value: "2M+", label: "Attendees" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-serif text-2xl md:text-3xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "Priority access to sold-out events",
  "Exclusive member-only experiences",
  "Complimentary upgrades when available",
  "Dedicated concierge service",
  "Early access to ticket releases",
  "Curated recommendations by experts",
];

export function ExclusiveAccess() {
  return (
    <section
      id="exclusive"
      className="py-24 md:py-32 bg-foreground text-background"
    >
      <div className="00px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] text-background/60 uppercase mb-4">
              Membership
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-8">
              Elevate your experience
            </h2>
            <p className="text-lg text-background/70 mb-12 leading-relaxed max-w-lg">
              Join our exclusive membership program and unlock a world of
              premium benefits, priority access, and personalized experiences
              curated just for you.
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-5 h-5 flex items-center justify-center border border-background/30">
                    <Check className="w-3 h-3 text-background" />
                  </div>
                  <span className="text-background/80">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-background text-foreground text-sm tracking-wide hover:bg-background/90 transition-colors"
              >
                Join Now — $199/year
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/30 text-background text-sm tracking-wide hover:bg-background/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/elegant-vip-lounge-champagne-sophisticated-members.jpg"
                alt="Exclusive membership"
                className="w-full h-full object-cover img-editorial"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-background text-foreground p-8 max-w-xs">
              <p className="text-4xl font-serif mb-2">15,000+</p>
              <p className="text-sm text-muted-foreground">
                Members enjoying exclusive benefits worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

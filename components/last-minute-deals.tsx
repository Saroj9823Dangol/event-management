"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Tag, ArrowRight } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Midnight Jazz Club",
    discount: "-40%",
    price: "$35",
    originalPrice: "$60",
    timeLeft: "04:23:12",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Immersive Theatre Night",
    discount: "-25%",
    price: "$85",
    originalPrice: "$120",
    timeLeft: "02:15:45",
    image:
      "https://images.unsplash.com/photo-1503095392269-2d6192b645e3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Rooftop Cinema",
    discount: "-50%",
    price: "$15",
    originalPrice: "$30",
    timeLeft: "06:45:30",
    image:
      "https://images.unsplash.com/photo-1517604931442-7105376f7c3c?q=80&w=2000&auto=format&fit=crop",
  },
];

export function LastMinuteDeals() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-background border-t border-border/30"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="flex items-center gap-2 text-red-500 font-medium tracking-wider uppercase mb-2">
              <Clock className="w-4 h-4 animate-pulse" /> Flash Offers
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Last-Minute Deals
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest border-b border-white pb-1 hover:text-muted-foreground transition-colors max-w-max"
          >
            VIEW ALL OFFERS
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-sm"
            >
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 font-bold text-sm">
                {deal.discount}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 pt-12">
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono mb-2">
                  <Clock className="w-3 h-3" /> Ends in {deal.timeLeft}
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-red-500 transition-colors">
                  {deal.title}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-medium text-white">
                      {deal.price}
                    </span>
                    <span className="text-sm text-white/50 line-through">
                      {deal.originalPrice}
                    </span>
                  </div>
                  <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

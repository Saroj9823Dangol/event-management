"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Festival Echo Dot",
    brand: "SoundWave",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Lumina Glow Stick",
    brand: "NeonLife",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1470229722913-7ea05107f5c3?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "VIP Comfort Kit",
    brand: "EventElite",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1544367563-12123d832d34?q=80&w=2070&auto=format&fit=crop",
  },
];

export function MarketplaceSection() {
  return (
    <section className="py-24 bg-background relative border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block"
          >
            Official Merchandise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            UCNCEE Marketplace
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Exclusive gear, collectibles, and essentials from premier event
            brands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-secondary/20 p-4 rounded-sm"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white/90">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-serif">{product.name}</h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium">{product.price}</span>
                  <div className="flex text-yellow-500 text-xs mt-1">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-border hover:bg-secondary hover:border-transparent transition-all"
          >
            VISIT FULL MARKETPLACE
          </motion.button>
        </div>
      </div>
    </section>
  );
}

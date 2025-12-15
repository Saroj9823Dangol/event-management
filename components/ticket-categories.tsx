"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Regular",
    price: "$49",
    description: "Essential access for the casual enthusiast.",
    features: ["General Entry", "Standing Area", "Standard Support"],
    recommended: false,
  },
  {
    name: "Early Bird",
    price: "$39",
    description: "Limited availability for the proactive planner.",
    features: ["Priority Entry", "Standing Area", "Save 20% on Merchandise"],
    recommended: true,
  },
  {
    name: "VIP / VVIP",
    price: "$149",
    description: "The ultimate luxury experience.",
    features: [
      "Fast Track Entry",
      "VIP Lounge Access",
      "Complimentary Drinks",
      "Meet & Greet Options",
    ],
    recommended: false,
  },
  {
    name: "Group",
    price: "$35/p",
    description: "Gather your squad for a discounted rate (5+).",
    features: [
      "General Entry",
      "Private Booth Reservation",
      "Group Photo Package",
    ],
    recommended: false,
  },
];

export function TicketCategories() {
  return (
    <section className="py-20 bg-background relative">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Choose Your Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect package tailored to your preferences. From
            standard entry to exclusive VVIP treatment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 border ${
                tier.recommended
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card"
              } flex flex-col`}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 text-xs font-bold tracking-widest uppercase shadow-lg">
                  Best Value
                </div>
              )}

              <h3 className="text-xl font-serif mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                {tier.description}
              </p>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      className={`w-4 h-4 ${
                        tier.recommended
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 text-sm tracking-wide font-medium transition-colors ${
                  tier.recommended
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                }`}
              >
                SELECT {tier.name.toUpperCase()}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

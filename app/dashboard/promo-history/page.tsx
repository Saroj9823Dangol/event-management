"use client";

import { motion } from "framer-motion";
import { Copy, Check, Clock, Tag } from "lucide-react";
import { useState } from "react";

export default function PromoHistoryPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const promos = [
    {
      id: 1,
      code: "WELCOME20",
      description: "Welcome Discount - 20% Off First Purchase",
      status: "Used",
      dateUsed: "Dec 12, 2023",
      savings: "$45.00",
      type: "discount",
    },
    {
      id: 2,
      code: "VIP-EARLY",
      description: "Early Access Code for The Weeknd",
      status: "Expired",
      dateUsed: null,
      savings: "-",
      type: "access",
    },
    {
      id: 3,
      code: "SUMMER25",
      description: "Summer Festival Special",
      status: "Active",
      dateUsed: null,
      expiry: "Aug 30, 2025",
      savings: "25% OFF",
      type: "discount",
    },
  ];

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">
          Promo Codes & History
        </h2>
        <p className="text-muted-foreground">
          View your active codes and usage usage history.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4">
        {promos.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start gap-4 w-full md:w-auto">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 ${
                  promo.status === "Active"
                    ? "bg-accent/20 text-accent"
                    : "bg-white/5 text-muted-foreground"
                }`}
              >
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-mono font-bold text-lg tracking-wider">
                    {promo.code}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded ${
                      promo.status === "Active"
                        ? "bg-green-500/20 text-green-500"
                        : promo.status === "Used"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {promo.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {promo.description}
                </p>
                {promo.status === "Active" && (
                  <p className="text-xs text-accent mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Expires {promo.expiry}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              {promo.status === "Used" && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Total Saved
                  </p>
                  <p className="font-mono font-bold text-green-500">
                    {promo.savings}
                  </p>
                </div>
              )}

              {promo.status === "Active" ? (
                <button
                  onClick={() => handleCopy(promo.id, promo.code)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  {copiedId === promo.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedId === promo.id ? "Copied" : "Copy Code"}
                </button>
              ) : (
                <div className="font-mono text-sm text-muted-foreground">
                  {promo.dateUsed ? `Redeemed on ${promo.dateUsed}` : "Expired"}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

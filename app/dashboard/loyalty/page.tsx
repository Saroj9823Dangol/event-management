"use client";

import { motion } from "framer-motion";
import { Award, Crown, Star, Gift, ChevronRight } from "lucide-react";

export default function LoyaltyPage() {
  const tiers = [
    {
      name: "Silver",
      min: 0,
      benefits: ["Presale Access (12h)", "Birthday Gift"],
    },
    {
      name: "Gold",
      min: 1000,
      benefits: ["Presale Access (24h)", "5% Merch Discount", "Priority Entry"],
    },
    {
      name: "Platinum",
      min: 2500,
      benefits: [
        "Presale Access (48h)",
        "15% Merch Discount",
        "VIP Lounge Access",
        "Dedicated Support",
      ],
    },
  ];

  const currentPoints = 1450;
  const currentTierIndex = 1; // Gold
  const nextTierPoints = tiers[2].min;
  const progress =
    ((currentPoints - tiers[1].min) / (tiers[2].min - tiers[1].min)) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">
            Loyalty Program
          </h2>
          <p className="text-muted-foreground">
            Unlock exclusive rewards and VIP experiences.
          </p>
        </div>
      </div>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-accent/20 to-black border border-accent/30 p-8 relative overflow-hidden flex flex-col justify-between h-64"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Crown className="w-32 h-32" />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
              Current Status
            </p>
            <h3 className="text-4xl font-serif font-bold text-white mb-1">
              Gold Member
            </h3>
            <p className="text-muted-foreground text-sm">
              Valid until Dec 31, 2025
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between text-sm mb-2">
              <span>{currentPoints} PTS</span>
              <span className="text-muted-foreground">
                {nextTierPoints - currentPoints} pts to Platinum
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Points Overview */}
        <div className="bg-white/5 border border-white/10 p-8 flex flex-col justify-center h-64">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Available Points
              </p>
              <p className="text-3xl font-bold font-mono">1,450</p>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Redeem Rewards
            </button>
            <button className="w-full py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
              History
            </button>
          </div>
        </div>
      </div>

      {/* Tiers Breakdown */}
      <div>
        <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
          Membership Tiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => {
            const isActive = index === currentTierIndex;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 border ${
                  isActive
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5"
                } relative`}
              >
                {isActive && (
                  <div className="absolute top-4 right-4 text-accent">
                    <Award className="w-6 h-6" />
                  </div>
                )}
                <h4 className="font-serif text-xl font-bold mb-1">
                  {tier.name}
                </h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
                  {tier.min} Points
                </p>

                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <Star className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Rewards */}
      <div className="pt-8 border-t border-white/10">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
          <Gift className="w-5 h-5 text-accent" />
          Available Rewards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="h-32 bg-black/40 mb-4 flex items-center justify-center border border-white/5">
              <span className="font-serif text-2xl font-bold text-white/20">
                MERCH
              </span>
            </div>
            <h4 className="font-bold mb-1">Official Tour T-Shirt</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Redeem for 500 points
            </p>
            <div className="flex items-center text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Redeem Now <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="h-32 bg-black/40 mb-4 flex items-center justify-center border border-white/5">
              <span className="font-serif text-2xl font-bold text-white/20">
                DRINKS
              </span>
            </div>
            <h4 className="font-bold mb-1">Free Drink Voucher</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Redeem for 200 points
            </p>
            <div className="flex items-center text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Redeem Now <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

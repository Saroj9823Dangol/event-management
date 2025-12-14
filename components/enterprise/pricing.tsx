"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "For small events and emerging organizers",
    price: 99,
    features: [
      "Up to 500 tickets per event",
      "Basic analytics dashboard",
      "Email support",
      "Standard check-in app",
      "2% transaction fee",
    ],
  },
  {
    name: "Professional",
    description: "For growing organizations and regular events",
    price: 299,
    popular: true,
    features: [
      "Up to 5,000 tickets per event",
      "Advanced analytics & reports",
      "Priority support",
      "Custom branding",
      "Marketing tools",
      "1.5% transaction fee",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large-scale operations and venues",
    price: null,
    features: [
      "Unlimited tickets",
      "Real-time analytics",
      "Dedicated account manager",
      "White-label solution",
      "Custom integrations",
      "Negotiated rates",
      "SLA guarantee",
      "On-site support",
    ],
  },
];

export function EnterprisePricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 lg:py-32">
      <div className="00px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">
            PRICING
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Plans That Scale With You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include our core
            platform features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={annual ? "text-foreground" : "text-muted-foreground"}
            >
              Annual
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-7 bg-muted rounded-full transition-colors"
            >
              <motion.div
                animate={{ x: annual ? 0 : 28 }}
                className="absolute top-1 left-1 w-5 h-5 bg-accent rounded-full"
              />
            </button>
            <span
              className={!annual ? "text-foreground" : "text-muted-foreground"}
            >
              Monthly
            </span>
            {annual && (
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 border ${
                plan.popular ? "border-accent bg-accent/5" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs tracking-wider">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-xl font-serif mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              <div className="mb-8">
                {plan.price ? (
                  <>
                    <span className="text-4xl font-serif">
                      ${annual ? plan.price : Math.round(plan.price * 1.25)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </>
                ) : (
                  <span className="text-4xl font-serif">Custom</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.price ? "/enterprise/signup" : "/enterprise/contact"}
                className={`block w-full py-4 text-center text-sm tracking-wider transition-colors ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-white text-black hover:bg-accent hover:text-white"
                }`}
              >
                {plan.price ? "GET STARTED" : "CONTACT SALES"}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <Link
            href="/enterprise/faq"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Have questions? Read our FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}

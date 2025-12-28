"use client"

import { motion } from "framer-motion"
import { BarChart3, Users, Ticket, Megaphone, Shield, Zap, Globe, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Ticket,
    title: "Advanced Ticketing",
    description: "Dynamic pricing, tiered seating, group discounts, and real-time inventory management.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Live sales dashboards, demographic insights, and predictive attendance forecasting.",
  },
  {
    icon: Megaphone,
    title: "Marketing Suite",
    description: "Email campaigns, social integration, influencer tracking, and automated promotions.",
  },
  {
    icon: Users,
    title: "CRM & Audience",
    description: "Build relationships with attendees through personalized communication and loyalty programs.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "PCI-compliant processing, fraud detection, and flexible payout schedules.",
  },
  {
    icon: Zap,
    title: "Fast Check-In",
    description: "QR code scanning, NFC wristbands, and facial recognition for seamless entry.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Reach global audiences with localized content, currencies, and payment methods.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated account managers and round-the-clock technical assistance.",
  },
]

export function EnterpriseFeatures() {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">POWERFUL FEATURES</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for event professionals who demand excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 bg-background border border-border hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-serif mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

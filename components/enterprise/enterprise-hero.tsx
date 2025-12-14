"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function EnterpriseHero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs tracking-wider mb-6">
              WHISPERING WILLOW ENTERPRISE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
              Transform How You Host & Manage Events
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              The all-in-one platform for event organizers. From intimate gatherings to stadium shows, we provide the
              tools to create unforgettable experiences.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/enterprise/demo"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                REQUEST DEMO
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-3 px-8 py-4 border border-border text-sm tracking-wider hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" />
                WATCH VIDEO
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "50K+", label: "Events Hosted" },
                { value: "12M+", label: "Tickets Sold" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-serif text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Dashboard Preview */}
              <div className="absolute inset-0 bg-card border border-border p-4 transform rotate-3 shadow-2xl">
                <div className="h-full bg-background/50 p-4">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-muted/50 w-3/4" />
                    <div className="h-32 bg-muted/30" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 bg-accent/20" />
                      <div className="h-16 bg-accent/20" />
                      <div className="h-16 bg-accent/20" />
                    </div>
                    <div className="h-24 bg-muted/30" />
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-card border border-border p-4 shadow-xl"
              >
                <div className="text-sm text-muted-foreground">Revenue Today</div>
                <div className="text-2xl font-serif">$47,829</div>
                <div className="text-xs text-green-500">+23% from yesterday</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card border border-border p-4 shadow-xl"
              >
                <div className="text-sm text-muted-foreground">Tickets Sold</div>
                <div className="text-2xl font-serif">8,432</div>
                <div className="text-xs text-accent">Live event in progress</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

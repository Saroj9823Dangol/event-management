"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Calendar, Phone } from "lucide-react"

export function EnterpriseCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-card overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Background Pattern */}
          <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">Ready to Elevate Your Events?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Join thousands of event organizers who trust EventSphere to deliver exceptional experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/enterprise/demo"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-black text-sm tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4" />
                SCHEDULE A DEMO
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/enterprise/contact"
                className="flex items-center justify-center gap-3 px-10 py-5 border border-border text-sm tracking-wider hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                TALK TO SALES
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <span className="text-sm">Trusted by:</span>
              {["Live Nation", "AEG", "Ticketmaster", "MSG", "Coachella"].map((brand) => (
                <span key={brand} className="text-sm font-medium">
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackgroundPattern } from "@/components/background-pattern";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <BackgroundPattern />
      <CinematicNav />

      <main className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              Have a question about an event? Need support? We're here to help
              you create unforgettable memories.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-2xl font-serif mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Email Us</p>
                      <p className="text-white/60 text-sm mb-1">
                        General Inquiries
                      </p>
                      <a
                        href="mailto:hello@UCNCEE.com"
                        className="text-lg hover:text-accent transition-colors"
                      >
                        hello@UCNCEE.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Call Us</p>
                      <p className="text-white/60 text-sm mb-1">
                        Mon-Fri from 8am to 5pm
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="text-lg hover:text-accent transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Visit Us</p>
                      <p className="text-white/60 text-sm mb-1">Headquarters</p>
                      <p className="text-lg">
                        123 Event Horizon Blvd
                        <br />
                        Los Angeles, CA 90012
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-accent/5 border border-accent/10">
                <h4 className="font-bold mb-2">Partner with UCNCEE</h4>
                <p className="text-white/60 text-sm mb-4">
                  Interested in listing your events or becoming a venue partner?
                  We'd love to hear from you.
                </p>
                <a
                  href="#"
                  className="text-accent text-sm font-bold uppercase tracking-wider hover:text-white transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-accent focus:bg-accent/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-accent focus:bg-accent/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-accent focus:bg-accent/5 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    Subject
                  </label>
                  <select className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-accent focus:bg-accent/5 transition-all outline-none appearance-none">
                    <option>General Support</option>
                    <option>Ticket Inquiry</option>
                    <option>Partnership</option>
                    <option>Press</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-accent focus:bg-accent/5 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase rounded-lg hover:bg-accent hover:text-white transition-all duration-300 shadow-lg shadow-white/10 flex items-center justify-center gap-2 group">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

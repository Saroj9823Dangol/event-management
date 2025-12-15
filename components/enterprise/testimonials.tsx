"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "UCNCEE transformed how we manage our festival. The real-time analytics alone have increased our revenue by 40%.",
    author: "Sarah Chen",
    role: "Director of Operations",
    company: "Coachella",
    image: "/professional-woman-headshot.png",
  },
  {
    quote:
      "The seamless integration with our existing systems and the dedicated support team made the transition incredibly smooth.",
    author: "Marcus Johnson",
    role: "VP of Ticketing",
    company: "Live Nation",
    image: "/professional-man-headshot.png",
  },
  {
    quote:
      "We've seen a 60% reduction in check-in times and our attendee satisfaction scores are at an all-time high.",
    author: "Emma Rodriguez",
    role: "Event Manager",
    company: "Madison Square Garden",
    image: "/professional-woman-latina-headshot.jpg",
  },
];

export function EnterpriseTestimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Quote className="w-12 h-12 text-accent/30 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-serif mb-8 max-w-3xl mx-auto leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium">{testimonials[current].author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() =>
                setCurrent(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-2 border border-border hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 transition-colors ${
                    i === current ? "bg-accent" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % testimonials.length)
              }
              className="p-2 border border-border hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

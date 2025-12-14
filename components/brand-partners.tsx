"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Carnegie Hall", logo: "Carnegie Hall" },
  { name: "Lincoln Center", logo: "Lincoln Center" },
  { name: "MoMA", logo: "MoMA" },
  { name: "The Met", logo: "The Met" },
  { name: "Guggenheim", logo: "Guggenheim" },
  { name: "BAM", logo: "BAM" },
];

const testimonials = [
  {
    quote:
      "EventSphere has transformed how we connect with our audience. The platform's curation is unmatched.",
    author: "Sarah Chen",
    role: "Director of Programming",
    organization: "Lincoln Center",
  },
  {
    quote:
      "A truly premium experience. Our members consistently praise the quality of events they discover here.",
    author: "Michael Torres",
    role: "Membership Director",
    organization: "Carnegie Hall",
  },
];

export function BrandPartners() {
  return (
    <section id="partners" className="py-24 md:py-32 bg-background">
      <div className="mx-auto px-6 lg:px-12">
        {/* Partners */}
        <div className="text-center mb-24">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-12">
            Trusted By Leading Institutions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <span className="font-serif text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {partner.logo}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="border-t border-border pt-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <p className="text-foreground font-medium">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

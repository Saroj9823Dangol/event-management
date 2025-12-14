"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

const categories = ["All", "Music", "Art", "Theatre", "Culinary", "Sports"];

const events = [
  {
    id: 1,
    title: "Vienna Philharmonic",
    subtitle: "A Night of Mozart",
    date: "Jan 24, 2025",
    location: "Carnegie Hall, NYC",
    image: "/elegant-vienna-philharmonic-orchestra-performance-.jpg",
    category: "Music",
    price: "From $185",
  },
  {
    id: 2,
    title: "Contemporary Visions",
    subtitle: "Modern Art Exhibition",
    date: "Jan 15 - Mar 30",
    location: "MoMA, NYC",
    image: "/minimalist-modern-art-gallery-white-walls-contempo.jpg",
    category: "Art",
    price: "From $45",
  },
  {
    id: 3,
    title: "The Phantom Returns",
    subtitle: "Broadway Revival",
    date: "Feb 14, 2025",
    location: "Majestic Theatre",
    image: "/dramatic-broadway-theater-stage-with-chandelier-ph.jpg",
    category: "Theatre",
    price: "From $129",
  },
  {
    id: 4,
    title: "Chef's Table",
    subtitle: "A Culinary Journey",
    date: "Every Saturday",
    location: "Le Bernardin",
    image: "/elegant-fine-dining-restaurant-intimate-table-sett.jpg",
    category: "Culinary",
    price: "From $350",
  },
  {
    id: 5,
    title: "Jazz at Lincoln Center",
    subtitle: "Wynton Marsalis Quartet",
    date: "Feb 8, 2025",
    location: "Rose Theater",
    image: "/intimate-jazz-club-performance-warm-amber-lighting.jpg",
    category: "Music",
    price: "From $95",
  },
  {
    id: 6,
    title: "US Open Finals",
    subtitle: "Championship Weekend",
    date: "Sep 7-8, 2025",
    location: "Arthur Ashe Stadium",
    image: "/professional-tennis-court-us-open-stadium-dramatic.jpg",
    category: "Sports",
    price: "From $275",
  },
];

export function FeaturedEvents() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section id="events" className="py-24 md:py-32 px-6 lg:px-12 bg-background">
      <div className="00px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Featured
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
              Upcoming Events
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover img-editorial transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                {/* Price Tag */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm text-sm">
                  {event.price}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
                  {event.category}
                </p>
                <h3 className="font-serif text-2xl text-foreground mb-1 group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4">{event.subtitle}</p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm tracking-wide text-foreground link-underline"
          >
            View all events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

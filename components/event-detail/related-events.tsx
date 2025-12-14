"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

const relatedEvents = [
  {
    id: 10,
    title: "Taylor Swift - Eras Tour",
    date: "Aug 15, 2025",
    location: "Wembley Stadium",
    image: "/concert-crowd-hands-up-stage-lights-dramatic.jpg",
    price: 175,
  },
  {
    id: 11,
    title: "Ed Sheeran World Tour",
    date: "Sep 5, 2025",
    location: "O2 Arena",
    image: "/concert-crowd-aerial-view-dramatic-lights.jpg",
    price: 125,
  },
  {
    id: 12,
    title: "Coldplay - Music of the Spheres",
    date: "Jun 15, 2025",
    location: "MetLife Stadium",
    image: "/stadium-crowd-cheering-sports-night-game.jpg",
    price: 145,
  },
  {
    id: 13,
    title: "Adele Weekends",
    date: "Jul 1, 2025",
    location: "Las Vegas Residency",
    image: "/broadway-theater-stage-curtains-dramatic-lighting.jpg",
    price: 350,
  },
]

export function RelatedEvents() {
  return (
    <section className="px-6 lg:px-12 py-16 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-serif">You Might Also Like</h2>
        <Link
          href="/events"
          className="hidden md:flex items-center gap-2 text-sm tracking-wider hover:text-accent transition-colors"
        >
          VIEW ALL
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/events/${event.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden mb-4">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-lg mb-2 group-hover:text-accent transition-colors">{event.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
              <p className="mt-2">
                <span className="text-xs text-muted-foreground">From </span>
                <span className="font-medium">${event.price}</span>
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

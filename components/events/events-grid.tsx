"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, Share2, Clock, Star } from "lucide-react";
import logger from "@/lib/logger/logger";

const events = [
  {
    id: 1,
    title: "Beyoncé Renaissance Tour",
    category: "Concert",
    date: "Jul 29, 2025",
    time: "8:00 PM",
    location: "Wembley Stadium, London",
    image: "/beyonce-concert-stage-dramatic-lighting.jpg",
    price: 189,
    rating: 4.9,
    reviews: 2840,
    featured: true,
    soldOut: false,
  },
  {
    id: 2,
    title: "The Phantom of the Opera",
    category: "Theater",
    date: "Running Daily",
    time: "7:30 PM",
    location: "Her Majesty's Theatre, London",
    image: "/phantom-opera-chandelier-dramatic-theater.jpg",
    price: 79,
    rating: 4.8,
    reviews: 5621,
    featured: false,
    soldOut: false,
  },
  {
    id: 3,
    title: "Formula 1 Monaco Grand Prix",
    category: "Sports",
    date: "May 25, 2025",
    time: "2:00 PM",
    location: "Circuit de Monaco",
    image: "/f1-race-car-monaco-circuit-dramatic.jpg",
    price: 450,
    rating: 4.9,
    reviews: 1203,
    featured: true,
    soldOut: false,
  },
  {
    id: 4,
    title: "Dave Chappelle Live",
    category: "Comedy",
    date: "Aug 15, 2025",
    time: "9:00 PM",
    location: "Radio City Music Hall, NYC",
    image: "/comedy-stage-spotlight-microphone-dramatic.jpg",
    price: 125,
    rating: 4.7,
    reviews: 892,
    featured: false,
    soldOut: false,
  },
  {
    id: 5,
    title: "Electric Daisy Carnival",
    category: "Festival",
    date: "Jun 20-22, 2025",
    time: "All Day",
    location: "Las Vegas Motor Speedway",
    image: "/edc-festival-colorful-lights-night-sky.jpg",
    price: 299,
    rating: 4.8,
    reviews: 4521,
    featured: false,
    soldOut: true,
  },
  {
    id: 6,
    title: "Hamilton",
    category: "Theater",
    date: "Now Playing",
    time: "8:00 PM",
    location: "Richard Rodgers Theatre, NYC",
    image: "/broadway-theater-stage-curtains-dramatic-lighting.jpg",
    price: 199,
    rating: 4.9,
    reviews: 8932,
    featured: true,
    soldOut: false,
  },
  {
    id: 7,
    title: "NBA Finals Game 7",
    category: "Sports",
    date: "Jun 22, 2025",
    time: "9:00 PM",
    location: "Madison Square Garden, NYC",
    image: "/stadium-crowd-cheering-sports-night-game.jpg",
    price: 350,
    rating: 4.9,
    reviews: 1560,
    featured: false,
    soldOut: false,
  },
  {
    id: 8,
    title: "Trevor Noah World Tour",
    category: "Comedy",
    date: "Sep 10, 2025",
    time: "8:00 PM",
    location: "O2 Arena, London",
    image: "/comedy-club-stage-spotlight-microphone.jpg",
    price: 85,
    rating: 4.6,
    reviews: 723,
    featured: false,
    soldOut: false,
  },
];

export function EventsGrid() {
  const searchParams = useSearchParams();
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  // Simple filtering logic based on URL params
  const search = searchParams.get("search")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";

  // Date params
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const category = searchParams.get("category")?.toLowerCase() || "";

  const filteredEvents = events.filter((event) => {
    const matchesSearch = search
      ? event.title.toLowerCase().includes(search) ||
        event.category.toLowerCase().includes(search)
      : true;
    const matchesLocation = location
      ? event.location.toLowerCase().includes(location)
      : true;

    // Complex date matching against "Jul 29, 2025" or "Jun 20-22, 2025" or "Running Daily"
    let matchesDate = true;

    if (startParam && endParam) {
      if (event.date === "Running Daily" || event.date === "Now Playing") {
        matchesDate = true; // Always show recurring events
      } else {
        try {
          const startDate = new Date(startParam);
          const endDate = new Date(endParam);

          // Helper to parse event date string "MMM DD, YYYY"
          const parseEventDate = (dateStr: string) => {
            // Handle ranges like "Jun 20-22, 2025"
            if (dateStr.includes("-")) {
              const [rangePart, year] = dateStr.split(", ");
              const [rangeStart] = rangePart.split("-");
              return new Date(`${rangeStart}, ${year}`);
            }
            return new Date(dateStr);
          };

          const eventDateObj = parseEventDate(event.date);

          if (!isNaN(eventDateObj.getTime())) {
            // Check if event date is within range
            matchesDate = eventDateObj >= startDate && eventDateObj <= endDate;
          }
        } catch (e) {
          logger.log("Error parsing dates", e);
        }
      }
    }

    const matchesCategory = category
      ? event.category.toLowerCase() === category || category === "all"
      : true;

    return matchesSearch && matchesLocation && matchesDate && matchesCategory;
  });

  const toggleSave = (id: number) => {
    setSavedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredEvents.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group border p-4 border-border bg-card hover:border-accent transition-colors"
        >
          <Link href={`/events/${event.id}`} className="block">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden mb-4">
              <Image
                src={
                  event.image ||
                  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop"
                }
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-xs tracking-wider">
                  {event.category.toUpperCase()}
                </span>
              </div>

              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs tracking-wider">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Sold Out Overlay */}
              {event.soldOut && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-lg tracking-wider font-medium">
                    SOLD OUT
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSave(event.id);
                  }}
                  className={`p-2.5 backdrop-blur-sm transition-colors ${
                    savedEvents.includes(event.id)
                      ? "bg-accent text-white"
                      : "bg-black/70 hover:bg-black"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      savedEvents.includes(event.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 bg-black/70 backdrop-blur-sm hover:bg-black transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{event.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({event.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {event.title}
              </h3>

              {/* Details */}
              <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{event.date}</span>
                  <span className="text-border">|</span>
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">From</span>
                  <span className="text-lg font-medium ml-1">
                    ${event.price}
                  </span>
                </div>
                {!event.soldOut && (
                  <span className="text-xs tracking-wider text-accent group-hover:underline">
                    GET TICKETS
                  </span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Load More */}
      <div className="col-span-full flex justify-center mt-12">
        <button className="px-12 py-4 border border-border text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
          LOAD MORE EVENTS
        </button>
      </div>
    </div>
  );
}

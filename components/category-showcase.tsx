"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

// Categories data
const categories = [
  {
    id: "concerts",
    title: "Concerts",
    subtitle: "Live Music Experiences",
    count: "2,340+ Events",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop",
    color: "#FF6B35",
  },
  {
    id: "theater",
    title: "Theater",
    subtitle: "Broadway & Beyond",
    count: "890+ Shows",
    image:
      "https://images.unsplash.com/photo-1503095392237-736213781043?q=80&w=2072&auto=format&fit=crop",

    color: "#9B59B6",
  },
  {
    id: "sports",
    title: "Sports",
    subtitle: "Championship Moments",
    count: "5,200+ Games",
    image:
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=2068&auto=format&fit=crop",

    color: "#27AE60",
  },
  {
    id: "comedy",
    title: "Comedy",
    subtitle: "Laugh Out Loud",
    count: "1,100+ Shows",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",

    color: "#F39C12",
  },
  {
    id: "art",
    title: "Art & Culture",
    subtitle: "Exhibitions & Galleries",
    count: "850+ Events",
    image:
      "https://images.unsplash.com/photo-1577724036923-a26245053123?q=80&w=2070&auto=format&fit=crop",
    color: "#E91E63",
  },
  {
    id: "food",
    title: "Food & Drink",
    subtitle: "Culinary Adventures",
    count: "1,400+ Events",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    color: "#D35400",
  },
  {
    id: "technology",
    title: "Technology",
    subtitle: "Summits & Workshops",
    count: "980+ events",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50918c71?q=80&w=2070&auto=format&fit=crop",
    color: "#3498DB",
  },
];

export function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Filter Logic
  const categoryFilter = searchParams.get("category");

  const filteredCategories = categories.filter((cat) => {
    if (!categoryFilter) return true;
    if (categoryFilter === "all") return true;
    return (
      cat.id.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      cat.title.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="category-showcase"
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-card min-h-[50vh]"
    >
      {/* Section Header */}
      <motion.div
        style={{ opacity }}
        className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-16"
      >
        <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">
          EXPLORE BY CATEGORY
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-2xl">
            {categoryFilter && categoryFilter !== "all"
              ? `Results for "${categoryFilter}"`
              : "Find Your Next Experience"}
          </h2>

          <div className="flex items-center gap-6">
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-foreground"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-foreground"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {categoryFilter && (
              <Link
                href="/"
                scroll={false}
                className="text-sm text-accent hover:underline flex items-center gap-2"
              >
                <X size={16} /> Clear Filters
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Horizontal Scroll Categories */}
      <div className="relative">
        {filteredCategories.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 px-6 lg:px-12 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
          >
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/events?category=${category.id}`}
                className="group relative shrink-0 w-[320px] md:w-[400px] h-[500px] overflow-hidden rounded-xl snap-start"
              >
                {/* Image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-xs tracking-wider text-white/60 mb-2">
                    {category.count}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/70 mb-6 font-serif">
                    {category.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE <ArrowRight className="w-4 h-4" />
                    </span>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: category.color }}
                    >
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Accent Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: category.color }}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-6 lg:px-12 py-10 text-center text-muted-foreground">
            No categories found matching your criteria.
          </div>
        )}

        {/* Fade Edges */}
        <div className="absolute top-0 left-0 bottom-8 w-12 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-8 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
